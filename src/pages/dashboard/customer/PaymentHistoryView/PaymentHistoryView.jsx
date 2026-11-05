import React, { useState } from 'react';
import { PaymentDetailsModal } from '../components/modals';
import { DashboardHeader, DashboardTable } from '../../../../components/Dashboard';
import { DashboardStatusBadge } from '../../../../layouts';

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
        data={TRANSACTIONS}
        pagination={{
          currentPage,
          totalPages: 5,
          totalRecords: TRANSACTIONS.length,
          label: `Page ${currentPage} of 5 - ${TRANSACTIONS.length} matching records`,
          onPageChange: setCurrentPage,
          pages: [1, 2, 5],
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
