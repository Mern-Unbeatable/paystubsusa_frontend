import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { ShieldCheck, ShieldOff } from "lucide-react";
import ProfileModal from "../../../customer/Profile/components/ProfileModal";
import { describeRequestError } from "../../../customer/Profile/utils/profileFormat";
import { updateAdminUserStatusApi } from "../../../../../features/adminUsers/adminUsersApi";

const REASON_MAX = 500;

/** Suspend or reactivate one account. Suspension also signs the user out everywhere (server-side). */
const UserStatusModal = ({ user, onClose, onUpdated }) => {
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const inFlightRef = useRef(false);

  if (!user) return null;

  const suspending = user.status !== "suspended";
  const nextStatus = suspending ? "suspended" : "active";

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setSubmitting(true);
    setError(null);
    try {
      const updated = await updateAdminUserStatusApi(user.id, {
        status: nextStatus,
        reason: reason.trim() || undefined,
      });
      toast.success(suspending ? `${user.name} was suspended.` : `${user.name} was reactivated.`);
      onUpdated(updated || { ...user, status: nextStatus });
      onClose();
    } catch (err) {
      setError(describeRequestError(err, "Couldn't update this account. Please try again."));
    } finally {
      inFlightRef.current = false;
      setSubmitting(false);
    }
  };

  return (
    <ProfileModal
      open
      onClose={onClose}
      dismissible={!submitting}
      icon={suspending ? ShieldOff : ShieldCheck}
      title={suspending ? "Suspend account" : "Reactivate account"}
      description={
        suspending
          ? `${user.name} will be signed out on every device and won't be able to sign in until reactivated.`
          : `${user.name} will be able to sign in again.`
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="status-reason" className="text-sm font-semibold text-slate-700">
            Reason <span className="font-normal text-slate-400">(optional, kept in the audit log)</span>
          </label>
          <textarea
            id="status-reason"
            data-autofocus
            rows={3}
            maxLength={REASON_MAX}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            disabled={submitting}
            className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 transition focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 disabled:bg-slate-50"
          />
          <p className="mt-1 text-right text-xs text-slate-400">
            {reason.length}/{REASON_MAX}
          </p>
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
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className={`h-10 rounded-xl px-4 text-sm font-semibold text-white transition disabled:opacity-60 cursor-pointer ${
              suspending ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {submitting ? "Saving…" : suspending ? "Suspend account" : "Reactivate account"}
          </button>
        </div>
      </form>
    </ProfileModal>
  );
};

export default UserStatusModal;
