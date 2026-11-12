import React, { useEffect, useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { PaymentDetailsModal } from "../components/modals";
import {
  DashboardHeader,
  DashboardPagination,
  DashboardTable,
} from "../../../../Components/Dashboard";
import { DashboardStatusBadge } from "../../../../layouts";
import { useUrlFilters } from "../../../../hooks/useUrlFilters";
import { describeRequestError } from "../Profile/utils/profileFormat";
import { formatMoney } from "../../admin/users/utils/userFormat";
import { formatDateTime } from "../../admin/orders/utils/orderFormat";
import { describeCard, paymentStatusLabel } from "../CustomerOverview/utils/overviewFormat";
import { usePaymentHistory } from "./hooks/usePaymentHistory";

const STATUS_FILTERS = [
  { value: "", label: "All Payments" },
  { value: "succeeded", label: "Successful" },
  { value: "processing", label: "Processing" },
  { value: "failed", label: "Failed" },
  { value: "refunded", label: "Refunded" },
  { value: "partially_refunded", label: "Partially refunded" },
];

const URL_SELECTS = { status: STATUS_FILTERS.map((s) => s.value) };

const PaymentHistoryView = () => {
  const { payments, meta, loading, error, loadPayments } = usePaymentHistory();
  const { filters, setFilter } = useUrlFilters(URL_SELECTS);
  const [reloadKey, setReloadKey] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState(null);

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

  const columns = useMemo(
    () => [
      {
        header: "Order",
        render: (tx) => tx.orderNumber ?? "Subscription",
        cellClassName: "font-mono font-bold text-slate-900 text-xs",
      },
      {
        header: "Description",
        render: (tx) => <span className="block max-w-[16rem] truncate">{tx.description}</span>,
        cellClassName: "font-medium text-slate-700",
      },
      {
        header: "Date",
        render: (tx) => formatDateTime(tx.createdAt),
        cellClassName: "text-slate-500 font-medium whitespace-nowrap",
      },
      {
        header: "Payment Method",
        render: describeCard,
        cellClassName: "text-slate-600 font-medium whitespace-nowrap",
      },
      {
        header: "Amount",
        render: (tx) => formatMoney(tx.amountCents, tx.currency),
        cellClassName: "font-bold text-slate-900",
      },
      {
        header: "Status",
        render: (tx) => <DashboardStatusBadge status={paymentStatusLabel(tx.status)} />,
      },
      {
        header: "",
        align: "right",
        render: (tx) => (
          <div className="inline-flex items-center gap-3">
            {tx.receiptUrl?.startsWith("https://") && (
              <a
                href={tx.receiptUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Stripe receipt"
                aria-label={`Receipt for ${tx.orderNumber ?? "subscription payment"}`}
                className="text-slate-400 hover:text-[#009BFB] transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              type="button"
              onClick={() => setSelectedPayment(tx)}
              className="text-xs font-semibold text-[#009BFB] hover:text-[#0089e0] hover:underline cursor-pointer transition"
            >
              View Details
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  const renderMobileRow = (tx) => (
    <button type="button" onClick={() => setSelectedPayment(tx)} className="w-full text-left space-y-1 cursor-pointer">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono font-bold text-slate-900 text-xs">{tx.orderNumber ?? "Subscription"}</span>
        <span className="font-bold text-slate-900 text-sm">{formatMoney(tx.amountCents, tx.currency)}</span>
      </div>
      <p className="text-xs text-slate-600 truncate">{tx.description}</p>
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-slate-400">{formatDateTime(tx.createdAt)}</span>
        <DashboardStatusBadge status={paymentStatusLabel(tx.status)} />
      </div>
    </button>
  );

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Payment History"
        description="Review your recent purchases and payment transactions."
      />

      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {STATUS_FILTERS.map((option) => {
            const isActive = filters.status === option.value;
            return (
              <button
                key={option.value || "all"}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFilter("status", option.value)}
                className={`px-3.5 py-1.5 rounded text-xs font-semibold transition cursor-pointer ${
                  isActive ? "bg-[#009BFB] text-white shadow-xs" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <div className="flex flex-col gap-2 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700 sm:flex-row sm:items-center sm:justify-between">
          <span>{describeRequestError(error, "Could not load your payments.")}</span>
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
        title="Transactions"
        minWidth="min-w-[800px]"
        columns={columns}
        data={error ? [] : payments}
        loading={loading}
        renderMobileRow={renderMobileRow}
        emptyMessage={filters.status ? "No payments with this status." : "No payments yet."}
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

      <PaymentDetailsModal payment={selectedPayment} onClose={() => setSelectedPayment(null)} />
    </div>
  );
};

export default PaymentHistoryView;
