export const PAYMENT_STATUS = {
  succeeded: { label: "Succeeded", className: "bg-emerald-50 text-emerald-700 ring-emerald-100" },
  processing: { label: "Processing", className: "bg-sky-50 text-sky-700 ring-sky-100" },
  requires_payment: { label: "Awaiting payment", className: "bg-amber-50 text-amber-700 ring-amber-100" },
  failed: { label: "Failed", className: "bg-rose-50 text-rose-700 ring-rose-100" },
  refunded: { label: "Refunded", className: "bg-violet-50 text-violet-700 ring-violet-100" },
  partially_refunded: { label: "Partially refunded", className: "bg-violet-50 text-violet-700 ring-violet-100" },
};

export const PAYMENT_STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  ...Object.entries(PAYMENT_STATUS).map(([value, { label }]) => ({ value, label })),
];

export const describeMethod = (p) => {
  if (!p.cardLast4) return "Card";
  const brand = p.cardBrand ? p.cardBrand[0].toUpperCase() + p.cardBrand.slice(1) : "Card";
  return `${brand} •••• ${p.cardLast4}`;
};
