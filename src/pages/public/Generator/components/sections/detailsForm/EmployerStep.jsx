import React from "react";
import { ChevronDown } from "lucide-react";
import US_STATES from "../../../../data/shared/usStates.json";
import CompanyLogoField from "../../common/CompanyLogoField";
import StepHeader from "./StepHeader";
import StepNav from "./StepNav";

const EmployerStep = ({ formData, updateField, onBack, onNext }) => (
  <div className="space-y-5 animate-in fade-in-50 duration-200">
    <StepHeader title="Employer Information" />

    <CompanyLogoField
      value={formData.companyLogo}
      onChange={(logo) => updateField("companyLogo", logo)}
    />

    <div>
      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
        Company / Employer Name{" "}
        <span className="text-rose-500">*</span>
      </label>
      <input
        type="text"
        value={formData.companyName}
        onChange={(e) => updateField("companyName", e.target.value)}
        placeholder="Enter Your company name"
        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition"
      />
    </div>

    <div>
      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
        Address <span className="text-rose-500">*</span>
      </label>
      <input
        type="text"
        value={formData.companyAddress}
        onChange={(e) => updateField("companyAddress", e.target.value)}
        placeholder="Enter Address"
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
          value={formData.companyCity}
          onChange={(e) => updateField("companyCity", e.target.value)}
          placeholder="City"
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition"
        />
      </div>
      <div className="sm:col-span-3">
        <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
          State <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <select
            value={formData.companyState}
            onChange={(e) => updateField("companyState", e.target.value)}
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
          value={formData.companyZip}
          onChange={(e) => updateField("companyZip", e.target.value)}
          placeholder="Zip code"
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition"
        />
      </div>
    </div>

    <div>
      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
        Employer Identification Number (EIN){" "}
        <span className="text-slate-400 font-normal">(optional)</span>
      </label>
      <input
        type="text"
        value={formData.companyEin}
        onChange={(e) => updateField("companyEin", e.target.value)}
        placeholder="Employer verification number"
        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition"
      />
      <p className="text-[12px] text-slate-400 mt-1">
        9-digit federal tax ID, where applicable.
      </p>
    </div>

    <div>
      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
        Company Phone{" "}
        <span className="font-normal text-slate-400">(optional)</span>
      </label>
      <input
        type="tel"
        value={formData.companyPhone ?? ""}
        onChange={(e) => updateField("companyPhone", e.target.value)}
        placeholder="(555) 123-4567"
        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition"
      />
    </div>

    <StepNav onBack={onBack} onNext={onNext} />
  </div>
);

export default EmployerStep;
