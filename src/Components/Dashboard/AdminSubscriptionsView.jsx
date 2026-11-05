import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const AdminSubscriptionsView = () => {
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFullDetailsModal, setShowFullDetailsModal] = useState(false);

  const initialSubscriptions = [
    {
      id: 'SUB-3021',
      customer: 'morgan.reed@example.com',
      detail: 'Unlimited Access',
      value: '$199/mo',
      status: 'Active',
      startDate: 'Jan 15, 2025',
      nextBilling: 'Jul 15, 2026',
      billingCycle: 'Monthly',
      paymentMethod: 'Visa ending in 4821',
      documentsGenerated: 32,
    },
    {
      id: 'SUB-3020',
      customer: 'sarah.miller@example.com',
      detail: 'Unlimited Access',
      value: '$199/mo',
      status: 'Active',
      startDate: 'Feb 10, 2025',
      nextBilling: 'Jul 10, 2026',
      billingCycle: 'Monthly',
      paymentMethod: 'Mastercard ending in 1092',
      documentsGenerated: 16,
    },
    {
      id: 'SUB-3019',
      customer: 'james.wilson@example.com',
      detail: 'Unlimited Access',
      value: '$199/mo',
      status: 'Expired',
      startDate: 'Dec 01, 2024',
      nextBilling: 'Expired (May 01, 2025)',
      billingCycle: 'Monthly',
      paymentMethod: 'Amex ending in 3341',
      documentsGenerated: 8,
    },
    {
      id: 'SUB-3018',
      customer: 'daniel.chen@example.com',
      detail: 'Unlimited Access',
      value: '$199/mo',
      status: 'Active',
      startDate: 'Mar 12, 2025',
      nextBilling: 'Jul 12, 2026',
      billingCycle: 'Monthly',
      paymentMethod: 'Visa ending in 7712',
      documentsGenerated: 21,
    },
    {
      id: 'SUB-3017',
      customer: 'olivia.hayes@example.com',
      detail: 'Unlimited Access',
      value: '$199/mo',
      status: 'Expired',
      startDate: 'Nov 20, 2024',
      nextBilling: 'Expired (Apr 20, 2025)',
      billingCycle: 'Monthly',
      paymentMethod: 'Visa ending in 9904',
      documentsGenerated: 14,
    },
  ];

  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(subscriptions.length / itemsPerPage);

  const currentRecords = subscriptions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleToggleStatus = (id) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? {
              ...sub,
              status: sub.status === 'Active' ? 'Expired' : 'Active',
            }
          : sub
      )
    );
    setSelectedSubscription((prev) =>
      prev && prev.id === id
        ? {
            ...prev,
            status: prev.status === 'Active' ? 'Expired' : 'Active',
          }
        : prev
    );
  };

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Subscriptions
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Monitor and manage monthly unlimited access subscriptions.
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
        {/* Table Title and Count */}
        <div className="pb-4">
          <h3 className="text-sm font-bold text-slate-800">
            All subscriptions
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {currentRecords.length} records in this view
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
              {currentRecords.map((sub) => (
                <tr
                  key={sub.id}
                  className="hover:bg-slate-50/60 transition group"
                >
                  <td className="py-3.5 font-semibold text-slate-700">
                    {sub.id}
                  </td>
                  <td className="py-3.5 text-slate-600 font-medium">
                    {sub.customer}
                  </td>
                  <td className="py-3.5 text-slate-600">
                    {sub.detail}
                  </td>
                  <td className="py-3.5 font-bold text-slate-900">
                    {sub.value}
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10.5px] font-medium ${
                        sub.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          : 'bg-rose-50 text-rose-500 border border-rose-100'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right pr-2">
                    <button
                      type="button"
                      onClick={() => setSelectedSubscription(sub)}
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
            Showing 1-{subscriptions.length} of {subscriptions.length}
          </span>

          <div className="inline-flex items-center gap-1.5 select-none">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
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
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-7 h-7 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide-over Drawer for Subscription Details */}
      {selectedSubscription && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setSelectedSubscription(null)}
          />

          {/* Slide-over Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl flex flex-col justify-between p-6 sm:p-8 animate-in slide-in-from-right duration-300 select-none">
              <div>
                {/* Header */}
                <div className="flex items-start justify-between pb-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#009BFB] uppercase tracking-wider block">
                      Subscription DETAILS
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 mt-1">
                      {selectedSubscription.id}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedSubscription(null)}
                    className="w-7 h-7 rounded border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Status & Synced line */}
                <div className="flex items-center justify-between pt-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedSubscription.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : 'bg-rose-50 text-rose-500 border border-rose-100'
                    }`}
                  >
                    {selectedSubscription.status}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Synced moments ago
                  </span>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100 my-6" />

                {/* Field List */}
                <div className="space-y-5">
                  <div>
                    <span className="text-[10.5px] font-medium text-slate-400 block">
                      Customer
                    </span>
                    <p className="text-xs font-bold text-slate-800 mt-1">
                      {selectedSubscription.customer}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10.5px] font-medium text-slate-400 block">
                      Product / detail
                    </span>
                    <p className="text-xs font-bold text-slate-800 mt-1">
                      {selectedSubscription.detail}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10.5px] font-medium text-slate-400 block">
                      Amount / value
                    </span>
                    <p className="text-xs font-bold text-slate-800 mt-1">
                      {selectedSubscription.value}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10.5px] font-medium text-slate-400 block">
                      Status
                    </span>
                    <p className="text-xs font-bold text-slate-800 mt-1">
                      {selectedSubscription.status}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="pt-6 border-t border-slate-100 flex items-center gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setSelectedSubscription(null)}
                  className="flex-1 py-2.5 rounded border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition cursor-pointer text-center"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => setShowFullDetailsModal(true)}
                  className="flex-1 py-2.5 rounded bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-xs shadow-xs transition cursor-pointer active:scale-98 text-center"
                >
                  Open full details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Extended Full Details Modal */}
      {showFullDetailsModal && selectedSubscription && (
        <div className="fixed inset-0 z-60 overflow-y-auto">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setShowFullDetailsModal(false)}
          />

          <div className="min-h-full flex items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100">
              <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-[#009BFB] uppercase tracking-wider block">
                    COMPLETE SUBSCRIPTION RECORD
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    {selectedSubscription.id} · {selectedSubscription.detail}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowFullDetailsModal(false)}
                  className="w-7 h-7 rounded border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 py-5 text-xs">
                <div>
                  <span className="text-[10.5px] font-medium text-slate-400 block">Customer</span>
                  <span className="font-semibold text-slate-800">{selectedSubscription.customer}</span>
                </div>
                <div>
                  <span className="text-[10.5px] font-medium text-slate-400 block">Status</span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-medium mt-0.5 ${
                      selectedSubscription.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : 'bg-rose-50 text-rose-500 border border-rose-100'
                    }`}
                  >
                    {selectedSubscription.status}
                  </span>
                </div>
                <div>
                  <span className="text-[10.5px] font-medium text-slate-400 block">Monthly Rate</span>
                  <span className="font-semibold text-slate-800">{selectedSubscription.value}</span>
                </div>
                <div>
                  <span className="text-[10.5px] font-medium text-slate-400 block">Billing Frequency</span>
                  <span className="font-semibold text-slate-800">{selectedSubscription.billingCycle || 'Monthly'}</span>
                </div>
                <div>
                  <span className="text-[10.5px] font-medium text-slate-400 block">Start Date</span>
                  <span className="font-semibold text-slate-800">{selectedSubscription.startDate}</span>
                </div>
                <div>
                  <span className="text-[10.5px] font-medium text-slate-400 block">
                    {selectedSubscription.status === 'Active' ? 'Next Renewal Date' : 'Expiration Date'}
                  </span>
                  <span className="font-semibold text-slate-800">{selectedSubscription.nextBilling}</span>
                </div>
                <div>
                  <span className="text-[10.5px] font-medium text-slate-400 block">Payment Method</span>
                  <span className="font-semibold text-slate-800">{selectedSubscription.paymentMethod}</span>
                </div>
                <div>
                  <span className="text-[10.5px] font-medium text-slate-400 block">Documents Created</span>
                  <span className="font-semibold text-slate-800">{selectedSubscription.documentsGenerated} documents</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(selectedSubscription.id)}
                  className={`px-4 py-2 rounded text-xs font-semibold transition cursor-pointer ${
                    selectedSubscription.status === 'Active'
                      ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'
                      : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                >
                  {selectedSubscription.status === 'Active' ? 'Mark as Expired' : 'Mark as Active'}
                </button>

                <button
                  type="button"
                  onClick={() => setShowFullDetailsModal(false)}
                  className="px-4 py-2 rounded bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold transition cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSubscriptionsView;

