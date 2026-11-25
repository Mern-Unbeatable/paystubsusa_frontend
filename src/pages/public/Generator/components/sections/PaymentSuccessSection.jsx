import React from "react";
import { Download, Plus } from "lucide-react";
import ConfettiOverlay from "../common/success/ConfettiOverlay";
import SuccessCheckIcon from "../common/success/SuccessCheckIcon";
import OrderDetailsCard from "../common/order/OrderDetailsCard";
import CreditsRemainingBanner from "../common/order/CreditsRemainingBanner";

const getSuccessTitle = ({ processing, redeemed, documentLabel }) => {
  if (processing) return "Payment Processing";
  return redeemed ? `${documentLabel} Created!` : "Payment Successful!";
};

const PaymentSuccessSection = ({
  formData,
  order,
  processing = false,
  preparingDocument = false,
  redeemed = false,
  creditsRemaining = 0,
  documentLabel = "Paystub",
  downloadLabel,
  startOverLabel,
  centered = false,
  onUseCredit,
  onDownload,
  onStartOver,
}) => {
  const hasCredits = !processing && creditsRemaining > 0;
  const recipientName =
    formData.employeeName ||
    [formData.firstName, formData.lastName].filter(Boolean).join(" ");
  const namedRecipient = (
    <strong className="text-slate-800">{recipientName || "your document"}</strong>
  );
  const noun = documentLabel.toLowerCase();

  return (
    <div
      className={`relative w-full max-w-lg bg-white rounded-2xl p-8 border border-slate-200 shadow-lg text-center space-y-5 overflow-hidden animate-in zoom-in-95 duration-200 ${
        centered ? "mx-auto" : "mx-auto lg:mx-0"
      }`}
    >
      {!processing && <ConfettiOverlay active={preparingDocument} />}

      <div className="relative space-y-5">
        <SuccessCheckIcon />

        <div className="space-y-1.5">
          <h2 className="text-2xl font-bold text-slate-900 animate-[dropIn_0.6s_cubic-bezier(0.34,1.56,0.64,1)_0.15s_both]">
            {getSuccessTitle({ processing, redeemed, documentLabel })}
          </h2>
          <p className="text-slate-500 text-[14px] animate-[dropIn_0.6s_cubic-bezier(0.34,1.56,0.64,1)_0.28s_both]">
            {processing ? (
              <>
                We&apos;ll email your {noun} for {namedRecipient} once the
                payment clears.
              </>
            ) : (
              <>Your professional {noun} for {namedRecipient} is ready.</>
            )}
          </p>
        </div>

        <OrderDetailsCard order={order} />

        {hasCredits && (
          <CreditsRemainingBanner
            creditsRemaining={creditsRemaining}
            onUseCredit={onUseCredit}
          />
        )}

        <div className="pt-2 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onDownload}
            disabled={processing || preparingDocument}
            className="w-full py-3 rounded-xl bg-[#1E60F2] hover:bg-[#1550cf] text-white font-semibold text-[15px] shadow-sm transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed animate-[dropIn_0.6s_cubic-bezier(0.34,1.56,0.64,1)_0.6s_both]"
          >
            {preparingDocument ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Preparing documents...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>{downloadLabel || `Download ${documentLabel} PDF`}</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onStartOver}
            className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-[14px] transition flex items-center justify-center gap-2 cursor-pointer animate-[dropIn_0.6s_cubic-bezier(0.34,1.56,0.64,1)_0.7s_both]"
          >
            <Plus className="w-4 h-4" />
            <span>
              {startOverLabel ||
                (hasCredits ? "Start a New Order" : `Create Another ${documentLabel}`)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessSection;
