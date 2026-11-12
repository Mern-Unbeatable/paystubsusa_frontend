import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, RefreshCw, Trash2 } from "lucide-react";
import {
  DashboardFilterToolbar,
  DashboardHeader,
  DashboardPagination,
  DashboardTable,
} from "../../../../Components/Dashboard";
import ConfirmModal from "../../../../Components/modal/ConfirmModal";
import { useUrlFilters } from "../../../../hooks/useUrlFilters";
import { describeRequestError } from "../../customer/Profile/utils/profileFormat";
import { useAdminContacts } from "./hooks/useAdminContacts";
import ContactStatusBadge from "./components/ContactStatusBadge";
import ContactMessageModal from "./components/ContactMessageModal";
import ContactFormModal from "./components/ContactFormModal";
import ContactRowActions from "./components/ContactRowActions";
import {
  CONTACT_STATUS_OPTIONS,
  formatReceived,
  nextStatus,
} from "./utils/contactFormat";

const SELECTS = [
  { key: "status", label: "Filter by status", options: CONTACT_STATUS_OPTIONS },
];
const URL_SELECTS = { status: CONTACT_STATUS_OPTIONS.map((o) => o.value) };

const AdminContactsView = () => {
  const {
    messages,
    meta,
    loading,
    error,
    loadMessages,
    setStatus,
    removeMessage,
  } = useAdminContacts();
  const {
    filters,
    setFilter,
    resetFilters: resetUrlFilters,
  } = useUrlFilters(URL_SELECTS);
  const [search, setSearch] = useState(filters.q);
  const [urlQ, setUrlQ] = useState(filters.q);
  // Back/forward or a pasted link changed `q`: show it in the box (the debounce then has nothing to do).
  if (urlQ !== filters.q) {
    setUrlQ(filters.q);
    if (search.trim() !== filters.q) setSearch(filters.q);
  }
  const [reloadKey, setReloadKey] = useState(0);
  // { type: "view" | "create" | "edit" | "delete", message }
  const [dialog, setDialog] = useState(null);
  const [savingId, setSavingId] = useState(null);

  const open = (type) => (message) => setDialog({ type, message });
  const closeDialog = () => setDialog(null);
  const target = dialog?.message;

  useEffect(() => {
    const trimmed = search.trim();
    if (trimmed === filters.q) return undefined;
    const timer = setTimeout(() => setFilter("q", trimmed), 300);
    return () => clearTimeout(timer);
  }, [search, filters.q, setFilter]);

  useEffect(() => {
    const request = loadMessages(filters);
    return () => request.abort();
  }, [filters, reloadKey, loadMessages]);

  // A link to a page past the end lands on the last real page.
  useEffect(() => {
    if (!loading && meta.totalPages > 0 && filters.page > meta.totalPages) {
      setFilter("page", meta.totalPages, { replace: true });
    }
  }, [loading, meta.totalPages, filters.page, setFilter]);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  const resetFilters = () => {
    setSearch("");
    resetUrlFilters();
  };

  const toggleStatus = async (m) => {
    if (savingId) return;
    setSavingId(m.id);
    try {
      const status = nextStatus(m);
      await setStatus(m.id, status);
      toast.success(
        status === "handled" ? "Marked as handled." : "Marked as new.",
      );
    } catch (err) {
      toast.error(describeRequestError(err, "Couldn't update this message."));
    } finally {
      setSavingId(null);
    }
  };

  const deleteMessage = async () => {
    await removeMessage(target.id);
    toast.success("Message deleted.");
    reload();
  };

  const actions = (m) => (
    <ContactRowActions
      message={m}
      busy={Boolean(savingId)}
      onView={open("view")}
      onEdit={open("edit")}
      onToggle={toggleStatus}
      onDelete={open("delete")}
    />
  );

  const sender = (m) => (
    <div className="max-w-[16rem]">
      <p
        className={`truncate text-slate-800 ${m.status === "new" ? "font-bold" : "font-semibold"}`}
      >
        {m.name}
      </p>
      <p className="truncate text-xs text-slate-400">{m.email}</p>
    </div>
  );

  const subject = (m) => (
    <div className="max-w-[22rem]">
      <p className="truncate font-medium text-slate-700">{m.subject}</p>
      <p className="truncate text-xs text-slate-400">{m.message}</p>
    </div>
  );

  const columns = [
    { header: "From", render: sender },
    { header: "Subject", render: subject },
    {
      header: "Status",
      render: (m) => <ContactStatusBadge status={m.status} />,
    },
    {
      header: "Received",
      render: (m) => formatReceived(m.createdAt),
      cellClassName: "whitespace-nowrap text-slate-500",
    },
    { header: "Actions", align: "right", render: actions },
  ];

  const renderMobileRow = (m) => (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-3">
        {sender(m)}
        <ContactStatusBadge status={m.status} />
      </div>
      <p className="truncate text-sm font-medium text-slate-700">{m.subject}</p>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-slate-400">{formatReceived(m.createdAt)}</p>
        {actions(m)}
      </div>
    </div>
  );

  const hasQuery = Boolean(filters.q || filters.status);

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Contacts"
        description="Messages sent through the contact form and Help Center."
        badge={
          !loading && (
            <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-bold text-secondary">
              {meta.totalItems}
            </span>
          )
        }
        action={
          <div className="flex gap-2">
            <button
              type="button"
              onClick={reload}
              disabled={loading}
              aria-label="Refresh messages"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60 cursor-pointer"
            >
              <RefreshCw
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              type="button"
              onClick={() => setDialog({ type: "create", message: null })}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-secondary px-4 text-sm font-semibold text-white transition hover:bg-secondary/90 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              New message
            </button>
          </div>
        }
      />

      {error && (
        <div
          role="alert"
          className="flex flex-col gap-2 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>
            {describeRequestError(error, "Couldn't load contact messages.")}
          </span>
          <button
            type="button"
            onClick={reload}
            className="font-semibold underline cursor-pointer"
          >
            Try again
          </button>
        </div>
      )}

      <DashboardTable
        title="All messages"
        minWidth="min-w-[900px]"
        toolbar={
          <DashboardFilterToolbar
            search={search}
            onSearchChange={setSearch}
            filters={filters}
            onFilterChange={setFilter}
            onReset={resetFilters}
            searchPlaceholder="Search by name, email or subject"
            selects={SELECTS}
          />
        }
        columns={columns}
        data={error ? [] : messages}
        loading={loading}
        renderMobileRow={renderMobileRow}
        emptyMessage={
          hasQuery
            ? "No messages match your search or filters."
            : "No contact messages yet."
        }
        footer={
          !error && (
            <DashboardPagination
              page={meta.page}
              pageSize={meta.pageSize}
              totalItems={meta.totalItems}
              totalPages={meta.totalPages}
              onPageChange={(page) => setFilter("page", page)}
              onPageSizeChange={(size) => setFilter("pageSize", size)}
              disabled={loading}
            />
          )
        }
      />

      {dialog?.type === "view" && (
        <ContactMessageModal
          key={target.id}
          message={target}
          onClose={closeDialog}
          onEdit={open("edit")}
        />
      )}

      {(dialog?.type === "create" || dialog?.type === "edit") && (
        <ContactFormModal
          key={target?.id ?? "new"}
          message={target}
          onClose={closeDialog}
          onSaved={reload}
        />
      )}

      <ConfirmModal
        key={`delete-${target?.id}`}
        open={dialog?.type === "delete"}
        onClose={closeDialog}
        onConfirm={deleteMessage}
        icon={Trash2}
        tone="danger"
        title="Delete message"
        confirmLabel="Delete permanently"
        pendingLabel="Deleting…"
        errorFallback="Couldn't delete this message. Please try again."
      >
        <p className="text-sm leading-relaxed text-slate-600">
          The message from{" "}
          <span className="font-semibold text-slate-800">{target?.name}</span>
          {target?.subject && (
            <>
              {" "}
              about{" "}
              <span className="font-semibold text-slate-800">
                “{target.subject}”
              </span>
            </>
          )}{" "}
          will be removed permanently. This can&apos;t be undone.
        </p>
      </ConfirmModal>
    </div>
  );
};

export default AdminContactsView;
