import { formatMoney } from "../../../../../utils/format";

export { formatMoney, formatShortDate } from "../../../../../utils/format";

export const DOCUMENT_TYPE_LABELS = {
  paystub: "Paystub",
  w2: "W-2",
  nec1099: "1099-NEC",
  direct_deposit: "Direct deposit",
};

export const DOCUMENT_TYPE_OPTIONS = [
  { value: "", label: "All documents" },
  ...Object.entries(DOCUMENT_TYPE_LABELS).map(([value, label]) => ({ value, label })),
];

export const KIND_OPTIONS = [
  { value: "", label: "All billing" },
  { value: "one_time", label: "One-time" },
  { value: "subscription", label: "Subscription" },
];

export const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export const formatPrice = (product) =>
  `${formatMoney(product.amountCents, product.currency)}${product.interval ? `/${product.interval === "month" ? "mo" : product.interval}` : ""}`;

export const billingLabel = (product) => {
  if (product.kind === "subscription") return product.interval === "month" ? "Monthly subscription" : "Subscription";
  return product.isAddon ? "Add-on" : "One-time";
};

/** Must match the server's create rule. */
export const PRODUCT_CODE_PATTERN = /^[a-z][a-z0-9_]{2,63}$/;

export const suggestCode = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^[^a-z]+|_+$/g, "")
    .slice(0, 64);

export const centsToDollars = (cents) => (Number.isFinite(cents) ? (cents / 100).toFixed(2) : "");

/** "12.5" → 1250; null when not a valid amount with at most two decimals. */
export const dollarsToCents = (value) => {
  const text = String(value).trim();
  if (!/^\d+(\.\d{1,2})?$/.test(text)) return null;
  return Math.round(Number(text) * 100);
};
