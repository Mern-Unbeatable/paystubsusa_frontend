import React, { useState } from "react";
import DashboardSidebar from "../navigation/dash/DashboardSidebar";
import DashboardContentLayout from "./DashboardContentLayout";

const DashboardLayout = ({ role = "customer" }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex select-none">
      <DashboardSidebar
        role={role}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <DashboardContentLayout onOpenSidebar={() => setMobileOpen(true)} />
    </div>
  );
};

export default DashboardLayout;
