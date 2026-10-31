import React from 'react';
import { Link } from 'react-router';
import logoImg from '../assets/logo.png';

const FooterLayout = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 text-sm py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg">
              <img src={logoImg} alt="Logo" className="h-7 w-auto object-contain" />
            </div>
            <span className="text-white font-medium text-base ml-2">Paystub Generator</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition">Terms of Service</a>
            <a href="#contact" className="hover:text-white transition">Contact Us</a>
            <a href="#support" className="hover:text-white transition">Support</a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Paystub Generator. All rights reserved.</p>
          <p>Created for professional, fast, and secure business documentation.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterLayout;
