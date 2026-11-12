import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Reply, Send } from "lucide-react";
import ProfileModal from "../../../../../Components/modal/ProfileModal";
import { describeRequestError } from "../../../customer/Profile/utils/profileFormat";
import { useAdminContacts } from "../hooks/useAdminContacts";
import { formatReceived } from "../utils/contactFormat";

// Mirrors the API limit for replies.
const REPLY_MAX = 5000;

/** Writes a reply that the server emails to the sender; the message is then marked handled. */
const ContactReplyModal = ({ message, onClose }) => {
  const { replyMessage } = useAdminContacts();
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const inFlightRef = useRef(false);
  // One key per dialog: a retry after a network error can't send the email twice.
  const idempotencyKeyRef = useRef(crypto.randomUUID());

  const reply = text.trim();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inFlightRef.current) return;
    if (!reply) {
      setError("Write a reply before sending.");
      return;
    }
    inFlightRef.current = true;
    setSending(true);
    setError(null);
    try {
      await replyMessage(message.id, reply, idempotencyKeyRef.current);
      toast.success(`Reply sent to ${message.email}.`);
      onClose();
    } catch (err) {
      setError(
        describeRequestError(
          err,
          "Couldn't send this reply. Please try again.",
        ),
      );
    } finally {
      inFlightRef.current = false;
      setSending(false);
    }
  };

  return (
    <ProfileModal
      open
      onClose={onClose}
      dismissible={!sending}
      size="lg"
      icon={Reply}
      title={`Reply to ${message.name}`}
      description={`Sent by email to ${message.email}. The message is marked handled.`}
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={sending}
            className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="contact-reply-form"
            disabled={sending || !reply}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-secondary px-4 text-sm font-semibold text-white transition hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {sending ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {sending ? "Sending…" : "Send reply"}
          </button>
        </div>
      }
    >
      <form
        id="contact-reply-form"
        onSubmit={handleSubmit}
        noValidate
        className="space-y-4"
      >
        <div className="rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-sm font-semibold text-slate-800">
              {message.subject}
            </p>
            <p className="text-xs text-slate-400">
              {formatReceived(message.createdAt)}
            </p>
          </div>
          <p className="mt-2 max-h-32 overflow-y-auto whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-600">
            {message.message}
          </p>
        </div>

        <div>
          <label
            htmlFor="contact-reply-text"
            className="text-sm font-semibold text-slate-700"
          >
            Your reply
          </label>
          <textarea
            id="contact-reply-text"
            data-autofocus
            rows={7}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError(null);
            }}
            maxLength={REPLY_MAX}
            disabled={sending}
            placeholder={`Hi ${message.name.trim().split(/\s+/)[0] || message.name}, …`}
            className="mt-1.5 min-h-[160px] w-full resize-y rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 transition focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 disabled:bg-slate-50"
          />
          <div className="mt-1 flex justify-between gap-2 text-xs text-slate-400">
            <span>Subject: Re: {message.subject}</span>
            <span>
              {text.length}/{REPLY_MAX}
            </span>
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700"
          >
            {error}
          </p>
        )}
      </form>
    </ProfileModal>
  );
};

export default ContactReplyModal;
