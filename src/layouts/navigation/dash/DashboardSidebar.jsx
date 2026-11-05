import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import logoImg from "../../../assets/logo.png";
import atikAvatar from "../../../assets/atik_avatar.png";
import { useAuth } from "../../../hooks/useAuth";
import {
  LayoutGrid,
  FileText,
  CreditCard,
  Star,
  HelpCircle,
  User,
  LogOut,
  X,
} from "lucide-react";

const CUSTOMER_NAV_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutGrid,
    path: "/customer/overview",
  },
  {
    id: "documents",
    label: "My Documents",
    icon: FileText,
    path: "/customer/documents",
  },
  {
    id: "payments",
    label: "Payment History",
    icon: CreditCard,
    path: "/customer/payments",
  },
  {
    id: "subscription",
    label: "Subscription",
    icon: Star,
    path: "/customer/subscription",
  },
  {
    id: "help",
    label: "Help Center",
    icon: HelpCircle,
    path: "/customer/help",
  },
  { id: "profile", label: "Profile", icon: User, path: "/customer/profile" },
];

const ADMIN_NAV_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutGrid,
    path: "/admin/overview",
  },
  {
    id: "users",
    label: "Manage Users",
    icon: FileText,
    path: "/admin/users",
  },
  {
    id: "documents",
    label: "Documents",
    icon: FileText,
    path: "/admin/documents",
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: CreditCard,
    path: "/admin/transactions",
  },
];

const PORTAL_META = {
  admin: {
    label: "Admin Portal",
    userName: "Admin Manager",
    userRole: "Super Admin",
  },
  customer: {
    label: "Customer Portal",
    userName: "Atik Adnan",
    userRole: "Customer",
  },
};

const getNavItems = (role) =>
  role === "admin" ? ADMIN_NAV_ITEMS : CUSTOMER_NAV_ITEMS;

const NavItemLink = ({ item, isActive, onClick }) => {
  const Icon = item.icon;

  return (
    <Link
      key={item.id}
      to={item.path}
      onClick={onClick}
      className={`relative overflow-hidden flex items-center gap-3 px-3.5 py-2.5 rounded text-xs sm:text-sm font-semibold transition text-left no-underline ${
        isActive
          ? "bg-[#EAF5FF] text-[#009BFB]"
          : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
      }`}
    >
      {isActive && (
        <span className="absolute left-0 top-0 bottom-0 w-[4.5px] bg-[#009BFB]" />
      )}

      <Icon
        className={`w-4 h-4 flex-shrink-0 transition-colors ${
          isActive
            ? "text-[#009BFB]"
            : "text-slate-400 group-hover:text-slate-600"
        }`}
      />
      <span>{item.label}</span>
    </Link>
  );
};

const SidebarHeader = ({ setMobileOpen }) => (
  <div className="flex items-center justify-between px-2 mb-8">
    <Link
      to="/"
      className="flex items-center group transition-transform active:scale-98"
    >
      <img
        src={logoImg}
        alt="Paystuba"
        className="h-10 w-auto object-contain"
        loading="eager"
        decoding="async"
      />
    </Link>

    {setMobileOpen && (
      <button
        type="button"
        onClick={() => setMobileOpen(false)}
        className="lg:hidden p-1.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
      >
        <X className="w-5 h-5" />
      </button>
    )}
  </div>
);

const UserSummaryCard = ({ role }) => {
  const meta = PORTAL_META[role === "admin" ? "admin" : "customer"];

  return (
    <div className="p-2.5 rounded bg-slate-50/80 border border-slate-100 flex items-center gap-3">
      <div className="relative">
        <img
          src={atikAvatar}
          alt={meta.userName}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-xs"
          loading="lazy"
          decoding="async"
        />
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-slate-800 truncate">
          {meta.userName}
        </p>
        <p className="text-[11px] text-slate-400 capitalize">{meta.userRole}</p>
      </div>
    </div>
  );
};

const LogoutButton = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded border border-rose-100 bg-rose-50/50 hover:bg-rose-100/70 text-rose-600 font-semibold text-xs transition cursor-pointer"
  >
    <LogOut className="w-3.5 h-3.5" />
    <span>Log Out</span>
  </button>
);

const DashboardSidebar = ({ role, mobileOpen = false, setMobileOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const effectiveRole = role || user?.role || "customer";
  const portalMeta =
    PORTAL_META[effectiveRole === "admin" ? "admin" : "customer"];
  const navItems = getNavItems(effectiveRole);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // State is still cleared for secure local logout even if API logout fails.
    }
    navigate("/login");
  };

  const handleNavClick = () => {
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between py-6 px-4 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col">
          <SidebarHeader setMobileOpen={setMobileOpen} />

          <div className="px-3 mb-2.5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {portalMeta.label}
            </span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavItemLink
                key={item.id}
                item={item}
                isActive={isActive(item.path)}
                onClick={handleNavClick}
              />
            ))}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-3">
          <UserSummaryCard role={effectiveRole} />
          <LogoutButton onClick={handleLogout} />
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
