import React from "react";
import { CheckCircle2, Lock } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

/** Shown once the email is verified and the server has priced the order; opens the payment dialog. */
const CheckoutPaySection = ({ order, templateTitle, onPay }) => (
  <div className="max-w-xl mx-auto animate-in fade-in-50 duration-200">
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-100">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div className="min-w-0">
          <p className="text-[14px] font-semibold text-emerald-800">Email verified</p>
          <p className="text-[13px] text-emerald-700 break-all">
            Your documents will be sent to {order.email}.
          </p>
        </div>
      </div>

      <div>
        <p className="text-[#1E60F2] font-bold text-[12px] uppercase tracking-wider mb-1">
          Order #{order.orderNumber}
        </p>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900">Review &amp; pay</h3>
      </div>

      <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 space-y-3 text-[14px]">
        <div className="flex items-center justify-between gap-3 text-slate-500">
          <span>Template</span>
          <span className="font-semibold text-slate-800 text-right">{templateTitle}</span>
        </div>
        {order.items.map((item) => (
          <div key={item.productCode} className="flex items-center justify-between gap-3 text-slate-500">
            <span>
              {item.name}
              {item.quantity > 1 && ` × ${item.quantity}`}
            </span>
            <span className="font-semibold text-slate-800">
              {formatCurrency(item.amountCents / 100)}
            </span>
          </div>
        ))}
        <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
          <span className="text-[16px] font-bold text-slate-900">Total</span>
          <span className="text-2xl font-bold text-[#1E60F2]">
            {formatCurrency(order.totalCents / 100)}
          </span>
        </div>
      </div>

      <div className="pt-1">
        <button
          type="button"
          onClick={onPay}
          className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-semibold text-[15px] shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <Lock className="w-4 h-4" />
          <span>Pay {formatCurrency(order.totalCents / 100)} securely</span>
        </button>
        <p className="text-center text-slate-400 text-[12px] mt-2.5">
          Payments processed securely by Stripe.
        </p>
      </div>
    </div>
  </div>
);

export default CheckoutPaySection;
