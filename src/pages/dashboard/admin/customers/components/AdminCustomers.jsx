import React, { useState } from 'react';
import { ChevronDown, MoreVertical } from 'lucide-react';

const AdminCustomers = () => {
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeActionMenu, setActiveActionMenu] = useState(null);

  const initialCustomers = [
    {
      id: 'CUS-4092',
      customer: 'sarah.miller@example.com',
      detail: '16 documents',
      value: '$248.83',
      status: 'Active',
    },
    {
      id: 'CUS-4091',
      customer: 'daniel.chen@example.com',
      detail: '4 documents',
      value: '$52.96',
      status: 'Inactive',
    },
    {
      id: 'CUS-4090',
      customer: 'morgan.reed@example.com',
      detail: '32 documents',
      value: '$597.00',
      status: 'Active',
    },
    {
      id: 'CUS-4089',
      customer: 'andrewkim@example.com',
      detail: '2 documents',
      value: '$27.98',
      status: 'Inactive',
    },
  ];

  const [customers, setCustomers] = useState(initialCustomers);

  const filteredCustomers = customers.filter((cus) => {
    if (statusFilter === 'All statuses') return true;
    return cus.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const toggleCustomerStatus = (id) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' }
          : c
      )
    );
    setActiveActionMenu(null);
  };

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Customers
        </h1>
        <p className="text-base text-slate-400 mt-1.5">
          View and manage customers who use Paystubs USA.
        </p>
      </div>

      {/* Filter Dropdown Bar */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            type="button"
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded border border-slate-200 bg-white text-slate-700 text-sm font-medium shadow-xs hover:border-slate-300 transition cursor-pointer select-none"
          >
            <span>{statusFilter}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {filterOpen && (
            <div className="absolute left-0 mt-1.5 w-36 bg-white border border-slate-200 rounded shadow-lg py-1 z-30 text-sm">
              {['All statuses', 'Active', 'Inactive'].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => {
                    setStatusFilter(status);
                    setFilterOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 transition font-medium cursor-pointer ${
                    statusFilter === status
                      ? 'bg-blue-50 text-[#009BFB]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
        {/* Table Title and Record Count */}
        <div className="pb-4">
          <h3 className="text-base font-bold text-slate-800">
            All customers
          </h3>
          <p className="text-sm text-slate-400 mt-0.5">
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[680px]">
            <thead>
              <tr className="border-b border-slate-100 text-sm font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 font-medium">ID</th>
                <th className="py-3 font-medium">CUSTOMER</th>
                <th className="py-3 font-medium">DETAIL</th>
                <th className="py-3 font-medium">VALUE</th>
                <th className="py-3 font-medium">STATUS</th>
                <th className="py-3 text-right font-medium pr-2">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {filteredCustomers.map((cus) => {
                const isActive = cus.status === 'Active';
                const isMenuOpen = activeActionMenu === cus.id;
                return (
                  <tr
                    key={cus.id}
                    className="hover:bg-slate-50/60 transition group"
                  >
                    <td className="py-3.5 font-semibold text-slate-700">
                      {cus.id}
                    </td>
                    <td className="py-3.5 text-slate-600 font-medium">
                      {cus.customer}
                    </td>
                    <td className="py-3.5 text-slate-500">
                      {cus.detail}
                    </td>
                    <td className="py-3.5 font-bold text-slate-900">
                      {cus.value}
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium border ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {cus.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right relative pr-2">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveActionMenu(isMenuOpen ? null : cus.id)
                        }
                        className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition cursor-pointer"
                        aria-label="Actions"
                      >
                        <MoreVertical className="w-4 h-4 inline-block" />
                      </button>

                      {/* Dropdown Action Menu */}
                      {isMenuOpen && (
                        <>
                          {/* Backdrop to close menu on click outside */}
                          <div
                            className="fixed inset-0 z-20"
                            onClick={() => setActiveActionMenu(null)}
                          />
                          <div className="absolute right-0 top-8 bg-white border border-slate-200/90 rounded shadow-md p-1.5 z-30">
                            <button
                              type="button"
                              onClick={() => toggleCustomerStatus(cus.id)}
                              className="px-4 py-1.5 rounded bg-[#009BFB] hover:bg-[#0089e0] text-white text-sm font-semibold shadow-xs transition cursor-pointer whitespace-nowrap block"
                            >
                              {isActive ? 'Inactive' : 'Active'}
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="pt-5 mt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-slate-400 font-medium">
            Page {currentPage} of 3 · 5 matching records
          </span>

          <div className="inline-flex items-center gap-1.5 select-none">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
            >
              Previous
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded text-sm font-semibold flex items-center justify-center transition cursor-pointer ${
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
              className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;
