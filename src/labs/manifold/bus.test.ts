import { describe, expect, test } from "vitest";
import { createBus, defaultPaint } from "./bus";
import { formatSum } from "./derive";

describe("createBus", () => {
  test("skips an unchanged write and does not paint again", () => {
    const bus = createBus();
    const node = document.createElement("span");
    let paints = 0;
    bus.bind("line.a:value", node, (_node, value) => {
      paints += 1;
      node.textContent = value == null ? "" : String(value);
    });
    bus.write("line.a:value", "3");
    bus.write("line.a:value", "3");
    expect(paints).toBe(1);
    expect(bus.writeCount).toBe(1);
    expect(node.textContent).toBe("3");
  });

  test("paints every node bound to an address, and unbind stops one of them", () => {
    const bus = createBus();
    const first = document.createElement("span");
    const second = document.createElement("span");
    bus.write("line.a:value", "1");
    const unbind = bus.bind("line.a:value", first);
    bus.bind("line.a:value", second);
    expect(first.textContent).toBe("1");
    expect(second.textContent).toBe("1");
    unbind();
    bus.write("line.a:value", "2");
    expect(first.textContent).toBe("1");
    expect(second.textContent).toBe("2");
  });

  test("depend runs an initial computation and returns a cleanup", () => {
    const bus = createBus();
    bus.write("line.a:value", "3");
    bus.write("line.b:value", "4");
    let seen: string | undefined = "unset";
    const stop = bus.depend(["line.a:value", "line.b:value"], (source) => {
      seen = source;
      bus.write(
        "line.sum:value",
        formatSum(bus.get("line.a:value"), bus.get("line.b:value")),
      );
    });
    expect(seen).toBeUndefined();
    expect(bus.get("line.sum:value")).toBe("7");
    expect(bus.writeCount).toBe(3);

    bus.write("line.a:value", "8");
    expect(seen).toBe("line.a:value");
    expect(bus.get("line.sum:value")).toBe("12");
    expect(bus.writeCount).toBe(5);

    stop();
    bus.write("line.a:value", "1");
    expect(bus.get("line.sum:value")).toBe("12");
    expect(bus.writeCount).toBe(6);
  });

  test("a nested sink write does not run that sink's dependents", () => {
    const bus = createBus();
    let sinkRuns = 0;
    let n = 0;
    bus.depend(["line.sum:value"], () => {
      sinkRuns += 1;
    });
    expect(sinkRuns).toBe(1);

    bus.depend(["line.a:value"], () => {
      n += 1;
      bus.write("line.sum:value", String(n));
    });
    expect(n).toBe(1);
    expect(bus.get("line.sum:value")).toBe("1");
    expect(sinkRuns).toBe(1);

    bus.write("line.a:value", "9");
    expect(n).toBe(2);
    expect(bus.get("line.sum:value")).toBe("2");
    expect(sinkRuns).toBe(1);

    bus.write("line.sum:value", "3");
    expect(sinkRuns).toBe(2);
  });

  test("default input paint skips a redundant value assignment", () => {
    const input = document.createElement("input");
    let sets = 0;
    let current = "hello";
    Object.defineProperty(input, "value", {
      configurable: true,
      get: () => current,
      set: (next: string) => {
        sets += 1;
        current = String(next);
      },
    });

    const bus = createBus();
    bus.bind("line.a:value", input, defaultPaint);
    bus.write("line.a:value", "hello");
    expect(sets).toBe(0);
    expect(current).toBe("hello");

    bus.write("line.a:value", "hell");
    expect(sets).toBe(1);
    expect(current).toBe("hell");
  });

  test("default text paint skips an identical string", () => {
    const node = document.createElement("span");
    let sets = 0;
    let current = "same";
    Object.defineProperty(node, "textContent", {
      configurable: true,
      get: () => current,
      set: (next: string) => {
        sets += 1;
        current = String(next);
      },
    });

    const bus = createBus();
    bus.write("line.a:value", "same");
    bus.bind("line.a:value", node, defaultPaint);
    expect(sets).toBe(0);
    bus.write("line.a:value", "next");
    expect(sets).toBe(1);
    expect(current).toBe("next");
  });
});

describe("formatSum", () => {
  test("treats an empty or non-numeric term as zero", () => {
    expect(formatSum("", "4")).toBe("4");
    expect(formatSum("nope", "1")).toBe("1");
    expect(formatSum("1.5", "1.5")).toBe("3");
  });
});
