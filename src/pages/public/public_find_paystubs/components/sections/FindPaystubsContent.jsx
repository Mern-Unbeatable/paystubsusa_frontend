import React, { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { 
  Search, 
  ChevronDown, 
  Eye, 
  Download, 
  FileText, 
  Plus, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Printer
} from 'lucide-react';

const INITIAL_DOCUMENTS = [
  {
    id: 'PS-2025-0841',
    name: 'Paystub - May 2025',
    type: 'Paystub',
    date: 'May 26, 2025',
    status: 'Completed',
    employer: 'Acme Corp',
    employee: 'John Doe',
    amount: '$3,450.00',
  },
  {
    id: 'W2-2025-1120',
    name: 'W-2 Form - 2024',
    type: 'W-2',
    date: 'May 22, 2025',
    status: 'Completed',
    employer: 'TechNova Solutions',
    employee: 'Jane Smith',
    amount: '$84,500.00',
  },
  {
    id: 'PS-2025-0722',
    name: 'Paystub - April 2025',
    type: 'Paystub',
    date: 'May 03, 2025',
    status: 'Completed',
    employer: 'Acme Corp',
    employee: 'John Doe',
    amount: '$3,450.00',
  },
  {
    id: 'PS-2025-0721',
    name: 'Paystub - April 2025',
    type: 'Paystub',
    date: 'May 03, 2025',
    status: 'Completed',
    employer: 'Acme Corp',
    employee: 'Sarah Jenkins',
    amount: '$2,890.00',
  },
  {
    id: 'NEC-2025-0419',
    name: '1099-NEC - 2024',
    type: '1099-NEC',
    date: 'Apr 28, 2025',
    status: 'Completed',
    employer: 'Creative Studio LLC',
    employee: 'Alex Rivera',
    amount: '$14,200.00',
  },
  {
    id: 'DD-2025-0312',
    name: 'Direct Deposit Slip',
    type: 'Direct Deposit Slip',
    date: 'Apr 15, 2025',
    status: 'Completed',
    employer: 'Apex Global Inc',
    employee: 'Michael Chang',
    amount: '$4,120.00',
  },
  {
    id: 'PS-2025-0610',
    name: 'Paystub - March 2025',
    type: 'Paystub',
    date: 'Apr 02, 2025',
    status: 'Completed',
    employer: 'Acme Corp',
    employee: 'John Doe',
    amount: '$3,450.00',
  },
  {
    id: 'PS-2025-0504',
    name: 'Paystub - February 2025',
    type: 'Paystub',
    date: 'Mar 01, 2025',
    status: 'Completed',
    employer: 'Acme Corp',
    employee: 'John Doe',
    amount: '$3,450.00',
  },
  {
    id: 'W2-2024-0980',
    name: 'W-2 Form - 2023',
    type: 'W-2',
    date: 'Feb 15, 2025',
    status: 'Completed',
    employer: 'TechNova Solutions',
    employee: 'Jane Smith',
    amount: '$79,000.00',
  },
  {
    id: 'PS-2025-0401',
    name: 'Paystub - January 2025',
    type: 'Paystub',
    date: 'Feb 01, 2025',
    status: 'Completed',
    employer: 'Acme Corp',
    employee: 'John Doe',
    amount: '$3,450.00',
  },
  {
    id: 'NEC-2024-0820',
    name: '1099-NEC - 2023',
    type: '1099-NEC',
    date: 'Jan 22, 2025',
    status: 'Completed',
    employer: 'Apex Global Inc',
    employee: 'Alex Rivera',
    amount: '$12,800.00',
  },
  {
    id: 'DD-2025-0105',
    name: 'Direct Deposit Slip',
    type: 'Direct Deposit Slip',
    date: 'Jan 10, 2025',
    status: 'Completed',
    employer: 'Acme Corp',
    employee: 'John Doe',
    amount: '$3,450.00',
  },
  {
    id: 'PS-2024-1228',
    name: 'Paystub - December 2024',
    type: 'Paystub',
    date: 'Dec 30, 2024',
    status: 'Completed',
    employer: 'Acme Corp',
    employee: 'John Doe',
    amount: '$3,450.00',
  },
  {
    id: 'PS-2024-1125',
    name: 'Paystub - November 2024',
    type: 'Paystub',
    date: 'Nov 29, 2024',
    status: 'Completed',
    employer: 'Acme Corp',
    employee: 'John Doe',
    amount: '$3,450.00',
  },
  {
    id: 'PS-2024-1022',
    name: 'Paystub - October 2024',
    type: 'Paystub',
    date: 'Oct 31, 2024',
    status: 'Completed',
    employer: 'Acme Corp',
    employee: 'John Doe',
    amount: '$3,450.00',
  },
];

const ITEMS_PER_PAGE = 5;

const FindPaystubsContent = () => {
  // Login form states
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default true so user sees dashboard matching screenshot!

  // Filters and table states
  const [activeTab, setActiveTab] = useState('All Documents');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [previewDoc, setPreviewDoc] = useState(null);

  const tabs = [
    'All Documents',
    'Paystubs',
    'W-2',
    '1099-NEC',
    'Direct Deposit Slip',
  ];

  // Filtering and Sorting logic
  const filteredDocuments = useMemo(() => {
    return INITIAL_DOCUMENTS.filter((doc) => {
      // Tab filter
      if (activeTab === 'Paystubs' && doc.type !== 'Paystub') return false;
      if (activeTab === 'W-2' && doc.type !== 'W-2') return false;
      if (activeTab === '1099-NEC' && doc.type !== '1099-NEC') return false;
      if (activeTab === 'Direct Deposit Slip' && doc.type !== 'Direct Deposit Slip') return false;

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = doc.name.toLowerCase().includes(query);
        const matchId = doc.id.toLowerCase().includes(query);
        const matchEmployer = doc.employer.toLowerCase().includes(query);
        const matchEmployee = doc.employee.toLowerCase().includes(query);
        if (!matchName && !matchId && !matchEmployer && !matchEmployee) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [activeTab, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE) || 1;
  const paginatedDocs = filteredDocuments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="w-full bg-[#F7FAFF] min-h-screen py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1240px] mx-auto space-y-12">
        {/* Top: Welcome Back Access Form */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 sm:p-8">
          <div className="max-w-xl">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-slate-500 mt-1.5 mb-6">
              Enter the email address you used when creating your documents to access your dashboard.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsLoggedIn(true);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="0 0 0 0 0 0"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-xl bg-secondary hover:bg-[#0089e0] text-white font-semibold text-sm transition shadow-sm hover:shadow active:scale-98 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom: My Documents Section */}
        <div className="space-y-6">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                My Documents
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                View and download your previously generated documents.
              </p>
            </div>

            <Link
              to="/paystub-generator"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-secondary hover:bg-[#0089e0] text-white font-semibold text-sm transition shadow-sm hover:shadow active:scale-98 whitespace-nowrap self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Create a Document</span>
            </Link>
          </div>

          {/* Filters & Table Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
            {/* Filter Tabs Row */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => handleTabChange(tab)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-secondary text-white shadow-xs'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Search and Sort Toolbar */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search by document name or ID"
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2 pr-9 text-sm font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition cursor-pointer"
                  >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="name">Name (A-Z)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Table Header Description */}
            <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800">All Documents</h3>
              <p className="text-xs text-slate-500">Your latest generated documents</p>
            </div>

            {/* Documents Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-6">DOCUMENT NAME</th>
                    <th className="py-3 px-6">DOCUMENT TYPE</th>
                    <th className="py-3 px-6">CREATED DATE</th>
                    <th className="py-3 px-6">STATUS</th>
                    <th className="py-3 px-6 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {paginatedDocs.length > 0 ? (
                    paginatedDocs.map((doc) => (
                      <tr
                        key={doc.id}
                        className="hover:bg-slate-50/80 transition-colors group"
                      >
                        {/* Document Name & ID */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-blue-50 text-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-semibold text-slate-800">
                                {doc.name}
                              </div>
                              <div className="text-xs text-slate-400 font-mono">
                                {doc.id}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Document Type */}
                        <td className="py-4 px-6 font-medium text-slate-600">
                          {doc.type}
                        </td>

                        {/* Created Date */}
                        <td className="py-4 px-6 text-slate-500">
                          {doc.date}
                        </td>

                        {/* Status */}
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {doc.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right">
                          <div className="inline-flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => setPreviewDoc(doc)}
                              title="Preview Document"
                              className="p-2 text-slate-400 hover:text-secondary hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                alert(`Downloading ${doc.name} (${doc.id})...`);
                              }}
                              title="Download PDF"
                              className="p-2 text-slate-400 hover:text-secondary hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400">
                        No documents found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Row */}
            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                Page {currentPage} of {totalPages} ({filteredDocuments.length} matching records)
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-semibold transition ${
                      currentPage === page
                        ? 'bg-secondary text-white shadow-xs'
                        : 'border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Details Modal matching Figma design */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 my-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3">
              <h3 className="font-extrabold text-slate-900 text-xl sm:text-2xl tracking-tight">
                Document Details
              </h3>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Preview Canvas Box */}
            <div className="bg-[#EEF6FF] rounded-2xl p-4 sm:p-6 flex items-center justify-center my-4 overflow-hidden border border-blue-50/50">
              {/* Rendered Document Sheet */}
              <div className="bg-white rounded-sm shadow-md border border-slate-200/80 p-5 sm:p-6 w-full max-w-[340px] sm:max-w-[380px] text-[8px] sm:text-[9px] leading-tight text-slate-800 font-sans select-none">
                {/* Invoice Top Bar */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 border-2 border-[#FFC711] rotate-45 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-[#FFC711]" />
                    </div>
                    <span className="font-bold text-slate-800 text-[10px] tracking-tight">Brand Name</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-slate-900 tracking-wider">INVOICE</span>
                    <div className="h-1 w-full bg-[#FFC711] mt-0.5" />
                  </div>
                </div>

                {/* Recipient and Meta Info */}
                <div className="grid grid-cols-2 gap-4 py-3 text-slate-600 text-[8px]">
                  <div>
                    <span className="font-bold text-slate-800 text-[8.5px] block mb-0.5">Invoice to:</span>
                    <p className="font-semibold text-slate-700">Dayana Clark</p>
                    <p className="text-slate-500 text-[7.5px] leading-snug">24 Dummy Street Area,<br />Location, Lorem Ipsum,<br />47000000</p>
                  </div>
                  <div className="text-right space-y-0.5">
                    <div>
                      <span className="font-bold text-slate-700">Invoice#</span>{' '}
                      <span className="text-slate-500 font-mono">10148</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700">Date</span>{' '}
                      <span className="text-slate-500">01 / 03 / 2025</span>
                    </div>
                  </div>
                </div>

                {/* Line Items Table */}
                <div className="mt-1">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#2B2B2B] text-white font-bold text-[7.5px]">
                        <th className="py-1 px-1.5 w-6">Sl.</th>
                        <th className="py-1 px-1.5">Item Description</th>
                        <th className="py-1 px-1.5 text-right">Price</th>
                        <th className="py-1 px-1.5 text-center w-8">Qty</th>
                        <th className="py-1 px-1.5 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 text-[7.5px]">
                      <tr>
                        <td className="py-1 px-1.5 text-slate-500">1</td>
                        <td className="py-1 px-1.5 font-medium">Lorem Ipsum Dolor</td>
                        <td className="py-1 px-1.5 text-right">$50.00</td>
                        <td className="py-1 px-1.5 text-center">1</td>
                        <td className="py-1 px-1.5 text-right font-medium">$50.00</td>
                      </tr>
                      <tr>
                        <td className="py-1 px-1.5 text-slate-500">2</td>
                        <td className="py-1 px-1.5 font-medium">Pellentesque id neque ligula</td>
                        <td className="py-1 px-1.5 text-right">$20.00</td>
                        <td className="py-1 px-1.5 text-center">3</td>
                        <td className="py-1 px-1.5 text-right font-medium">$60.00</td>
                      </tr>
                      <tr>
                        <td className="py-1 px-1.5 text-slate-500">3</td>
                        <td className="py-1 px-1.5 font-medium">Interdum et malesuada fames</td>
                        <td className="py-1 px-1.5 text-right">$15.00</td>
                        <td className="py-1 px-1.5 text-center">2</td>
                        <td className="py-1 px-1.5 text-right font-medium">$30.00</td>
                      </tr>
                      <tr>
                        <td className="py-1 px-1.5 text-slate-500">4</td>
                        <td className="py-1 px-1.5 font-medium">Vivamus volutpat faucibus</td>
                        <td className="py-1 px-1.5 text-right">$80.00</td>
                        <td className="py-1 px-1.5 text-center">1</td>
                        <td className="py-1 px-1.5 text-right font-medium">$80.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Totals & Notes Section */}
                <div className="grid grid-cols-2 gap-4 mt-3 pt-2 text-[7.5px] border-t border-slate-100">
                  <div className="space-y-1 text-slate-500 leading-snug">
                    <p className="font-semibold text-slate-800">Thank you for your business</p>
                    <p><strong className="text-slate-700">Terms & Conditions:</strong><br />Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Viverra dignissim pretium scelerisque.</p>
                    <p><strong className="text-slate-700">Payment Info:</strong><br />Account No: 0000 0000 0000<br />A/C Name: Name Here<br />Bank Details: Bank Name Here</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-slate-600 px-1">
                      <span>Sub Total:</span>
                      <span className="font-semibold text-slate-800">$220.00</span>
                    </div>
                    <div className="flex justify-between text-slate-600 px-1">
                      <span>Tax:</span>
                      <span className="font-semibold text-slate-800">0.00%</span>
                    </div>
                    <div className="bg-[#FFC711] text-slate-900 font-extrabold px-2 py-1 rounded-xs flex justify-between text-[8.5px] mt-1 shadow-xs">
                      <span>Total:</span>
                      <span>$220.00</span>
                    </div>
                    <div className="pt-3 text-center">
                      <div className="border-b border-slate-300 w-24 mx-auto mb-0.5" />
                      <span className="text-[7px] text-slate-400 uppercase tracking-wider block">Authorized Sign</span>
                    </div>
                  </div>
                </div>

                {/* Footer Info line */}
                <div className="mt-3 pt-1 border-t border-slate-100 flex justify-between text-[7px] text-slate-400">
                  <span>Phone #</span>
                  <span>Address</span>
                  <span>Website</span>
                </div>
              </div>
            </div>

            {/* Document Metadata Grid (Exact layout from Figma) */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-5 px-1">
              <div>
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  DOCUMENT NAME
                </span>
                <span className="block text-sm sm:text-[15px] font-bold text-slate-900 mt-1">
                  {previewDoc.name}
                </span>
              </div>

              <div>
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  CREATED
                </span>
                <span className="block text-sm sm:text-[15px] font-medium text-slate-700 mt-1">
                  {previewDoc.date}
                </span>
              </div>

              <div>
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  DOCUMENT ID
                </span>
                <span className="block text-sm sm:text-[15px] font-semibold text-slate-900 mt-1 font-mono">
                  {previewDoc.id}
                </span>
              </div>

              <div>
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  STATUS
                </span>
                <div className="mt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {previewDoc.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Actions matching Figma buttons */}
            <div className="flex items-center justify-end gap-3 pt-6 mt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition cursor-pointer"
              >
                Back to Documents
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Downloading ${previewDoc.name} (${previewDoc.id}) PDF...`);
                  setPreviewDoc(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-secondary hover:bg-[#0089e0] text-white font-semibold text-sm transition shadow-sm inline-flex items-center gap-2 active:scale-98 cursor-pointer"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindPaystubsContent;
