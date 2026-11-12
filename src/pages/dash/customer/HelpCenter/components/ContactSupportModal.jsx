import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { AlertCircle, LifeBuoy, Send } from "lucide-react";
import ProfileModal from "../../../../../Components/modal/ProfileModal";
import { selectAuthUser } from "../../../../../features/auth/authSelectors";
import { sendContactMessage } from "../../../../../features/support/supportThunks";
import { describeRequestError } from "../../Profile/utils/profileFormat";

// Mirrors the API limits for contact messages.
const SUBJECT_MAX = 200;
const MESSAGE_MAX = 5000;

const inputClass = (error) =>
  `w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-800 transition focus:outline-none focus:ring-2 disabled:bg-slate-50 ${
    error
      ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
      : "border-slate-200 focus:border-secondary focus:ring-secondary/20"
  }`;

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
    {children}
  </label>
);

const FieldError = ({ id, children }) =>
  children ? (
    <p id={id} className="mt-1 text-[12px] text-rose-600">
      {children}
    </p>
  ) : null;

/** Body is mounted per open, so a reopened dialog starts empty. */
const ContactForm = ({ onClose, onBusyChange }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const [form, setForm] = useState({ subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState(null);
  const [sending, setSending] = useState(false);
  const inFlightRef = useRef(false);

  const subject = form.subject.trim();
  const message = form.message.trim();
  const canSubmit = Boolean(user?.email) && subject.length > 0 && message.length > 0;

  const update = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    setGeneralError(null);
  };

  const setBusy = (busy) => {
    setSending(busy);
    onBusyChange(busy);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inFlightRef.current || !canSubmit) return;
    inFlightRef.current = true;
    setBusy(true);
    setGeneralError(null);
    try {
      await dispatch(
        sendContactMessage({ name: user.name?.trim() || user.email, email: user.email, subject, message }),
      ).unwrap();
      toast.success("Message sent. We'll reply by email, usually within one business day.", { id: "support-sent" });
      onClose();
    } catch (err) {
      const fieldErrors = err?.fieldErrors || {};
      const mapped = { subject: fieldErrors.subject?.[0], message: fieldErrors.message?.[0] };
      if (mapped.subject || mapped.message) setErrors(mapped);
      else setGeneralError(describeRequestError(err, "We couldn't send your message. Please try again."));
    } finally {
      inFlightRef.current = false;
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <p className="rounded-xl bg-slate-50 px-3.5 py-2.5 text-[13px] text-slate-600">
        We'll reply to <span className="font-semibold text-slate-800">{user?.email}</span>
      </p>

      <div>
        <Label htmlFor="support-subject">Subject</Label>
        <input
          id="support-subject"
          type="text"
          value={form.subject}
          onChange={update("subject")}
          maxLength={SUBJECT_MAX}
          disabled={sending}
          data-autofocus
          placeholder="e.g. Question about my paystub"
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "support-subject-error" : undefined}
          className={inputClass(errors.subject)}
        />
        <FieldError id="support-subject-error">{errors.subject}</FieldError>
      </div>

      <div>
        <Label htmlFor="support-message">Message</Label>
        <textarea
          id="support-message"
          rows={6}
          value={form.message}
          onChange={update("message")}
          maxLength={MESSAGE_MAX}
          disabled={sending}
          placeholder="Tell us what you need help with. Include an order or document number if you have one."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "support-message-error" : undefined}
          className={`${inputClass(errors.message)} resize-y min-h-[120px]`}
        />
        <div className="mt-1 flex justify-between gap-2">
          <FieldError id="support-message-error">{errors.message}</FieldError>
          <span className="ml-auto text-[11px] text-slate-400">
            {form.message.length}/{MESSAGE_MAX}
          </span>
        </div>
      </div>

      {generalError && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl bg-rose-50 px-3 py-2.5 text-[13px] text-rose-700 ring-1 ring-rose-200"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span>{generalError}</span>
        </div>
      )}

      <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          disabled={sending}
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={sending || !canSubmit}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0089e0] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {sending ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {sending ? "Sending…" : "Send Message"}
        </button>
      </div>
    </form>
  );
};

const ContactSupportModal = ({ open, onClose }) => {
  const [busy, setBusy] = useState(false);
  return (
    <ProfileModal
      open={open}
      onClose={onClose}
      dismissible={!busy}
      icon={LifeBuoy}
      title="Contact Support"
      description="Send us a message and our team will get back to you by email."
    >
      {open && <ContactForm onClose={onClose} onBusyChange={setBusy} />}
    </ProfileModal>
  );
};

export default ContactSupportModal;
