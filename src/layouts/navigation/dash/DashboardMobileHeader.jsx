import React from "react";
import { Link } from "react-router";
import { Menu } from "lucide-react";
import logoImg from "../../../assets/logo.png";

const DashboardMobileHeader = ({ onOpenSidebar }) => {
  return (
    <header className="lg:hidden sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 flex items-center justify-between">
      <button
        type="button"
        onClick={onOpenSidebar}
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
  );
};

export default DashboardMobileHeader;
