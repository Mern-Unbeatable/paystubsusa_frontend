export const ORDER_STATUS = {
  pending_payment: { label: "Pending payment", className: "bg-amber-50 text-amber-700 ring-amber-100" },
  paid: { label: "Paid", className: "bg-emerald-50 text-emerald-700 ring-emerald-100" },
  failed: { label: "Failed", className: "bg-rose-50 text-rose-700 ring-rose-100" },
  canceled: { label: "Canceled", className: "bg-slate-100 text-slate-600 ring-slate-200" },
  refunded: { label: "Refunded", className: "bg-violet-50 text-violet-700 ring-violet-100" },
  partially_refunded: { label: "Partially refunded", className: "bg-violet-50 text-violet-700 ring-violet-100" },
};

export const DOCUMENT_TYPE_LABELS = {
  paystub: "Paystub",
  w2: "W-2",
  nec1099: "1099-NEC",
  direct_deposit: "Direct deposit",
};

export const ORDER_STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  ...Object.entries(ORDER_STATUS).map(([value, { label }]) => ({ value, label })),
];

export const DOCUMENT_TYPE_OPTIONS = [
  { value: "", label: "All document types" },
  ...Object.entries(DOCUMENT_TYPE_LABELS).map(([value, label]) => ({ value, label })),
];

const shortDateTime = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export function formatDateTime(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : shortDateTime.format(date);
}

export const humanize = (value) => (value ? value.replace(/_/g, " ") : "—");
