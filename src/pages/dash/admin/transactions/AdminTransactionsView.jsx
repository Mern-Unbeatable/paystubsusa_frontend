import React from "react";
import { Eye } from "lucide-react";
import {
  DashboardHeader,
  DashboardTable,
} from "../../../../Components/Dashboard";
import { DashboardStatusBadge } from "../../../../layouts";
import transactions from "../data/transactions/transactions.json";

const AdminTransactionsView = () => (
  <div className="space-y-6">
    <DashboardHeader
      title="Transactions"
      description="View and manage all payment transactions."
    />

    <DashboardTable
      title="Payment Transactions"
      minWidth="min-w-[800px]"
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
          render: (tx) => <DashboardStatusBadge status={tx.status} />,
        },
        {
          header: "Action",
          align: "right",
          render: () => (
            <button
              type="button"
              onClick={() => alert("Opening payment details")}
              className="text-xs font-semibold text-[#009BFB] hover:text-[#0089e0] hover:underline cursor-pointer transition"
            >
              View Details
            </button>
          ),
        },
      ]}
      data={transactions}
    />
  </div>
);

export default AdminTransactionsView;
