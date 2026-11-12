import React, { useEffect, useState } from "react";
import {
  Building2,
  CalendarDays,
  CircleDot,
  Download,
  FileText,
  Hash,
  Mail,
  Receipt,
  RefreshCw,
  UserRound,
  Wallet,
} from "lucide-react";
import ProfileModal from "../../../../../Components/modal/ProfileModal";
import { describeRequestError } from "../../../customer/Profile/utils/profileFormat";
import { formatCents } from "../../users/utils/userFormat";
import { formatDateTime } from "../../orders/utils/orderFormat";
import { useAdminDocuments } from "../hooks/useAdminDocuments";
import { DOCUMENT_TYPE_LABELS, canRegenerate } from "../utils/documentFormat";
import DocumentStatusBadge from "./DocumentStatusBadge";

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

/** `document` is the list row (shown immediately); the API adds order, render and download info. */
const DocumentDetailsModal = ({ document: row, onClose }) => {
  const { details: loaded, loadDocumentDetails, downloadDocument, regenerateDocument } = useAdminDocuments();
  const [attempt, setAttempt] = useState(0);
  const [busy, setBusy] = useState(null);
  const documentId = row?.id;

  useEffect(() => {
    if (!documentId) return undefined;
    const request = loadDocumentDetails(documentId);
    return () => request.abort();
  }, [documentId, attempt, loadDocumentDetails]);

  const current = loaded.id === documentId ? loaded : { document: null, error: null };
  const error = current.error && describeRequestError(current.error, "Couldn't load this document.");
  const record = current.document || row;

  const run = async (kind, action) => {
    setBusy(kind);
    await action(record);
    setBusy(null);
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
      {canRegenerate(record) && (
        <button
          type="button"
          onClick={() => run("regenerate", regenerateDocument)}
          disabled={Boolean(busy)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-secondary/30 bg-white px-4 text-sm font-semibold text-secondary transition hover:bg-secondary/5 disabled:opacity-60 cursor-pointer"
        >
          <RefreshCw className={`h-4 w-4 ${busy === "regenerate" ? "animate-spin" : ""}`} />
          Regenerate
        </button>
      )}
      {record.status === "ready" && (
        <button
          type="button"
          onClick={() => run("download", downloadDocument)}
          disabled={Boolean(busy)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-secondary px-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60 cursor-pointer"
        >
          <Download className="h-4 w-4" />
          {busy === "download" ? "Preparing…" : "Download PDF"}
        </button>
      )}
    </div>
  );

  return (
    <ProfileModal
      open={Boolean(row)}
      onClose={onClose}
      title="Document details"
      description={record?.documentNumber}
      icon={FileText}
      size="lg"
      footer={footer}
    >
      {record && (
        <div className="space-y-4">
          <dl className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <Field label="Title" icon={FileText}>
              {record.title}
            </Field>
            <Field label="Status" icon={CircleDot}>
              <DocumentStatusBadge status={record.status} />
            </Field>
            <Field label="Type" icon={FileText}>
              {DOCUMENT_TYPE_LABELS[record.type] ?? record.type}
            </Field>
            <Field label="Amount" icon={Wallet}>
              {record.amountCents == null ? "—" : formatCents(record.amountCents)}
            </Field>
            <Field label="Employer" icon={Building2}>
              {record.employerName || "—"}
            </Field>
            <Field label="Employee / recipient" icon={UserRound}>
              {record.recipientName || "—"}
            </Field>
            <Field label="Order" icon={Receipt}>
              {record.orderNumber || "—"}
            </Field>
            <Field label="Customer email" icon={Mail}>
              {record.email || "—"}
            </Field>
            <Field label="Created" icon={CalendarDays}>
              {formatDateTime(record.createdAt)}
            </Field>
            <Field label="Rendered" icon={CalendarDays}>
              {formatDateTime(record.renderedAt)}
            </Field>
            <Field label="Downloads" icon={Download}>
              {record.downloadCount ?? "—"}
            </Field>
            <Field label="Form data" icon={Hash}>
              {!current.document ? "—" : record.purgedAt ? `Purged ${formatDateTime(record.purgedAt)}` : "Stored"}
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

export default DocumentDetailsModal;
