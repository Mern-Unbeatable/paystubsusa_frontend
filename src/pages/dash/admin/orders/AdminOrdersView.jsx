import React, { useCallback, useEffect, useState } from "react";
import { Eye, RefreshCw } from "lucide-react";
import {
  DashboardHeader,
  DashboardPagination,
  DashboardTable,
} from "../../../../Components/Dashboard";
import { describeRequestError } from "../../customer/Profile/utils/profileFormat";
import { formatMoney } from "../../../../utils/format";
import { useAdminOrders } from "./hooks/useAdminOrders";
import OrdersToolbar from "./components/OrdersToolbar";
import OrderStatusBadge from "./components/OrderStatusBadge";
import OrderDetailsModal from "./components/OrderDetailsModal";
import {
  BUYER_OPTIONS,
  DOCUMENT_TYPE_LABELS,
  DOCUMENT_TYPE_OPTIONS,
  ORDER_STATUS_OPTIONS,
  formatDateTime,
} from "./utils/orderFormat";
import { useUrlFilters } from "../../../../hooks/useUrlFilters";

const URL_SELECTS = {
  status: ORDER_STATUS_OPTIONS.map((o) => o.value),
  documentType: DOCUMENT_TYPE_OPTIONS.map((o) => o.value),
  buyer: BUYER_OPTIONS.map((o) => o.value),
};

const GuestTag = () => (
  <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200">
    Guest
  </span>
);

const buyer = (order) => (
  <div className="flex max-w-[16rem] items-center gap-2">
    <span className="truncate">{order.email}</span>
    {!order.userId && <GuestTag />}
  </div>
);

const AdminOrdersView = () => {
  const { orders, meta, loading, error, loadOrders } = useAdminOrders();
  const {
    filters,
    setFilter,
    resetFilters: resetOrderFilters,
  } = useUrlFilters(URL_SELECTS);
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
    const request = loadOrders(filters);
    return () => request.abort();
  }, [filters, reloadKey, loadOrders]);

  // A link to a page past the end (or rows removed since) lands on the last real page.
  useEffect(() => {
    if (!loading && meta.totalPages > 0 && filters.page > meta.totalPages) {
      setFilter("page", meta.totalPages, { replace: true });
    }
  }, [loading, meta.totalPages, filters.page, setFilter]);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  const resetFilters = () => {
    setSearch("");
    resetOrderFilters();
  };

  const viewButton = (order) => (
    <button
      type="button"
      onClick={() => setViewing(order)}
      className="inline-flex items-center gap-1.5 rounded-lg bg-secondary/10 px-3.5 py-1.5 text-sm font-semibold text-secondary transition hover:bg-secondary/15 cursor-pointer"
    >
      <Eye className="h-4 w-4" />
      View
    </button>
  );

  const columns = [
    {
      header: "Order",
      render: (order) => (
        <span className="font-semibold text-slate-800">
          {order.orderNumber}
        </span>
      ),
      cellClassName: "whitespace-nowrap",
    },
    { header: "Customer", render: buyer },
    {
      header: "Detail",
      render: (order) => (
        <div className="max-w-[16rem]">
          <p className="truncate text-slate-700">{order.summary || "—"}</p>
          <p className="text-xs text-slate-400">
            {DOCUMENT_TYPE_LABELS[order.documentType] ?? order.documentType}
          </p>
        </div>
      ),
    },
    {
      header: "Value",
      render: (order) => (
        <span className="font-bold text-slate-900">
          {formatMoney(order.totalCents, order.currency)}
        </span>
      ),
    },
    {
      header: "Status",
      render: (order) => <OrderStatusBadge status={order.status} />,
    },
    {
      header: "Date",
      render: (order) => formatDateTime(order.createdAt),
      cellClassName: "whitespace-nowrap text-slate-500",
    },
    { header: "Action", align: "right", render: viewButton },
  ];

  const renderMobileRow = (order) => (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0 space-y-1.5">
        <p className="font-semibold text-slate-800">{order.orderNumber}</p>
        <div className="text-sm text-slate-500">{buyer(order)}</div>
        <p className="truncate text-sm text-slate-600">{order.summary}</p>
        <div className="flex flex-wrap items-center gap-2">
          <OrderStatusBadge status={order.status} />
          <span className="text-sm font-bold text-slate-900">
            {formatMoney(order.totalCents, order.currency)}
          </span>
        </div>
        <p className="text-xs text-slate-400">
          {formatDateTime(order.createdAt)}
        </p>
      </div>
      {viewButton(order)}
    </div>
  );

  const hasQuery = Boolean(
    filters.q || filters.status || filters.documentType || filters.buyer,
  );

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Orders"
        description="Manage all document purchases and subscription orders."
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
          <span>{describeRequestError(error, "Couldn't load orders.")}</span>
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
        title="All orders"
        minWidth="min-w-[960px]"
        toolbar={
          <OrdersToolbar
            search={search}
            onSearchChange={setSearch}
            filters={filters}
            onFilterChange={setFilter}
            onReset={resetFilters}
          />
        }
        columns={columns}
        data={error ? [] : orders}
        loading={loading}
        renderMobileRow={renderMobileRow}
        emptyMessage={
          hasQuery
            ? "No orders match your search or filters."
            : "No orders yet."
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

      <OrderDetailsModal
        key={viewing?.id ?? "none"}
        order={viewing}
        onClose={() => setViewing(null)}
      />
    </div>
  );
};

export default AdminOrdersView;
