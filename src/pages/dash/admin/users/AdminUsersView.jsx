import React from "react";
import { UserCog, ShieldCheck, Mail } from "lucide-react";
import {
  DashboardHeader,
  DashboardTable,
} from "../../../../Components/Dashboard";
import { DashboardStatusBadge } from "../../../../layouts";
import users from "../data/users/users.json";

const AdminUsersView = () => (
  <div className="space-y-6">
    <DashboardHeader
      title="Manage Users"
      description="View and manage customer accounts."
    />

    <DashboardTable
      title="Customer Accounts"
      minWidth="min-w-[700px]"
      columns={[
        {
          header: "User",
          render: (user) => (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#EBF5FF] text-[#009BFB] flex items-center justify-center flex-shrink-0">
                <UserCog className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs">
                  {user.name}
                </div>
                <div className="text-[10.5px] text-slate-400 font-mono">
                  {user.id}
                </div>
              </div>
            </div>
          ),
        },
        {
          header: "Email",
          render: (user) => (
            <div className="flex items-center gap-2 text-slate-600 font-medium">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{user.email}</span>
            </div>
          ),
        },
        {
          header: "Plan",
          key: "plan",
          cellClassName: "text-slate-600 font-medium",
        },
        {
          header: "Last Active",
          key: "lastActive",
          cellClassName: "text-slate-500 font-medium",
        },
        {
          header: "Status",
          render: (user) => <DashboardStatusBadge status={user.status} />,
        },
        {
          header: "Access",
          align: "right",
          render: () => (
            <div className="inline-flex items-center gap-2 text-[#009BFB]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">Manage</span>
            </div>
          ),
        },
      ]}
      data={users}
    />
  </div>
);

export default AdminUsersView;
