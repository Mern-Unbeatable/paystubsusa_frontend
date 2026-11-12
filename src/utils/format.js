const shortDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function formatShortDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : shortDate.format(date);
}

export const formatCents = (cents) => usd.format((cents || 0) / 100);

export function formatMoney(cents, currency = "usd") {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(
      (cents || 0) / 100,
    );
  } catch {
    return formatCents(cents);
  }
}
