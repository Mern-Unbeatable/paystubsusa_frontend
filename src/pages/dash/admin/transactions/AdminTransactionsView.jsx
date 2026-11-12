import React, { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import {
  DashboardFilterToolbar,
  DashboardHeader,
  DashboardPagination,
  DashboardTable,
} from "../../../../Components/Dashboard";
import { useUrlFilters } from "../../../../hooks/useUrlFilters";
import { describeRequestError } from "../../customer/Profile/utils/profileFormat";
import { formatMoney } from "../users/utils/userFormat";
import { formatDateTime } from "../orders/utils/orderFormat";
import { useAdminPayments } from "./hooks/useAdminPayments";
import PaymentStatusBadge from "./components/PaymentStatusBadge";
import PaymentDetailsModal from "./components/PaymentDetailsModal";
import { PAYMENT_STATUS_OPTIONS, describeMethod } from "./utils/paymentFormat";

const SELECTS = [{ key: "status", label: "Filter by status", options: PAYMENT_STATUS_OPTIONS }];
const URL_SELECTS = { status: PAYMENT_STATUS_OPTIONS.map((o) => o.value) };

const AdminTransactionsView = () => {
  const { payments, meta, loading, error, loadPayments } = useAdminPayments();
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

  useEffect(() => {
    const trimmed = search.trim();
    if (trimmed === filters.q) return undefined;
    const timer = setTimeout(() => setFilter("q", trimmed), 300);
    return () => clearTimeout(timer);
  }, [search, filters.q, setFilter]);

  useEffect(() => {
    const request = loadPayments(filters);
    return () => request.abort();
  }, [filters, reloadKey, loadPayments]);

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

  const viewButton = (payment) => (
    <button
      type="button"
      onClick={() => setViewing(payment)}
      className="rounded-lg bg-secondary/10 px-3.5 py-1.5 text-sm font-semibold text-secondary transition hover:bg-secondary/15 cursor-pointer"
    >
      View
    </button>
  );

  const amount = (p) => (
    <div>
      <span className="font-bold text-slate-900">{formatMoney(p.amountCents, p.currency)}</span>
      {p.amountRefundedCents > 0 && (
        <p className="text-xs text-violet-600">−{formatMoney(p.amountRefundedCents, p.currency)} refunded</p>
      )}
    </div>
  );

  const columns = [
    {
      header: "Transaction",
      render: (p) => (
        <div>
          <p className="font-semibold text-slate-800">{p.orderNumber || "Subscription"}</p>
          <p className="max-w-[11rem] truncate font-mono text-[11px] text-slate-400">{p.providerPaymentId}</p>
        </div>
      ),
    },
    { header: "Customer", render: (p) => <span className="block max-w-[14rem] truncate">{p.email || "—"}</span> },
    { header: "Description", render: (p) => <span className="block max-w-[14rem] truncate">{p.description}</span> },
    { header: "Date", render: (p) => formatDateTime(p.createdAt), cellClassName: "whitespace-nowrap text-slate-500" },
    { header: "Method", render: describeMethod, cellClassName: "whitespace-nowrap capitalize text-slate-600" },
    { header: "Amount", render: amount },
    { header: "Status", render: (p) => <PaymentStatusBadge status={p.status} /> },
    { header: "Action", align: "right", render: viewButton },
  ];

  const renderMobileRow = (p) => (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0 space-y-1.5">
        <p className="font-semibold text-slate-800">{p.orderNumber || "Subscription"}</p>
        <p className="truncate text-sm text-slate-500">{p.email || "—"}</p>
        <p className="truncate text-sm text-slate-600">{p.description}</p>
        <div className="flex flex-wrap items-center gap-2">
          <PaymentStatusBadge status={p.status} />
          {amount(p)}
        </div>
        <p className="text-xs text-slate-400">
          {describeMethod(p)} · {formatDateTime(p.createdAt)}
        </p>
      </div>
      {viewButton(p)}
    </div>
  );

  const hasQuery = Boolean(filters.q || filters.status);

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Transactions"
        description="View and manage all payment transactions."
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
          <span>{describeRequestError(error, "Couldn't load transactions.")}</span>
          <button type="button" onClick={reload} className="font-semibold underline cursor-pointer">
            Try again
          </button>
        </div>
      )}

      <DashboardTable
        title="Payment transactions"
        minWidth="min-w-[1040px]"
        toolbar={
          <DashboardFilterToolbar
            search={search}
            onSearchChange={setSearch}
            filters={filters}
            onFilterChange={setFilter}
            onReset={resetFilters}
            searchPlaceholder="Search by order number, email or Stripe ID"
            selects={SELECTS}
          />
        }
        columns={columns}
        data={error ? [] : payments}
        loading={loading}
        renderMobileRow={renderMobileRow}
        emptyMessage={hasQuery ? "No transactions match your search or filters." : "No transactions yet."}
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

      <PaymentDetailsModal key={viewing?.id ?? "none"} payment={viewing} onClose={() => setViewing(null)} />
    </div>
  );
};

export default AdminTransactionsView;
