import React, { useState } from "react";
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
} from "lucide-react";
import { DocumentDetailsModal } from "../components/modals";
import {
  DashboardHeader,
  DashboardTable,
} from "../../../../components/Dashboard";
import { DashboardStatusBadge } from "../../../../layouts";

const stats = [
  {
    title: "Total Documents",
    value: "12",
    change: "All-time documents",
    icon: FileText,
  },
  {
    title: "Paystubs Created",
    value: "8",
    change: "67% of your documents",
    icon: LayoutGrid,
  },
  {
    title: "Total Purchases",
    value: "10",
    change: "Successful purchases",
    icon: CreditCard,
  },
  {
    title: "Subscription Status",
    value: "Active",
    change: "Unlimited Access",
    icon: Star,
  },
];

const recentDocuments = [
  {
    id: "PS-2025-0841",
    name: "Paystub - May 2025",
    type: "Paystub",
    date: "May 28, 2025",
    status: "Completed",
  },
  {
    id: "W2-2025-1120",
    name: "W-2 Form - 2024",
    type: "W-2",
    date: "May 22, 2025",
    status: "Completed",
  },
  {
    id: "PS-2025-0723",
    name: "Paystub - April 2025",
    type: "Paystub",
    date: "May 03, 2025",
    status: "Completed",
  },
];

const recentPayments = [
  {
    id: "TXN-9182746",
    description: "Paystub - May 2025",
    date: "May 28, 2025",
    method: "Visa **** 4821",
    amount: "$14.99",
    status: "Successful",
  },
  {
    id: "TXN-9191822",
    description: "W-2 Form - 2024",
    date: "May 22, 2025",
    method: "Visa **** 4821",
    amount: "$19.99",
    status: "Successful",
  },
  {
    id: "TXN-9178021",
    description: "Paystub - April 2025",
    date: "May 03, 2025",
    method: "Mastercard **** 1092",
    amount: "$14.99",
    status: "Successful",
  },
];

const StatCard = ({ title, value, change, icon: Icon }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-5 flex flex-col justify-between hover:border-slate-200 transition-colors">
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold text-slate-500">{title}</span>
      <div className="w-7 h-7 rounded bg-[#EBF5FF] text-[#009BFB] flex items-center justify-center">
        <Icon className="w-3.5 h-3.5" />
      </div>
    </div>
    <div className="mt-3">
      <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
        {value}
      </div>
      <div className="text-[11px] text-slate-400 font-medium mt-1">
        {change}
      </div>
    </div>
  </div>
);

const DocumentActionButtons = ({ doc, onView, onDownload }) => (
  <div className="inline-flex items-center gap-2">
    <button
      type="button"
      onClick={() => onView(doc)}
      className="w-7 h-7 rounded border border-slate-200 text-slate-500 hover:text-[#009BFB] hover:border-[#009BFB] hover:bg-sky-50/40 flex items-center justify-center transition cursor-pointer"
      title="View Document"
      aria-label={`View ${doc.name}`}
    >
      <Eye className="w-3.5 h-3.5" />
    </button>
    <button
      type="button"
      onClick={() => onDownload(doc.name)}
      className="w-7 h-7 rounded border border-slate-200 text-slate-500 hover:text-[#009BFB] hover:border-[#009BFB] hover:bg-sky-50/40 flex items-center justify-center transition cursor-pointer"
      title="Download Document"
      aria-label={`Download ${doc.name}`}
    >
      <Download className="w-3.5 h-3.5" />
    </button>
  </div>
);

const CustomerOverview = () => {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  const handleDownload = (docName) => {
    setDownloadSuccess(`Downloading ${docName}...`);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 2500);
  };

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
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
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
        columns={[
          {
            header: "Document Name",
            render: (doc) => (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#EBF5FF] text-[#009BFB] flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs">
                    {doc.name}
                  </div>
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
        ]}
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
        columns={[
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
        ]}
        data={recentPayments}
      />

      {/* Document Details Modal */}
      {selectedDoc && (
        <DocumentDetailsModal
          doc={selectedDoc}
          onClose={() => setSelectedDoc(null)}
          onDownload={(name) => {
            handleDownload(name);
            setSelectedDoc(null);
          }}
        />
      )}
    </div>
  );
};

export default CustomerOverview;
