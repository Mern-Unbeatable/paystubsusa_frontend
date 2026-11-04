import React from "react";
import { DashboardHeader } from "../../../../components/Dashboard";

const AdminUsers = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Manage Users"
        description="View and manage customer accounts."
      />
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <p className="text-slate-600">Users management interface</p>
      </div>
    </div>
  );
};

export default AdminUsers;
