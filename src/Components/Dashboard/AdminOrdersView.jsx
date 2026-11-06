import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const AdminOrdersView = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const orders = [
    {
      id: '#PS-10482',
      customer: 'sarah.miller@example.com',
      detail: '3 Paystub Package',
      value: '$24.99',
      status: 'Successful',
    },
    {
      id: '#PS-10481',
      customer: 'daniel.chen@example.com',
      detail: 'W-2',
      value: '$14.99',
      status: 'Successful',
    },
    {
      id: '#PS-10480',
      customer: 'morgan.reed@example.com',
      detail: 'Monthly Subscription',
      value: '$199.00',
      status: 'Successful',
    },
    {
      id: '#PS-10479',
      customer: 'andrewkim@example.com',
      detail: '1099-NEC',
      value: '$14.99',
      status: 'Successful',
    },
    {
      id: '#PS-10478',
      customer: 'olivia.hayes@example.com',
      detail: 'Single Paystub',
      value: '$12.99',
      status: 'Successful',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Orders
        </h1>
        <p className="text-base text-slate-400 mt-1.5">
          Manage all document purchases and subscription orders.
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
        {/* Table Title and Count */}
        <div className="pb-4">
          <h3 className="text-base font-bold text-slate-800">
            All orders
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
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-slate-50/60 transition group"
                >
                  <td className="py-3.5 font-semibold text-slate-700">
                    {order.id}
                  </td>
                  <td className="py-3.5 text-slate-600 font-medium">
                    {order.customer}
                  </td>
                  <td className="py-3.5 text-slate-600">
                    {order.detail}
                  </td>
                  <td className="py-3.5 font-bold text-slate-900">
                    {order.value}
                  </td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right pr-2">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(order)}
                      className="px-3.5 py-1 rounded bg-[#EAF5FF] text-[#009BFB] hover:bg-[#d8edff] font-semibold text-sm transition cursor-pointer active:scale-98"
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
          <span className="text-sm text-slate-400 font-medium">
            Showing 1-{orders.length} of {orders.length}
          </span>

          <div className="inline-flex items-center gap-1.5 select-none">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {[1, 2].map((page) => (
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
              onClick={() => setCurrentPage((p) => Math.min(2, p + 1))}
              disabled={currentPage === 2}
              className="w-7 h-7 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide-over Drawer for Order Details */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setSelectedOrder(null)}
          />

          {/* Slide-over Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl flex flex-col justify-between p-6 sm:p-8 animate-in slide-in-from-right duration-300 select-none">
              <div>
                {/* Header */}
                <div className="flex items-start justify-between pb-4">
                  <div>
                    <span className="text-sm font-bold text-[#009BFB] uppercase tracking-wider block">
                      ORDER DETAILS
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 mt-1">
                      {selectedOrder.id}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedOrder(null)}
                    className="w-7 h-7 rounded border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Status & Synced line */}
                <div className="flex items-center justify-between pt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                    {selectedOrder.status}
                  </span>
                  <span className="text-sm text-slate-400 font-medium">
                    Synced moments ago
                  </span>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100 my-6" />

                {/* Field List */}
                <div className="space-y-5">
                  <div>
                    <span className="text-sm font-medium text-slate-400 block">
                      Customer
                    </span>
                    <p className="text-sm font-bold text-slate-800 mt-1">
                      {selectedOrder.customer}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-slate-400 block">
                      Product / detail
                    </span>
                    <p className="text-sm font-bold text-slate-800 mt-1">
                      {selectedOrder.detail}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-slate-400 block">
                      Amount / value
                    </span>
                    <p className="text-sm font-bold text-slate-800 mt-1">
                      {selectedOrder.value}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-slate-400 block">
                      Status
                    </span>
                    <p className="text-sm font-bold text-slate-800 mt-1">
                      {selectedOrder.status}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="pt-6 border-t border-slate-100 flex items-center gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 py-2.5 rounded border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition cursor-pointer text-center"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    alert(`Opening full details for order ${selectedOrder.id}`);
                    setSelectedOrder(null);
                  }}
                  className="flex-1 py-2.5 rounded bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-sm shadow-xs transition cursor-pointer active:scale-98 text-center"
                >
                  Open full details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersView;
