import React from "react";
import { CheckCircle2, Download, RotateCcw } from "lucide-react";

const W2PaymentSuccessSection = ({ formData, onDownload, onStartOver }) => (
  <div className="max-w-xl mx-auto py-8 px-6 text-center space-y-4 bg-emerald-50/50 rounded-2xl border border-emerald-200">
    <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
      <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
    </div>
    <h3 className="text-2xl font-bold text-[#092258]">Payment Successful!</h3>
    <p className="text-slate-600 text-[14.5px] max-w-md mx-auto">
      Your official W-2 document for {formData.firstName} {formData.lastName}{" "}
      has been generated. An IRS compliant PDF has also been sent to{" "}
      <strong>{formData.email || "your email"}</strong>.
    </p>
    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
      <button
        type="button"
        onClick={onDownload}
        className="bg-secondary hover:bg-[#0089e0] text-white font-semibold text-[15px] px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
      >
        <Download className="w-4 h-4 stroke-[2.5]" />
        <span>Download Form W-2 (PDF)</span>
      </button>
      <button
        type="button"
        onClick={onStartOver}
        className="px-5 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-medium text-[14.5px] transition inline-flex items-center gap-2 cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Create Another W-2</span>
      </button>
    </div>
  </div>
);

export default W2PaymentSuccessSection;
