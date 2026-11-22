import React from "react";
import { Ticket } from "lucide-react";
import OrderSummaryCard from "../common/order/OrderSummaryCard";
import DocumentStepNav from "../../../shared/documentFlow/components/DocumentStepNav";

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

          <DocumentStepNav
            onBack={onBackToReview}
            onNext={onRedeem}
            nextLabel={
              submitting ? "Creating paystub..." : "Create Paystub (1 credit)"
            }
            variant="final"
            backDisabled={submitting}
            nextDisabled={submitting}
            className="sm:pt-5"
          />
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
