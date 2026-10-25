export type Address = string;
export type Unsubscribe = () => void;
export type Paint = (node: HTMLElement, value: unknown) => void;

/**
 * `undefined` is the initial computation, run when `depend` is registered.
 * A later call receives the source address that was written.
 */
export type Recompute = (source: Address | undefined) => void;

export interface Bus {
  get(address: Address): unknown;
  /** Values stored after the equality check. Unchanged writes are not counted. */
  readonly writeCount: number;
  write(address: Address, value: unknown): void;
  bind(address: Address, node: HTMLElement, paint?: Paint): Unsubscribe;
  depend(sources: readonly Address[], recompute: Recompute): Unsubscribe;
}

interface Binding {
  node: HTMLElement;
  paint: Paint;
}

/**
 * Default paint. Assigning `input.value` resets the caret, so an input is
 * written only when the string actually differs.
 */
export function defaultPaint(node: HTMLElement, value: unknown): void {
  const next = value == null ? "" : String(value);
  if (
    node instanceof HTMLInputElement ||
    node instanceof HTMLTextAreaElement ||
    node instanceof HTMLSelectElement
  ) {
    if (node.value !== next) node.value = next;
    return;
  }
  if (node.textContent !== next) node.textContent = next;
}

export function createBus(): Bus {
  const values = new Map<Address, unknown>();
  const nodes = new Map<Address, Set<Binding>>();
  const dependents = new Map<Address, Set<Recompute>>();
  let cascading = false;
  let writeCount = 0;

  function paintAddress(address: Address, value: unknown): void {
    const set = nodes.get(address);
    if (!set) return;
    for (const binding of set) binding.paint(binding.node, value);
  }

  const bus: Bus = {
    get(address) {
      return values.get(address);
    },
    get writeCount() {
      return writeCount;
    },
    write(address, value) {
      if (values.has(address) && Object.is(values.get(address), value)) return;
      values.set(address, value);
      writeCount += 1;
      if (!cascading) {
        const fns = dependents.get(address);
        if (fns && fns.size > 0) {
          cascading = true;
          try {
            for (const fn of fns) fn(address);
          } finally {
            cascading = false;
          }
        }
      }
      paintAddress(address, value);
    },
    bind(address, node, paint = defaultPaint) {
      let set = nodes.get(address);
      if (!set) {
        set = new Set();
        nodes.set(address, set);
      }
      const binding: Binding = { node, paint };
      set.add(binding);
      if (values.has(address)) paint(node, values.get(address));
      return () => {
        const current = nodes.get(address);
        if (!current) return;
        current.delete(binding);
        if (current.size === 0) nodes.delete(address);
      };
    },
    depend(sources, recompute) {
      for (const source of sources) {
        let set = dependents.get(source);
        if (!set) {
          set = new Set();
          dependents.set(source, set);
        }
        set.add(recompute);
      }
      cascading = true;
      try {
        recompute(undefined);
      } finally {
        cascading = false;
      }
      return () => {
        for (const source of sources) {
          const set = dependents.get(source);
          if (!set) continue;
          set.delete(recompute);
          if (set.size === 0) dependents.delete(source);
        }
      };
    },
  };

  return bus;
}
