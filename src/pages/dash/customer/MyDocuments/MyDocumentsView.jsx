import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { FileText, FilePlus, Search, ChevronDown } from "lucide-react";
import {
  DashboardHeader,
  DashboardPagination,
  DashboardTable,
} from "../../../../Components/Dashboard";
import { DashboardStatusBadge } from "../../../../layouts";
import { useUrlFilters } from "../../../../hooks/useUrlFilters";
import { describeRequestError } from "../Profile/utils/profileFormat";
import { DOCUMENT_TYPE_LABELS, formatDateTime } from "../../admin/orders/utils/orderFormat";
import DocumentActionButtons from "../CustomerOverview/components/DocumentActionButtons";
import DownloadToast from "../CustomerOverview/components/DownloadToast";
import RecentDocumentModal from "../CustomerOverview/components/RecentDocumentModal";
import { documentStatusLabel } from "../CustomerOverview/utils/overviewFormat";
import { useMyDocuments } from "./hooks/useMyDocuments";

const CATEGORIES = [
  { value: "", label: "All Documents" },
  { value: "paystub", label: "Paystubs" },
  { value: "w2", label: "W-2" },
  { value: "nec1099", label: "1099-NEC" },
  { value: "direct_deposit", label: "Direct Deposit Slip" },
];

const SORT_OPTIONS = [
  { value: "-createdAt", label: "Newest first" },
  { value: "createdAt", label: "Oldest first" },
  { value: "title", label: "Name (A-Z)" },
  { value: "-title", label: "Name (Z-A)" },
];

const URL_SELECTS = {
  type: CATEGORIES.map((c) => c.value),
  sort: SORT_OPTIONS.map((o) => o.value),
};

const TOAST_DURATION_MS = 3000;

const MyDocumentsView = () => {
  const { documents, meta, loading, error, loadDocuments, getDownloadUrl } = useMyDocuments();
  const { filters, setFilter } = useUrlFilters(URL_SELECTS);
  const [search, setSearch] = useState(filters.q);
  const [urlQ, setUrlQ] = useState(filters.q);
  // Back/forward or a pasted link changed `q`: show it in the box (the debounce then has nothing to do).
  if (urlQ !== filters.q) {
    setUrlQ(filters.q);
    if (search.trim() !== filters.q) setSearch(filters.q);
  }
  const [reloadKey, setReloadKey] = useState(0);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

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

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const showToast = useCallback((message, tone = "success") => {
    clearTimeout(toastTimer.current);
    setToast({ message, tone });
    toastTimer.current = setTimeout(() => setToast(null), TOAST_DURATION_MS);
  }, []);

  const handleDownload = useCallback(
    async (doc) => {
      if (doc.status !== "ready" || downloadingId) return;
      setDownloadingId(doc.id);
      try {
        const url = await getDownloadUrl(doc.id);
        if (!url) throw new Error();
        showToast(`Downloading ${doc.title}...`);
        window.location.assign(url);
      } catch (err) {
        showToast(describeRequestError(err, "Could not download this document. Please try again."), "error");
      } finally {
        setDownloadingId(null);
      }
    },
    [downloadingId, getDownloadUrl, showToast],
  );

  const columns = useMemo(
    () => [
      {
        header: "Document Name",
        render: (doc) => (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#EBF5FF] text-[#009BFB] flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-slate-900 text-xs truncate max-w-[18rem]">{doc.title}</div>
              <div className="text-[10.5px] text-slate-400 font-mono">{doc.documentNumber}</div>
            </div>
          </div>
        ),
      },
      {
        header: "Document Type",
        render: (doc) => DOCUMENT_TYPE_LABELS[doc.type] ?? doc.type,
        cellClassName: "text-slate-600 font-medium",
      },
      {
        header: "Created Date",
        render: (doc) => formatDateTime(doc.createdAt),
        cellClassName: "text-slate-500 font-medium whitespace-nowrap",
      },
      {
        header: "Status",
        render: (doc) => <DashboardStatusBadge status={documentStatusLabel(doc.status)} />,
      },
      {
        header: "Action",
        align: "right",
        render: (doc) => (
          <DocumentActionButtons
            doc={doc}
            onView={setSelectedDoc}
            onDownload={handleDownload}
            canDownload={doc.status === "ready" && downloadingId !== doc.id}
          />
        ),
      },
    ],
    [handleDownload, downloadingId],
  );

  const renderMobileRow = (doc) => (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0 space-y-1">
        <p className="font-bold text-slate-900 text-sm truncate">{doc.title}</p>
        <p className="text-[11px] text-slate-400 font-mono">{doc.documentNumber}</p>
        <p className="text-xs text-slate-500">
          {DOCUMENT_TYPE_LABELS[doc.type] ?? doc.type} · {formatDateTime(doc.createdAt)}
        </p>
        <DashboardStatusBadge status={documentStatusLabel(doc.status)} />
      </div>
      <DocumentActionButtons
        doc={doc}
        onView={setSelectedDoc}
        onDownload={handleDownload}
        canDownload={doc.status === "ready" && downloadingId !== doc.id}
      />
    </div>
  );

  const hasQuery = Boolean(filters.q || filters.type);

  return (
    <div className="space-y-6">
      <DownloadToast message={toast?.message} tone={toast?.tone} />

      <DashboardHeader
        title="My Documents"
        description="View and download your previously generated documents."
        action={
          <Link
            to="/paystub-generator"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-xs sm:text-sm transition shadow-xs hover:shadow active:scale-98 cursor-pointer"
          >
            <FilePlus className="w-4 h-4" />
            <span>Generate Paystub</span>
          </Link>
        }
      />

      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = filters.type === cat.value;
            return (
              <button
                key={cat.value || "all"}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFilter("type", cat.value)}
                className={`px-3.5 py-1.5 rounded text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? "bg-[#009BFB] text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={search}
              maxLength={100}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, document number, employer or employee..."
              aria-label="Search documents"
              className="w-full pl-9 pr-4 py-2 rounded border border-slate-200/80 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#009BFB]/20 focus:border-[#009BFB] transition bg-white"
            />
          </div>

          <div className="relative self-end sm:self-auto">
            <select
              value={filters.sort}
              onChange={(e) => setFilter("sort", e.target.value)}
              aria-label="Sort documents"
              className="appearance-none pl-3.5 pr-8 py-2 rounded border border-slate-200/80 text-xs font-medium text-slate-600 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#009BFB]/20 cursor-pointer"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {error && (
        <div className="flex flex-col gap-2 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700 sm:flex-row sm:items-center sm:justify-between">
          <span>{describeRequestError(error, "Could not load your documents.")}</span>
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            className="font-semibold underline cursor-pointer self-start sm:self-auto"
          >
            Try again
          </button>
        </div>
      )}

      <DashboardTable
        title="All Documents"
        minWidth="min-w-[700px]"
        columns={columns}
        data={error ? [] : documents}
        loading={loading}
        renderMobileRow={renderMobileRow}
        emptyMessage={
          hasQuery ? "No documents match your search or category filter." : "No documents yet. Generate your first paystub to see it here."
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

      <RecentDocumentModal
        doc={selectedDoc}
        downloading={downloadingId === selectedDoc?.id}
        onClose={() => setSelectedDoc(null)}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default MyDocumentsView;
