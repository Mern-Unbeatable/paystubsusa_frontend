import React from "react";
import { ChevronDown, User, MapPin, Hash, ShieldCheck } from "lucide-react";
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

const EmployeeStep = ({
  formData,
  fieldErrors = {},
  updateField,
  onBack,
  onNext,
}) => (
  <div className="space-y-6 animate-in fade-in-50 duration-200">
    <StepHeader
      title="Employee information"
      subtitle="Personal information is encrypted and handled securely."
    />

    <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-5">
      <div className="flex items-center gap-2 mb-2">
        <User className="w-4 h-4 text-[#1E60F2]" />
        <h3 className="font-semibold text-slate-800 text-[15px]">
          Employee Identity
        </h3>
      </div>

      <div id="dd-field-employeeName">
        <label className={LABEL_CLASS}>
          Employee Full Name
          <RequiredMark />
        </label>
        <div className="relative">
          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
          <input
            type="text"
            value={formData.employeeName}
            onChange={(e) => updateField("employeeName", e.target.value)}
            placeholder="e.g. Jane Doe"
            aria-invalid={Boolean(fieldErrors.employeeName)}
            className={fieldClassName(
              `${FIELD_CLASS} pl-10`,
              fieldErrors.employeeName,
            )}
          />
        </div>
        <FieldError errors={fieldErrors} name="employeeName" />
        {!fieldErrors.employeeName && (
          <p className="text-[12px] text-slate-400 mt-1.5 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            Your data is encrypted and never shared.
          </p>
        )}
      </div>
    </div>

    <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-4 h-4 text-[#1E60F2]" />
        <div>
          <h3 className="font-semibold text-slate-800 text-[15px]">
            Home Address
          </h3>
          <p className="text-[12px] text-slate-400 mt-0.5">
            This will appear on the generated slip.
          </p>
        </div>
      </div>

      <div id="dd-field-employeeAddress">
        <label className={LABEL_CLASS}>
          Street Address
          <RequiredMark />
        </label>
        <input
          type="text"
          value={formData.employeeAddress}
          onChange={(e) => updateField("employeeAddress", e.target.value)}
          placeholder="e.g. 456 Residential Rd"
          aria-invalid={Boolean(fieldErrors.employeeAddress)}
          className={fieldClassName(FIELD_CLASS, fieldErrors.employeeAddress)}
        />
        <FieldError errors={fieldErrors} name="employeeAddress" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-5" id="dd-field-employeeCity">
          <label className={LABEL_CLASS}>
            City
            <RequiredMark />
          </label>
          <input
            type="text"
            value={formData.employeeCity}
            onChange={(e) => updateField("employeeCity", e.target.value)}
            placeholder="e.g. Austin"
            aria-invalid={Boolean(fieldErrors.employeeCity)}
            className={fieldClassName(FIELD_CLASS, fieldErrors.employeeCity)}
          />
          <FieldError errors={fieldErrors} name="employeeCity" />
        </div>
        <div className="sm:col-span-4" id="dd-field-employeeState">
          <label className={LABEL_CLASS}>
            State
            <RequiredMark />
          </label>
          <div className="relative">
            <select
              value={formData.employeeState}
              onChange={(e) => updateField("employeeState", e.target.value)}
              aria-invalid={Boolean(fieldErrors.employeeState)}
              className={fieldClassName(
                SELECT_CLASS,
                fieldErrors.employeeState,
              )}
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
          <FieldError errors={fieldErrors} name="employeeState" />
        </div>
        <div className="sm:col-span-3" id="dd-field-employeeZipCode">
          <label className={LABEL_CLASS}>
            ZIP Code
            <RequiredMark />
          </label>
          <input
            type="text"
            value={formData.employeeZipCode}
            onChange={(e) => updateField("employeeZipCode", e.target.value)}
            placeholder="e.g. 78704"
            aria-invalid={Boolean(fieldErrors.employeeZipCode)}
            className={fieldClassName(FIELD_CLASS, fieldErrors.employeeZipCode)}
          />
          <FieldError errors={fieldErrors} name="employeeZipCode" />
        </div>
      </div>
    </div>

    <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[14px] font-semibold text-slate-800">
            Employee ID
          </label>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Optional
          </span>
        </div>
        <div className="relative">
          <Hash className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
          <input
            type="text"
            value={formData.employeeId}
            onChange={(e) => updateField("employeeId", e.target.value)}
            placeholder="e.g. EMP-8821"
            className={`${FIELD_CLASS} pl-10`}
          />
        </div>
      </div>
    </div>

    <StepNav onBack={onBack} onNext={onNext} />
  </div>
);

export default EmployeeStep;
