import React from "react";
import { ChevronDown } from "lucide-react";
import US_STATES from "../../../../data/shared/usStates.json";
import StepHeader from "./StepHeader";
import StepNav from "./StepNav";

const EmployeeStep = ({ formData, updateField, onBack, onNext }) => (
  <div className="space-y-5 animate-in fade-in-50 duration-200">
    <StepHeader title="Employee Information" />

    <div>
      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
        Employee Full Name <span className="text-rose-500">*</span>
      </label>
      <input
        type="text"
        value={formData.employeeName}
        onChange={(e) => updateField("employeeName", e.target.value)}
        placeholder="jane doe"
        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition"
      />
    </div>

    <div>
      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
        Address <span className="text-rose-500">*</span>
      </label>
      <input
        type="text"
        value={formData.employeeAddress}
        onChange={(e) => updateField("employeeAddress", e.target.value)}
        placeholder="123 main street"
        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition"
      />
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
          placeholder="dhaka"
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition"
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
            className="w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 bg-white appearance-none cursor-pointer pr-8"
          >
            {US_STATES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
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
          placeholder="10001"
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition"
        />
      </div>
    </div>

    <div>
      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
        Employee ID{" "}
        <span className="text-slate-400 font-normal">(optional)</span>
      </label>
      <input
        type="text"
        value={formData.employeeId}
        onChange={(e) => updateField("employeeId", e.target.value)}
        placeholder="EMP-002"
        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition"
      />
    </div>

    <StepNav onBack={onBack} onNext={onNext} />
  </div>
);

export default EmployeeStep;
