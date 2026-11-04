import React from "react";
import { DashboardHeader } from "../../../../components/Dashboard";

const AdminDocuments = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Documents"
        description="View and manage all platform documents."
      />
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <p className="text-slate-600">Documents management interface</p>
      </div>
    </div>
  );
};

export default AdminDocuments;
