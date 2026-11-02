import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import logoImg from '../../assets/logo.png';
import atikAvatar from '../../assets/atik_avatar.png';
import {
  LayoutGrid,
  FileText,
  CreditCard,
  Star,
  HelpCircle,
  User,
  LogOut,
  X,
  FilePlus,
  ShieldCheck
} from 'lucide-react';

const DashboardSidebar = ({
  role,
  activeTab = 'overview',
  setActiveTab,
  mobileOpen = false,
  setMobileOpen
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const storedRole = typeof window !== 'undefined' ? localStorage.getItem('auth_role') : null;
  const effectiveRole = role || storedRole || 'customer';

  const handleLogout = () => {
    try {
      localStorage.removeItem('auth_role');
      localStorage.removeItem('auth_user');
    } catch (e) {}
    navigate('/login');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'documents', label: 'My Documents', icon: FileText },
    { id: 'payments', label: 'Payment History', icon: CreditCard },
    { id: 'subscription', label: 'Subscription', icon: Star },
    { id: 'help', label: 'Help Center', icon: HelpCircle },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handleItemClick = (id) => {
    if (setActiveTab) {
      setActiveTab(id);
    }
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between py-6 px-4 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Branding & Nav */}
        <div className="flex flex-col">
          {/* Logo & Mobile Close */}
          <div className="flex items-center justify-between px-2 mb-8">
            <Link to="/" className="flex items-center group transition-transform active:scale-98">
              <img
                src={logoImg}
                alt="Paystuba"
                className="h-10 w-auto object-contain"
              />
            </Link>

            {setMobileOpen && (
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Section Category Title */}
          <div className="px-3 mb-2.5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {effectiveRole === 'admin' ? 'Admin Portal' : 'Customer Portal'}
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item.id)}
                  className={`relative overflow-hidden w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#EAF5FF] text-[#009BFB]'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {/* Active Left Indicator Bar */}
                  {isActive && (
                    <span className="absolute left-0 top-0 bottom-0 w-[4.5px] bg-[#009BFB]" />
                  )}

                  <Icon
                    className={`w-4 h-4 flex-shrink-0 transition-colors ${
                      isActive ? 'text-[#009BFB]' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Card & Logout */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          {/* User Profile Card */}
          <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center gap-3">
            <div className="relative">
              <img
                src={atikAvatar}
                alt="Atik Adnan"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-xs"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">
                {effectiveRole === 'admin' ? 'Admin Manager' : 'Atik Adnan'}
              </p>
              <p className="text-[11px] text-slate-400 capitalize">
                {effectiveRole === 'admin' ? 'Super Admin' : 'Customer'}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-rose-100 bg-rose-50/50 hover:bg-rose-100/70 text-rose-600 font-semibold text-xs transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
