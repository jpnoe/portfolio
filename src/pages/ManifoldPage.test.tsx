import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, expect, test } from "vitest";
import { hrefForMode } from "../labs/manifold/control";
import { ManifoldPage } from "./ManifoldPage";

let root: Root | null = null;
let host: HTMLDivElement | null = null;

afterEach(() => {
  act(() => {
    root?.unmount();
  });
  host?.remove();
  root = null;
  host = null;
  window.history.replaceState(null, "", "/work/manifold");
});

function mount() {
  host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
  act(() => {
    root?.render(<ManifoldPage />);
  });
}

function count(name: string): string {
  return host?.querySelector(`[data-count="${name}"]`)?.textContent ?? "";
}

function typeLineA(value: string) {
  const input = host?.querySelector("#line-a");
  if (!(input instanceof HTMLInputElement)) throw new Error("missing line A");
  const setter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value",
  )?.set;
  setter?.call(input, value);
  act(() => {
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

function select(mode: "bus" | "store") {
  const button = host?.querySelector(`[data-mode="${mode}"]`);
  if (!(button instanceof HTMLButtonElement)) throw new Error(`missing ${mode}`);
  act(() => {
    button.click();
  });
}

test("hrefForMode only adds the store flag", () => {
  expect(hrefForMode("/work/manifold", "", "bus")).toBe("/work/manifold");
  expect(hrefForMode("/work/manifold", "", "store")).toBe(
    "/work/manifold?control=store",
  );
  expect(hrefForMode("/work/manifold", "?control=store", "bus")).toBe(
    "/work/manifold",
  );
});

test("the selector mounts one card and resets it when the wiring changes", () => {
  window.history.replaceState(null, "", "/work/manifold");
  mount();

  expect(host?.querySelectorAll("#line-a")).toHaveLength(1);
  const disclosures = host?.querySelectorAll("details.disclosure");
  expect(disclosures).toHaveLength(2);
  for (const disclosure of disclosures ?? []) {
    expect(disclosure.hasAttribute("open")).toBe(false);
  }
  expect(host?.querySelector("[data-mode='bus']")?.getAttribute("aria-checked")).toBe(
    "true",
  );
  expect(count("writes")).toBe("3");

  typeLineA("8");
  expect(count("writes")).toBe("5");

  select("store");

  expect(window.location.pathname + window.location.search).toBe(
    "/work/manifold?control=store",
  );
  expect(host?.querySelectorAll("#line-a")).toHaveLength(1);
  expect(host?.textContent).toContain("React control");
  expect(host?.textContent).toContain("useSyncExternalStore");
  expect((host?.querySelector("#line-a") as HTMLInputElement).value).toBe("3");
  expect(count("writes")).toBe("3");
  expect(count("figure-a")).toBe("1");

  select("bus");
  expect(window.location.search).toBe("");
  expect(host?.querySelector("[data-mode='store']")?.getAttribute("aria-checked")).toBe(
    "false",
  );
});

test("a store deep link opens the store control", () => {
  window.history.replaceState(null, "", "/work/manifold?control=store");
  mount();
  expect(host?.querySelector("[data-mode='store']")?.getAttribute("aria-checked")).toBe(
    "true",
  );
  expect(host?.querySelector(".instrument .status")?.textContent).toContain(
    "React control",
  );
});
