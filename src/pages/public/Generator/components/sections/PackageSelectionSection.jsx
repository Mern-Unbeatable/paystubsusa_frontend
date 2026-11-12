import React from "react";
import { Check, Lock, Minus, Plus } from "lucide-react";
import TemplateDocumentPreview from "../common/TemplateDocumentPreview";
import { formatCurrency } from "../../utils/formatCurrency";

const PackageSelectionSection = ({
  template,
  formData,
  calculations,
  order,
  onBackToReview,
  onChangeTemplate,
  onContinueToCheckout,
}) => {
  const {
    selectedPackage,
    setSelectedPackage,
    additionalCount,
    setAdditionalCount,
    currentPkg,
    additionalCost,
    grandTotal,
  } = order;

  return (
    <div className="animate-in fade-in-50 duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Package Options */}
        <div className="lg:col-span-8 space-y-6">
          <div>
            <h2 className="text-2xl sm:text-[32px] font-bold text-[#092258] tracking-tight">
              Choose your package
            </h2>
            <p className="text-slate-500 text-[14px] mt-1">
              Each additional paystub — $7.99.
            </p>
          </div>

          {/* 3 Package Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Package 1: 1 Paystub */}
            <div
              onClick={() => setSelectedPackage("1paystub")}
              className={`bg-white rounded-xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[145px] ${
                selectedPackage === "1paystub"
                  ? "border-2 border-[#1E60F2] shadow-sm"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div>
                <h3 className="font-bold text-slate-800 text-[15px]">
                  1 Paystub
                </h3>
                <p className="text-2xl sm:text-[26px] font-bold text-slate-900 my-1.5">
                  $12.99
                </p>
              </div>
              <p className="text-slate-400 text-[13px]">Single document</p>
            </div>

            {/* Package 2: 3 Paystubs (Selected by default with Save 35% badge) */}
            <div
              onClick={() => setSelectedPackage("3paystubs")}
              className={`relative bg-white rounded-xl p-5 border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[145px] ${
                selectedPackage === "3paystubs"
                  ? "border-[#1E60F2] shadow-md"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              {/* Save 35% Badge Pill */}
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1E60F2] text-white text-[11px] font-bold py-0.5 px-3 rounded-full shadow-xs whitespace-nowrap">
                Save 35%
              </span>

              {/* Top-Right Checkmark when selected */}
              {selectedPackage === "3paystubs" && (
                <Check className="w-4 h-4 text-[#1E60F2] stroke-[3] absolute top-4 right-4" />
              )}

              <div>
                <h3 className="font-bold text-slate-800 text-[15px]">
                  3 Paystubs
                </h3>
                <p className="text-2xl sm:text-[26px] font-bold text-slate-900 my-1.5">
                  $24.99
                </p>
              </div>
              <p className="text-slate-400 text-[13px]">Best value</p>
            </div>

            {/* Package 3: Unlimited Access */}
            <div
              onClick={() => setSelectedPackage("unlimited")}
              className={`bg-white rounded-xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[145px] ${
                selectedPackage === "unlimited"
                  ? "border-2 border-[#1E60F2] shadow-sm"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div>
                <h3 className="font-bold text-slate-800 text-[15px]">
                  Unlimited Access
                </h3>
                <p className="text-2xl sm:text-[26px] font-bold text-slate-900 my-1.5">
                  $199
                  <span className="text-[13px] font-normal text-slate-400">
                    /month
                  </span>
                </p>
              </div>
              <p className="text-slate-400 text-[13px] leading-tight">
                All supported document types
              </p>
            </div>
          </div>

          {/* Additional Paystubs Stepper Box */}
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-800 text-[15px]">
                Additional paystubs
              </h4>
              <p className="text-slate-400 text-[13px] mt-0.5">$7.99 each</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={additionalCount <= 0}
                onClick={() =>
                  setAdditionalCount((prev) => Math.max(0, prev - 1))
                }
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center font-bold text-slate-800 text-[15px]">
                {additionalCount}
              </span>
              <button
                type="button"
                onClick={() => setAdditionalCount((prev) => prev + 1)}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Actions: Back (left), Continue (right) */}
          <div className="flex items-center justify-between pt-5 border-t border-slate-200/80">
            <button
              type="button"
              onClick={onBackToReview}
              className="px-5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 font-medium text-[14px] hover:bg-slate-50 transition cursor-pointer"
            >
              &lt; Back
            </button>
            <button
              type="button"
              onClick={onContinueToCheckout}
              className="px-7 py-3 rounded-lg bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-[14px] shadow-sm transition inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Continue</span>
              <span>&gt;</span>
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm lg:sticky lg:top-24">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="text-xl font-bold text-slate-900">Order summary</h3>
            {onChangeTemplate && (
              <button
                type="button"
                onClick={onChangeTemplate}
                className="text-[#1E60F2] text-[13px] font-semibold hover:underline cursor-pointer"
              >
                Change Template
              </button>
            )}
          </div>

          {/* Line Items */}
          <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 space-y-3 text-[14px]">
            <div className="flex items-center justify-between gap-3 text-slate-500">
              <span>Template</span>
              <span className="font-semibold text-slate-800 text-right">
                {template.title}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 text-slate-500">
              <span>{currentPkg.name}</span>
              <span className="font-semibold text-slate-800">
                {formatCurrency(currentPkg.price)}
                {currentPkg.period && (
                  <span className="text-[12px] font-normal text-slate-400">
                    {currentPkg.period}
                  </span>
                )}
              </span>
            </div>
            {additionalCount > 0 && (
              <div className="flex items-center justify-between gap-3 text-slate-500">
                <span>Additional paystubs × {additionalCount}</span>
                <span className="font-semibold text-slate-800">
                  {formatCurrency(additionalCost)}
                </span>
              </div>
            )}

            <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
              <span className="text-[16px] font-bold text-slate-900">
                Total
              </span>
              <span className="text-2xl font-bold text-[#1E60F2]">
                {formatCurrency(grandTotal)}
              </span>
            </div>
          </div>

          <p className="mt-2.5 flex items-center justify-center gap-1.5 text-slate-400 text-[12px]">
            <Lock className="w-3.5 h-3.5" />
            <span>
              Secure payment by Stripe. Final price confirmed at checkout.
            </span>
          </p>

          {/* Paystub Document Thumbnail */}
          <div className="mt-5 pt-5 border-t border-slate-100">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Your paystub preview
            </p>
            <div className="overflow-hidden">
              <TemplateDocumentPreview
                template={template}
                formData={formData}
                calculations={calculations}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageSelectionSection;
