import React from "react";
import { CheckCircle2, Download, Plus } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

const PaymentSuccessSection = ({
  formData,
  order,
  processing = false,
  preparingDocument = false,
  redeemed = false,
  creditsRemaining = 0,
  onUseCredit,
  onDownload,
  onStartOver,
}) => {
  const { grandTotal, packageName, orderNumber, checkoutEmail } = order;
  const hasCredits = !processing && creditsRemaining > 0;

  return (
    <div className="animate-in zoom-in-95 duration-200 max-w-lg mx-auto bg-white rounded-2xl p-8 border border-slate-200 shadow-lg text-center space-y-5">
      <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
        <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          {processing ? "Payment Processing" : redeemed ? "Paystub Created!" : "Payment Successful!"}
        </h2>
        <p className="text-slate-500 text-[14px] mt-1.5">
          {processing ? (
            <>
              We&apos;ll email your paystub for{" "}
              <strong className="text-slate-800">
                {formData.employeeName}
              </strong>{" "}
              once the payment clears.
            </>
          ) : (
            <>
              Your professional paystub for{" "}
              <strong className="text-slate-800">
                {formData.employeeName}
              </strong>{" "}
              is ready.
            </>
          )}
        </p>
      </div>

      <div className="p-4 bg-slate-50 rounded-xl border border-slate-150 text-left text-[13px] space-y-1.5">
        {orderNumber && (
          <div className="flex justify-between">
            <span className="text-slate-500">Order Number</span>
            <span className="font-bold text-slate-800">#{orderNumber}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-slate-500">Order Total</span>
          <span className="font-bold text-slate-800">
            {formatCurrency(grandTotal)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Document Package</span>
          <span className="font-bold text-slate-800 text-right">
            {packageName}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Delivery Email</span>
          <span className="font-bold text-slate-800">
            {checkoutEmail || "Delivered to your email"}
          </span>
        </div>
      </div>

      {hasCredits && (
        <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/60 text-left flex items-center justify-between gap-3">
          <div className="text-[13px]">
            <p className="font-bold text-slate-800">
              {creditsRemaining} paystub{creditsRemaining === 1 ? "" : "s"} left in your package
            </p>
            <p className="text-slate-500">Already paid. Fill in the next one at no extra cost.</p>
          </div>
          <button
            type="button"
            onClick={onUseCredit}
            className="flex-shrink-0 px-4 py-2 rounded-lg bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-[13px] transition cursor-pointer"
          >
            Create Next Paystub
          </button>
        </div>
      )}

      <div className="pt-2 flex flex-col gap-2.5">
        <button
          type="button"
          onClick={onDownload}
          disabled={processing || preparingDocument}
          className="w-full py-3 rounded-xl bg-[#1E60F2] hover:bg-[#1550cf] text-white font-semibold text-[15px] shadow-sm transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {preparingDocument ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Preparing documents...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Download Paystub PDF</span>
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onStartOver}
          className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-[14px] transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{hasCredits ? "Start a New Order" : "Create Another Paystub"}</span>
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessSection;
