import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import DashboardLayout from '../../layout/DashboardLayout';
import CustomerOverview from '../../Components/Dashboard/CustomerOverview';
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
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredDocs = allDocuments.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {/* 2. My Documents Tab */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                My Documents
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Browse, search, view, and re-download all your generated tax and payroll documents.
              </p>
            </div>
            <Link
              to="/paystub-generator"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-xs sm:text-sm transition shadow-xs"
            >
              <FilePlus className="w-4 h-4" />
              <span>Create New Document</span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, ID or type..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#009BFB]/20 focus:border-[#009BFB]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b border-slate-100 text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/40">
                    <th className="py-3 px-4">Document Name</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Created Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {filteredDocs.map((doc, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#EBF5FF] text-[#009BFB] flex items-center justify-center flex-shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{doc.name}</div>
                            <div className="text-[10.5px] text-slate-400 font-mono">{doc.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">{doc.type}</td>
                      <td className="py-3.5 px-4 text-slate-500 font-medium">{doc.date}</td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>{doc.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => alert(`Viewing ${doc.name}`)}
                            className="w-7 h-7 rounded-lg border border-slate-200 text-slate-500 hover:text-[#009BFB] hover:border-[#009BFB] flex items-center justify-center transition cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => alert(`Downloading ${doc.name} PDF...`)}
                            className="w-7 h-7 rounded-lg border border-slate-200 text-slate-500 hover:text-[#009BFB] hover:border-[#009BFB] flex items-center justify-center transition cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. Payment History Tab */}
      {activeTab === 'payments' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Payment History
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Review all historical receipts, transactions, and payment methods.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-100 text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/40">
                    <th className="py-3 px-4">Transaction ID</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Payment Method</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {allDocuments.map((doc, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition">
                      <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">
                        TXN-9{182740 + idx}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-700">{doc.name}</td>
                      <td className="py-3.5 px-4 text-slate-500">{doc.date}</td>
                      <td className="py-3.5 px-4 text-slate-600">Visa **** 4821</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">{doc.amount}</td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>Successful</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. Subscription Tab */}
      {activeTab === 'subscription' && (
        <div className="space-y-6 max-w-4xl">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Subscription Plan
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage your active subscription, billing cycle, and document quota.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EBF5FF] text-[#009BFB] border border-[#009BFB]/20 mb-2">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>Pro Unlimited</span>
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Active Subscription
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Next renewal on June 28, 2026 • Auto-renew active
                </p>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-2xl font-black text-slate-900">$29.99<span className="text-xs text-slate-400 font-normal">/month</span></div>
                <span className="text-xs font-semibold text-emerald-600">Active &amp; In Good Standing</span>
              </div>
            </div>

            <div className="py-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">Documents Generated</span>
                <span className="text-lg font-bold text-slate-800">12 / Unlimited</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">Payment Method</span>
                <span className="text-lg font-bold text-slate-800">Visa ending 4821</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">Tax Calculation Engine</span>
                <span className="text-lg font-bold text-emerald-600">Enabled (All 50 States)</span>
              </div>
            </div>
          </div>
        </div>
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
