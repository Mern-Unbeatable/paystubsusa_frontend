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

export const STATUS_LABELS = { active: "Active", suspended: "Suspended" };

export const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "suspended", label: "Suspended" },
];

export const SUBSCRIPTION_LABELS = { active: "Active", past_due: "Past due" };

export const SUBSCRIPTION_OPTIONS = [
  { value: "", label: "All subscriptions" },
  { value: "active", label: "Subscribed" },
  { value: "none", label: "No subscription" },
];

export const EMAIL_VERIFIED_OPTIONS = [
  { value: "", label: "All emails" },
  { value: "verified", label: "Verified" },
  { value: "unverified", label: "Unverified" },
];

export const SORT_OPTIONS = [
  { value: "-createdAt", label: "Newest first" },
  { value: "-lifetimeSpend", label: "Highest spend" },
];
