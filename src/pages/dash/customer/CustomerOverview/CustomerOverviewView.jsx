import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import {
  FileText,
  LayoutGrid,
  CreditCard,
  Star,
  FilePlus,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import {
  DashboardHeader,
  DashboardTable,
} from "../../../../Components/Dashboard";
import { DashboardStatusBadge } from "../../../../layouts";
import { describeRequestError } from "../Profile/utils/profileFormat";
import { formatMoney } from "../../admin/users/utils/userFormat";
import { DOCUMENT_TYPE_LABELS, formatDateTime } from "../../admin/orders/utils/orderFormat";
import StatCard from "./components/StatCard";
import DocumentActionButtons from "./components/DocumentActionButtons";
import DownloadToast from "./components/DownloadToast";
import RecentDocumentModal from "./components/RecentDocumentModal";
import { useCustomerOverview } from "./hooks/useCustomerOverview";
import {
  describeCard,
  documentStatusLabel,
  paymentStatusLabel,
  subscriptionStatusLabel,
} from "./utils/overviewFormat";

const TOAST_DURATION_MS = 3000;
const SUBSCRIPTION_TONES = {
  active: "success",
  past_due: "warning",
  unpaid: "warning",
  incomplete: "warning",
  canceled: "danger",
};

const CustomerOverviewView = () => {
  const { dashboard, loading, error, loadDashboard, getDownloadUrl } = useCustomerOverview();
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    const request = loadDashboard();
    return () => request.abort();
  }, [loadDashboard]);

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

  const stats = dashboard?.stats;
  const showSkeleton = loading && !dashboard;
  const statCards = useMemo(() => {
    const total = stats?.totalDocuments ?? 0;
    const paystubs = stats?.paystubDocuments ?? 0;
    const subscription = stats?.subscription;
    const placeholder = showSkeleton ? "…" : null;
    return [
      {
        title: "Total Documents",
        value: placeholder ?? total.toLocaleString(),
        change: "All-time documents",
        icon: FileText,
      },
      {
        title: "Paystubs Created",
        value: placeholder ?? paystubs.toLocaleString(),
        change: total ? `${Math.round((paystubs / total) * 100)}% of your documents` : "No documents yet",
        icon: LayoutGrid,
      },
      {
        title: "Total Purchases",
        value: placeholder ?? (stats?.successfulPayments ?? 0).toLocaleString(),
        change: "Successful purchases",
        icon: CreditCard,
      },
      {
        title: "Subscription Status",
        value: placeholder ?? (subscription ? subscriptionStatusLabel(subscription.status) : "None"),
        change: subscription?.planName ?? "No active subscription",
        icon: Star,
        tone: placeholder ? "default" : SUBSCRIPTION_TONES[subscription?.status] ?? "neutral",
      },
    ];
  }, [stats, showSkeleton]);

  const documentColumns = useMemo(
    () => [
      {
        header: "Document Name",
        render: (doc) => (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#EBF5FF] text-[#009BFB] flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-slate-900 text-xs truncate max-w-[16rem]">{doc.title}</div>
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

  const paymentColumns = useMemo(
    () => [
      {
        header: "Order",
        render: (payment) => payment.orderNumber ?? "Subscription",
        cellClassName: "font-mono font-semibold text-slate-800 text-[11px]",
      },
      {
        header: "Description",
        key: "description",
        cellClassName: "font-medium text-slate-700",
      },
      {
        header: "Date",
        render: (payment) => formatDateTime(payment.createdAt),
        cellClassName: "text-slate-500 font-medium whitespace-nowrap",
      },
      {
        header: "Payment Method",
        render: describeCard,
        cellClassName: "text-slate-600 font-medium",
      },
      {
        header: "Amount",
        render: (payment) => formatMoney(payment.amountCents, payment.currency),
        cellClassName: "font-bold text-slate-900",
      },
      {
        header: "Status",
        render: (payment) => <DashboardStatusBadge status={paymentStatusLabel(payment.status)} />,
      },
      {
        header: "Receipt",
        align: "right",
        render: (payment) =>
          payment.receiptUrl?.startsWith("https://") ? (
            <a
              href={payment.receiptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#009BFB] hover:underline"
            >
              View <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <span className="text-slate-300">—</span>
          ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      <DownloadToast message={toast?.message} tone={toast?.tone} />

      <DashboardHeader
        title="Welcome Back!"
        description="Manage your documents, review purchases, and access your subscription."
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

      {error && (
        <div className="flex flex-col gap-2 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700 sm:flex-row sm:items-center sm:justify-between">
          <span>{describeRequestError(error, "Could not load your dashboard.")}</span>
          <button type="button" onClick={loadDashboard} className="font-semibold underline cursor-pointer self-start sm:self-auto">
            Try again
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {statCards.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} change={stat.change} icon={stat.icon} tone={stat.tone} />
        ))}
      </div>

      <DashboardTable
        title="Recent Documents"
        minWidth="min-w-[600px]"
        headerAction={
          <Link
            to="/customer/documents"
            className="text-xs font-semibold text-[#009BFB] hover:text-[#0089e0] hover:underline inline-flex items-center gap-1 cursor-pointer transition no-underline"
          >
            <span>View all documents</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        }
        columns={documentColumns}
        data={dashboard?.recentDocuments ?? []}
        loading={showSkeleton}
        emptyMessage="No documents yet. Generate your first paystub to see it here."
      />

      <DashboardTable
        title="Recent Payment Activity"
        minWidth="min-w-[760px]"
        headerAction={
          <Link
            to="/customer/payments"
            className="text-xs font-semibold text-[#009BFB] hover:text-[#0089e0] hover:underline inline-flex items-center gap-1 cursor-pointer transition no-underline"
          >
            <span>View payment history</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        }
        columns={paymentColumns}
        data={dashboard?.recentPayments ?? []}
        loading={showSkeleton}
        emptyMessage="No payments yet."
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

export default CustomerOverviewView;
