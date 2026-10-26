import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, expect, test } from "vitest";
import { appPath, matchRoute, sitePath } from "./routes";
import { SiteShell } from "./SiteShell";

let root: Root | undefined;
let host: HTMLDivElement | undefined;

afterEach(() => {
  act(() => root?.unmount());
  host?.remove();
  window.history.replaceState(null, "", "/");
});

test("root and repository-hosted deep links resolve to the same project", () => {
  for (const [path, base] of [["/work/orbit/", "/"], ["/portfolio/work/orbit/", "/portfolio/"]]) {
    expect(matchRoute(appPath(path, base))?.id).toBe("orbit");
  }
  expect(appPath("/portfolio/", "/portfolio/")).toBe("/");
  expect(appPath("/portfolio-extra/work/orbit", "/portfolio/")).toBe("/portfolio-extra/work/orbit");
  expect(matchRoute("/work/missing")).toBeNull();
});

test("case study links navigate and browser history restores the prior page", () => {
  window.history.replaceState(null, "", "/work");
  host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
  act(() => root?.render(<SiteShell />));
  const orbit = host.querySelector<HTMLAnchorElement>(`a[href="${sitePath("/work/orbit")}"]`);
  expect(orbit).not.toBeNull();
  act(() => orbit?.click());
  expect(host.querySelector("h1")?.textContent).toBe("ORBIT");
  expect(document.title).toBe("ORBIT — Jacob Noe");
  expect(host.textContent).toContain("groupings show association, not causation");
  expect(host.querySelector<HTMLAnchorElement>('a[href="https://github.com/jpnoe/orbit"]')).not.toBeNull();
  act(() => {
    window.history.replaceState(null, "", "/work");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
  expect(host.querySelector("h1")?.textContent).toBe("Projects.");
});

test("research practice route presents collaboration, verification, and attribution", () => {
  window.history.replaceState(null, "", "/practice");
  host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
  act(() => root?.render(<SiteShell />));

  expect(host.querySelector("h1")?.textContent).toBe("Collaborative reasoning. Verifiable work.");
  expect(document.title).toBe("Research practice — Jacob Noe");
  expect(host.textContent).toContain("ChatGPT contributes");
  expect(host.textContent).toContain("Cursor's repository-aware agents");
  expect(host.textContent).toContain("Attribution and accountability are complementary");
});
