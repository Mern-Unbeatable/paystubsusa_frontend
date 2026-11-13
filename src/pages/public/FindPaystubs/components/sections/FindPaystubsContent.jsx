import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { Search, ChevronDown, Eye, Download, FileText, Plus } from "lucide-react";
import paginationConfig from "../../../data/findPaystubs/pagination.json";
import sortOptions from "../../../data/findPaystubs/sortOptions.json";
import tabs from "../../../data/findPaystubs/tabs.json";
import { useAuth } from "../../../../auth/hooks/useAuth";
import { getErrorMessage } from "../../../../../api/errorNormalizer";
import { DOCUMENT_TYPE_LABELS, formatDateTime } from "../../../../dash/admin/orders/utils/orderFormat";
import { useDocumentAccess } from "../../hooks/useDocumentAccess";
import { useDocumentHistory } from "../../hooks/useDocumentHistory";
import DocumentAccessForm from "../common/DocumentAccessForm";
import DocumentPreviewModal from "../common/DocumentPreviewModal";
import DocumentStatusPill from "../common/DocumentStatusPill";

const SEARCH_DEBOUNCE_MS = 300;

const FindPaystubsContent = () => {
  const { isAuthenticated } = useAuth();
  const access = useDocumentAccess();
  const guestToken = access.session?.guestToken ?? null;
  // Signed-in customers see their own documents; guests after verifying their email.
  const canList = isAuthenticated || Boolean(guestToken);

  const { reset: resetAccess } = access;
  const handleSessionExpired = useCallback(() => {
    resetAccess();
    toast.error("Your verification expired. Please verify your email again.");
  }, [resetAccess]);

  const history = useDocumentHistory({
    enabled: canList,
    guestToken,
    pageSize: paginationConfig.itemsPerPage,
    onSessionExpired: handleSessionExpired,
  });
  const { filters, setFilter, documents, meta, loading, error } = history;

  const [search, setSearch] = useState("");
  const [previewDoc, setPreviewDoc] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    const trimmed = search.trim();
    if (trimmed === filters.q) return undefined;
    const timer = setTimeout(() => setFilter("q", trimmed), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [search, filters.q, setFilter]);

  const handleSendCode = async (email) => {
    try {
      await access.sendCode(email);
      toast.success("We sent a verification code to your email.");
      return true;
    } catch (err) {
      toast.error(getErrorMessage(err, "We couldn't send the code. Please try again."));
      return false;
    }
  };

  const handleVerify = async (code) => {
    try {
      await access.verifyCode(code);
      return true;
    } catch (err) {
      toast.error(getErrorMessage(err, "We couldn't verify the code. Please try again."));
      return false;
    }
  };

  const handleReset = () => {
    resetAccess();
    setPreviewDoc(null);
    setSearch("");
    setFilter("q", "");
    setFilter("type", "");
  };

  const handleDownload = async (doc) => {
    if (doc.status !== "ready" || downloadingId) return;
    setDownloadingId(doc.id);
    try {
      window.location.assign(await history.getDownloadUrl(doc.id));
    } catch (err) {
      if (err?.status !== 401) toast.error(getErrorMessage(err, "Could not download this document. Please try again."));
    } finally {
      setDownloadingId(null);
    }
  };

  const totalPages = Math.max(meta.totalPages, 1);
  const page = Math.min(filters.page, totalPages);
  const hasQuery = Boolean(filters.q || filters.type);

  // The table appears once the verified email (or account) is known to have documents, and stays while filtering.
  const listOwner = guestToken ?? (isAuthenticated ? "account" : null);
  const [documentsOwner, setDocumentsOwner] = useState(null);
  if (listOwner && documentsOwner !== listOwner && !loading && !error && meta.totalItems > 0) {
    setDocumentsOwner(listOwner);
  }
  const showDocuments = Boolean(listOwner) && documentsOwner === listOwner;
  let lookupState = null;
  if (listOwner && !showDocuments) lookupState = loading ? "loading" : error ? "error" : "none";

  let emptyMessage = null;
  if (loading) emptyMessage = "Loading your documents...";
  else if (error) emptyMessage = "Your documents couldn't be loaded.";
  else if (documents.length === 0)
    emptyMessage = hasQuery ? "No documents match your search or filter." : "No documents found for this email yet.";

  return (
    <div className="w-full py-10 sm:py-16 border-t border-slate-200/80">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 space-y-8 sm:space-y-10">
        {/* Top: email verification (guests only) */}
        {!isAuthenticated && (
          <DocumentAccessForm
            verifiedEmail={access.session?.email}
            codeSent={access.codeSent}
            pending={access.pending}
            onSendCode={handleSendCode}
            onVerify={handleVerify}
            onReset={handleReset}
          />
        )}

        {/* Bottom: My Documents Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">My Documents</h2>
              <p className="text-sm text-slate-500 mt-1">View and download your previously generated documents.</p>
            </div>

            <Link
              to="/paystub-generator"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-secondary hover:bg-[#0089e0] text-white font-semibold text-sm transition shadow-sm hover:shadow active:scale-98 whitespace-nowrap self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Generate Paystub</span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
            {/* Filter Tabs Row */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const isActive = filters.type === tab.value;
                return (
                  <button
                    key={tab.value || "all"}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setFilter("type", tab.value)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-secondary text-white shadow-xs"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Search and Sort Toolbar */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={search}
                  maxLength={100}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by document name or ID"
                  aria-label="Search documents"
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <div className="relative">
                  <select
                    value={filters.sort}
                    onChange={(e) => setFilter("sort", e.target.value)}
                    aria-label="Sort documents"
                    className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2 pr-9 text-sm font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition cursor-pointer"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800">All Documents</h3>
              <p className="text-xs text-slate-500">Your latest generated documents</p>
            </div>

            {error && (
              <div className="flex flex-col gap-2 border-b border-rose-100 bg-rose-50 px-6 py-3 text-sm text-rose-700 sm:flex-row sm:items-center sm:justify-between">
                <span>{getErrorMessage(error, "Could not load your documents.")}</span>
                <button
                  type="button"
                  onClick={history.reload}
                  className="font-semibold underline cursor-pointer self-start sm:self-auto"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Documents Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-6">DOCUMENT NAME</th>
                    <th className="py-3 px-6">DOCUMENT TYPE</th>
                    <th className="py-3 px-6">CREATED DATE</th>
                    <th className="py-3 px-6">STATUS</th>
                    <th className="py-3 px-6 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {emptyMessage ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400">
                        {emptyMessage}
                      </td>
                    </tr>
                  ) : (
                    documents.map((doc) => {
                      const ready = doc.status === "ready";
                      return (
                        <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-blue-50 text-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors">
                                <FileText className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <div className="font-semibold text-slate-800 truncate max-w-[18rem]">{doc.title}</div>
                                <div className="text-xs text-slate-400 font-mono">{doc.documentNumber}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 font-medium text-slate-600">
                            {DOCUMENT_TYPE_LABELS[doc.type] ?? doc.type}
                          </td>
                          <td className="py-4 px-6 text-slate-500 whitespace-nowrap">{formatDateTime(doc.createdAt)}</td>
                          <td className="py-4 px-6">
                            <DocumentStatusPill status={doc.status} />
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="inline-flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setPreviewDoc(doc)}
                                title="Preview Document"
                                aria-label={`Preview ${doc.title}`}
                                className="p-2 text-slate-400 hover:text-secondary hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDownload(doc)}
                                disabled={!ready || downloadingId === doc.id}
                                title={ready ? "Download PDF" : "PDF is still being prepared"}
                                aria-label={`Download ${doc.title}`}
                                className="p-2 text-slate-400 hover:text-secondary hover:bg-blue-50 rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-400"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Row */}
            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                Page {page} of {totalPages} ({meta.totalItems} matching records)
              </span>

              <div className="flex flex-wrap items-center justify-center gap-1.5">
                <button
                  type="button"
                  disabled={page === 1 || loading}
                  onClick={() => setFilter("page", page - 1)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    disabled={loading}
                    aria-current={page === n ? "page" : undefined}
                    onClick={() => setFilter("page", n)}
                    className={`w-8 h-8 rounded-lg text-xs font-semibold transition cursor-pointer disabled:cursor-not-allowed ${
                      page === n
                        ? "bg-secondary text-white shadow-xs"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {n}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={page === totalPages || loading}
                  onClick={() => setFilter("page", page + 1)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DocumentPreviewModal
        doc={previewDoc}
        downloading={downloadingId === previewDoc?.id}
        getPreviewUrl={history.getPreviewUrl}
        onDownload={handleDownload}
        onClose={() => setPreviewDoc(null)}
      />
    </div>
  );
};

export default FindPaystubsContent;
