import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { toast } from "react-hot-toast";
import logoImg from "../../../assets/logo.png";
import {
  ChevronDown,
  FileSpreadsheet,
  FileText,
  Landmark,
  LayoutGrid,
  LogOut,
  Menu,
  Receipt,
  Search,
  Tag,
  User,
  X,
} from "lucide-react";
import { useAuth } from "../../../pages/auth/hooks/useAuth";
import { useBodyScrollLock } from "../../../hooks/useBodyScrollLock";
import { PATHS } from "../../../config/paths";
import { ENV_CONFIG } from "../../../config/env";

const NAV_LINKS = [
  {
    name: "Paystub Generator",
    href: "/paystub-generator",
    icon: FileText,
    match: ["/paystub-generator", "/generator"],
  },
  { name: "W-2", href: "/w-2", icon: FileSpreadsheet, match: ["/w-2", "/w2"] },
  {
    name: "1099-NEC",
    href: "/1099-nec",
    icon: Receipt,
    match: ["/1099-nec", "/1099"],
  },
  {
    name: "Direct Deposit",
    href: "/direct-deposit",
    icon: Landmark,
    match: ["/direct-deposit"],
  },
  { name: "Pricing", href: "/pricing", icon: Tag, match: ["/pricing"] },
];

const FIND_PAYSTUBS_LINK = {
  name: "Find your Paystubs",
  href: "/find-paystubs",
  icon: Search,
  match: ["/find-paystubs", "/find-your-paystubs"],
};

const isLinkActive = (link, pathname) =>
  (link.match ?? [link.href]).some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

const getAccountLinks = (role) =>
  role === "admin"
    ? [
        { name: "Dashboard", href: PATHS.ADMIN.dashboard, icon: LayoutGrid },
        { name: "Profile", href: PATHS.ADMIN.profile, icon: User },
      ]
    : [
        { name: "Dashboard", href: PATHS.CUSTOMER.dashboard, icon: LayoutGrid },
        {
          name: "My Documents",
          href: PATHS.CUSTOMER.documents,
          icon: FileText,
        },
        { name: "Profile", href: PATHS.CUSTOMER.profile, icon: User },
      ];

const getInitials = (name = "") =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "U";

const UserAvatar = ({ user, size = "w-9 h-9 text-[13px]" }) =>
  user?.avatarUrl ? (
    <img
      src={`${ENV_CONFIG.apiBaseUrl}${user.avatarUrl}`}
      alt=""
      className={`${size} shrink-0 rounded-full object-cover ring-2 ring-white`}
    />
  ) : (
    <span
      className={`${size} shrink-0 rounded-full bg-secondary/10 text-secondary font-bold inline-flex items-center justify-center ring-2 ring-white`}
    >
      {getInitials(user?.name || user?.email)}
    </span>
  );

const AccountLinkItem = ({ link, onClick, className }) => {
  const Icon = link.icon;
  return (
    <Link
      to={link.href}
      role="menuitem"
      onClick={onClick}
      className={className}
    >
      <Icon className="w-4 h-4" />
      {link.name}
    </Link>
  );
};

const AccountMenu = ({ user, accountLinks, onLogout, isLoggingOut }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        className={`flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border transition cursor-pointer ${
          open
            ? "border-secondary bg-secondary/5"
            : "border-slate-200 hover:border-secondary/60"
        }`}
      >
        <span className="w-9 h-9 shrink-0 rounded-full bg-secondary/10 text-secondary inline-flex items-center justify-center ring-2 ring-white">
          <User className="w-5 h-5" />
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-slate-100 shadow-[0_12px_32px_rgba(15,23,42,0.12)] py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          <div className="px-4 py-2.5 flex items-center gap-3 border-b border-slate-100">
            <UserAvatar user={user} size="w-10 h-10 text-[14px]" />
            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-slate-900 truncate">
                {user?.name || "My Account"}
              </p>
              <p className="text-[12.5px] text-slate-500 truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <div className="py-1.5">
            {accountLinks.map((link) => (
              <AccountLinkItem
                key={link.href}
                link={link}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-[14px] text-slate-700 hover:bg-slate-50 hover:text-secondary transition"
              />
            ))}
          </div>
          <div className="pt-1.5 border-t border-slate-100">
            <button
              type="button"
              role="menuitem"
              onClick={onLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-[14px] font-medium text-rose-600 hover:bg-rose-50 transition cursor-pointer disabled:opacity-60"
            >
              <LogOut className="w-4 h-4" />
              {isLoggingOut ? "Logging out..." : "Log Out"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const DrawerNavItem = ({ link, isActive, onClick }) => {
  const Icon = link.icon;
  return (
    <Link
      to={link.href}
      onClick={onClick}
      className={`relative overflow-hidden flex items-center gap-3 px-3.5 py-2.5 rounded text-sm font-semibold transition no-underline ${
        isActive
          ? "bg-[#EAF5FF] text-[#009BFB]"
          : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
      }`}
    >
      {isActive && (
        <span className="absolute left-0 top-0 bottom-0 w-[4.5px] bg-[#009BFB]" />
      )}
      <Icon
        className={`w-4 h-4 shrink-0 ${isActive ? "text-[#009BFB]" : "text-slate-400"}`}
      />
      <span>{link.name}</span>
    </Link>
  );
};

const DrawerSectionLabel = ({ children }) => (
  <div className="px-3 mb-2.5">
    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
      {children}
    </span>
  </div>
);

const MobileNavDrawer = ({
  open,
  onClose,
  pathname,
  user,
  isAuthenticated,
  accountLinks,
  onLogout,
  isLoggingOut,
}) => {
  useBodyScrollLock(open);

  return (
    <div className="md:hidden">
      <div
        className={`fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 bottom-0 left-0 z-[70] w-72 max-w-[85vw] bg-white border-r border-slate-200/80 flex flex-col justify-between py-6 px-4 overflow-y-auto transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between px-2 mb-8">
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center transition-transform active:scale-98"
            >
              <img
                src={logoImg}
                alt="Logo"
                className="h-10 w-auto object-contain"
                loading="eager"
                decoding="async"
              />
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="p-1.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <DrawerSectionLabel>Menu</DrawerSectionLabel>
          <nav className="space-y-1">
            {[...NAV_LINKS, FIND_PAYSTUBS_LINK].map((link) => (
              <DrawerNavItem
                key={link.href}
                link={link}
                isActive={isLinkActive(link, pathname)}
                onClick={onClose}
              />
            ))}
          </nav>

          {isAuthenticated && (
            <>
              <div className="mt-6" />
              <DrawerSectionLabel>My Account</DrawerSectionLabel>
              <nav className="space-y-1">
                {accountLinks.map((link) => (
                  <DrawerNavItem
                    key={link.href}
                    link={link}
                    isActive={pathname === link.href}
                    onClick={onClose}
                  />
                ))}
              </nav>
            </>
          )}
        </div>

        <div className="pt-4 mt-6 border-t border-slate-100 space-y-3">
          {isAuthenticated ? (
            <>
              <div className="p-2.5 rounded bg-slate-50/80 border border-slate-100 flex items-center gap-3">
                <UserAvatar user={user} size="w-10 h-10 text-[14px]" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">
                    {user?.name || "My Account"}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <Link
                to="/paystub-generator"
                onClick={onClose}
                className="block w-full text-center font-semibold text-white bg-secondary py-2.5 rounded-lg shadow-sm hover:bg-[#0089e0] transition text-[14px]"
              >
                Generate Paystub
              </Link>
              <button
                type="button"
                onClick={onLogout}
                disabled={isLoggingOut}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded border border-rose-100 bg-rose-50/50 hover:bg-rose-100/70 text-rose-600 font-semibold text-xs transition cursor-pointer disabled:opacity-60"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{isLoggingOut ? "Logging out..." : "Log Out"}</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to={PATHS.AUTH.login}
                onClick={onClose}
                className="block w-full text-center font-medium text-secondary border border-secondary py-2.5 rounded-lg hover:bg-secondary/5 transition text-[14px]"
              >
                Sign In
              </Link>
              <Link
                to="/paystub-generator"
                onClick={onClose}
                className="block w-full text-center font-semibold text-white bg-secondary py-2.5 rounded-lg shadow-sm hover:bg-[#0089e0] transition text-[14px]"
              >
                Generate
              </Link>
            </>
          )}
        </div>
      </aside>
    </div>
  );
};

const NavbarLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const accountLinks = getAccountLinks(user?.role);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logout();
    } catch {
      toast.error("Logout failed. Please try again.", {
        id: "navbar-logout-error",
      });
    } finally {
      setIsLoggingOut(false);
      setMobileMenuOpen(false);
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Top Special Offer Announcement Bar */}
      <div className="w-full bg-secondary text-white text-sm sm:text-[15px] py-2.5 px-4 text-center font-medium tracking-wide shadow-inner">
        <span>
          Special Offer: Get 3 Paystubs for{" "}
          <strong className="font-bold text-white underline decoration-white/70 underline-offset-2">
            $24.99
          </strong>{" "}
          - Save 35%!
        </span>
      </div>

      {/* Main Navbar - Sticky pinned to top */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-50 shadow transition-all">
        <nav className="w-full">
          <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
            <div className="flex items-center justify-between h-20 sm:h-24">
              {/* Logo - Exactly matching Footer Logo size */}
              <div className="flex-shrink-0 flex items-center">
                <Link
                  to="/"
                  className="flex items-center group transition-transform active:scale-98"
                >
                  <img
                    src={logoImg}
                    alt="Logo"
                    className="h-10 sm:h-12 w-auto object-contain transition-all duration-200"
                    loading="eager"
                    decoding="async"
                  />
                </Link>
              </div>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center space-x-7 xl:space-x-9">
                {NAV_LINKS.map((link) => {
                  const isActive = isLinkActive(link, location.pathname);

                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`text-[15px] xl:text-[16px] transition-colors duration-200 ${
                        isActive
                          ? "text-secondary font-semibold underline decoration-2 underline-offset-8"
                          : "font-medium text-slate-700 hover:text-secondary"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              {/* Desktop Actions */}
              <div className="hidden md:flex items-center space-x-4 lg:space-x-5">
                <Link
                  to={FIND_PAYSTUBS_LINK.href}
                  className={`text-[15px] font-medium transition-colors ${
                    isLinkActive(FIND_PAYSTUBS_LINK, location.pathname)
                      ? "text-secondary font-semibold underline underline-offset-4"
                      : "text-secondary hover:text-[#0080d0] hover:underline underline-offset-4"
                  }`}
                >
                  Find your Paystubs
                </Link>
                {isAuthenticated ? (
                  <AccountMenu
                    user={user}
                    accountLinks={accountLinks}
                    onLogout={handleLogout}
                    isLoggingOut={isLoggingOut}
                  />
                ) : (
                  <Link
                    to={PATHS.AUTH.login}
                    className={`text-[14px] font-medium border px-4 py-2.5 rounded-lg transition-all duration-200 cursor-pointer shadow-xs ${
                      location.pathname === PATHS.AUTH.login ||
                      location.pathname === "/signin"
                        ? "bg-secondary text-white border-secondary"
                        : "text-secondary hover:text-white border-secondary hover:bg-secondary"
                    }`}
                  >
                    Sign In
                  </Link>
                )}
                <Link
                  to="/paystub-generator"
                  className="text-[14px] font-semibold text-white bg-secondary hover:bg-[#0089e0] px-5 py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 inline-block text-center"
                >
                  Generate Paystub
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex md:hidden items-center">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-2 rounded-md text-slate-600 hover:text-secondary hover:bg-slate-50 focus:outline-hidden"
                  aria-label="Open navigation menu"
                  aria-expanded={mobileMenuOpen}
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <MobileNavDrawer
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
        pathname={location.pathname}
        user={user}
        isAuthenticated={isAuthenticated}
        accountLinks={accountLinks}
        onLogout={handleLogout}
        isLoggingOut={isLoggingOut}
      />
    </>
  );
};

export default NavbarLayout;
