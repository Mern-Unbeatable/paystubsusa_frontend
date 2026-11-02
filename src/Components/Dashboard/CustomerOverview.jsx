import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  FileText,
  LayoutGrid,
  CreditCard,
  Star,
  FilePlus,
  Eye,
  Download,
  ArrowRight,
  CheckCircle2,
  X
} from 'lucide-react';
import DocumentDetailsModal from './DocumentDetailsModal';

const CustomerOverview = ({ setActiveTab }) => {
  const navigate = useNavigate();
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  const stats = [
    {
      title: 'Total Documents',
      value: '12',
      change: 'All-time documents',
      icon: FileText,
    },
    {
      title: 'Paystubs Created',
      value: '8',
      change: '67% of your documents',
      icon: LayoutGrid,
    },
    {
      title: 'Total Purchases',
      value: '10',
      change: 'Successful purchases',
      icon: CreditCard,
    },
    {
      title: 'Subscription Status',
      value: 'Active',
      change: 'Unlimited Access',
      icon: Star,
    },
  ];

  const recentDocuments = [
    {
      id: 'PS-2025-0841',
      name: 'Paystub - May 2025',
      type: 'Paystub',
      date: 'May 28, 2025',
      status: 'Completed',
    },
    {
      id: 'W2-2025-1120',
      name: 'W-2 Form - 2024',
      type: 'W-2',
      date: 'May 22, 2025',
      status: 'Completed',
    },
    {
      id: 'PS-2025-0723',
      name: 'Paystub - April 2025',
      type: 'Paystub',
      date: 'May 03, 2025',
      status: 'Completed',
    },
  ];

  const recentPayments = [
    {
      id: 'TXN-9182746',
      description: 'Paystub - May 2025',
      date: 'May 28, 2025',
      method: 'Visa **** 4821',
      amount: '$14.99',
      status: 'Successful',
    },
    {
      id: 'TXN-9191822',
      description: 'W-2 Form - 2024',
      date: 'May 22, 2025',
      method: 'Visa **** 4821',
      amount: '$19.99',
      status: 'Successful',
    },
    {
      id: 'TXN-9178021',
      description: 'Paystub - April 2025',
      date: 'May 03, 2025',
      method: 'Mastercard **** 1092',
      amount: '$14.99',
      status: 'Successful',
    },
  ];

  const handleDownload = (docName) => {
    setDownloadSuccess(`Downloading ${docName}...`);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Download Alert Toast */}
      {downloadSuccess && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded shadow-lg flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome Back!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your documents, review purchases, and access your subscription.
          </p>
        </div>

        <Link
          to="/paystub-generator"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-xs sm:text-sm transition shadow-xs hover:shadow active:scale-98 cursor-pointer self-start sm:self-auto"
        >
          <FilePlus className="w-4 h-4" />
          <span>Create a Document</span>
        </Link>
      </div>

      {/* Stats Cards Grid (4 Cards Exactly as in Design) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-5 flex flex-col justify-between hover:border-slate-200 transition-colors"
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

      {/* Section 1: Recent Documents */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Card Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Recent Documents
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Your latest generated documents
            </p>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab && setActiveTab('documents')}
            className="text-xs font-semibold text-[#009BFB] hover:text-[#0089e0] hover:underline inline-flex items-center gap-1 cursor-pointer transition"
          >
            <span>View all documents</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Documents Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-6">Document Name</th>
                <th className="py-3 px-6">Document Type</th>
                <th className="py-3 px-6">Created Date</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {recentDocuments.map((doc, index) => (
                <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                  {/* Name with Icon & ID */}
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

                  {/* Type */}
                  <td className="py-4 px-6 text-slate-600 font-medium">
                    {doc.type}
                  </td>

                  {/* Date */}
                  <td className="py-4 px-6 text-slate-500 font-medium">
                    {doc.date}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{doc.status}</span>
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedDoc(doc)}
                        className="w-7 h-7 rounded border border-slate-200 text-slate-500 hover:text-[#009BFB] hover:border-[#009BFB] hover:bg-sky-50/40 flex items-center justify-center transition cursor-pointer"
                        title="View Document"
                        aria-label={`View ${doc.name}`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownload(doc.name)}
                        className="w-7 h-7 rounded border border-slate-200 text-slate-500 hover:text-[#009BFB] hover:border-[#009BFB] hover:bg-sky-50/40 flex items-center justify-center transition cursor-pointer"
                        title="Download Document"
                        aria-label={`Download ${doc.name}`}
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

      {/* Section 2: Recent Payment Activity */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Card Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Recent Payment Activity
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Your latest transactions
            </p>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab && setActiveTab('payments')}
            className="text-xs font-semibold text-[#009BFB] hover:text-[#0089e0] hover:underline inline-flex items-center gap-1 cursor-pointer transition"
          >
            <span>View payment history</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Payments Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-6">Transaction ID</th>
                <th className="py-3 px-6">Description</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Payment Method</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {recentPayments.map((payment, index) => (
                <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                  {/* Transaction ID */}
                  <td className="py-4 px-6 font-mono font-semibold text-slate-800 text-[11px]">
                    {payment.id}
                  </td>

                  {/* Description */}
                  <td className="py-4 px-6 font-medium text-slate-700">
                    {payment.description}
                  </td>

                  {/* Date */}
                  <td className="py-4 px-6 text-slate-500 font-medium">
                    {payment.date}
                  </td>

                  {/* Payment Method */}
                  <td className="py-4 px-6 text-slate-600 font-medium">
                    {payment.method}
                  </td>

                  {/* Amount */}
                  <td className="py-4 px-6 font-bold text-slate-900">
                    {payment.amount}
                  </td>

                  {/* Status Badge */}
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

      {/* Document Details Modal */}
      {selectedDoc && (
        <DocumentDetailsModal
          doc={selectedDoc}
          onClose={() => setSelectedDoc(null)}
          onDownload={(name) => {
            handleDownload(name);
            setSelectedDoc(null);
          }}
        />
      )}
    </div>
  );
};

export default CustomerOverview;
