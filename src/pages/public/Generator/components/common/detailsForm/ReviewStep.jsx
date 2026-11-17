import React from "react";
import {
  Pencil,
  Building2,
  User,
  CalendarDays,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  FileText,
} from "lucide-react";
import { formatCurrency } from "../../../utils/formatCurrency";
import { PAYSTUB_FORM_STEPS } from "../../../utils/paystubFlow";
import StepHeader from "./StepHeader";
import StepNav from "./StepNav";

const ReviewCard = ({ title, icon: Icon, onEdit, children }) => (
  <div className="group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-slate-300 hover:shadow-sm transition-all duration-200">
    <div className="flex items-center justify-between gap-3 px-4 py-3 bg-slate-100 border-b border-slate-200">
      <div className="flex items-center gap-2 min-w-0">
        {Icon && <Icon className="w-4 h-4 text-[#1E60F2] shrink-0" />}
        <h4 className="font-semibold text-slate-800 text-[14px]">{title}</h4>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="flex items-center gap-1 text-[#1E60F2] text-[12px] font-semibold bg-white hover:bg-blue-50 border border-slate-200 px-2 py-1 rounded-md transition cursor-pointer"
      >
        <Pencil className="w-3 h-3" /> Edit
      </button>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

const ReviewStep = ({
  template,
  formData,
  calculations,
  onEdit,
  onChangeTemplate,
  onBack,
  onContinue,
}) => (
  <div className="space-y-6 animate-in fade-in-50 duration-200">
    <StepHeader title="Review Paystub" />

    {/* Template Selector Banner */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200 gap-3">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-sm">
          <FileText className="w-4 h-4 text-[#1E60F2]" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Selected Template
          </p>
          <p className="text-slate-900 font-bold text-[14px] leading-tight">
            {template.title}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onChangeTemplate}
        className="text-[#1E60F2] text-[13px] font-semibold bg-white border border-slate-200 hover:bg-slate-50 px-3.5 py-1.5 rounded-lg shadow-sm transition cursor-pointer self-start sm:self-auto"
      >
        Change Template
      </button>
    </div>

    {/* Employer & Employee Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ReviewCard
        title="Employer Details"
        icon={Building2}
        onEdit={() => onEdit(PAYSTUB_FORM_STEPS.EMPLOYER)}
      >
        <p className="text-[14px] font-semibold text-slate-800">
          {formData.companyName || "Not provided"}
        </p>
        <p className="text-[13px] text-slate-500 leading-snug mt-0.5">
          {formData.companyAddress}
          <br />
          {formData.companyCity}, {formData.companyState} {formData.companyZip}
        </p>
        {formData.companyEin && (
          <div className="mt-2.5 inline-flex items-center px-2 py-1 rounded-md bg-slate-50 border border-slate-100 text-[11px] font-medium text-slate-500">
            EIN: {formData.companyEin}
          </div>
        )}
      </ReviewCard>

      <ReviewCard
        title="Employee Details"
        icon={User}
        onEdit={() => onEdit(PAYSTUB_FORM_STEPS.EMPLOYEE)}
      >
        <p className="text-[14px] font-semibold text-slate-800">
          {formData.employeeName || "Not provided"}
        </p>
        <p className="text-[13px] text-slate-500 leading-snug mt-0.5">
          {formData.employeeAddress}
          <br />
          {formData.employeeCity}, {formData.employeeState}{" "}
          {formData.employeeZip}
        </p>
        {(formData.employeePhone ||
          formData.employeeId ||
          formData.exemptions ||
          formData.maritalStatus) && (
          <div className="mt-2.5 flex flex-wrap gap-2">
            {formData.employeePhone && (
              <div className="inline-flex items-center px-2 py-1 rounded-md bg-slate-50 border border-slate-100 text-[11px] font-medium text-slate-500">
                Phone: {formData.employeePhone}
              </div>
            )}
            {formData.employeeId && (
              <div className="inline-flex items-center px-2 py-1 rounded-md bg-slate-50 border border-slate-100 text-[11px] font-medium text-slate-500">
                ID: {formData.employeeId}
              </div>
            )}
            {formData.exemptions && (
              <div className="inline-flex items-center px-2 py-1 rounded-md bg-slate-50 border border-slate-100 text-[11px] font-medium text-slate-500">
                Exemptions: {formData.exemptions}
              </div>
            )}
            {formData.maritalStatus && (
              <div className="inline-flex items-center px-2 py-1 rounded-md bg-slate-50 border border-slate-100 text-[11px] font-medium text-slate-500">
                Marital status: {formData.maritalStatus}
              </div>
            )}
          </div>
        )}
      </ReviewCard>
    </div>

    {/* Pay Period Info */}
    <ReviewCard
      title="Pay Period & Schedule"
      icon={CalendarDays}
      onEdit={() => onEdit(PAYSTUB_FORM_STEPS.PAY)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
            Period
          </p>
          <p className="text-[13px] font-medium text-slate-800 mt-0.5">
            {formData.payPeriodStart}{" "}
            <span className="text-slate-300 mx-1">→</span>{" "}
            {formData.payPeriodEnd}
          </p>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
            Pay Date
          </p>
          <p className="text-[13px] font-medium text-slate-800 mt-0.5">
            {formData.payDate}
          </p>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
            Frequency
          </p>
          <p className="text-[13px] font-medium text-slate-800 mt-0.5">
            {formData.payFrequency}
          </p>
        </div>
      </div>
    </ReviewCard>

    {/* Earnings & Deductions Side-by-Side */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ReviewCard
        title="Earnings"
        icon={TrendingUp}
        onEdit={() => onEdit(PAYSTUB_FORM_STEPS.PAY)}
      >
        <div className="flex items-center justify-between mt-1">
          <span className="text-[13px] text-slate-500">Total Gross Pay</span>
          <span className="text-[14px] font-bold text-slate-900">
            {formatCurrency(calculations.totalGross)}
          </span>
        </div>
      </ReviewCard>

      <ReviewCard
        title="Deductions"
        icon={TrendingDown}
        onEdit={() => onEdit(PAYSTUB_FORM_STEPS.PAY)}
      >
        <div className="space-y-1.5 mt-1">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-slate-500">Taxes</span>
            <span className="text-[13px] font-semibold text-slate-700">
              {formatCurrency(calculations.totalTaxes)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-slate-500">Other Deductions</span>
            <span className="text-[13px] font-semibold text-slate-700">
              {formatCurrency(calculations.totalDeductions)}
            </span>
          </div>
        </div>
      </ReviewCard>
    </div>

    {formData.directDeposit?.enabled && (
      <ReviewCard
        title="Direct Deposit Slip"
        icon={FileText}
        onEdit={() => onEdit(PAYSTUB_FORM_STEPS.PAY)}
      >
        <p className="text-[13px] text-slate-700">
          {formData.directDeposit.bankName || "Bank"} · Net deposit{" "}
          <span className="font-bold">{formatCurrency(calculations.netPay)}</span>
        </p>
        <p className="text-[12px] text-slate-500 mt-1">
          Account ••••
          {String(formData.directDeposit.accountNumber || "")
            .replace(/\D/g, "")
            .slice(-4) || "----"}
        </p>
      </ReviewCard>
    )}

    {/* Modern Dark Navy Net Pay Banner */}
    <div className="relative overflow-hidden bg-gradient-to-br from-[#092258] to-[#113a82] text-white rounded-2xl p-6 sm:p-7 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 text-center sm:text-left">
        <p className="text-blue-200 text-[12px] font-bold uppercase tracking-wider mb-1">
          Final Calculation
        </p>
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <span className="text-slate-300 text-[15px]">Gross</span>
          <span className="text-slate-100 font-semibold">
            {formatCurrency(calculations.totalGross)}
          </span>
        </div>
      </div>

      <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
        <ArrowRight className="w-5 h-5 text-white" />
      </div>

      <div className="relative z-10 text-center sm:text-right bg-white/10 sm:bg-transparent py-3 px-5 sm:p-0 rounded-xl w-full sm:w-auto">
        <p className="text-emerald-300 text-[12px] font-bold uppercase tracking-wider mb-1">
          Net Pay
        </p>
        <p className="font-extrabold text-3xl sm:text-4xl tracking-tight">
          {formatCurrency(calculations.netPay)}
        </p>
      </div>
    </div>

    <StepNav
      onBack={onBack}
      onNext={onContinue}
      nextLabel="Continue to Checkout"
      variant="final"
    />
  </div>
);

export default ReviewStep;
