import React, { useState } from 'react';
import { PaymentDetailsModal } from '../components/modals';
import { DashboardHeader, DashboardTable } from '../../../../components/Dashboard';
import { DashboardStatusBadge } from '../../../../layouts';
import historyPagination from '../data/payments/historyPagination.json';
import transactions from '../data/payments/transactions.json';

const PaymentHistoryView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState(null);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <DashboardHeader
        title="Payment History"
        description="Review your recent purchases and payment transactions."
      />

      {/* Transactions Card */}
      <DashboardTable
        title="Recent Transactions"
        minWidth="min-w-[750px]"
        columns={[
          {
            header: 'Transaction ID',
            key: 'id',
            cellClassName: 'font-mono font-bold text-slate-900 text-[11px]',
          },
          {
            header: 'Description',
            key: 'description',
            cellClassName: 'font-medium text-slate-700',
          },
          {
            header: 'Date',
            key: 'date',
            cellClassName: 'text-slate-500 font-medium',
          },
          {
            header: 'Payment Method',
            key: 'method',
            cellClassName: 'text-slate-600 font-medium',
          },
          {
            header: 'Amount',
            key: 'amount',
            cellClassName: 'font-bold text-slate-900',
          },
          {
            header: 'Status',
            render: (tx) => <DashboardStatusBadge status={tx.status} />,
          },
          {
            header: '',
            align: 'right',
            render: (tx) => (
              <button
                type="button"
                onClick={() => setSelectedPayment(tx)}
                className="text-xs font-semibold text-[#009BFB] hover:text-[#0089e0] hover:underline cursor-pointer transition"
              >
                View Details
              </button>
            ),
          },
        ]}
        data={transactions}
        pagination={{
          currentPage,
          totalPages: historyPagination.totalPages,
          totalRecords: transactions.length,
          label: `Page ${currentPage} of ${historyPagination.totalPages} - ${transactions.length} matching records`,
          onPageChange: setCurrentPage,
          pages: historyPagination.pages,
        }}
      />

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
