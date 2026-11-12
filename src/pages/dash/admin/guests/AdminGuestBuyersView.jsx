import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { RefreshCw, ShoppingBag } from "lucide-react";
import {
  DashboardFilterToolbar,
  DashboardHeader,
  DashboardPagination,
  DashboardTable,
} from "../../../../Components/Dashboard";
import { useUrlFilters } from "../../../../hooks/useUrlFilters";
import { describeRequestError } from "../../customer/Profile/utils/profileFormat";
import { formatCents, formatShortDate } from "../users/utils/userFormat";
import { useGuestBuyers } from "./hooks/useGuestBuyers";

const SORT_OPTIONS = [
  { value: "-lastOrder", label: "Most recent order" },
  { value: "-totalSpent", label: "Highest spend" },
];
const SELECTS = [
  { key: "sort", label: "Sort guest buyers", options: SORT_OPTIONS },
];
const URL_SELECTS = { sort: SORT_OPTIONS.map((o) => o.value) };

const ordersLink = (email) => `/admin/orders?q=${encodeURIComponent(email)}`;

const AccountBadge = ({ hasAccount }) =>
  hasAccount ? (
    <span className="inline-flex items-center whitespace-nowrap rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
      Registered later
    </span>
  ) : (
    <span className="inline-flex items-center whitespace-nowrap rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
      Guest only
    </span>
  );

/** People who checked out without an account, one row per email. */
const AdminGuestBuyersView = () => {
  const { guests, meta, loading, error, loadGuests } = useGuestBuyers();
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

  useEffect(() => {
    const trimmed = search.trim();
    if (trimmed === filters.q) return undefined;
    const timer = setTimeout(() => setFilter("q", trimmed), 300);
    return () => clearTimeout(timer);
  }, [search, filters.q, setFilter]);

  useEffect(() => {
    const request = loadGuests(filters);
    return () => request.abort();
  }, [filters, reloadKey, loadGuests]);

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

  const viewOrders = (g) => (
    <Link
      to={ordersLink(g.email)}
      title={`View orders from ${g.email}`}
      className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
    >
      <ShoppingBag className="h-3.5 w-3.5" />
      View orders
    </Link>
  );

  const orders = (g) => (
    <span>
      <span className="font-semibold text-slate-800">{g.paidOrderCount}</span>
      <span className="text-slate-400"> paid / {g.orderCount} total</span>
    </span>
  );

  const columns = [
    {
      header: "Email",
      render: (g) => (
        <span className="block max-w-[18rem] truncate font-medium text-slate-800">
          {g.email}
        </span>
      ),
    },
    {
      header: "Orders",
      render: orders,
      cellClassName: "whitespace-nowrap text-slate-600",
    },
    {
      header: "Total spent",
      render: (g) => formatCents(g.totalSpentCents),
      cellClassName: "whitespace-nowrap font-semibold text-slate-800",
    },
    {
      header: "Account",
      render: (g) => <AccountBadge hasAccount={g.hasAccount} />,
    },
    {
      header: "First order",
      render: (g) => formatShortDate(g.firstOrderAt),
      cellClassName: "whitespace-nowrap text-slate-500",
    },
    {
      header: "Last order",
      render: (g) => formatShortDate(g.lastOrderAt),
      cellClassName: "whitespace-nowrap text-slate-500",
    },
    { header: "Actions", align: "right", render: viewOrders },
  ];

  const renderMobileRow = (g) => (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 truncate font-medium text-slate-800">{g.email}</p>
        <AccountBadge hasAccount={g.hasAccount} />
      </div>
      <div className="flex items-center justify-between gap-3 text-sm">
        {orders(g)}
        <span className="font-semibold text-slate-800">
          {formatCents(g.totalSpentCents)}
        </span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-slate-400">
          Last order {formatShortDate(g.lastOrderAt)}
        </p>
        {viewOrders(g)}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Guest Buyers"
        description="People who checked out without an account, grouped by email."
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
          <span>
            {describeRequestError(error, "Couldn't load guest buyers.")}
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
        title="Guest buyers"
        minWidth="min-w-[900px]"
        toolbar={
          <DashboardFilterToolbar
            search={search}
            onSearchChange={setSearch}
            filters={filters}
            onFilterChange={setFilter}
            onReset={resetFilters}
            searchPlaceholder="Search by email"
            selects={SELECTS}
          />
        }
        columns={columns}
        data={error ? [] : guests}
        loading={loading}
        renderMobileRow={renderMobileRow}
        rowKey={(g) => g.email}
        emptyMessage={
          filters.q
            ? "No guest buyers match your search."
            : "No guest orders yet."
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
    </div>
  );
};

export default AdminGuestBuyersView;
