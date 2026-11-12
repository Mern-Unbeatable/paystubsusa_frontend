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
import { formatMoney, formatShortDate } from "../../../../utils/format";
import { useAdminSubscriptions } from "./hooks/useAdminSubscriptions";
import SubscriptionStatusBadge from "./components/SubscriptionStatusBadge";
import SubscriptionDetailsModal from "./components/SubscriptionDetailsModal";
import CancelSubscriptionModal from "./components/CancelSubscriptionModal";
import { SUBSCRIPTION_STATUS_OPTIONS } from "./utils/subscriptionFormat";

const SELECTS = [{ key: "status", label: "Filter by status", options: SUBSCRIPTION_STATUS_OPTIONS }];
const URL_SELECTS = { status: SUBSCRIPTION_STATUS_OPTIONS.map((o) => o.value) };

const AdminSubscriptionsView = () => {
  const { subscriptions, meta, loading, error, loadSubscriptions } = useAdminSubscriptions();
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
  const [canceling, setCanceling] = useState(null);

  useEffect(() => {
    const trimmed = search.trim();
    if (trimmed === filters.q) return undefined;
    const timer = setTimeout(() => setFilter("q", trimmed), 300);
    return () => clearTimeout(timer);
  }, [search, filters.q, setFilter]);

  useEffect(() => {
    const request = loadSubscriptions(filters);
    return () => request.abort();
  }, [filters, reloadKey, loadSubscriptions]);

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

  const viewButton = (s) => (
    <button
      type="button"
      onClick={() => setViewing(s)}
      className="rounded-lg bg-secondary/10 px-3.5 py-1.5 text-sm font-semibold text-secondary transition hover:bg-secondary/15 cursor-pointer"
    >
      View
    </button>
  );

  const customer = (s) => (
    <div className="max-w-[16rem]">
      <p className="truncate font-semibold text-slate-800">{s.customer?.name || "—"}</p>
      <p className="truncate text-xs text-slate-400">{s.customer?.email}</p>
    </div>
  );

  const columns = [
    { header: "Customer", render: customer },
    { header: "Plan", render: (s) => <span className="font-medium text-slate-700">{s.planName}</span> },
    {
      header: "Price",
      render: (s) => (
        <span className="whitespace-nowrap font-bold text-slate-900">
          {formatMoney(s.amountCents, s.currency)}
          <span className="font-normal text-slate-400"> / {s.interval}</span>
        </span>
      ),
    },
    { header: "Status", render: (s) => <SubscriptionStatusBadge subscription={s} /> },
    { header: "Started", render: (s) => formatShortDate(s.startDate), cellClassName: "whitespace-nowrap text-slate-500" },
    {
      header: "Renews / ends",
      render: (s) => (s.status === "canceled" ? formatShortDate(s.canceledAt) : formatShortDate(s.currentPeriodEnd)),
      cellClassName: "whitespace-nowrap text-slate-500",
    },
    { header: "Docs", render: (s) => s.documentsGenerated ?? 0, cellClassName: "text-slate-600" },
    { header: "Action", align: "right", render: viewButton },
  ];

  const renderMobileRow = (s) => (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0 space-y-1.5">
        {customer(s)}
        <p className="text-sm text-slate-600">
          {s.planName} · {formatMoney(s.amountCents, s.currency)} / {s.interval}
        </p>
        <SubscriptionStatusBadge subscription={s} />
        <p className="text-xs text-slate-400">Started {formatShortDate(s.startDate)}</p>
      </div>
      {viewButton(s)}
    </div>
  );

  const hasQuery = Boolean(filters.q || filters.status);

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Subscriptions"
        description="Monitor and manage customer subscription plans."
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
          <span>{describeRequestError(error, "Couldn't load subscriptions.")}</span>
          <button type="button" onClick={reload} className="font-semibold underline cursor-pointer">
            Try again
          </button>
        </div>
      )}

      <DashboardTable
        title="All subscriptions"
        minWidth="min-w-[980px]"
        toolbar={
          <DashboardFilterToolbar
            search={search}
            onSearchChange={setSearch}
            filters={filters}
            onFilterChange={setFilter}
            onReset={resetFilters}
            searchPlaceholder="Search by name, email or Stripe ID"
            selects={SELECTS}
          />
        }
        columns={columns}
        data={error ? [] : subscriptions}
        loading={loading}
        renderMobileRow={renderMobileRow}
        emptyMessage={hasQuery ? "No subscriptions match your search or filters." : "No subscriptions yet."}
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

      <SubscriptionDetailsModal
        key={viewing?.id ?? "none"}
        subscription={viewing}
        onClose={() => setViewing(null)}
        onCancel={(s) => {
          setViewing(null);
          setCanceling(s);
        }}
      />
      <CancelSubscriptionModal
        key={canceling?.id ?? "none"}
        subscription={canceling}
        onClose={() => setCanceling(null)}
      />
    </div>
  );
};

export default AdminSubscriptionsView;
