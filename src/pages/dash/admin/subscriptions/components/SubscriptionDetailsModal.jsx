import React, { useEffect, useState } from "react";
import { Ban, CalendarClock, CalendarDays, CircleDot, FileText, Fingerprint, Mail, Package, Repeat, UserRound, Wallet } from "lucide-react";
import ProfileModal from "../../../../../Components/modal/ProfileModal";
import { describeRequestError } from "../../../customer/Profile/utils/profileFormat";
import { formatMoney, formatShortDate } from "../../../../../utils/format";
import { useAdminSubscriptions } from "../hooks/useAdminSubscriptions";
import { canCancel } from "../utils/subscriptionFormat";
import SubscriptionStatusBadge from "./SubscriptionStatusBadge";

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

/** `subscription` is the list row (shown immediately); the API refreshes it. */
const SubscriptionDetailsModal = ({ subscription, onClose, onCancel }) => {
  const { details: loaded, loadSubscriptionDetails } = useAdminSubscriptions();
  const [attempt, setAttempt] = useState(0);
  const subscriptionId = subscription?.id;

  useEffect(() => {
    if (!subscriptionId) return undefined;
    const request = loadSubscriptionDetails(subscriptionId);
    return () => request.abort();
  }, [subscriptionId, attempt, loadSubscriptionDetails]);

  const current = loaded.id === subscriptionId ? loaded : { subscription: null, error: null };
  const error = current.error && describeRequestError(current.error, "Couldn't load this subscription.");
  const record = current.subscription || subscription;

  const footer = (
    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onClose}
        className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 cursor-pointer"
      >
        Close
      </button>
      {record && canCancel(record) && (
        <button
          type="button"
          onClick={() => onCancel(record)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 text-sm font-semibold text-white transition hover:bg-rose-700 cursor-pointer"
        >
          <Ban className="h-4 w-4" />
          Cancel subscription
        </button>
      )}
    </div>
  );

  return (
    <ProfileModal
      open={Boolean(subscription)}
      onClose={onClose}
      title="Subscription details"
      description={record?.planName}
      icon={Repeat}
      size="lg"
      footer={footer}
    >
      {record && (
        <div className="space-y-4">
          <dl className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <Field label="Customer" icon={UserRound}>
              {record.customer?.name || "—"}
            </Field>
            <Field label="Email" icon={Mail}>
              {record.customer?.email || "—"}
            </Field>
            <Field label="Plan" icon={Package}>
              {record.planName}
            </Field>
            <Field label="Price" icon={Wallet}>
              {formatMoney(record.amountCents, record.currency)} / {record.interval}
            </Field>
            <Field label="Status" icon={CircleDot}>
              <SubscriptionStatusBadge subscription={record} />
            </Field>
            <Field label="Documents this period" icon={FileText}>
              {record.documentsGenerated ?? 0}
            </Field>
            <Field label="Started" icon={CalendarDays}>
              {formatShortDate(record.startDate)}
            </Field>
            <Field label="Current period" icon={CalendarClock}>
              {formatShortDate(record.currentPeriodStart)} – {formatShortDate(record.currentPeriodEnd)}
            </Field>
            {record.canceledAt && (
              <Field label="Canceled" icon={Ban}>
                {formatShortDate(record.canceledAt)}
              </Field>
            )}
            <Field label="Stripe ID" icon={Fingerprint}>
              <span className="font-mono text-xs">{record.stripeSubscriptionId}</span>
            </Field>
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

export default SubscriptionDetailsModal;
