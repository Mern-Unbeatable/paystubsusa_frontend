import React from "react";
import { Eye, Download, FileText } from "lucide-react";
import {
  DashboardHeader,
  DashboardTable,
} from "../../../../components/Dashboard";
import { DashboardStatusBadge } from "../../../../layouts";

const documents = [
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
    status: "Pending",
  },
];

const DocumentActionButtons = ({ doc }) => (
  <div className="inline-flex items-center gap-2">
    <button
      type="button"
      onClick={() => alert(`Reviewing ${doc.name}`)}
      className="w-7 h-7 rounded border border-slate-200 text-slate-500 hover:text-[#009BFB] hover:border-[#009BFB] flex items-center justify-center transition cursor-pointer"
      aria-label={`Review ${doc.name}`}
    >
      <Eye className="w-3.5 h-3.5" />
    </button>
    <button
      type="button"
      onClick={() => alert(`Downloading ${doc.name}`)}
      className="w-7 h-7 rounded border border-slate-200 text-slate-500 hover:text-[#009BFB] hover:border-[#009BFB] flex items-center justify-center transition cursor-pointer"
      aria-label={`Download ${doc.name}`}
    >
      <Download className="w-3.5 h-3.5" />
    </button>
  </div>
);

const AdminDocumentsView = () => (
  <div className="space-y-6">
    <DashboardHeader
      title="Documents"
      description="View and manage all platform documents."
    />

    <DashboardTable
      title="All Platform Documents"
      minWidth="min-w-[750px]"
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
          header: "Date",
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
          render: (doc) => <DocumentActionButtons doc={doc} />,
        },
      ]}
      data={documents}
    />
  </div>
);

export default AdminDocumentsView;
