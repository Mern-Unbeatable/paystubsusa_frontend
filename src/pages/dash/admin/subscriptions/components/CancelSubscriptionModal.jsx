import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Ban } from "lucide-react";
import ProfileModal from "../../../../../Components/modal/ProfileModal";
import { describeRequestError } from "../../../customer/Profile/utils/profileFormat";
import { formatShortDate } from "../../users/utils/userFormat";
import { useAdminSubscriptions } from "../hooks/useAdminSubscriptions";

/** Cancels through Stripe; the webhook later confirms the final state. */
const CancelSubscriptionModal = ({ subscription, onClose }) => {
  const { cancelSubscription } = useAdminSubscriptions();
  const [atPeriodEnd, setAtPeriodEnd] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const inFlightRef = useRef(false);

  if (!subscription) return null;

  const name = subscription.customer?.name || subscription.customer?.email || "This customer";
  const periodEnd = formatShortDate(subscription.currentPeriodEnd);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setSubmitting(true);
    setError(null);
    try {
      await cancelSubscription({ id: subscription.id, atPeriodEnd });
      toast.success(atPeriodEnd ? `Subscription will end on ${periodEnd}.` : "Subscription canceled.");
      onClose();
    } catch (err) {
      setError(describeRequestError(err, "Couldn't cancel this subscription. Please try again."));
    } finally {
      inFlightRef.current = false;
      setSubmitting(false);
    }
  };

  const option = (value, title, hint) => (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3.5 py-3 transition ${
        atPeriodEnd === value ? "border-secondary bg-secondary/5" : "border-slate-200 hover:bg-slate-50"
      }`}
    >
      <input
        type="radio"
        name="cancel-mode"
        checked={atPeriodEnd === value}
        onChange={() => setAtPeriodEnd(value)}
        disabled={submitting}
        className="mt-1 accent-secondary"
      />
      <span>
        <span className="block text-sm font-semibold text-slate-800">{title}</span>
        <span className="block text-xs text-slate-500">{hint}</span>
      </span>
    </label>
  );

  return (
    <ProfileModal
      open
      onClose={onClose}
      dismissible={!submitting}
      icon={Ban}
      title="Cancel subscription"
      description={`${name} · ${subscription.planName}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="space-y-2">
          {option(true, "At the end of the billing period", `Access continues until ${periodEnd}; no further charges.`)}
          {option(false, "Immediately", "Access ends now. No refund is issued automatically.")}
        </div>

        {error && (
          <p role="alert" className="rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
            {error}
          </p>
        )}

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="h-10 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
          >
            Keep subscription
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="h-10 rounded-xl bg-rose-600 px-4 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-60 cursor-pointer"
          >
            {submitting ? "Canceling…" : "Cancel subscription"}
          </button>
        </div>
      </form>
    </ProfileModal>
  );
};

export default CancelSubscriptionModal;
