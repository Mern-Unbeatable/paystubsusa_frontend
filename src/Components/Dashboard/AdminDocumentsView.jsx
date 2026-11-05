import React, { useState } from 'react';
import DocumentDetailsModal from './DocumentDetailsModal';

const AdminDocumentsView = () => {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const documents = [
    {
      id: 'DOC-99321',
      customer: 'sarah.miller@example.com',
      detail: 'Paystub',
      value: '$14.99',
      status: 'Completed',
      date: 'May 28, 2025',
    },
    {
      id: 'DOC-99320',
      customer: 'daniel.chen@example.com',
      detail: 'W-2',
      value: '$14.99',
      status: 'Completed',
      date: 'May 28, 2025',
    },
    {
      id: 'DOC-99319',
      customer: 'morgan.reed@example.com',
      detail: 'Direct Deposit',
      value: '$14.99',
      status: 'Completed',
      date: 'May 27, 2025',
    },
    {
      id: 'DOC-99318',
      customer: 'andrewkim@example.com',
      detail: '1099-NEC',
      value: '$14.99',
      status: 'Completed',
      date: 'May 27, 2025',
    },
  ];

  const handleDownload = (docName) => {
    alert(`Downloading ${docName} PDF...`);
  };

  return (
    <div className="space-y-6">
      {/* Header with Title, Subtitle, and Data updated Live indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Documents
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Monitor and manage all documents generated through the platform.
          </p>
        </div>

        {/* Live Data Updated Indicator */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] text-slate-400">
            Data updated <span className="font-medium text-slate-500">just now</span>
          </span>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
        {/* Table Title and Count */}
        <div className="pb-4">
          <h3 className="text-sm font-bold text-slate-800">
            All documents
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {documents.length} records in this view
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[680px]">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 font-medium">ID</th>
                <th className="py-3 font-medium">CUSTOMER</th>
                <th className="py-3 font-medium">DETAIL</th>
                <th className="py-3 font-medium">VALUE</th>
                <th className="py-3 font-medium">STATUS</th>
                <th className="py-3 text-right font-medium pr-2">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {documents.map((doc) => (
                <tr
                  key={doc.id}
                  className="hover:bg-slate-50/60 transition group"
                >
                  <td className="py-3.5 font-semibold text-slate-700">
                    {doc.id}
                  </td>
                  <td className="py-3.5 text-slate-600 font-medium">
                    {doc.customer}
                  </td>
                  <td className="py-3.5 text-slate-600">
                    {doc.detail}
                  </td>
                  <td className="py-3.5 font-bold text-slate-900">
                    {doc.value}
                  </td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10.5px] font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right pr-2">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedDoc({
                          id: doc.id,
                          name: `${doc.detail} - May 2025`,
                          type: doc.detail,
                          date: doc.date,
                          status: doc.status,
                          amount: doc.value,
                        })
                      }
                      className="px-3.5 py-1 rounded bg-[#EAF5FF] text-[#009BFB] hover:bg-[#d8edff] font-semibold text-xs transition cursor-pointer active:scale-98"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="pt-5 mt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-400 font-medium">
            Page {currentPage} of 3 · 5 matching records
          </span>

          <div className="inline-flex items-center gap-1.5 select-none">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
            >
              Previous
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded text-xs font-semibold flex items-center justify-center transition cursor-pointer ${
                  currentPage === page
                    ? 'bg-[#009BFB] text-white shadow-xs'
                    : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
              disabled={currentPage === 3}
              className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Document Details Modal */}
      {selectedDoc && (
        <DocumentDetailsModal
          doc={selectedDoc}
          onClose={() => setSelectedDoc(null)}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
};

export default AdminDocumentsView;
