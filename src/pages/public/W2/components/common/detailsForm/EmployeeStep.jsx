import React from "react";
import { ChevronDown, User, MapPin, ShieldCheck } from "lucide-react";
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
import { formatW2Ssn } from "../../../utils/w2OrderFormData";
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
      step={2}
      title="Employee information"
      subtitle="Personal information is encrypted and handled securely."
    />

    {/* ================= Section 1: Identity ================= */}
    <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-5">
      <div className="flex items-center gap-2 mb-2">
        <User className="w-4 h-4 text-[#1E60F2]" />
        <h3 className="font-semibold text-slate-800 text-[15px]">
          Employee Identity
        </h3>
      </div>

      <div id="w2-field-ssn">
        <label className={LABEL_CLASS}>
          Social Security Number (SSN)
          <RequiredMark />
        </label>
        <div className="relative">
          <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
          <input
            type="text"
            value={formData.ssn}
            onChange={(e) => updateField("ssn", formatW2Ssn(e.target.value))}
            inputMode="numeric"
            autoComplete="off"
            maxLength={11}
            placeholder="e.g. 123-45-6789"
            aria-invalid={Boolean(fieldErrors.ssn)}
            className={fieldClassName(`${FIELD_CLASS} pl-10`, fieldErrors.ssn)}
          />
        </div>
        <FieldError errors={fieldErrors} name="ssn" />
        {!fieldErrors.ssn && (
          <p className="text-[12px] text-slate-400 mt-1.5 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            Your data is encrypted and never shared.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-5" id="w2-field-firstName">
          <label className={LABEL_CLASS}>
            First Name
            <RequiredMark />
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            placeholder="e.g. Jane"
            aria-invalid={Boolean(fieldErrors.firstName)}
            className={fieldClassName(FIELD_CLASS, fieldErrors.firstName)}
          />
          <FieldError errors={fieldErrors} name="firstName" />
        </div>
        <div className="sm:col-span-3">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[14px] font-semibold text-slate-800">
              Middle Initial
            </label>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Opt
            </span>
          </div>
          <input
            type="text"
            value={formData.middleInitial}
            onChange={(e) => updateField("middleInitial", e.target.value)}
            maxLength={2}
            placeholder="A"
            className={FIELD_CLASS}
          />
        </div>
        <div className="sm:col-span-4" id="w2-field-lastName">
          <label className={LABEL_CLASS}>
            Last Name
            <RequiredMark />
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            placeholder="e.g. Doe"
            aria-invalid={Boolean(fieldErrors.lastName)}
            className={fieldClassName(FIELD_CLASS, fieldErrors.lastName)}
          />
          <FieldError errors={fieldErrors} name="lastName" />
        </div>
      </div>
    </div>

    {/* ================= Section 2: Address ================= */}
    <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-4 h-4 text-[#1E60F2]" />
        <div>
          <h3 className="font-semibold text-slate-800 text-[15px]">
            Home Address
          </h3>
          <p className="text-[12px] text-slate-400 mt-0.5">
            This will appear on the generated document.
          </p>
        </div>
      </div>

      <div id="w2-field-employeeAddress">
        <label className={LABEL_CLASS}>
          Street Address
          <RequiredMark />
        </label>
        <input
          type="text"
          value={formData.employeeAddress}
          onChange={(e) => updateField("employeeAddress", e.target.value)}
          placeholder="e.g. 456 Elm Street, Apt 2A"
          aria-invalid={Boolean(fieldErrors.employeeAddress)}
          className={fieldClassName(FIELD_CLASS, fieldErrors.employeeAddress)}
        />
        <FieldError errors={fieldErrors} name="employeeAddress" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-5" id="w2-field-employeeCity">
          <label className={LABEL_CLASS}>
            City
            <RequiredMark />
          </label>
          <input
            type="text"
            value={formData.employeeCity}
            onChange={(e) => updateField("employeeCity", e.target.value)}
            placeholder="e.g. Los Angeles"
            aria-invalid={Boolean(fieldErrors.employeeCity)}
            className={fieldClassName(FIELD_CLASS, fieldErrors.employeeCity)}
          />
          <FieldError errors={fieldErrors} name="employeeCity" />
        </div>

        <div className="sm:col-span-4" id="w2-field-employeeState">
          <label className={LABEL_CLASS}>
            State
            <RequiredMark />
          </label>
          <div className="relative">
            <select
              value={formData.employeeState}
              onChange={(e) => updateField("employeeState", e.target.value)}
              aria-invalid={Boolean(fieldErrors.employeeState)}
              className={fieldClassName(SELECT_CLASS, fieldErrors.employeeState)}
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

        <div className="sm:col-span-3" id="w2-field-employeeZip">
          <label className={LABEL_CLASS}>
            ZIP Code
            <RequiredMark />
          </label>
          <input
            type="text"
            value={formData.employeeZip}
            onChange={(e) => updateField("employeeZip", e.target.value)}
            placeholder="e.g. 90210"
            aria-invalid={Boolean(fieldErrors.employeeZip)}
            className={fieldClassName(FIELD_CLASS, fieldErrors.employeeZip)}
          />
          <FieldError errors={fieldErrors} name="employeeZip" />
        </div>
      </div>
    </div>

    <StepNav onBack={onBack} onNext={onNext} />
  </div>
);

export default EmployeeStep;
