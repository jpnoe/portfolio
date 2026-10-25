import { LINE_A, LINE_B, LINE_SUM, SEED_A, SEED_B } from "./addresses";
import { formatSum } from "./derive";

export type StoreListener = () => void;
export type StoreSubscribe = (onStoreChange: StoreListener) => () => void;

/**
 * Topology-matched control: one slot per address, same sum as the bus.
 * This is not React in general. Readouts subscribe per address.
 */
export interface ExternalStore {
  get(address: string): string;
  /** Values stored after the equality check, including the seed. */
  readonly writeCount: number;
  write(address: string, value: string): void;
  /** Stable per address, so useSyncExternalStore does not resubscribe. */
  subscribe(address: string): StoreSubscribe;
}

interface StoreCore {
  store: ExternalStore;
  put(address: string, value: string, fanout: boolean): void;
}

function createCore(): StoreCore {
  const values = new Map<string, string>();
  const listeners = new Map<string, Set<StoreListener>>();
  const subscribeFns = new Map<string, StoreSubscribe>();
  let writeCount = 0;

  function notify(address: string): void {
    const set = listeners.get(address);
    if (!set) return;
    for (const listener of set) listener();
  }

  function put(address: string, value: string, fanout: boolean): void {
    if (values.has(address) && Object.is(values.get(address), value)) return;
    values.set(address, value);
    writeCount += 1;
    notify(address);
    if (fanout && (address === LINE_A || address === LINE_B)) {
      put(LINE_SUM, formatSum(values.get(LINE_A), values.get(LINE_B)), false);
    }
  }

  const store: ExternalStore = {
    get(address) {
      return values.get(address) ?? "";
    },
    get writeCount() {
      return writeCount;
    },
    write(address, value) {
      put(address, value, true);
    },
    subscribe(address) {
      let stable = subscribeFns.get(address);
      if (!stable) {
        stable = (onStoreChange) => {
          let set = listeners.get(address);
          if (!set) {
            set = new Set();
            listeners.set(address, set);
          }
          set.add(onStoreChange);
          return () => {
            set.delete(onStoreChange);
            if (set.size === 0) listeners.delete(address);
          };
        };
        subscribeFns.set(address, stable);
      }
      return stable;
    },
  };

  return { store, put };
}

export function createExternalStore(): ExternalStore {
  return createCore().store;
}

/** Seed A, B, and the total. Three writes, matching the bus exhibit's startup. */
export function createLineStore(): ExternalStore {
  const { store, put } = createCore();
  put(LINE_A, SEED_A, false);
  put(LINE_B, SEED_B, false);
  put(LINE_SUM, formatSum(SEED_A, SEED_B), false);
  return store;
}
