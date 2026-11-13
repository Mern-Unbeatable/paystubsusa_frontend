import React from "react";
import { formatCurrency } from "../../../utils/formatCurrency";
import { PAYSTUB_FORM_STEPS } from "../../../utils/paystubFlow";
import StepHeader from "./StepHeader";
import StepNav from "./StepNav";

const ReviewCard = ({ title, onEdit, className = "mb-1.5", children }) => (
  <div className="p-4 rounded-xl border border-slate-200/90 bg-white">
    <div className={`flex items-center justify-between ${className}`}>
      <h4 className="font-bold text-slate-800 text-[14px]">{title}</h4>
      <button
        type="button"
        onClick={onEdit}
        className="text-[#1E60F2] text-[13px] font-semibold hover:underline"
      >
        Edit
      </button>
    </div>
    {children}
  </div>
);

const ReviewStep = ({ template, formData, calculations, onEdit, onChangeTemplate, onBack, onContinue }) => (
  <div className="space-y-5 animate-in fade-in-50 duration-200">
    <StepHeader title="Review Paystub" />

    <div className="flex items-center justify-between p-3.5 bg-blue-50/60 rounded-xl border border-blue-100/80">
      <span className="text-slate-600 text-[14px] font-medium">
        Selected template
      </span>
      <span className="flex items-center gap-3">
        <span className="text-slate-900 font-bold text-[14px]">
          {template.title}
        </span>
        <button
          type="button"
          onClick={onChangeTemplate}
          className="text-[#1E60F2] text-[13px] font-medium hover:underline cursor-pointer"
        >
          Change
        </button>
      </span>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      <ReviewCard title="Employer" className="mb-2" onEdit={() => onEdit(PAYSTUB_FORM_STEPS.EMPLOYER)}>
        <p className="text-[13px] font-medium text-slate-700">
          {formData.companyName}
        </p>
        <p className="text-[12.5px] text-slate-500">{formData.companyAddress}</p>
        <p className="text-[12.5px] text-slate-500">
          {formData.companyCity}, {formData.companyState}{" "}
          {formData.companyZip}
        </p>
        <p className="text-[12px] text-slate-400 mt-1">
          EIN {formData.companyEin}
        </p>
      </ReviewCard>

      <ReviewCard title="Employee" className="mb-2" onEdit={() => onEdit(PAYSTUB_FORM_STEPS.EMPLOYEE)}>
        <p className="text-[13px] font-medium text-slate-700">
          {formData.employeeName}
        </p>
        <p className="text-[12.5px] text-slate-500">{formData.employeeAddress}</p>
        <p className="text-[12.5px] text-slate-500">
          {formData.employeeCity}, {formData.employeeState}{" "}
          {formData.employeeZip}
        </p>
        <p className="text-[12px] text-slate-400 mt-1">
          ID {formData.employeeId}
        </p>
      </ReviewCard>
    </div>

    <ReviewCard title="Pay Period" onEdit={() => onEdit(PAYSTUB_FORM_STEPS.PAY)}>
      <p className="text-[13px] text-slate-700">
        {formData.payPeriodStart} → {formData.payPeriodEnd}
      </p>
      <p className="text-[12.5px] text-slate-500">
        Pay date {formData.payDate} • {formData.payFrequency}
      </p>
    </ReviewCard>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      <ReviewCard title="Earnings" onEdit={() => onEdit(PAYSTUB_FORM_STEPS.PAY)}>
        <p className="text-[13px] text-slate-600">
          Gross pay {formatCurrency(calculations.totalGross)}
        </p>
      </ReviewCard>

      <ReviewCard title="Deductions" onEdit={() => onEdit(PAYSTUB_FORM_STEPS.PAY)}>
        <p className="text-[12.5px] text-slate-600">
          Taxes {formatCurrency(calculations.totalTaxes)}
        </p>
        <p className="text-[12.5px] text-slate-600">
          Other {formatCurrency(calculations.totalDeductions)}
        </p>
      </ReviewCard>
    </div>

    {/* Dark Navy Review Net Pay Callout Banner */}
    <div className="bg-[#092258] text-white rounded-xl p-4 sm:p-5 flex items-center justify-between">
      <div>
        <p className="text-white/70 text-[12px] font-medium">
          Gross {formatCurrency(calculations.totalGross)}
        </p>
        <p className="font-bold text-lg sm:text-xl">Net Pay</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-2xl sm:text-3xl text-white">
          {formatCurrency(calculations.netPay)}
        </p>
      </div>
    </div>

    <StepNav onBack={onBack} onNext={onContinue} nextLabel="Continue to Checkout" variant="final" />
  </div>
);

export default ReviewStep;
