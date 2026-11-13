import React from "react";
import { Check, CheckCircle2, Minus, Plus, Layers } from "lucide-react";
import { FileText } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import OrderSummaryCard from "../common/order/OrderSummaryCard";

const PackageSelectionSection = ({
  template,
  formData,
  calculations,
  order,
  hasUnlimited = false,
  onBackToReview,
  onChangeTemplate,
  onContinueToCheckout,
}) => {
  const {
    selectedPackage,
    setSelectedPackage,
    additionalCount,
    setAdditionalCount,
    summaryLines,
    grandTotal,
  } = order;
  const unlimitedSelected = selectedPackage === "unlimited";

  return (
    <div className="animate-in fade-in-50 duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Package Options */}
        {/* Left Column: Package Options */}
        <div className="lg:col-span-8 space-y-6">
          <div>
            <h2 className="text-2xl sm:text-[32px] font-bold text-[#092258] tracking-tight">
              Choose your package
            </h2>
            <p className="text-slate-500 text-[14px] mt-1">
              Select the plan that best fits your needs.
            </p>
          </div>

          {hasUnlimited && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[14px] font-bold text-emerald-800">
                  Your Unlimited Access plan is active
                </p>
                <p className="text-[13px] text-emerald-700 mt-0.5">
                  You can create this paystub right now at no extra cost.
                </p>
              </div>
            </div>
          )}

          {/* 3 Package Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Package 1: 1 Paystub */}
            <div
              onClick={() => setSelectedPackage("1paystub")}
              className={`relative bg-white rounded-2xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[160px] ${
                selectedPackage === "1paystub"
                  ? "border-2 border-[#1E60F2] shadow-md ring-4 ring-[#1E60F2]/10"
                  : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              {selectedPackage === "1paystub" && (
                <Check className="w-5 h-5 text-[#1E60F2] stroke-[3] absolute top-4 right-4" />
              )}
              <div>
                <h3 className="font-bold text-slate-800 text-[15px]">
                  Single Paystub
                </h3>
                <p className="text-2xl sm:text-[28px] font-bold text-slate-900 mt-1 mb-2">
                  $12.99
                </p>
              </div>
              <p className="text-slate-500 text-[13px] font-medium flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-400" />
                Just 1 document
              </p>
            </div>

            {/* Package 2: 3 Paystubs (Best Value) */}
            <div
              onClick={() => setSelectedPackage("3paystubs")}
              className={`relative bg-white rounded-2xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[160px] ${
                selectedPackage === "3paystubs"
                  ? "border-2 border-[#1E60F2] shadow-md ring-4 ring-[#1E60F2]/10"
                  : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1E60F2] text-white text-[11px] font-bold py-1 px-3.5 rounded-full shadow-md whitespace-nowrap tracking-wide">
                MOST POPULAR
              </span>
              {selectedPackage === "3paystubs" && (
                <Check className="w-5 h-5 text-[#1E60F2] stroke-[3] absolute top-4 right-4" />
              )}
              <div>
                <h3 className="font-bold text-slate-800 text-[15px]">
                  3 Paystubs
                </h3>
                <p className="text-2xl sm:text-[28px] font-bold text-slate-900 mt-1 mb-2">
                  $24.99
                </p>
              </div>
              <div>
                <p className="text-emerald-600 text-[12px] font-bold mb-1">
                  Save 35% ($8.33/stub)
                </p>
                <p className="text-slate-500 text-[13px] font-medium flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-slate-400" />
                  Great for multiple jobs
                </p>
              </div>
            </div>

            {/* Package 3: Unlimited Access (Premium Focus) */}
            <div
              onClick={() => setSelectedPackage("unlimited")}
              className={`relative bg-white rounded-2xl p-5 border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[160px] ${
                selectedPackage === "unlimited"
                  ? "border-emerald-500 shadow-lg shadow-emerald-500/10 ring-4 ring-emerald-500/10"
                  : "border-slate-200 hover:border-emerald-300 hover:shadow-sm"
              }`}
            >
              {/* Subtle Background Pattern for Premium Feel */}
              <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-emerald-50/40 via-transparent to-transparent pointer-events-none" />

              <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-emerald-500 text-white text-[11px] font-bold py-1 px-3.5 rounded-full shadow-md whitespace-nowrap tracking-wide">
                BEST FOR PROS
              </span>

              {selectedPackage === "unlimited" && (
                <Check className="w-5 h-5 text-emerald-500 stroke-[3] absolute top-4 right-4 z-10" />
              )}

              <div className="relative z-10">
                <h3 className="font-bold text-slate-800 text-[15px] flex items-center gap-1.5">
                  Unlimited Access
                </h3>
                {hasUnlimited ? (
                  <p className="text-2xl sm:text-[28px] font-bold text-emerald-600 mt-1 mb-2">
                    Included
                  </p>
                ) : (
                  <div className="mt-1 mb-2">
                    <span className="text-2xl sm:text-[28px] font-bold text-slate-900">
                      $199
                    </span>
                    <span className="text-[13px] font-medium text-slate-500">
                      /month
                    </span>
                  </div>
                )}
              </div>

              <div className="relative z-10">
                <p className="text-slate-500 text-[13px] leading-snug">
                  {hasUnlimited
                    ? "Your subscription is active and ready."
                    : "All document types, unlimited edits & downloads."}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Paystubs Stepper Box - Redesigned for better UX */}
          {!unlimitedSelected && (
            <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
              <div>
                <h4 className="font-bold text-slate-800 text-[15px]">
                  Add extra paystubs
                </h4>
                <p className="text-slate-500 text-[13px] mt-0.5">
                  Need more copies? They are{" "}
                  <span className="font-semibold text-slate-700">
                    $7.99 each
                  </span>
                  .
                </p>
              </div>

              {/* Modern Stepper */}
              <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-lg p-1.5 shadow-sm self-start sm:self-auto">
                <button
                  type="button"
                  disabled={additionalCount <= 0}
                  onClick={() =>
                    setAdditionalCount((prev) => Math.max(0, prev - 1))
                  }
                  className="w-8 h-8 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-800 cursor-pointer disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-bold text-slate-800 text-[16px] select-none">
                  {additionalCount}
                </span>
                <button
                  type="button"
                  onClick={() => setAdditionalCount((prev) => prev + 1)}
                  className="w-8 h-8 rounded-md flex items-center justify-center text-[#009BFB] hover:bg-blue-50 transition cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Actions: Back (left), Continue (right) */}
          <div className="flex items-center justify-between pt-6 mt-2 border-t border-slate-200/80">
            <button
              type="button"
              onClick={onBackToReview}
              className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-medium text-[14px] hover:bg-slate-50 hover:text-slate-900 transition cursor-pointer flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button
              type="button"
              onClick={onContinueToCheckout}
              className="px-8 py-3.5 rounded-xl bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-[15px] shadow-md shadow-[#009BFB]/20 transition-all hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary Card */}
        <OrderSummaryCard
          className="lg:col-span-4"
          template={template}
          formData={formData}
          calculations={calculations}
          lines={summaryLines}
          total={grandTotal}
          action={
            onChangeTemplate && (
              <button
                type="button"
                onClick={onChangeTemplate}
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

export default PackageSelectionSection;
