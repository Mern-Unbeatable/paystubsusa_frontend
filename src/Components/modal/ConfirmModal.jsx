import React, { useRef, useState } from "react";
import ProfileModal from "./ProfileModal";
import { describeRequestError } from "../../pages/dash/customer/Profile/utils/profileFormat";

const TONES = {
  danger: "bg-rose-600 hover:bg-rose-700",
  success: "bg-emerald-600 hover:bg-emerald-700",
  primary: "bg-secondary hover:bg-secondary/90",
};

/**
 * Confirmation dialog for one async action. Stays open and shows the error if
 * `onConfirm` rejects; closes on success. Double submits are ignored.
 */
const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  icon,
  confirmLabel,
  pendingLabel = "Working…",
  tone = "primary",
  errorFallback = "Something went wrong. Please try again.",
  children,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const inFlightRef = useRef(false);

  const handleConfirm = async () => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setSubmitting(true);
    setError(null);
    try {
      await onConfirm();
      onClose();
    } catch (err) {
      setError(describeRequestError(err, errorFallback));
    } finally {
      inFlightRef.current = false;
      setSubmitting(false);
    }
  };

  return (
    <ProfileModal
      open={open}
      onClose={onClose}
      dismissible={!submitting}
      icon={icon}
      title={title}
      description={description}
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-autofocus
            onClick={handleConfirm}
            disabled={submitting}
            className={`h-10 rounded-xl px-4 text-sm font-semibold text-white transition disabled:opacity-60 cursor-pointer ${TONES[tone]}`}
          >
            {submitting ? pendingLabel : confirmLabel}
          </button>
        </div>
      }
    >
      <div className="space-y-3">
        {children}
        {error && (
          <p role="alert" className="rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
            {error}
          </p>
        )}
      </div>
    </ProfileModal>
  );
};

export default ConfirmModal;
