export function removeEmptyProperties(
  obj: Record<string, unknown>
): Record<string, unknown> {
  return Object.entries(obj).reduce(
    (a, [k, v]) => (v == null || v === "" ? a : ((a[k] = v), a)),
    {} as Record<string, unknown>
  );
}
