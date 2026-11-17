import React from "react";
import { ChevronDown, User, MapPin, Hash, Building2, Phone } from "lucide-react";
import US_STATES from "../../../../data/shared/usStates.json";
import StepHeader from "./StepHeader";
import StepNav from "./StepNav";
import SectionCard from "./SectionCard";

const MARITAL_STATUS_OPTIONS = ["Single", "Married", "Head of Household"];
const EXEMPTION_OPTIONS = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

const inputClass =
  "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition placeholder:text-slate-400";

const EmployeeStep = ({ formData, updateField, onBack, onNext }) => (
  <div className="space-y-6 animate-in fade-in-50 duration-200">
    <StepHeader title="Employee Information" />

    <SectionCard icon={User} title="Personal Details">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
            Employee Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={formData.employeeName}
            onChange={(e) => updateField("employeeName", e.target.value)}
            placeholder="e.g. Jane Doe"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
            Marital Status{" "}
            <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <div className="relative">
            <select
              value={formData.maritalStatus ?? ""}
              onChange={(e) => updateField("maritalStatus", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 bg-white appearance-none cursor-pointer pr-8 transition"
            >
              <option value="">Select status</option>
              {MARITAL_STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
            Phone Number{" "}
            <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="tel"
              value={formData.employeePhone ?? ""}
              onChange={(e) => updateField("employeePhone", e.target.value)}
              placeholder="(555) 123-4567"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition placeholder:text-slate-400"
            />
          </div>
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
            Exemptions <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.exemptions ?? ""}
              onChange={(e) => updateField("exemptions", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 bg-white appearance-none cursor-pointer pr-8 transition"
            >
              {EXEMPTION_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
            Employee SSN (last 4 digits){" "}
            <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            value={formData.ssnLast4 ?? ""}
            onChange={(e) =>
              updateField("ssnLast4", e.target.value.replace(/\D/g, "").slice(0, 4))
            }
            placeholder="1234"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
            Employee ID{" "}
            <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <div className="relative">
            <Hash className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={formData.employeeId}
              onChange={(e) => updateField("employeeId", e.target.value)}
              placeholder="e.g. EMP-002"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>
    </SectionCard>

    <SectionCard
      icon={MapPin}
      title="Address"
      description="This will appear on the generated paystub."
    >
      <div>
        <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
          Street Address <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={formData.employeeAddress}
            onChange={(e) => updateField("employeeAddress", e.target.value)}
            placeholder="e.g. 123 Main Street, Apt 4B"
            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-6">
          <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
            City <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={formData.employeeCity}
            onChange={(e) => updateField("employeeCity", e.target.value)}
            placeholder="e.g. New York"
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-3">
          <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
            State <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.employeeState}
              onChange={(e) => updateField("employeeState", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 bg-white appearance-none cursor-pointer pr-8 transition"
            >
              {US_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
            ZIP Code <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={formData.employeeZip}
            onChange={(e) => updateField("employeeZip", e.target.value)}
            placeholder="e.g. 10001"
            className={inputClass}
          />
        </div>
      </div>
    </SectionCard>

    <StepNav onBack={onBack} onNext={onNext} className="pt-2" />
  </div>
);

export default EmployeeStep;
