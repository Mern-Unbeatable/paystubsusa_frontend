import React, { useCallback, useEffect, useState } from "react";
import { Download, FileText, RefreshCw } from "lucide-react";
import {
  DashboardFilterToolbar,
  DashboardHeader,
  DashboardPagination,
  DashboardTable,
} from "../../../../Components/Dashboard";
import { useUrlFilters } from "../../../../hooks/useUrlFilters";
import { describeRequestError } from "../../customer/Profile/utils/profileFormat";
import { formatDateTime } from "../orders/utils/orderFormat";
import { useAdminDocuments } from "./hooks/useAdminDocuments";
import DocumentStatusBadge from "./components/DocumentStatusBadge";
import DocumentDetailsModal from "./components/DocumentDetailsModal";
import {
  DOCUMENT_SORT_OPTIONS,
  DOCUMENT_STATUS_OPTIONS,
  DOCUMENT_TYPE_FILTER_OPTIONS,
  DOCUMENT_TYPE_LABELS,
} from "./utils/documentFormat";

const SELECTS = [
  { key: "status", label: "Filter by status", options: DOCUMENT_STATUS_OPTIONS },
  { key: "type", label: "Filter by document type", options: DOCUMENT_TYPE_FILTER_OPTIONS },
  { key: "sort", label: "Sort documents", options: DOCUMENT_SORT_OPTIONS },
];
const URL_SELECTS = Object.fromEntries(SELECTS.map(({ key, options }) => [key, options.map((o) => o.value)]));

const AdminDocumentsView = () => {
  const { documents, meta, loading, error, loadDocuments, downloadDocument } = useAdminDocuments();
  const { filters, setFilter, resetFilters: resetUrlFilters } = useUrlFilters(URL_SELECTS);
  const [search, setSearch] = useState(filters.q);
  const [urlQ, setUrlQ] = useState(filters.q);
  // Back/forward or a pasted link changed `q`: show it in the box (the debounce then has nothing to do).
  if (urlQ !== filters.q) {
    setUrlQ(filters.q);
    if (search.trim() !== filters.q) setSearch(filters.q);
  }
  const [reloadKey, setReloadKey] = useState(0);
  const [viewing, setViewing] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    const trimmed = search.trim();
    if (trimmed === filters.q) return undefined;
    const timer = setTimeout(() => setFilter("q", trimmed), 300);
    return () => clearTimeout(timer);
  }, [search, filters.q, setFilter]);

  useEffect(() => {
    const request = loadDocuments(filters);
    return () => request.abort();
  }, [filters, reloadKey, loadDocuments]);

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

  const handleDownload = async (doc) => {
    setDownloadingId(doc.id);
    await downloadDocument(doc);
    setDownloadingId(null);
  };

  const actions = (doc) => (
    <div className="inline-flex items-center gap-2">
      {doc.status === "ready" && (
        <button
          type="button"
          onClick={() => handleDownload(doc)}
          disabled={downloadingId === doc.id}
          aria-label={`Download ${doc.documentNumber}`}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-secondary hover:text-secondary disabled:opacity-50 cursor-pointer"
        >
          <Download className="h-4 w-4" />
        </button>
      )}
      <button
        type="button"
        onClick={() => setViewing(doc)}
        className="rounded-lg bg-secondary/10 px-3.5 py-1.5 text-sm font-semibold text-secondary transition hover:bg-secondary/15 cursor-pointer"
      >
        View
      </button>
    </div>
  );

  const name = (doc) => (
    <div className="flex items-center gap-3">
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
        <FileText className="h-4 w-4" />
      </span>
      <div className="min-w-0 max-w-[16rem]">
        <p className="truncate font-semibold text-slate-800">{doc.title}</p>
        <p className="font-mono text-[11px] text-slate-400">{doc.documentNumber}</p>
      </div>
    </div>
  );

  const columns = [
    { header: "Document", render: name },
    { header: "Customer", render: (doc) => <span className="block max-w-[14rem] truncate">{doc.email || "—"}</span> },
    {
      header: "Type",
      render: (doc) => DOCUMENT_TYPE_LABELS[doc.type] ?? doc.type,
      cellClassName: "whitespace-nowrap text-slate-600",
    },
    {
      header: "Order",
      render: (doc) => doc.orderNumber,
      cellClassName: "whitespace-nowrap font-medium text-slate-700",
    },
    {
      header: "Date",
      render: (doc) => formatDateTime(doc.createdAt),
      cellClassName: "whitespace-nowrap text-slate-500",
    },
    { header: "Status", render: (doc) => <DocumentStatusBadge status={doc.status} /> },
    { header: "Action", align: "right", render: actions },
  ];

  const renderMobileRow = (doc) => (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0 space-y-1.5">
        {name(doc)}
        <p className="truncate text-sm text-slate-500">{doc.email}</p>
        <div className="flex flex-wrap items-center gap-2">
          <DocumentStatusBadge status={doc.status} />
          <span className="text-xs text-slate-500">{DOCUMENT_TYPE_LABELS[doc.type] ?? doc.type}</span>
        </div>
        <p className="text-xs text-slate-400">
          {doc.orderNumber} · {formatDateTime(doc.createdAt)}
        </p>
      </div>
      {actions(doc)}
    </div>
  );

  const hasQuery = Boolean(filters.q || filters.status || filters.type);

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Documents"
        description="View and manage all platform documents."
        badge={
          !loading && (
            <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-bold text-secondary">
              {meta.totalItems}
            </span>
          )
        }
        action={
          <button
            type="button"
            onClick={reload}
            disabled={loading}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60 cursor-pointer"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        }
      />

      {error && (
        <div
          role="alert"
          className="flex flex-col gap-2 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>{describeRequestError(error, "Couldn't load documents.")}</span>
          <button type="button" onClick={reload} className="font-semibold underline cursor-pointer">
            Try again
          </button>
        </div>
      )}

      <DashboardTable
        title="All platform documents"
        minWidth="min-w-[980px]"
        toolbar={
          <DashboardFilterToolbar
            search={search}
            onSearchChange={setSearch}
            filters={filters}
            onFilterChange={setFilter}
            onReset={resetFilters}
            searchPlaceholder="Search by title, number, employer or employee"
            selects={SELECTS}
          />
        }
        columns={columns}
        data={error ? [] : documents}
        loading={loading}
        renderMobileRow={renderMobileRow}
        emptyMessage={hasQuery ? "No documents match your search or filters." : "No documents yet."}
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

      <DocumentDetailsModal key={viewing?.id ?? "none"} document={viewing} onClose={() => setViewing(null)} />
    </div>
  );
};

export default AdminDocumentsView;
