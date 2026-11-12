import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  CalendarDays,
  CheckCircle2,
  CircleDot,
  Mail,
  MailOpen,
  Reply,
  RotateCcw,
  UserRound,
} from "lucide-react";
import ProfileModal from "../../../../../Components/modal/ProfileModal";
import { describeRequestError } from "../../../customer/Profile/utils/profileFormat";
import { useAdminContacts } from "../hooks/useAdminContacts";
import { formatReceived, nextStatus } from "../utils/contactFormat";
import ContactStatusBadge from "./ContactStatusBadge";

const Field = ({ label, icon, children }) => {
  const Icon = icon;
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-3.5 py-2.5">
      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-secondary ring-1 ring-slate-100">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <dt className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">
          {label}
        </dt>
        <dd className="mt-1 truncate text-sm font-semibold text-slate-800">
          {children}
        </dd>
      </div>
    </div>
  );
};

/** `message` is the list row; status changes update the row in the store, so read it back from there. */
const ContactMessageModal = ({ message, onClose, onReply }) => {
  const { messages, setStatus } = useAdminContacts();
  const [saving, setSaving] = useState(false);
  const record = messages.find((m) => m.id === message?.id) ?? message;

  const toggleStatus = async () => {
    if (saving || !record) return;
    setSaving(true);
    try {
      const status = nextStatus(record);
      await setStatus(record.id, status);
      toast.success(
        status === "handled" ? "Marked as handled." : "Marked as new.",
      );
    } catch (err) {
      toast.error(describeRequestError(err, "Couldn't update this message."));
    } finally {
      setSaving(false);
    }
  };

  const footer = record && (
    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onClose}
        className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 cursor-pointer"
      >
        Close
      </button>
      <button
        type="button"
        onClick={toggleStatus}
        disabled={saving}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60 cursor-pointer"
      >
        {record.status === "new" ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          <RotateCcw className="h-4 w-4" />
        )}
        {record.status === "new" ? "Mark as handled" : "Mark as new"}
      </button>
      <button
        type="button"
        onClick={() => onReply(record)}
        disabled={saving}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-secondary px-4 text-sm font-semibold text-white transition hover:bg-[#0089e0] disabled:opacity-60 cursor-pointer"
      >
        <Reply className="h-4 w-4" />
        Reply
      </button>
    </div>
  );

  return (
    <ProfileModal
      open={Boolean(message)}
      onClose={onClose}
      dismissible={!saving}
      title="Contact message"
      description={record?.subject}
      icon={MailOpen}
      size="lg"
      footer={footer}
    >
      {record && (
        <div className="space-y-4">
          <dl className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <Field label="From" icon={UserRound}>
              {record.name}
            </Field>
            <Field label="Email" icon={Mail}>
              {record.email}
            </Field>
            <Field label="Received" icon={CalendarDays}>
              {formatReceived(record.createdAt)}
            </Field>
            <Field label="Status" icon={CircleDot}>
              <ContactStatusBadge status={record.status} />
            </Field>
          </dl>

          <div>
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">
              Message
            </p>
            <div className="max-h-[45vh] overflow-y-auto whitespace-pre-wrap break-words rounded-xl border-l-4 border-secondary bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-700">
              {record.message}
            </div>
          </div>
        </div>
      )}
    </ProfileModal>
  );
};

export default ContactMessageModal;
