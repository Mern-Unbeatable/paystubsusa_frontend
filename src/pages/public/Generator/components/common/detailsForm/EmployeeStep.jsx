import React from "react";
import { ChevronDown, User, MapPin, Hash, Building2 } from "lucide-react";
import US_STATES from "../../../../data/shared/usStates.json";
import StepHeader from "./StepHeader";
import StepNav from "./StepNav";

const EmployeeStep = ({ formData, updateField, onBack, onNext }) => (
  <div className="space-y-6 animate-in fade-in-50 duration-200">
    <StepHeader title="Employee Information" />

    {/* ================= Personal Details ================= */}
    <div className="bg-white rounded-2xl p-5 border border-slate-200  space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <User className="w-4 h-4 text-[#1E60F2]" />
        <h3 className="font-semibold text-slate-800 text-[15px]">
          Personal Details
        </h3>
      </div>

      <div>
        <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
          Employee Full Name <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          value={formData.employeeName}
          onChange={(e) => updateField("employeeName", e.target.value)}
          placeholder="e.g. Jane Doe"
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition placeholder:text-slate-400"
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

    {/* ================= Address Details ================= */}
    <div className="bg-white rounded-2xl p-5 border border-slate-200  space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-4 h-4 text-[#1E60F2]" />
        <div>
          <h3 className="font-semibold text-slate-800 text-[15px]">Address</h3>
          <p className="text-[12px] text-slate-400 mt-0.5">
            This will appear on the generated paystub.
          </p>
        </div>
      </div>

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
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition placeholder:text-slate-400"
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
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition placeholder:text-slate-400"
          />
        </div>
      </div>
    </div>

    <StepNav onBack={onBack} onNext={onNext} className="pt-2" />
  </div>
);

export default EmployeeStep;
