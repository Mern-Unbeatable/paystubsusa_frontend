import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import DashboardLayout from '../../layout/DashboardLayout';
import {
  FileText,
  LayoutGrid,
  CreditCard,
  Star,
  Users,
  FilePlus,
  Eye,
  Download,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Search
} from 'lucide-react';

const AdminDashboardView = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const adminStats = [
    {
      title: 'Total Revenue',
      value: '$24,850',
      change: '+14% from last month',
      icon: CreditCard,
    },
    {
      title: 'Total Documents',
      value: '1,420',
      change: 'All user generated files',
      icon: FileText,
    },
    {
      title: 'Active Customers',
      value: '382',
      change: '88% active this week',
      icon: Users,
    },
    {
      title: 'System Status',
      value: 'Optimal',
      change: '99.98% calculation uptime',
      icon: ShieldCheck,
    },
  ];

  const adminRecentDocs = [
    {
      id: 'DOC-2025-9921',
      user: 'Sarah Jenkins',
      name: 'Paystub - May 2025',
      type: 'Paystub',
      date: 'May 28, 2025',
      status: 'Completed',
    },
    {
      id: 'DOC-2025-9920',
      user: 'Michael Chang',
      name: 'W-2 Form - 2024',
      type: 'W-2',
      date: 'May 28, 2025',
      status: 'Completed',
    },
    {
      id: 'DOC-2025-9919',
      user: 'Atik Adnan',
      name: 'Paystub - May 2025',
      type: 'Paystub',
      date: 'May 28, 2025',
      status: 'Completed',
    },
  ];

  const adminRecentPayments = [
    {
      id: 'TXN-984021',
      user: 'Sarah Jenkins',
      description: 'Paystub - May 2025',
      date: 'May 28, 2025',
      method: 'Visa **** 4821',
      amount: '$14.99',
      status: 'Successful',
    },
    {
      id: 'TXN-984020',
      user: 'Michael Chang',
      description: 'W-2 Form - 2024',
      date: 'May 28, 2025',
      method: 'Mastercard **** 8820',
      amount: '$19.99',
      status: 'Successful',
    },
    {
      id: 'TXN-984019',
      user: 'Atik Adnan',
      description: 'Paystub - May 2025',
      date: 'May 28, 2025',
      method: 'Visa **** 4821',
      amount: '$14.99',
      status: 'Successful',
    },
  ];

  return (
    <DashboardLayout
      role="admin"
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#EBF5FF] text-[#009BFB] border border-[#009BFB]/20 mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Management Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Platform Overview
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Monitor platform activity, customer documents, transaction volume, and system health.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition"
            >
              <span>View Customer Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/paystub-generator"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-xs transition shadow-xs"
            >
              <FilePlus className="w-3.5 h-3.5" />
              <span>Generate Document</span>
            </Link>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {adminStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    {stat.title}
                  </span>
                  <div className="w-7 h-7 rounded bg-[#EBF5FF] text-[#009BFB] flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium mt-1">
                    {stat.change}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Platform Documents */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Recent Platform Documents
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                All generated user documents across the system
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100 text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/40">
                  <th className="py-3.5 px-6">Document Name</th>
                  <th className="py-3.5 px-6">User</th>
                  <th className="py-3.5 px-6">Document Type</th>
                  <th className="py-3.5 px-6">Created Date</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {adminRecentDocs.map((doc, index) => (
                  <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-[#EBF5FF] text-[#009BFB] flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs">
                            {doc.name}
                          </div>
                          <div className="text-[10.5px] text-slate-400 font-mono">
                            {doc.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-800">
                      {doc.user}
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-medium">
                      {doc.type}
                    </td>
                    <td className="py-4 px-6 text-slate-500 font-medium">
                      {doc.date}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{doc.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => alert(`Reviewing ${doc.name} for ${doc.user}`)}
                          className="w-7 h-7 rounded border border-slate-200 text-slate-500 hover:text-[#009BFB] hover:border-[#009BFB] flex items-center justify-center transition cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => alert(`Downloading PDF copy...`)}
                          className="w-7 h-7 rounded border border-slate-200 text-slate-500 hover:text-[#009BFB] hover:border-[#009BFB] flex items-center justify-center transition cursor-pointer"
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

        {/* Recent Payment Transactions */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Recent Payment Transactions
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time transaction log across all customer accounts
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100 text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/40">
                  <th className="py-3.5 px-6">Transaction ID</th>
                  <th className="py-3.5 px-6">User</th>
                  <th className="py-3.5 px-6">Description</th>
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-6">Method</th>
                  <th className="py-3.5 px-6">Amount</th>
                  <th className="py-3.5 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {adminRecentPayments.map((payment, index) => (
                  <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6 font-mono font-semibold text-slate-800 text-[11px]">
                      {payment.id}
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-800">
                      {payment.user}
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-700">
                      {payment.description}
                    </td>
                    <td className="py-4 px-6 text-slate-500 font-medium">
                      {payment.date}
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-medium">
                      {payment.method}
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {payment.amount}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{payment.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboardView;
