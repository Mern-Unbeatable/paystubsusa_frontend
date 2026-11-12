import React, { useRef, useState } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FileSearch,
  Send,
  Tag,
} from "lucide-react";
import { selectAuthUser } from "../../../features/auth/authSelectors";
import { sendContactMessage } from "../../../features/support/supportThunks";
import { getErrorMessage } from "../../../api/errorNormalizer";
import { PATHS } from "../../../config/paths";

// Mirrors the API limits for contact messages.
const LIMITS = { name: 100, subject: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HELP_LINKS = [
  {
    icon: FileSearch,
    title: "Find your paystubs",
    description: "Look up documents you already bought using your email.",
    to: PATHS.PUBLIC.findPaystubs,
  },
  {
    icon: Tag,
    title: "Pricing",
    description: "One-time packages and the unlimited plan.",
    to: PATHS.PUBLIC.pricing,
  },
];

const inputClass = (error) =>
  `w-full rounded-lg border bg-white px-4 py-2.5 text-[14px] text-slate-800 transition focus:outline-none focus:ring-2 disabled:bg-slate-50 ${
    error
      ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
      : "border-slate-200 focus:border-[#009BFB] focus:ring-[#009BFB]/20"
  }`;

const Field = ({ id, label, error, children }) => (
  <div>
    <label
      htmlFor={id}
      className="mb-1.5 block text-[13px] font-semibold text-slate-700"
    >
      {label}
    </label>
    {children}
    {error && (
      <p id={`${id}-error`} className="mt-1 text-[12px] text-rose-600">
        {error}
      </p>
    )}
  </div>
);

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(form.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (!form.subject.trim()) errors.subject = "Please add a subject.";
  if (!form.message.trim()) errors.message = "Please write your message.";
  return errors;
}

const ContactView = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const [form, setForm] = useState(() => ({
    name: user?.name ?? "",
    email: user?.email ?? "",
    subject: "",
    message: "",
    website: "",
  }));
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState(null);
  const [sending, setSending] = useState(false);
  const [sentTo, setSentTo] = useState(null);
  const inFlightRef = useRef(false);

  const update = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    setGeneralError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inFlightRef.current) return;
    const found = validate(form);
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }
    inFlightRef.current = true;
    setSending(true);
    setGeneralError(null);
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
      ...(form.website && { website: form.website }),
    };
    try {
      await dispatch(sendContactMessage(payload)).unwrap();
      setSentTo(payload.email);
      setForm((prev) => ({ ...prev, subject: "", message: "", website: "" }));
    } catch (err) {
      const fieldErrors = err?.fieldErrors || {};
      const mapped = Object.fromEntries(
        ["name", "email", "subject", "message"]
          .filter((key) => fieldErrors[key]?.[0])
          .map((key) => [key, fieldErrors[key][0]]),
      );
      if (Object.keys(mapped).length) setErrors(mapped);
      else
        setGeneralError(
          getErrorMessage(
            err,
            "We couldn't send your message. Please try again.",
          ),
        );
    } finally {
      inFlightRef.current = false;
      setSending(false);
    }
  };

  const describedBy = (field) =>
    errors[field] ? `contact-${field}-error` : undefined;

  return (
    <div className="min-h-screen bg-[#FBFBFA] py-16 sm:py-24">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
        <div className="max-w-2xl space-y-4 mb-12">
          <span className="text-xs font-bold text-[#009BFB] tracking-widest uppercase block">
            Contact us
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            How can we{" "}
            <span className="text-[#009BFB] italic font-semibold">help?</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Questions about a document, an order, or your account? Send us a
            message and our team will reply by email.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-[0_15px_45px_rgba(0,0,0,0.06)] p-6 sm:p-8">
            {sentTo ? (
              <div className="text-center py-10 space-y-4" role="status">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Message sent
                </h2>
                <p className="text-slate-600 text-[14px] max-w-sm mx-auto">
                  Thanks for reaching out. We&apos;ll reply to{" "}
                  <span className="font-semibold text-slate-800">{sentTo}</span>
                  , usually within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => setSentTo(null)}
                  className="text-[14px] font-semibold text-[#009BFB] hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <h2 className="text-xl font-bold text-slate-900">
                  Send us a message
                </h2>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="contact-name" label="Name" error={errors.name}>
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={update("name")}
                      maxLength={LIMITS.name}
                      disabled={sending}
                      placeholder="Your name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={describedBy("name")}
                      className={inputClass(errors.name)}
                    />
                  </Field>
                  <Field id="contact-email" label="Email" error={errors.email}>
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={update("email")}
                      disabled={sending}
                      placeholder="you@example.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={describedBy("email")}
                      className={inputClass(errors.email)}
                    />
                  </Field>
                </div>

                <Field
                  id="contact-subject"
                  label="Subject"
                  error={errors.subject}
                >
                  <input
                    id="contact-subject"
                    type="text"
                    value={form.subject}
                    onChange={update("subject")}
                    maxLength={LIMITS.subject}
                    disabled={sending}
                    placeholder="e.g. Question about my order"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={describedBy("subject")}
                    className={inputClass(errors.subject)}
                  />
                </Field>

                <Field
                  id="contact-message"
                  label="Message"
                  error={errors.message}
                >
                  <textarea
                    id="contact-message"
                    rows={6}
                    value={form.message}
                    onChange={update("message")}
                    maxLength={LIMITS.message}
                    disabled={sending}
                    placeholder="Tell us what you need help with. Include an order number if you have one."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={describedBy("message")}
                    className={`${inputClass(errors.message)} resize-y min-h-[140px]`}
                  />
                  <p className="mt-1 text-right text-[11px] text-slate-400">
                    {form.message.length}/{LIMITS.message}
                  </p>
                </Field>

                {/* Honeypot: hidden from people, bots tend to fill it. */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={update("website")}
                  />
                </div>

                {generalError && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 rounded-lg bg-rose-50 px-3 py-2.5 text-[13px] text-rose-700 ring-1 ring-rose-200"
                  >
                    <AlertCircle
                      className="mt-0.5 h-4 w-4 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span>{generalError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded bg-slate-900 hover:bg-[#009BFB] text-white font-semibold text-sm transition-colors shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {sending ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>

          <aside className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl bg-white border border-slate-200/80 p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#009BFB] flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-[15px]">
                  Response time
                </h3>
                <p className="text-slate-600 text-[14px] mt-1">
                  We usually reply within one business day. Including your order
                  number helps us answer faster.
                </p>
              </div>
            </div>

            {HELP_LINKS.map(({ icon, title, description, to }) => {
              const Icon = icon;
              return (
                <Link
                  key={to}
                  to={to}
                  className="rounded-2xl bg-white border border-slate-200/80 p-6 flex items-start gap-4 hover:border-[#009BFB]/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-700 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-[15px]">
                      {title}
                    </h3>
                    <p className="text-slate-600 text-[14px] mt-1">
                      {description}
                    </p>
                  </div>
                </Link>
              );
            })}

            {!user && (
              <p className="text-[13px] text-slate-500 px-1">
                Have an account?{" "}
                <Link
                  to={PATHS.AUTH.login}
                  className="font-semibold text-[#009BFB] hover:underline"
                >
                  Sign in
                </Link>{" "}
                to see your orders and documents.
              </p>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ContactView;
