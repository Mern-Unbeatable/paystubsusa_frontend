import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import logoImg from '../assets/logo.png';
import { Menu, X } from 'lucide-react';

const NavbarLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Paystub Generator', href: '/paystub-generator' },
    { name: 'W-2', href: '/w-2' },
    { name: '1099-NEC', href: '/1099-nec' },
    { name: 'Direct Deposit', href: '/direct-deposit' },
    { name: 'Pricing', href: '/pricing' },
  ];

  return (
    <>
      {/* Top Special Offer Announcement Bar */}
      <div className="w-full bg-secondary text-white text-sm sm:text-[15px] py-2.5 px-4 text-center font-medium tracking-wide shadow-inner">
        <span>
          Special Offer: Get 3 Paystubs for <strong className="font-bold text-white underline decoration-white/70 underline-offset-2">$24.99</strong> - Save 35%!
        </span>
      </div>

      {/* Main Navbar - Sticky pinned to top */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all">
        <nav className="w-full">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="flex items-center justify-between h-20 sm:h-24">
              {/* Logo - Exactly matching Footer Logo size */}
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="flex items-center group transition-transform active:scale-98">
                  <img
                    src={logoImg}
                    alt="Logo"
                    className="h-10 sm:h-12 w-auto object-contain transition-all duration-200"
                  />
                </Link>
              </div>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center space-x-7 xl:space-x-9">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === '/paystub-generator'
                      ? location.pathname === '/paystub-generator' || location.pathname === '/generator'
                      : link.href === '/w-2'
                      ? location.pathname === '/w-2' || location.pathname === '/w2'
                      : link.href === '/1099-nec'
                      ? location.pathname === '/1099-nec' || location.pathname === '/1099'
                      : link.href === '/direct-deposit'
                      ? location.pathname === '/direct-deposit'
                      : link.href === '/pricing'
                      ? location.pathname === '/pricing'
                      : false;

                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`text-[15px] xl:text-[16px] transition-colors duration-200 ${
                        isActive
                          ? 'text-secondary font-semibold'
                          : 'font-medium text-slate-700 hover:text-secondary'
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
                  to="/find-paystubs"
                  className={`text-[15px] font-medium transition-colors ${
                    location.pathname === '/find-paystubs' || location.pathname === '/find-your-paystubs'
                      ? 'text-secondary font-semibold underline underline-offset-4'
                      : 'text-secondary hover:text-[#0080d0] hover:underline underline-offset-4'
                  }`}
                >
                  Find your Paystubs
                </Link>
                <Link
                  to="/login"
                  className={`text-[14px] font-medium border px-4 py-2.5 rounded-lg transition-all duration-200 cursor-pointer shadow-xs ${
                    location.pathname === '/login' || location.pathname === '/signin'
                      ? 'bg-secondary text-white border-secondary'
                      : 'text-secondary hover:text-white border-secondary hover:bg-secondary'
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  to="/paystub-generator"
                  className="text-[14px] font-semibold text-white bg-secondary hover:bg-[#0089e0] px-5 py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 inline-block text-center"
                >
                  Create Paystub
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex md:hidden items-center">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-md text-slate-600 hover:text-secondary hover:bg-slate-50 focus:outline-hidden"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex flex-col space-y-2.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium text-slate-700 hover:text-secondary py-1.5 px-2 rounded-md hover:bg-slate-50 transition"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="pt-3 border-t border-slate-100 flex flex-col space-y-3">
                <Link
                  to="/find-paystubs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center font-medium text-secondary py-2 text-[15px]"
                >
                  Find your Paystubs
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center font-medium text-secondary border border-secondary py-2.5 rounded-lg hover:bg-secondary/5 transition text-[14px]"
                >
                  Sign In
                </Link>
                <Link
                  to="/paystub-generator"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center font-semibold text-white bg-secondary py-2.5 rounded-lg shadow-sm hover:bg-[#0089e0] transition text-[14px] inline-block"
                >
                  Create Paystub
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default NavbarLayout;