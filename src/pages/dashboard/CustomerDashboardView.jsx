import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import DashboardLayout from '../../layout/DashboardLayout';
import CustomerOverview from '../../Components/Dashboard/CustomerOverview';
import MyDocumentsView from '../../Components/Dashboard/MyDocumentsView';
import PaymentHistoryView from '../../Components/Dashboard/PaymentHistoryView';
import SubscriptionView from '../../Components/Dashboard/SubscriptionView';
import {
  FileText,
  CreditCard,
  Star,
  HelpCircle,
  User,
  Search,
  Download,
  Eye,
  CheckCircle2,
  FilePlus,
  Mail,
  Shield,
  Phone
} from 'lucide-react';

const CustomerDashboardView = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const allDocuments = [
    { id: 'PS-2025-0841', name: 'Paystub - May 2025', type: 'Paystub', date: 'May 28, 2025', status: 'Completed', amount: '$14.99' },
    { id: 'W2-2025-1120', name: 'W-2 Form - 2024', type: 'W-2', date: 'May 22, 2025', status: 'Completed', amount: '$19.99' },
    { id: 'PS-2025-0723', name: 'Paystub - April 2025', type: 'Paystub', date: 'May 03, 2025', status: 'Completed', amount: '$14.99' },
    { id: 'PS-2025-0612', name: 'Paystub - March 2025', type: 'Paystub', date: 'Apr 02, 2025', status: 'Completed', amount: '$14.99' },
    { id: 'NEC-2024-0045', name: '1099-NEC Form 2024', type: '1099-NEC', date: 'Mar 15, 2025', status: 'Completed', amount: '$16.99' },
    { id: 'PS-2025-0501', name: 'Paystub - February 2025', type: 'Paystub', date: 'Feb 28, 2025', status: 'Completed', amount: '$14.99' },
  ];

  return (
    <DashboardLayout
      role="customer"
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {/* 1. Overview Tab (The exact Figma layout) */}
      {activeTab === 'overview' && (
        <CustomerOverview setActiveTab={setActiveTab} />
      )}

      {/* 2. My Documents Tab (Matching Figma Exactly) */}
      {activeTab === 'documents' && (
        <MyDocumentsView />
      )}

      {/* 3. Payment History Tab (Matching Figma Exactly) */}
      {activeTab === 'payments' && (
        <PaymentHistoryView />
      )}

      {/* 4. Subscription Tab (Matching Figma Exactly) */}
      {activeTab === 'subscription' && (
        <SubscriptionView />
      )}

      {/* 5. Help Center Tab */}
      {activeTab === 'help' && (
        <div className="space-y-6 max-w-4xl">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Help Center &amp; Support
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Find quick answers or get in touch with our dedicated payroll and tax support team.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#EBF5FF] text-[#009BFB] flex items-center justify-center mb-3">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Email Support</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Have questions about tax calculations or billing? Reach out to support@paystuba.com anytime.
                </p>
              </div>
              <a
                href="mailto:support@paystuba.com"
                className="mt-4 inline-flex items-center text-xs font-semibold text-[#009BFB] hover:underline"
              >
                Send an email →
              </a>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Security &amp; Compliance</h3>
                <p className="text-xs text-slate-500 mt-1">
                  All documents are generated using official IRS and state tax deduction formulas with 256-bit encryption.
                </p>
              </div>
              <span className="mt-4 text-xs font-semibold text-emerald-600">
                100% IRS Compliant
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 6. Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6 max-w-2xl">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              User Profile
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Personal settings and account information.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80"
                alt="Atik Adnan"
                className="w-16 h-16 rounded-full object-cover ring-4 ring-slate-100"
              />
              <div>
                <h3 className="font-bold text-slate-900 text-base">Atik Adnan</h3>
                <p className="text-xs text-slate-500">atik.adnan@example.com</p>
                <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                  Verified Customer
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Full Name</label>
                <input
                  type="text"
                  readOnly
                  value="Atik Adnan"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Email Address</label>
                <input
                  type="text"
                  readOnly
                  value="atik.adnan@example.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CustomerDashboardView;
