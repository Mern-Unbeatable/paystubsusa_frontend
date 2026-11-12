import React, { useEffect, useState } from "react";
import {
  AlertTriangle,
  CalendarDays,
  CircleDot,
  CreditCard,
  ExternalLink,
  FileText,
  Fingerprint,
  Hash,
  Mail,
  RotateCcw,
  Wallet,
} from "lucide-react";
import ProfileModal from "../../../../../Components/modal/ProfileModal";
import { describeRequestError } from "../../../customer/Profile/utils/profileFormat";
import { formatMoney } from "../../users/utils/userFormat";
import { formatDateTime } from "../../orders/utils/orderFormat";
import { useAdminPayments } from "../hooks/useAdminPayments";
import { describeMethod } from "../utils/paymentFormat";
import PaymentStatusBadge from "./PaymentStatusBadge";

const Field = ({ label, icon: Icon, children }) => (
  <div className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-3.5 py-2.5">
    {Icon && (
      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-secondary ring-1 ring-slate-100">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
    )}
    <div className="min-w-0">
      <dt className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">{label}</dt>
      <dd className="mt-1 truncate text-sm font-semibold text-slate-800">{children}</dd>
    </div>
  </div>
);

/** `payment` is the list row (shown immediately); the API refreshes it. */
const PaymentDetailsModal = ({ payment, onClose }) => {
  const { details: loaded, loadPaymentDetails } = useAdminPayments();
  const [attempt, setAttempt] = useState(0);
  const paymentId = payment?.id;

  useEffect(() => {
    if (!paymentId) return undefined;
    const request = loadPaymentDetails(paymentId);
    return () => request.abort();
  }, [paymentId, attempt, loadPaymentDetails]);

  const current = loaded.id === paymentId ? loaded : { payment: null, error: null };
  const error = current.error && describeRequestError(current.error, "Couldn't load this transaction.");
  const record = current.payment || payment;

  const footer = (
    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onClose}
        className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 cursor-pointer"
      >
        Close
      </button>
      {record?.receiptUrl && (
        <a
          href={record.receiptUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-secondary px-4 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <ExternalLink className="h-4 w-4" />
          Stripe receipt
        </a>
      )}
    </div>
  );

  return (
    <ProfileModal
      open={Boolean(payment)}
      onClose={onClose}
      title="Transaction details"
      description={record?.description}
      icon={CreditCard}
      size="lg"
      footer={footer}
    >
      {record && (
        <div className="space-y-4">
          <dl className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <Field label="Amount" icon={Wallet}>
              {formatMoney(record.amountCents, record.currency)}
            </Field>
            <Field label="Status" icon={CircleDot}>
              <PaymentStatusBadge status={record.status} />
            </Field>
            <Field label="Refunded" icon={RotateCcw}>
              {record.amountRefundedCents > 0 ? formatMoney(record.amountRefundedCents, record.currency) : "—"}
            </Field>
            <Field label="Method" icon={CreditCard}>
              {describeMethod(record)}
            </Field>
            <Field label="Customer email" icon={Mail}>
              {record.email || "—"}
            </Field>
            <Field label="Order" icon={Hash}>
              {record.orderNumber || (record.subscriptionId ? "Subscription" : "—")}
            </Field>
            <Field label="Date" icon={CalendarDays}>
              {formatDateTime(record.createdAt)}
            </Field>
            <Field label="Description" icon={FileText}>
              {record.description}
            </Field>
            <Field label="Stripe ID" icon={Fingerprint}>
              <span className="font-mono text-xs">{record.providerPaymentId || "—"}</span>
            </Field>
            {record.failureCode && (
              <Field label="Failure reason" icon={AlertTriangle}>
                {record.failureCode.replace(/_/g, " ")}
              </Field>
            )}
          </dl>

          {error && (
            <div
              role="alert"
              className="flex items-center justify-between gap-3 rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700"
            >
              <span>{error}</span>
              <button
                type="button"
                onClick={() => setAttempt((n) => n + 1)}
                className="shrink-0 font-semibold underline cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      )}
    </ProfileModal>
  );
};

export default PaymentDetailsModal;
