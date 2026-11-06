import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  FileText,
  LayoutGrid,
  CreditCard,
  Star,
  FilePlus,
  Eye,
  Download,
  ArrowRight,
  CheckCircle2,
  X,
} from "lucide-react";
import {
  DashboardHeader,
  DashboardTable,
} from "../../../../../Components/Dashboard";
import { DashboardStatusBadge } from "../../../../../layouts";
import DocumentDetailsModal from "../../components/modals/DocumentDetailsModal";
import stats from "../../data/overview/stats.json";
import recentDocuments from "../../data/overview/recentDocuments.json";
import transactions from "../../data/payments/transactions.json";

const STAT_ICON_MAP = {
  FileText,
  LayoutGrid,
  CreditCard,
  Star,
};
const RECENT_PAYMENTS_LIMIT = 3;
const DOWNLOAD_TOAST_DURATION_MS = 2500;

const CustomerOverview = ({ setActiveTab }) => {
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

  const handleGoToDocuments = useCallback(() => {
    if (setActiveTab) {
      setActiveTab("documents");
    }
  }, [setActiveTab]);

  const handleGoToPayments = useCallback(() => {
    if (setActiveTab) {
      setActiveTab("payments");
    }
  }, [setActiveTab]);

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
              <div className="text-xs text-slate-400 font-mono">{doc.id}</div>
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
          <div className="inline-flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedDoc(doc)}
              className="w-7 h-7 rounded border border-slate-200 text-slate-500 hover:text-[#009BFB] hover:border-[#009BFB] hover:bg-sky-50/40 flex items-center justify-center transition cursor-pointer"
              title="View Document"
              aria-label={`View ${doc.name}`}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleDownload(doc.name)}
              className="w-7 h-7 rounded border border-slate-200 text-slate-500 hover:text-[#009BFB] hover:border-[#009BFB] hover:bg-sky-50/40 flex items-center justify-center transition cursor-pointer"
              title="Download Document"
              aria-label={`Download ${doc.name}`}
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
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
        cellClassName: "font-mono font-semibold text-slate-800 text-xs",
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
        render: (payment) => <DashboardStatusBadge status={payment.status} />,
      },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      {/* Download Alert Toast */}
      {downloadSuccess && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded shadow-lg flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{downloadSuccess}</span>
        </div>
      )}

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
        {stats.map((stat, idx) => {
          const Icon = STAT_ICON_MAP[stat.iconKey];
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-5 flex flex-col justify-between hover:border-slate-200 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  {stat.title}
                </span>
                <div className="w-7 h-7 rounded bg-[#EBF5FF] text-[#009BFB] flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-400 font-medium mt-1">
                  {stat.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Section 1: Recent Documents */}
      <DashboardTable
        title="Recent Documents"
        minWidth="min-w-[600px]"
        headerAction={
          <button
            type="button"
            onClick={handleGoToDocuments}
            className="text-xs font-semibold text-[#009BFB] hover:text-[#0089e0] hover:underline inline-flex items-center gap-1 cursor-pointer transition"
          >
            <span>View all documents</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        }
        columns={documentColumns}
        data={recentDocuments}
      />

      {/* Section 2: Recent Payment Activity */}
      <DashboardTable
        title="Recent Payment Activity"
        minWidth="min-w-[700px]"
        headerAction={
          <button
            type="button"
            onClick={handleGoToPayments}
            className="text-xs font-semibold text-[#009BFB] hover:text-[#0089e0] hover:underline inline-flex items-center gap-1 cursor-pointer transition"
          >
            <span>View payment history</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        }
        columns={paymentColumns}
        data={recentPayments}
      />

      {/* Document Details Modal */}
      {selectedDoc && (
        <DocumentDetailsModal
          doc={selectedDoc}
          onClose={() => setSelectedDoc(null)}
          onDownload={handleModalDownload}
        />
      )}
    </div>
  );
};

export default CustomerOverview;
