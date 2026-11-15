import React from "react";
import {
  ChevronDown,
  Building2,
  MapPin,
  Hash,
  Briefcase,
  Info,
} from "lucide-react";
import US_STATES from "../../../../data/shared/usStates.json";
import {
  FIELD_CLASS,
  LABEL_CLASS,
  SELECT_CLASS,
} from "../../../utils/formFieldClass";
import StepHeader from "./StepHeader";
import StepNav from "./StepNav";

const EmployerStep = ({ formData, updateField, onBack, onNext }) => (
  <div className="space-y-6 animate-in fade-in-50 duration-200">
    <StepHeader
      step={1}
      title="Employer information"
      subtitle="Enter the legal details exactly as they should appear."
    />

    {/* ================= Section 1: Company Details ================= */}
    <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-5">
      <div className="flex items-center gap-2 mb-2">
        <Briefcase className="w-4 h-4 text-[#1E60F2]" />
        <h3 className="font-semibold text-slate-800 text-[15px]">
          Company Details
        </h3>
      </div>

      <div>
        <label className={LABEL_CLASS}>Employer Name</label>
        <div className="relative">
          <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
          <input
            type="text"
            value={formData.employerName}
            onChange={(e) => updateField("employerName", e.target.value)}
            placeholder="e.g. Acme Corporation"
            className={`${FIELD_CLASS} pl-10`}
          />
        </div>
      </div>

      <div>
        <label className={LABEL_CLASS}>
          Employer Identification Number (EIN)
        </label>
        <div className="relative">
          <Hash className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
          <input
            type="text"
            value={formData.ein}
            onChange={(e) => updateField("ein", e.target.value)}
            placeholder="e.g. 12-3456789"
            className={`${FIELD_CLASS} pl-10`}
          />
        </div>
        <p className="text-[12px] text-slate-400 mt-1.5 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5" />
          9-digit federal tax ID, where applicable.
        </p>
      </div>
    </div>

    {/* ================= Section 2: Address ================= */}
    <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-4 h-4 text-[#1E60F2]" />
        <div>
          <h3 className="font-semibold text-slate-800 text-[15px]">
            Company Address
          </h3>
          <p className="text-[12px] text-slate-400 mt-0.5">
            This will appear on the generated paystub.
          </p>
        </div>
      </div>

      <div>
        <label className={LABEL_CLASS}>Street Address</label>
        <input
          type="text"
          value={formData.streetAddress}
          onChange={(e) => updateField("streetAddress", e.target.value)}
          placeholder="e.g. 123 Main Street, Suite 400"
          className={FIELD_CLASS}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-5">
          <label className={LABEL_CLASS}>City</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => updateField("city", e.target.value)}
            placeholder="e.g. New York"
            className={FIELD_CLASS}
          />
        </div>

        <div className="sm:col-span-4">
          <label className={LABEL_CLASS}>State</label>
          <div className="relative">
            <select
              value={formData.state}
              onChange={(e) => updateField("state", e.target.value)}
              className={SELECT_CLASS}
            >
              <option value="">Select</option>
              {US_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label className={LABEL_CLASS}>ZIP Code</label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => updateField("zipCode", e.target.value)}
            placeholder="e.g. 10001"
            className={FIELD_CLASS}
          />
        </div>
      </div>
    </div>

    {/* ================= Section 3: Extra Info ================= */}
    <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[14px] font-semibold text-slate-800">
            Control Number
          </label>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Optional
          </span>
        </div>
        <input
          type="text"
          value={formData.controlNumber}
          onChange={(e) => updateField("controlNumber", e.target.value)}
          placeholder="e.g. PAY-2024-001"
          className={FIELD_CLASS}
        />
        <p className="text-[12px] text-slate-400 mt-1.5">
          A unique identifier for internal tracking (appears on the stub).
        </p>
      </div>
    </div>

    <StepNav onBack={onBack} onNext={onNext} showBack={Boolean(onBack)} />
  </div>
);

export default EmployerStep;
