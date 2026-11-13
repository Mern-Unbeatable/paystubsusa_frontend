import React from "react";
import { ChevronLeft, Ticket } from "lucide-react";
import OrderSummaryCard from "../common/order/OrderSummaryCard";

/** Package step while spending a paystub credit: no package choice and no payment. */
const CreditRedeemSection = ({
  template,
  formData,
  calculations,
  orderNumber,
  creditsRemaining,
  submitting,
  onRedeem,
  onBackToReview,
  onCancelCredit,
  onChangeTemplate,
}) => {
  const after = Math.max(0, creditsRemaining - 1);

  return (
    <div className="animate-in fade-in-50 duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div>
            <h2 className="text-2xl sm:text-[32px] font-bold text-[#092258] tracking-tight">Use a paystub credit</h2>
            <p className="text-slate-500 text-[14px] mt-1">This paystub is already paid for. No payment needed.</p>
          </div>

          <div className="bg-white rounded-xl p-5 border-2 border-[#1E60F2] shadow-sm flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-blue-50 text-[#1E60F2] flex items-center justify-center flex-shrink-0">
              <Ticket className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-[15px]">
                {creditsRemaining} paystub{creditsRemaining === 1 ? "" : "s"} left
                {orderNumber && <span className="font-normal text-slate-500"> on order #{orderNumber}</span>}
              </h3>
              <p className="text-slate-500 text-[13px]">
                Creating this paystub uses 1 credit. You&apos;ll have {after} left afterwards.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onCancelCredit}
            disabled={submitting}
            className="text-[13px] font-semibold text-[#1E60F2] hover:underline cursor-pointer disabled:opacity-60"
          >
            Buy a new package instead
          </button>

          <div className="flex items-center justify-between pt-5 border-t border-slate-200/80">
            <button
              type="button"
              onClick={onBackToReview}
              disabled={submitting}
              className="px-5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 font-medium text-[14px] hover:bg-slate-50 transition cursor-pointer disabled:opacity-60 inline-flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button
              type="button"
              onClick={onRedeem}
              disabled={submitting}
              className="px-7 py-3 rounded-lg bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-[14px] shadow-sm transition inline-flex items-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              <span>{submitting ? "Creating paystub..." : "Create Paystub (1 credit)"}</span>
            </button>
          </div>
        </div>

        <OrderSummaryCard
          className="lg:col-span-4"
          template={template}
          formData={formData}
          calculations={calculations}
          lines={[{ key: "credit", label: "Paystub credit", amount: 0 }]}
          total={0}
          note="Paid with a credit from your earlier purchase."
          action={
            onChangeTemplate && (
              <button
                type="button"
                onClick={onChangeTemplate}
                disabled={submitting}
                className="text-[#1E60F2] text-[13px] font-semibold hover:underline cursor-pointer"
              >
                Change Template
              </button>
            )
          }
        />
      </div>
    </div>
  );
};

export default CreditRedeemSection;
