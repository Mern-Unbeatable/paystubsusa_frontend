import React, { useState } from 'react';
import PaymentDetailsModal from './PaymentDetailsModal';

const TRANSACTIONS = [
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
  {
    id: 'TXN-9176480',
    description: 'Unlimited Access',
    date: 'April 29, 2025',
    method: 'Visa **** 4821',
    amount: '$199.00',
    status: 'Successful',
  },
];

const PaymentHistoryView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState(null);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Payment History
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Review your recent purchases and payment transactions.
        </p>
      </div>

      {/* Transactions Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Card Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Recent Transactions
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Payment history is available
          </p>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-6">Transaction ID</th>
                <th className="py-3.5 px-6">Description</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6">Payment Method</th>
                <th className="py-3.5 px-6">Amount</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {TRANSACTIONS.map((tx, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  {/* Transaction ID */}
                  <td className="py-4 px-6 font-mono font-bold text-slate-900 text-[11px]">
                    {tx.id}
                  </td>

                  {/* Description */}
                  <td className="py-4 px-6 font-medium text-slate-700">
                    {tx.description}
                  </td>

                  {/* Date */}
                  <td className="py-4 px-6 text-slate-500 font-medium">
                    {tx.date}
                  </td>

                  {/* Payment Method */}
                  <td className="py-4 px-6 text-slate-600 font-medium">
                    {tx.method}
                  </td>

                  {/* Amount */}
                  <td className="py-4 px-6 font-bold text-slate-900">
                    {tx.amount}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{tx.status}</span>
                    </span>
                  </td>

                  {/* View Details Link */}
                  <td className="py-4 px-6 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedPayment(tx)}
                      className="text-xs font-semibold text-[#009BFB] hover:text-[#0089e0] hover:underline cursor-pointer transition"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-slate-400 font-medium text-[11px]">
            Page {currentPage} of 5 - {TRANSACTIONS.length} matching records
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs disabled:opacity-40 transition cursor-pointer disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {[1, 2, 5].map((page) => {
              const isActive = currentPage === page;
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded text-xs font-bold transition cursor-pointer flex items-center justify-center ${
                    isActive
                      ? 'bg-[#009BFB] text-white shadow-xs'
                      : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
              className="px-3 py-1.5 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs transition cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <PaymentDetailsModal
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
        />
      )}
    </div>
  );
};

export default PaymentHistoryView;
