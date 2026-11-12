import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  ChevronRight,
  CreditCard,
  FileText,
  RefreshCw,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import { describeRequestError } from "../../customer/Profile/utils/profileFormat";
import { formatCents, formatMoney } from "../users/utils/userFormat";
import { DOCUMENT_TYPE_LABELS, formatDateTime } from "../orders/utils/orderFormat";
import OrderStatusBadge from "../orders/components/OrderStatusBadge";
import { useAdminOverview } from "./hooks/useAdminOverview";

const RANGES = [
  { value: "12m", label: "Last 12 months" },
  { value: "6m", label: "Last 6 months" },
];

const KPI_CARDS = [
  { key: "totalRevenueCents", label: "Net revenue", icon: TrendingUp, color: "bg-blue-50 text-[#2563EB]", path: "/admin/transactions", money: true },
  { key: "totalOrders", label: "Paid orders", icon: ShoppingBag, color: "bg-emerald-50 text-emerald-600", path: "/admin/orders" },
  { key: "totalCustomers", label: "Customers", icon: Users, color: "bg-violet-50 text-violet-600", path: "/admin/customers" },
  { key: "totalDocuments", label: "Documents", icon: FileText, color: "bg-sky-50 text-sky-600", path: "/admin/documents" },
  { key: "activeSubscriptions", label: "Active subscriptions", icon: RefreshCw, color: "bg-amber-50 text-amber-600", path: "/admin/subscriptions" },
  { key: "generatedToday", label: "Generated today", icon: CreditCard, color: "bg-rose-50 text-rose-600", path: "/admin/documents?status=ready" },
];

const ACTIVITY_ICONS = {
  order: ShoppingBag,
  document: FileText,
  subscription: RefreshCw,
  auth: Users,
  account: Users,
  orders: Users,
};

const monthLabel = new Intl.DateTimeFormat("en-US", { month: "short", year: "2-digit", timeZone: "UTC" });
const compactUsd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact" });
const relative = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });

function timeAgo(value) {
  const seconds = Math.round((new Date(value).getTime() - Date.now()) / 1000);
  if (Number.isNaN(seconds)) return "—";
  const steps = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.35, "week"],
    [12, "month"],
  ];
  let amount = seconds;
  for (const [size, unit] of steps) {
    if (Math.abs(amount) < size) return relative.format(Math.round(amount), unit);
    amount /= size;
  }
  return relative.format(Math.round(amount), "year");
}

function describeAction(action) {
  const text = (action || "").replace(/[._]/g, " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white text-sm px-2.5 py-1.5 rounded shadow-lg">
        <p className="font-semibold">{label}</p>
        <p className="text-[#009BFB]">{formatCents(payload[0].value)}</p>
      </div>
    );
  }

  return null;
};

const Skeleton = ({ className }) => <span className={`block animate-pulse rounded bg-slate-100 ${className}`} />;

const AdminOverviewView = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const range = searchParams.get("range") === "6m" ? "6m" : "12m";
  const { dashboard, loading, error, loadDashboard } = useAdminOverview();
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const request = loadDashboard(range);
    return () => request.abort();
  }, [range, reloadKey, loadDashboard]);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  const changeRange = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value === "12m") next.delete("range");
    else next.set("range", value);
    setSearchParams(next);
  };

  const kpis = dashboard?.kpis;
  const revenue = useMemo(
    () =>
      (dashboard?.revenue ?? []).map((row) => ({
        month: monthLabel.format(new Date(`${row.month}-01T00:00:00Z`)),
        revenue: row.revenueCents,
      })),
    [dashboard],
  );
  const rangeRevenue = revenue.reduce((sum, row) => sum + row.revenue, 0);
  const breakdown = dashboard?.documentBreakdown ?? [];
  const totalDocs = breakdown.reduce((sum, row) => sum + row.count, 0);
  const recentOrders = dashboard?.recentOrders ?? [];
  const activity = dashboard?.activity ?? [];
  const showSkeleton = loading && !dashboard;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-base text-slate-400 mt-1.5">
            Monitor your platform activity, customers, documents, and revenue.
          </p>
        </div>
        <button
          type="button"
          onClick={reload}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:border-slate-300 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="flex flex-col gap-2 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700 sm:flex-row sm:items-center sm:justify-between">
          <span>{describeRequestError(error, "Could not load the dashboard.")}</span>
          <button type="button" onClick={reload} className="font-semibold underline cursor-pointer self-start sm:self-auto">
            Try again
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {KPI_CARDS.map((card) => {
          const Icon = card.icon;
          const value = kpis?.[card.key] ?? 0;
          return (
            <button
              key={card.key}
              type="button"
              onClick={() => navigate(card.path)}
              className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 flex items-center gap-3.5 shadow-xs hover:border-blue-200 hover:shadow-sm transition text-left cursor-pointer"
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${card.color}`}>
                {Icon && <Icon className="w-4 h-4" />}
              </div>
              <div className="min-w-0">
                <span className="text-sm sm:text-base font-semibold text-slate-700 block truncate">{card.label}</span>
                {showSkeleton ? (
                  <Skeleton className="mt-1.5 h-6 w-16" />
                ) : (
                  <span className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight block mt-0.5 truncate">
                    {card.money ? formatCents(value) : value.toLocaleString()}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3 pb-2">
              <h3 className="text-sm font-bold text-slate-800">Revenue analytics</h3>
              <select
                value={range}
                onChange={(event) => changeRange(event.target.value)}
                aria-label="Revenue range"
                className="rounded border border-slate-200 bg-white px-2.5 py-1 text-sm font-medium text-slate-600 hover:border-slate-300 transition cursor-pointer"
              >
                {RANGES.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-1 mb-2">
              {showSkeleton ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight block">
                  {formatCents(rangeRevenue)}
                </span>
              )}
              <span className="text-xs text-slate-400">Net of refunds, by payment month (UTC)</span>
            </div>
          </div>

          <div className="w-full h-52 sm:h-60 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenue} margin={{ top: 10, right: 10, left: -5, bottom: 0 }}>
                <defs>
                  <linearGradient id="rechartsRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.24} />
                    <stop offset="60%" stopColor="#2563EB" stopOpacity={0.06} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#F1F5F9" strokeWidth={1} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} dy={6} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 11 }}
                  allowDecimals={false}
                  tickFormatter={(value) => compactUsd.format(value / 100)}
                  dx={-4}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563EB"
                  strokeWidth={2.5}
                  fill="url(#rechartsRevenueGrad)"
                  activeDot={{ r: 4.5, fill: "#FFFFFF", stroke: "#2563EB", strokeWidth: 2.5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="pb-4">
              <h3 className="text-sm font-bold text-slate-800">Documents generated</h3>
            </div>

            <div className="space-y-4 pt-1">
              {showSkeleton &&
                [0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-8 w-full" />)}
              {!showSkeleton && breakdown.length === 0 && (
                <p className="text-sm text-slate-400">No paid documents yet.</p>
              )}
              {breakdown.map((doc) => (
                <Link key={doc.type} to={`/admin/documents?type=${doc.type}`} className="block group">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 font-medium group-hover:text-slate-900">
                      {DOCUMENT_TYPE_LABELS[doc.type] ?? doc.type}
                    </span>
                    <span className="text-slate-900 font-bold">{doc.count.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
                    <div
                      className="bg-[#2563EB] h-full rounded-full transition-all duration-500"
                      style={{ width: `${doc.percent}%` }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between">
            <span className="text-sm text-slate-400 font-medium">Total generated:</span>
            <span className="text-sm font-bold text-slate-900">{totalDocs.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs min-w-0">
          <div className="flex items-center justify-between pb-3">
            <h3 className="text-sm font-bold text-slate-800">Recent orders</h3>
            <Link
              to="/admin/orders"
              className="text-sm font-semibold text-[#009BFB] hover:underline flex items-center gap-1"
            >
              <span>View all orders</span>
              <span>→</span>
            </Link>
          </div>

          {!showSkeleton && recentOrders.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400">No orders yet.</p>
          ) : (
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left border-collapse min-w-[620px]">
                <thead>
                  <tr className="border-b border-slate-100 text-sm font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="py-2.5 font-medium">Order</th>
                    <th className="py-2.5 font-medium">Customer</th>
                    <th className="py-2.5 font-medium">Type</th>
                    <th className="py-2.5 font-medium">Date</th>
                    <th className="py-2.5 font-medium">Amount</th>
                    <th className="py-2.5 font-medium">Status</th>
                    <th className="py-2.5 text-right font-medium" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm">
                  {showSkeleton &&
                    [0, 1, 2, 3, 4].map((i) => (
                      <tr key={i}>
                        <td colSpan={7} className="py-3">
                          <Skeleton className="h-5 w-full" />
                        </td>
                      </tr>
                    ))}
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => navigate(`/admin/orders?q=${encodeURIComponent(order.orderNumber)}`)}
                      className="hover:bg-slate-50/60 transition group cursor-pointer"
                    >
                      <td className="py-3 font-semibold text-slate-700">{order.orderNumber}</td>
                      <td className="py-3 text-slate-600 font-medium max-w-[14rem] truncate">{order.email}</td>
                      <td className="py-3 text-slate-600">
                        {DOCUMENT_TYPE_LABELS[order.documentType] ?? order.documentType ?? "—"}
                      </td>
                      <td className="py-3 text-slate-400 whitespace-nowrap">{formatDateTime(order.createdAt)}</td>
                      <td className="py-3 font-bold text-slate-900">{formatMoney(order.totalCents, order.currency)}</td>
                      <td className="py-3">
                        <OrderStatusBadge status={order.status} />
                      </td>
                      <td className="py-3 text-right">
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 inline-block transition" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="pb-4">
            <h3 className="text-sm font-bold text-slate-800">Recent activity</h3>
          </div>

          <div className="space-y-4 pt-1">
            {showSkeleton && [0, 1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-9 w-full" />)}
            {!showSkeleton && activity.length === 0 && <p className="text-sm text-slate-400">No activity yet.</p>}
            {activity.map((entry) => {
              const Icon = ACTIVITY_ICONS[entry.action?.split(".")[0]] ?? Activity;
              return (
                <div key={entry.id} className="flex items-start justify-between gap-3 text-sm">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-blue-50 text-[#009BFB] flex items-center justify-center flex-shrink-0 mt-0.5">
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800 text-sm truncate">{describeAction(entry.action)}</p>
                      <p className="text-sm text-slate-400 truncate mt-0.5 capitalize">
                        by {entry.actorType}
                        {entry.targetType ? ` · ${entry.targetType.replace(/_/g, " ")}` : ""}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-sm text-slate-400 flex-shrink-0 font-medium whitespace-nowrap"
                    title={formatDateTime(entry.createdAt)}
                  >
                    {timeAgo(entry.createdAt)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewView;
