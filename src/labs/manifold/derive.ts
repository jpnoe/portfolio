export function parseTerm(value: unknown): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") return 0;
    const n = Number(trimmed);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

/** Shared by the bus exhibit and the external-store control. */
export function formatSum(left: unknown, right: unknown): string {
  const total = parseTerm(left) + parseTerm(right);
  if (!Number.isFinite(total)) return "0";
  const rounded = Math.round(total * 1e6) / 1e6;
  return String(rounded);
}
