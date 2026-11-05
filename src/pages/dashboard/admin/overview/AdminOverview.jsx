import React from "react";
import { Link } from "react-router";
import { DashboardStatusBadge } from "../../../../layouts";
import { DashboardHeader, DashboardTable } from "../../../../components/Dashboard";
import {
  FileText,
  CreditCard,
  Users,
  FilePlus,
  Eye,
  Download,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const AdminOverview = () => {
  const adminStats = [
    {
      title: "Total Revenue",
      value: "$24,850",
      change: "+14% from last month",
      icon: CreditCard,
    },
    {
      title: "Total Documents",
      value: "1,420",
      change: "All user generated files",
      icon: FileText,
    },
    {
      title: "Active Customers",
      value: "382",
      change: "88% active this week",
      icon: Users,
    },
    {
      title: "System Status",
      value: "Optimal",
      change: "99.98% calculation uptime",
      icon: ShieldCheck,
    },
  ];

  const adminRecentDocs = [
    {
      id: "DOC-2025-9921",
      user: "Sarah Jenkins",
      name: "Paystub - May 2025",
      type: "Paystub",
      date: "May 28, 2025",
      status: "Completed",
    },
    {
      id: "DOC-2025-9920",
      user: "Michael Chang",
      name: "W-2 Form - 2024",
      type: "W-2",
      date: "May 28, 2025",
      status: "Completed",
    },
    {
      id: "DOC-2025-9919",
      user: "Atik Adnan",
      name: "Paystub - May 2025",
      type: "Paystub",
      date: "May 28, 2025",
      status: "Completed",
    },
  ];

  const adminRecentPayments = [
    {
      id: "TXN-984021",
      user: "Sarah Jenkins",
      description: "Paystub - May 2025",
      date: "May 28, 2025",
      method: "Visa **** 4821",
      amount: "$14.99",
      status: "Successful",
    },
    {
      id: "TXN-984020",
      user: "Michael Chang",
      description: "W-2 Form - 2024",
      date: "May 28, 2025",
      method: "Mastercard **** 8820",
      amount: "$19.99",
      status: "Successful",
    },
    {
      id: "TXN-984019",
      user: "Atik Adnan",
      description: "Paystub - May 2025",
      date: "May 28, 2025",
      method: "Visa **** 4821",
      amount: "$14.99",
      status: "Successful",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <DashboardHeader
        title="Platform Overview"
        description="Monitor platform activity, customer documents, transaction volume, and system health."
        badge={
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#EBF5FF] text-[#009BFB] border border-slate-300">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Management Portal</span>
          </div>
        }
        action={
          <>
            <Link
              to="/customer/overview"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition"
            >
              <span>View Customer Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/paystub-generator"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-xs transition shadow-xs"
            >
              <FilePlus className="w-3.5 h-3.5" />
              <span>Generate Document</span>
            </Link>
          </>
        }
      />

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {adminStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-5 flex flex-col justify-between"
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
                <div className="text-[11px] text-slate-400 font-medium mt-1">
                  {stat.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Platform Documents */}
      <DashboardTable
        title="Recent Platform Documents"
        minWidth="min-w-[700px]"
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
            header: "User",
            key: "user",
            cellClassName: "font-medium text-slate-800",
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
                  onClick={() =>
                    alert(`Reviewing ${doc.name} for ${doc.user}`)
                  }
                  className="w-7 h-7 rounded border border-slate-200 text-slate-500 hover:text-[#009BFB] hover:border-[#009BFB] flex items-center justify-center transition cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => alert(`Downloading PDF copy...`)}
                  className="w-7 h-7 rounded border border-slate-200 text-slate-500 hover:text-[#009BFB] hover:border-[#009BFB] flex items-center justify-center transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            ),
          },
        ]}
        data={adminRecentDocs}
      />

      {/* Recent Payment Transactions */}
      <DashboardTable
        title="Recent Payment Transactions"
        minWidth="min-w-[700px]"
        columns={[
          {
            header: "Transaction ID",
            key: "id",
            cellClassName: "font-mono font-semibold text-slate-800 text-[11px]",
          },
          {
            header: "User",
            key: "user",
            cellClassName: "font-medium text-slate-800",
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
            header: "Method",
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
        data={adminRecentPayments}
      />
    </div>
  );
};

export default AdminOverview;
