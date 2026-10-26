import { useEffect, useLayoutEffect, useRef } from "react";
import { noteShellCommit } from "./shellCommits";
import { HomePage } from "../pages/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { WorkPage } from "../pages/WorkPage";
import { ProjectPage } from "../pages/ProjectPage";
import { ResearchPracticePage } from "../pages/ResearchPracticePage";
import { NavigationProvider, SiteLink, useNavigation } from "./navigation";
import { navRoutes, type AppRoute } from "./routes";

function ShellFrame() {
  const { route, path } = useNavigation();
  const seenPath = useRef<string | null>(null);

  useLayoutEffect(() => {
    noteShellCommit();
  });

  useEffect(() => {
    document.title = route
      ? route.documentTitle
      : "Page not found — Jacob Noe";
    if (seenPath.current === null || seenPath.current === path) {
      seenPath.current = path;
      return;
    }
    seenPath.current = path;
    const heading = document.getElementById("page-title");
    if (heading instanceof HTMLElement) heading.focus();
  }, [path, route]);

  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <div className="frame">
        <header className="mast">
          <SiteLink to="/" className="mark" announceCurrent={false}>
            HOME
          </SiteLink>
          <nav className="nav" aria-label="Primary">
            {navRoutes.map((item) => (
              <SiteLink key={item.id} to={item.path}>
                {item.label}
              </SiteLink>
            ))}
          </nav>
        </header>
        <main id="content" className="content">
          <PageView route={route} />
        </main>
        <footer className="colophon">
          <div><p>Jacob Noe</p><p>Software engineer · research and production systems</p></div>
          <div className="footer-links"><a href="https://github.com/jpnoe">GitHub ↗</a><a href="mailto:jake.p.noe.99@gmail.com">Email ↗</a></div>
        </footer>
      </div>
    </>
  );
}

function PageView({ route }: { route: AppRoute | null }) {
  switch (route?.id) {
    case "home":
      return <HomePage />;
    case "work":
      return <WorkPage />;
    case "practice":
      return <ResearchPracticePage />;
    case "hero":
    case "orbit":
    case "memory":
    case "whorl":
      return <ProjectPage key={route.id} id={route.id} />;
    default:
      return <NotFoundPage />;
  }
}

export function SiteShell() {
  return (
    <NavigationProvider>
      <ShellFrame />
    </NavigationProvider>
  );
}
