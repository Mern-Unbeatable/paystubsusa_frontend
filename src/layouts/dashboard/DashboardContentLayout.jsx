import React from "react";
import { Outlet } from "react-router";
import DashboardMobileHeader from "../navigation/dash/DashboardMobileHeader";

const DashboardContentLayout = ({ onOpenSidebar }) => {
  return (
    <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
      <DashboardMobileHeader onOpenSidebar={onOpenSidebar} />

      <main className="flex-1 p-6 sm:p-8 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardContentLayout;
