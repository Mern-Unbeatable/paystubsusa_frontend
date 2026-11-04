import React, { useState, useMemo } from 'react';
import { Link } from 'react-router';
import {
  FileText,
  FilePlus,
  Search,
  Eye,
  Download,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { DocumentDetailsModal } from '../components/modals';
import { DashboardHeader, DashboardTable, DashboardStatusBadge } from '../../shared';

const INITIAL_DOCUMENTS = [
  { id: 'PS-2025-0841', name: 'Paystub - May 2025', type: 'Paystub', date: 'May 28, 2025', status: 'Completed' },
  { id: 'W2-2025-1120', name: 'W-2 Form - 2024', type: 'W-2', date: 'May 22, 2025', status: 'Completed' },
  { id: 'PS-2025-0722', name: 'Paystub - April 2025', type: 'Paystub', date: 'May 03, 2025', status: 'Completed' },
  { id: 'PS-2025-0722', name: 'Paystub - April 2025', type: 'Paystub', date: 'May 03, 2025', status: 'Completed' },
  { id: 'PS-2025-0722', name: 'Paystub - April 2025', type: 'Paystub', date: 'May 03, 2025', status: 'Completed' },
  { id: 'PS-2025-0722', name: 'Paystub - April 2025', type: 'Paystub', date: 'May 03, 2025', status: 'Completed' },
  { id: 'PS-2025-0722', name: 'Paystub - April 2025', type: 'Paystub', date: 'May 03, 2025', status: 'Completed' },
  { id: 'PS-2025-0722', name: 'Paystub - April 2025', type: 'Paystub', date: 'May 03, 2025', status: 'Completed' },
  { id: 'PS-2025-0722', name: 'Paystub - April 2025', type: 'Paystub', date: 'May 03, 2025', status: 'Completed' },
  { id: 'PS-2025-0722', name: 'Paystub - April 2025', type: 'Paystub', date: 'May 03, 2025', status: 'Completed' },
  { id: 'PS-2025-0722', name: 'Paystub - April 2025', type: 'Paystub', date: 'May 03, 2025', status: 'Completed' },
  { id: 'PS-2025-0722', name: 'Paystub - April 2025', type: 'Paystub', date: 'May 03, 2025', status: 'Completed' },
];

const CATEGORIES = [
  { id: 'all', label: 'All Documents' },
  { id: 'paystubs', label: 'Paystubs' },
  { id: 'w2', label: 'W-2' },
  { id: '1099', label: '1099-NEC' },
  { id: 'direct_deposit', label: 'Direct Deposit Slip' },
];

const MyDocumentsView = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [downloadNotice, setDownloadNotice] = useState(null);

  const pageSize = 10;

  // Filter & Search
  const filteredDocs = useMemo(() => {
    return INITIAL_DOCUMENTS.filter((doc) => {
      // Category filter
      if (selectedCategory === 'paystubs' && doc.type !== 'Paystub') return false;
      if (selectedCategory === 'w2' && doc.type !== 'W-2') return false;
      if (selectedCategory === '1099' && !doc.type.includes('1099')) return false;
      if (selectedCategory === 'direct_deposit' && !doc.type.toLowerCase().includes('deposit')) return false;

      // Search filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        return (
          doc.name.toLowerCase().includes(query) ||
          doc.id.toLowerCase().includes(query) ||
          doc.type.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [selectedCategory, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredDocs.length / pageSize));
  const paginatedDocs = filteredDocs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleDownload = (docName) => {
    setDownloadNotice(`Downloading ${docName}...`);
    setTimeout(() => {
      setDownloadNotice(null);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Download Alert Toast */}
      {downloadNotice && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded shadow-lg flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Top Header */}
      <DashboardHeader
        title="My Documents"
        description="View and download your previously generated documents."
        action={
          <Link
            to="/paystub-generator"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-xs sm:text-sm transition shadow-xs hover:shadow active:scale-98 cursor-pointer"
          >
            <FilePlus className="w-4 h-4" />
            <span>Create a Document</span>
          </Link>
        }
      />

      {/* Category Pills & Search Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-4 sm:p-5 space-y-4">
        {/* Category Pills Row */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-1.5 rounded text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-[#009BFB] text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar & Sort Dropdown Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by document name or ID..."
              className="w-full pl-9 pr-4 py-2 rounded border border-slate-200/80 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#009BFB]/20 focus:border-[#009BFB] transition bg-white"
            />
          </div>

          <div className="relative self-end sm:self-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-3.5 pr-8 py-2 rounded border border-slate-200/80 text-xs font-medium text-slate-600 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#009BFB]/20 cursor-pointer"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="name">Name (A-Z)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Documents Table Card */}
      <DashboardTable
        title="All Documents"
        minWidth="min-w-[700px]"
        emptyMessage="No documents matching your search or category filter."
        columns={[
          {
            header: 'Document Name',
            render: (doc) => (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#EBF5FF] text-[#009BFB] flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs">{doc.name}</div>
                  <div className="text-[10.5px] text-slate-400 font-mono">{doc.id}</div>
                </div>
              </div>
            ),
          },
          {
            header: 'Document Type',
            key: 'type',
            cellClassName: 'text-slate-600 font-medium',
          },
          {
            header: 'Created Date',
            key: 'date',
            cellClassName: 'text-slate-500 font-medium',
          },
          {
            header: 'Status',
            render: (doc) => <DashboardStatusBadge status={doc.status} />,
          },
          {
            header: 'Action',
            align: 'right',
            render: (doc) => (
              <div className="inline-flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDoc(doc)}
                  className="w-7 h-7 rounded border border-slate-200 text-slate-400 hover:text-[#009BFB] hover:border-[#009BFB] hover:bg-sky-50/40 flex items-center justify-center transition cursor-pointer"
                  title="View Document Details"
                  aria-label={`View ${doc.name}`}
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload(doc.name)}
                  className="w-7 h-7 rounded border border-slate-200 text-slate-400 hover:text-[#009BFB] hover:border-[#009BFB] hover:bg-sky-50/40 flex items-center justify-center transition cursor-pointer"
                  title="Download PDF"
                  aria-label={`Download ${doc.name}`}
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            ),
          },
        ]}
        data={paginatedDocs}
        pagination={{
          currentPage,
          totalPages,
          totalRecords: filteredDocs.length,
          onPageChange: setCurrentPage,
          pages: [1, 2, 3],
        }}
      />

      {/* Exact Document Details Modal */}
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

export default MyDocumentsView;
