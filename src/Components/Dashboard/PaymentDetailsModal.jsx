import React from 'react';
import { X, Check } from 'lucide-react';

const PaymentDetailsModal = ({ payment, onClose }) => {
  if (!payment) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            Payment Details
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Green Success Banner */}
        <div className="p-6 bg-emerald-50/60 border-b border-emerald-100/60 flex items-center gap-3.5">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <Check className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">
              Successful
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              {payment.amount} payment for {payment.description}
            </p>
          </div>
        </div>

        {/* Details Table List */}
        <div className="p-6 divide-y divide-slate-100 text-xs text-slate-600">
          <div className="flex justify-between py-3.5">
            <span className="text-slate-400 font-medium">Transaction ID</span>
            <span className="font-mono font-bold text-slate-900">{payment.id}</span>
          </div>
          <div className="flex justify-between py-3.5">
            <span className="text-slate-400 font-medium">Payment Date</span>
            <span className="font-semibold text-slate-800">{payment.date}</span>
          </div>
          <div className="flex justify-between py-3.5">
            <span className="text-slate-400 font-medium">Purchased Item</span>
            <span className="font-semibold text-slate-800">{payment.description}</span>
          </div>
          <div className="flex justify-between py-3.5">
            <span className="text-slate-400 font-medium">Payment Method</span>
            <span className="font-semibold text-slate-800">{payment.method}</span>
          </div>
          <div className="flex justify-between py-3.5">
            <span className="text-slate-400 font-medium">Amount</span>
            <span className="font-extrabold text-slate-900 text-sm">{payment.amount}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-xs sm:text-sm transition cursor-pointer active:scale-98 shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsModal;
