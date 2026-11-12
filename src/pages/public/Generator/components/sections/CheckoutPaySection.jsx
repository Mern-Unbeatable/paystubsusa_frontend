import React from "react";
import { CheckCircle2, Lock } from "lucide-react";

/** Shown once the email is verified; Pay Now opens the payment dialog. */
const CheckoutPaySection = ({ email, title = "Email verified", totalLabel, paying, onPay, onChangeEmail }) => (
  <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 animate-in fade-in-50 duration-200">
    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-100">
      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-semibold text-emerald-800">{title}</p>
        <p className="text-[13px] text-emerald-700 break-all">
          Your documents will be sent to {email}.
        </p>
      </div>
      {onChangeEmail && (
        <button
          type="button"
          onClick={onChangeEmail}
          disabled={paying}
          className="text-[13px] font-semibold text-[#1E60F2] hover:underline cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Change
        </button>
      )}
    </div>

    <div>
      <button
        type="button"
        onClick={onPay}
        disabled={paying}
        className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-semibold text-[15px] shadow-sm transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {paying ? (
          <span className="inline-flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Preparing payment...
          </span>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            <span>Pay Now {totalLabel}</span>
          </>
        )}
      </button>
      <p className="text-center text-slate-400 text-[12px] mt-2.5">
        Payments processed securely by Stripe.
      </p>
    </div>
  </div>
);

export default CheckoutPaySection;
