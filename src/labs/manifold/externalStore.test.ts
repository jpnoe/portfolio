import { describe, expect, test } from "vitest";
import { LINE_A, LINE_B, LINE_SUM } from "./addresses";
import { createExternalStore, createLineStore } from "./externalStore";

describe("external store", () => {
  test("a line write notifies that line and the total, not the other line", () => {
    const store = createExternalStore();
    const notes: string[] = [];
    store.subscribe(LINE_A)(() => notes.push("a"));
    store.subscribe(LINE_B)(() => notes.push("b"));
    store.subscribe(LINE_SUM)(() => notes.push("sum"));

    store.write(LINE_A, "3");
    expect(notes).toEqual(["a", "sum"]);
    expect(store.get(LINE_SUM)).toBe("3");

    notes.length = 0;
    store.write(LINE_B, "4");
    expect(notes).toEqual(["b", "sum"]);
    expect(store.get(LINE_SUM)).toBe("7");

    notes.length = 0;
    store.write(LINE_A, "3");
    expect(notes).toEqual([]);
    expect(store.writeCount).toBe(4);
  });

  test("subscribe is stable per address", () => {
    const store = createExternalStore();
    expect(store.subscribe(LINE_A)).toBe(store.subscribe(LINE_A));
    expect(store.subscribe(LINE_A)).not.toBe(store.subscribe(LINE_B));
  });

  test("the seeded line store matches the bus startup writes", () => {
    const store = createLineStore();
    expect(store.get(LINE_A)).toBe("3");
    expect(store.get(LINE_B)).toBe("4");
    expect(store.get(LINE_SUM)).toBe("7");
    expect(store.writeCount).toBe(3);
  });
});
