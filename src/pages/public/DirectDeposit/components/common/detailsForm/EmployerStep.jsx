import React from "react";
import {
  ChevronDown,
  Building2,
  MapPin,
  Briefcase,
  Phone,
} from "lucide-react";
import US_STATES from "../../../../data/shared/usStates.json";
import {
  FIELD_CLASS,
  LABEL_CLASS,
  SELECT_CLASS,
} from "../../../utils/formFieldClass";
import {
  FieldError,
  fieldClassName,
} from "../../../../Generator/components/common/detailsForm/fieldValidation";
import StepHeader from "./StepHeader";
import StepNav from "./StepNav";

const RequiredMark = () => (
  <span className="text-rose-500" aria-hidden="true">
    {" "}
    *
  </span>
);

const EmployerStep = ({
  formData,
  fieldErrors = {},
  updateField,
  onNext,
}) => (
  <div className="space-y-6 animate-in fade-in-50 duration-200">
    <StepHeader
      title="Employer information"
      subtitle="Enter the legal details exactly as they should appear."
    />

    <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-5">
      <div className="flex items-center gap-2 mb-2">
        <Briefcase className="w-4 h-4 text-[#1E60F2]" />
        <h3 className="font-semibold text-slate-800 text-[15px]">
          Company Details
        </h3>
      </div>

      <div id="dd-field-employerName">
        <label className={LABEL_CLASS}>
          Company / Employer Name
          <RequiredMark />
        </label>
        <div className="relative">
          <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
          <input
            type="text"
            value={formData.employerName}
            onChange={(e) => updateField("employerName", e.target.value)}
            placeholder="e.g. Acme Corporation"
            aria-invalid={Boolean(fieldErrors.employerName)}
            className={fieldClassName(
              `${FIELD_CLASS} pl-10`,
              fieldErrors.employerName,
            )}
          />
        </div>
        <FieldError errors={fieldErrors} name="employerName" />
      </div>
    </div>

    <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-4 h-4 text-[#1E60F2]" />
        <div>
          <h3 className="font-semibold text-slate-800 text-[15px]">
            Company Address
          </h3>
          <p className="text-[12px] text-slate-400 mt-0.5">
            This will appear on the generated slip.
          </p>
        </div>
      </div>

      <div id="dd-field-streetAddress">
        <label className={LABEL_CLASS}>
          Street Address
          <RequiredMark />
        </label>
        <input
          type="text"
          value={formData.streetAddress}
          onChange={(e) => updateField("streetAddress", e.target.value)}
          placeholder="e.g. 123 Business Avenue"
          aria-invalid={Boolean(fieldErrors.streetAddress)}
          className={fieldClassName(FIELD_CLASS, fieldErrors.streetAddress)}
        />
        <FieldError errors={fieldErrors} name="streetAddress" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-5" id="dd-field-city">
          <label className={LABEL_CLASS}>
            City
            <RequiredMark />
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => updateField("city", e.target.value)}
            placeholder="e.g. Austin"
            aria-invalid={Boolean(fieldErrors.city)}
            className={fieldClassName(FIELD_CLASS, fieldErrors.city)}
          />
          <FieldError errors={fieldErrors} name="city" />
        </div>
        <div className="sm:col-span-4" id="dd-field-state">
          <label className={LABEL_CLASS}>
            State
            <RequiredMark />
          </label>
          <div className="relative">
            <select
              value={formData.state}
              onChange={(e) => updateField("state", e.target.value)}
              aria-invalid={Boolean(fieldErrors.state)}
              className={fieldClassName(SELECT_CLASS, fieldErrors.state)}
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
          <FieldError errors={fieldErrors} name="state" />
        </div>
        <div className="sm:col-span-3" id="dd-field-zipCode">
          <label className={LABEL_CLASS}>
            ZIP Code
            <RequiredMark />
          </label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => updateField("zipCode", e.target.value)}
            placeholder="e.g. 78701"
            aria-invalid={Boolean(fieldErrors.zipCode)}
            className={fieldClassName(FIELD_CLASS, fieldErrors.zipCode)}
          />
          <FieldError errors={fieldErrors} name="zipCode" />
        </div>
      </div>
    </div>

    <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[14px] font-semibold text-slate-800">
            Employer Contact
          </label>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Optional
          </span>
        </div>
        <div className="relative">
          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
          <input
            type="text"
            value={formData.employerContact}
            onChange={(e) => updateField("employerContact", e.target.value)}
            placeholder="e.g. payroll@company.com"
            className={`${FIELD_CLASS} pl-10`}
          />
        </div>
      </div>
    </div>

    <StepNav onNext={onNext} showBack={false} />
  </div>
);

export default EmployerStep;
