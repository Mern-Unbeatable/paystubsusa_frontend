import React from "react";
import { DashboardHeader } from "../../../../components/Dashboard";

const AdminTransactions = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Transactions"
        description="View and manage all payment transactions."
      />
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <p className="text-slate-600">Transactions management interface</p>
      </div>
    </div>
  );
};

export default AdminTransactions;
