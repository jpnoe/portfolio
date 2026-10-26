import routeData from "./route-data.json";

export type RouteId = "home" | "work" | "hero" | "orbit" | "memory" | "whorl";
export interface Route { id: RouteId; path: string; label: string; documentTitle: string; }
export const routes = routeData as readonly Route[];
export type AppRoute = Route;
const navIds: readonly RouteId[] = ["work"];
export const navRoutes = routes.filter((route) => navIds.includes(route.id));

export function normalizePath(pathname: string): string {
  return pathname.replace(/\/+$/, "") || "/";
}

/** Convert an application path into a host path, including GitHub's repository prefix. */
export function sitePath(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

export function appPath(pathname: string, base = import.meta.env.BASE_URL): string {
  const root = normalizePath(base);
  if (root === "/") return normalizePath(pathname);
  if (normalizePath(pathname) === root) return "/";
  if (!pathname.startsWith(`${root}/`)) return normalizePath(pathname);
  return normalizePath(pathname.slice(root.length));
}

export function matchRoute(pathname: string): AppRoute | null {
  const path = normalizePath(pathname);
  return routes.find((route) => route.path === path) ?? null;
}
