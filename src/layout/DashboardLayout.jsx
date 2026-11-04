import React, { useState } from 'react';
import { Outlet, Link } from 'react-router';
import { Menu } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { DashboardSidebar } from '../pages/dashboard/shared';

const DashboardLayout = ({ role = 'customer', children, activeTab, setActiveTab }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex select-none">
      {/* Sidebar */}
      <DashboardSidebar
        role={role}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Mobile Header Bar */}
        <header className="lg:hidden sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center">
            <img
              src={logoImg}
              alt="Paystuba"
              className="h-8 w-auto object-contain"
              loading="eager"
              decoding="async"
            />
          </Link>

          <div className="w-9" />
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 sm:p-8 w-full">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
