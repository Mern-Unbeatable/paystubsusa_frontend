import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { MailPlus, Pencil } from "lucide-react";
import ProfileModal from "../../../../../Components/modal/ProfileModal";
import { describeRequestError } from "../../../customer/Profile/utils/profileFormat";
import { useAdminContacts } from "../hooks/useAdminContacts";
import { CONTACT_STATUS } from "../utils/contactFormat";

// Mirrors the API limits for contact messages.
const LIMITS = { name: 100, subject: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELDS = ["name", "email", "subject", "message", "status"];

const inputClass =
  "mt-1.5 w-full rounded-xl border px-3 text-sm text-slate-800 transition focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500";
const inputState = (hasError) =>
  hasError
    ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
    : "border-slate-200 focus:border-secondary focus:ring-secondary/20";

const Field = ({ id, label, error, hint, children }) => (
  <div>
    <label htmlFor={id} className="text-sm font-semibold text-slate-700">
      {label}
    </label>
    {children}
    {error ? (
      <p id={`${id}-error`} className="mt-1 text-xs font-medium text-rose-600">
        {error}
      </p>
    ) : (
      hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>
    )}
  </div>
);

const initialValues = (m) => ({
  name: m?.name ?? "",
  email: m?.email ?? "",
  subject: m?.subject ?? "",
  message: m?.message ?? "",
  status: m?.status ?? "new",
});

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Enter the sender's name.";
  if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "Enter a valid email address.";
  if (!values.subject.trim()) errors.subject = "Enter a subject.";
  if (!values.message.trim()) errors.message = "Enter the message.";
  return errors;
}

/** Create (no `message`) or edit. Creating logs a message received another way; no email is sent. */
const ContactFormModal = ({ message, onClose, onSaved }) => {
  const { createMessage, updateMessage } = useAdminContacts();
  const isCreate = !message;
  const [values, setValues] = useState(() => initialValues(message));
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const inFlightRef = useRef(false);

  const set = (key) => (event) => {
    setValues((prev) => ({ ...prev, [key]: event.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inFlightRef.current) return;
    const found = validate(values);
    setErrors(found);
    setFormError(null);
    if (Object.keys(found).length > 0) return;

    const body = Object.fromEntries(
      FIELDS.map((key) => [
        key,
        key === "status" ? values.status : values[key].trim(),
      ]),
    );
    // Send only what changed so the audit log records the real edit.
    const changes = isCreate
      ? body
      : Object.fromEntries(
          Object.entries(body).filter(([key, value]) => value !== message[key]),
        );
    if (!isCreate && Object.keys(changes).length === 0) {
      onClose();
      return;
    }

    inFlightRef.current = true;
    setSubmitting(true);
    try {
      if (isCreate) await createMessage(changes);
      else await updateMessage(message.id, changes);
      toast.success(isCreate ? "Message added." : "Message updated.");
      onSaved();
      onClose();
    } catch (err) {
      const serverErrors = Object.fromEntries(
        Object.entries(err?.fieldErrors || {}).map(([key, messages]) => [
          key,
          [].concat(messages)[0],
        ]),
      );
      if (Object.keys(serverErrors).length > 0) setErrors(serverErrors);
      setFormError(
        describeRequestError(
          err,
          "Couldn't save this message. Please try again.",
        ),
      );
    } finally {
      inFlightRef.current = false;
      setSubmitting(false);
    }
  };

  const a11y = (key, id) => ({
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `${id}-error` : undefined,
  });

  return (
    <ProfileModal
      open
      onClose={onClose}
      dismissible={!submitting}
      size="lg"
      icon={isCreate ? MailPlus : Pencil}
      title={isCreate ? "New contact message" : "Edit contact message"}
      description={
        isCreate
          ? "Log a message you received by phone or email. No notification email is sent."
          : "Changes are saved to the inbox only; nothing is emailed to the sender."
      }
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
            type="submit"
            form="contact-message-form"
            disabled={submitting}
            className="h-10 rounded-xl bg-secondary px-4 text-sm font-semibold text-white transition hover:bg-secondary/90 disabled:opacity-60 cursor-pointer"
          >
            {submitting ? "Saving…" : isCreate ? "Add message" : "Save changes"}
          </button>
        </div>
      }
    >
      <form
        id="contact-message-form"
        onSubmit={handleSubmit}
        className="space-y-4"
        noValidate
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="contact-form-name" label="Name" error={errors.name}>
            <input
              id="contact-form-name"
              data-autofocus
              value={values.name}
              onChange={set("name")}
              maxLength={LIMITS.name}
              disabled={submitting}
              {...a11y("name", "contact-form-name")}
              className={`${inputClass} h-10 ${inputState(errors.name)}`}
            />
          </Field>
          <Field id="contact-form-email" label="Email" error={errors.email}>
            <input
              id="contact-form-email"
              type="email"
              value={values.email}
              onChange={set("email")}
              disabled={submitting}
              {...a11y("email", "contact-form-email")}
              className={`${inputClass} h-10 ${inputState(errors.email)}`}
            />
          </Field>
          <Field
            id="contact-form-subject"
            label="Subject"
            error={errors.subject}
          >
            <input
              id="contact-form-subject"
              value={values.subject}
              onChange={set("subject")}
              maxLength={LIMITS.subject}
              disabled={submitting}
              {...a11y("subject", "contact-form-subject")}
              className={`${inputClass} h-10 ${inputState(errors.subject)}`}
            />
          </Field>
          <Field id="contact-form-status" label="Status">
            <select
              id="contact-form-status"
              value={values.status}
              onChange={set("status")}
              disabled={submitting}
              className={`${inputClass} h-10 ${inputState(false)} cursor-pointer`}
            >
              {Object.entries(CONTACT_STATUS).map(([value, { label }]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field
          id="contact-form-message"
          label="Message"
          error={errors.message}
          hint={`${values.message.length}/${LIMITS.message}`}
        >
          <textarea
            id="contact-form-message"
            rows={6}
            value={values.message}
            onChange={set("message")}
            maxLength={LIMITS.message}
            disabled={submitting}
            {...a11y("message", "contact-form-message")}
            className={`${inputClass} min-h-[140px] resize-y py-2.5 ${inputState(errors.message)}`}
          />
        </Field>

        {formError && (
          <p
            role="alert"
            className="rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700"
          >
            {formError}
          </p>
        )}
      </form>
    </ProfileModal>
  );
};

export default ContactFormModal;
