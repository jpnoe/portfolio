import { act, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, expect, test } from "vitest";
import { noteShellCommit } from "../../shell/shellCommits";
import { LINE_A, LINE_B, LINE_SUM } from "./addresses";
import type { Counts } from "./counts";
import {
  ManifoldInstrument,
  ManifoldTrace,
  type InstrumentMode,
} from "./Instrument";

let root: Root | null = null;
let host: HTMLDivElement | null = null;

afterEach(() => {
  act(() => {
    root?.unmount();
  });
  host?.remove();
  root = null;
  host = null;
});

function Harness({ mode }: { mode: InstrumentMode }) {
  const [counts, setCounts] = useState<Counts | null>(null);
  return (
    <>
      <ManifoldInstrument mode={mode} onCounts={setCounts} />
      <ManifoldTrace mode={mode} counts={counts} />
    </>
  );
}

function mount(mode: InstrumentMode) {
  host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
  act(() => {
    root?.render(<Harness mode={mode} />);
  });
}

function count(name: string): string {
  return host?.querySelector(`[data-count="${name}"]`)?.textContent ?? "";
}

function figure(address: string): string {
  return host?.querySelector(`[data-address="${address}"]`)?.textContent ?? "";
}

function flowText(): string {
  return (host?.querySelector(".flow")?.textContent ?? "").replace(/\s+/g, " ").trim();
}

function typeLine(id: string, value: string) {
  const input = host?.querySelector(id);
  if (!(input instanceof HTMLInputElement)) {
    throw new Error(`missing ${id}`);
  }
  const setter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value",
  )?.set;
  setter?.call(input, value);
  act(() => {
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

test("the bus updates the edited figure and the total without new readout commits", () => {
  mount("bus");
  expect(figure(LINE_A)).toBe("3");
  expect(figure(LINE_B)).toBe("4");
  expect(figure(LINE_SUM)).toBe("7");
  expect(flowText()).toBe(
    "keystroke write line.a derive sum write line.sum update total node update A node",
  );
  expect(host?.textContent).toContain("Address writes");
  expect(host?.textContent).toContain("Readout updates");
  expect(count("writes")).toBe("3");
  expect(count("exhibit")).toBe("1");
  expect(count("figure-a")).toBe("1");
  expect(count("figure-b")).toBe("1");
  expect(count("total")).toBe("1");

  typeLine("#line-a", "8");

  expect(figure(LINE_A)).toBe("8");
  expect(figure(LINE_SUM)).toBe("12");
  expect(figure(LINE_B)).toBe("4");
  expect(count("writes")).toBe("5");
  expect(count("exhibit")).toBe("1");
  expect(count("figure-a")).toBe("1");
  expect(count("figure-b")).toBe("1");
  expect(count("total")).toBe("1");
});

test("the external store commits the edited figure and the total, not line B", () => {
  mount("store");
  expect(flowText()).toBe(
    "keystroke write line.a derive sum write line.sum update A readout update total readout",
  );
  expect(figure(LINE_SUM)).toBe("7");
  expect(count("figure-a")).toBe("1");
  expect(count("total")).toBe("1");

  typeLine("#line-b", "10");

  expect(figure(LINE_B)).toBe("10");
  expect(figure(LINE_SUM)).toBe("13");
  expect(figure(LINE_A)).toBe("3");
  expect(count("writes")).toBe("5");
  expect(count("exhibit")).toBe("1");
  expect(count("figure-a")).toBe("1");
  expect(count("figure-b")).toBe("2");
  expect(count("total")).toBe("2");
});

test("a shell commit updates the tally without an exhibit commit", () => {
  mount("bus");
  const exhibit = count("exhibit");
  const before = Number(count("shell"));
  act(() => {
    noteShellCommit();
  });
  expect(count("shell")).toBe(String(before + 1));
  expect(count("exhibit")).toBe(exhibit);
});
