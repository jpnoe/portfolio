import { useLayoutEffect, useRef, type RefObject } from "react";
import type { Address, Bus, Paint } from "./bus";

/**
 * Register `ref` on the bus for this mount. Later writes paint the node.
 * This hook does not call setState.
 */
export function useBind<T extends HTMLElement = HTMLElement>(
  bus: Bus,
  address: Address,
  paint?: Paint,
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    return bus.bind(address, node, paint);
  }, [bus, address, paint]);

  return ref;
}
