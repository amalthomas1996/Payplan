export const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });

export function fmt(n: number | string) {
  const num = typeof n === "string" ? Number(n) : n;
  if (!isFinite(num)) return String(n);
  return inr.format(num);
}
