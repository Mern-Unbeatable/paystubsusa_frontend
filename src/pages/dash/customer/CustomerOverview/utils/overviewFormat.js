// Labels match the colours DashboardStatusBadge already knows (completed/pending/failed).
const DOCUMENT_STATUS_LABELS = {
  ready: "Completed",
  queued: "Pending",
  rendering: "Pending",
  awaiting_payment: "Pending",
  failed: "Failed",
  revoked: "Revoked",
};

const PAYMENT_STATUS_LABELS = {
  succeeded: "Successful",
  requires_payment: "Pending",
  processing: "Pending",
  failed: "Failed",
  refunded: "Refunded",
  partially_refunded: "Partially refunded",
};

const humanize = (value) => (value ? value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, " ") : "—");

export const documentStatusLabel = (status) => DOCUMENT_STATUS_LABELS[status] ?? humanize(status);
export const paymentStatusLabel = (status) => PAYMENT_STATUS_LABELS[status] ?? humanize(status);

const SUBSCRIPTION_STATUS_LABELS = {
  active: "Active",
  past_due: "Past due",
  incomplete: "Incomplete",
  canceled: "Canceled",
  unpaid: "Unpaid",
};

export const subscriptionStatusLabel = (status) => SUBSCRIPTION_STATUS_LABELS[status] ?? humanize(status);

export function describeCard(payment) {
  if (!payment.cardLast4) return "—";
  const brand = payment.cardBrand ? humanize(payment.cardBrand) : "Card";
  return `${brand} •••• ${payment.cardLast4}`;
}
