import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  FileText,
  LayoutGrid,
  CreditCard,
  Star,
  FilePlus,
  ArrowRight,
} from "lucide-react";
import { DocumentDetailsModal } from "../components/modals";
import {
  DashboardHeader,
  DashboardTable,
} from "../../../../Components/Dashboard";
import { DashboardStatusBadge } from "../../../../layouts";
import recentDocuments from "../data/overview/recentDocuments.json";
import transactions from "../data/payments/transactions.json";
import stats from "../data/overview/stats.json";
import StatCard from "./components/StatCard";
import DocumentActionButtons from "./components/DocumentActionButtons";
import DownloadToast from "./components/DownloadToast";
const ICON_MAP = {
  CreditCard,
  FileText,
  LayoutGrid,
  Star,
};
const RECENT_PAYMENTS_LIMIT = 3;
const DOWNLOAD_TOAST_DURATION_MS = 2500;

const CustomerOverviewView = () => {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(null);
  const recentPayments = useMemo(
    () => transactions.slice(0, RECENT_PAYMENTS_LIMIT),
    [],
  );

  const handleDownload = useCallback((docName) => {
    setDownloadSuccess(`Downloading ${docName}...`);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, DOWNLOAD_TOAST_DURATION_MS);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedDoc(null);
  }, []);

  const handleModalDownload = useCallback(
    (name) => {
      handleDownload(name);
      setSelectedDoc(null);
    },
    [handleDownload],
  );

  const documentColumns = useMemo(
    () => [
      {
        header: "Document Name",
        render: (doc) => (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#EBF5FF] text-[#009BFB] flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-xs">{doc.name}</div>
              <div className="text-[10.5px] text-slate-400 font-mono">
                {doc.id}
              </div>
            </div>
          </div>
        ),
      },
      {
        header: "Document Type",
        key: "type",
        cellClassName: "text-slate-600 font-medium",
      },
      {
        header: "Created Date",
        key: "date",
        cellClassName: "text-slate-500 font-medium",
      },
      {
        header: "Status",
        render: (doc) => <DashboardStatusBadge status={doc.status} />,
      },
      {
        header: "Action",
        align: "right",
        render: (doc) => (
          <DocumentActionButtons
            doc={doc}
            onView={setSelectedDoc}
            onDownload={handleDownload}
          />
        ),
      },
    ],
    [handleDownload],
  );

  const paymentColumns = useMemo(
    () => [
      {
        header: "Transaction ID",
        key: "id",
        cellClassName: "font-mono font-semibold text-slate-800 text-[11px]",
      },
      {
        header: "Description",
        key: "description",
        cellClassName: "font-medium text-slate-700",
      },
      {
        header: "Date",
        key: "date",
        cellClassName: "text-slate-500 font-medium",
      },
      {
        header: "Payment Method",
        key: "method",
        cellClassName: "text-slate-600 font-medium",
      },
      {
        header: "Amount",
        key: "amount",
        cellClassName: "font-bold text-slate-900",
      },
      {
        header: "Status",
        render: (payment) => (
          <DashboardStatusBadge status={payment.status} />
        ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      {/* Download Alert Toast */}
      <DownloadToast message={downloadSuccess} />

      {/* Top Welcome Header */}
      <DashboardHeader
        title="Welcome Back!"
        description="Manage your documents, review purchases, and access your subscription."
        action={
          <Link
            to="/paystub-generator"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-xs sm:text-sm transition shadow-xs hover:shadow active:scale-98 cursor-pointer"
          >
            <FilePlus className="w-4 h-4" />
            <span>Create a Document</span>
          </Link>
        }
      />

      {/* Stats Cards Grid (4 Cards Exactly as in Design) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={ICON_MAP[stat.iconKey]}
          />
        ))}
      </div>

      {/* Section 1: Recent Documents */}
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
        data={recentDocuments}
      />

      {/* Section 2: Recent Payment Activity */}
      <DashboardTable
        title="Recent Payment Activity"
        minWidth="min-w-[700px]"
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
        data={recentPayments}
      />

      {/* Document Details Modal */}
      {selectedDoc && (
        <DocumentDetailsModal
          doc={selectedDoc}
          onClose={handleCloseModal}
          onDownload={handleModalDownload}
        />
      )}
    </div>
  );
};

export default CustomerOverviewView;
