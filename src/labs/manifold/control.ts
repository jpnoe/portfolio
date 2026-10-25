import type { InstrumentMode } from "./Instrument";

export const STORE_CONTROL_PARAM = "control";
export const STORE_CONTROL_VALUE = "store";

export function isStoreControl(search: string): boolean {
  return (
    new URLSearchParams(search).get(STORE_CONTROL_PARAM) === STORE_CONTROL_VALUE
  );
}

export function modeFromSearch(search: string): InstrumentMode {
  return isStoreControl(search) ? "store" : "bus";
}

/** Same path, with `?control=store` only while the store control is selected. */
export function hrefForMode(
  pathname: string,
  search: string,
  mode: InstrumentMode,
): string {
  const params = new URLSearchParams(search);
  if (mode === "store") params.set(STORE_CONTROL_PARAM, STORE_CONTROL_VALUE);
  else params.delete(STORE_CONTROL_PARAM);
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}
