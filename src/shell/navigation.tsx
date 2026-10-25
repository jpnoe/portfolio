import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { appPath, matchRoute, normalizePath, sitePath, type AppRoute } from "./routes";

interface Navigation {
  path: string;
  route: AppRoute | null;
  navigate: (to: string) => void;
}

const NavigationContext = createContext<Navigation | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() =>
    appPath(window.location.pathname),
  );

  useEffect(() => {
    const onPop = () => setPath(appPath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((to: string) => {
    const next = normalizePath(to);
    if (next === appPath(window.location.pathname)) return;
    window.history.pushState(null, "", sitePath(next));
    setPath(next);
  }, []);

  const value: Navigation = {
    path,
    route: matchRoute(path),
    navigate,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation(): Navigation {
  const value = useContext(NavigationContext);
  if (!value) {
    throw new Error("useNavigation must be used inside NavigationProvider");
  }
  return value;
}

export function SiteLink({
  to,
  children,
  className,
  announceCurrent = true,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  /** Nav items announce the current page. The wordmark also points home, and stays quiet. */
  announceCurrent?: boolean;
}) {
  const { navigate, path } = useNavigation();
  const current = announceCurrent && path === normalizePath(to);

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    navigate(to);
  };

  return (
    <a
      href={sitePath(to)}
      className={className}
      aria-current={current ? "page" : undefined}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
