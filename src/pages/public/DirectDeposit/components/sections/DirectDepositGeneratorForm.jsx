import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  ChevronDown,
  Lock,
  ArrowRight,
  Check,
  Edit2,
  Mail,
  CheckCircle2,
  Download,
  ShieldAlert,
} from 'lucide-react';
import accountTypeOptions from '../../../data/directDeposit/accountTypeOptions.json';
import STEPS from '../../../data/directDeposit/steps.json';
import US_STATES from '../../../data/shared/usStates.json';

const DirectDepositGeneratorForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(90);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Employer Information
    employerName: 'Company Name',
    streetAddress: '123 Business Avenue',
    city: 'City',
    state: 'ST',
    zipCode: '00000',
    employerContact: '',

    // Step 2: Employee Information
    employeeName: 'Employee / Recipient Name',
    employeeAddress: '456 Residential Rd',
    employeeCity: 'City',
    employeeState: 'ST',
    employeeZipCode: '00000',
    employeeId: 'EMP-8821',

    // Step 3: Deposit Details
    depositDate: '10/24/2026',
    payPeriod: 'May 1 – May 15, 2025',
    paymentReference: 'REF-99201',
    bankName: 'Chase Bank',
    accountHolderName: 'Employee Name',
    accountType: 'Checking', // Checking | Savings
    accountNumber: '•••• 0000',
    depositAmount: '1,850.00',
    paymentDescription: 'Bi-weekly Direct Deposit Payroll',

    // Step 5: Checkout Details
    email: '',
    verificationCode: '',
    agreedToTerms: false,
  });

  const [paymentComplete, setPaymentComplete] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleZoom = (delta) => {
    setZoomLevel((prev) => {
      const next = prev + delta;
      return Math.min(Math.max(next, 70), 120);
    });
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  const handleSendCode = () => {
    if (!formData.email) {
      alert('Please enter your email address first.');
      return;
    }
    setCodeSent(true);
    setFormData((prev) => ({ ...prev, verificationCode: '729184' }));
  };

  return (
    <section className="w-full bg-[#F7FAFF] py-10 sm:py-16 border-t border-slate-200/80">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Horizontal 5-Step Stepper Header matching Figma */}
        <div className="mb-10 sm:mb-14">
          <div className="relative max-w-4xl mx-auto">
            {/* Connecting Line behind circles */}
            <div
              className="absolute top-4 left-[10%] right-[10%] h-[1.5px] bg-slate-200 -z-0"
              aria-hidden="true"
            >
              <div
                className="h-full bg-secondary transition-all duration-300"
                style={{
                  width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
                }}
              />
            </div>

            {/* Stepper Circles & Labels */}
            <div className="relative z-10 flex items-center justify-between">
              {STEPS.map((step) => {
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => {
                      if (step.id <= currentStep || isCompleted) {
                        setCurrentStep(step.id);
                      }
                    }}
                    disabled={step.id > currentStep}
                    className="flex flex-col items-center group cursor-pointer focus:outline-hidden disabled:cursor-not-allowed"
                  >
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-semibold text-[13px] sm:text-[14px] transition-all duration-200 ${
                        isActive
                          ? 'bg-[#1E60F2] text-white ring-4 ring-[#1E60F2]/15 shadow-sm scale-105'
                          : isCompleted
                          ? 'bg-[#DCEBFE] text-[#1E60F2] hover:bg-blue-200'
                          : 'bg-white border-2 border-slate-300 text-slate-400'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 stroke-[2.8]" />
                      ) : step.id === 5 && isActive ? (
                        '$'
                      ) : (
                        step.id
                      )}
                    </div>
                    <span
                      className={`mt-2 text-[12px] sm:text-[13px] font-medium transition-colors text-center whitespace-nowrap ${
                        isActive
                          ? 'text-[#1E60F2] font-semibold'
                          : isCompleted
                          ? 'text-slate-700'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Two Column Layout: Main Form (Left) & Sticky Live Preview (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 sm:p-8 md:p-10">
              
              {/* STEP 1: Employer Information matching Figma media_1793597424314.png */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* Step Header */}
                  <div className="flex items-start gap-3.5 pb-2">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-blue-50 text-secondary font-bold text-[13px] tracking-wide mt-0.5">
                      01
                    </span>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#092258]">
                        Employer information
                      </h2>
                      <p className="text-slate-400 text-[14px] mt-0.5">
                        Enter the legal details exactly as they should appear.
                      </p>
                    </div>
                  </div>

                  {/* Company / Employer Name */}
                  <div>
                    <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                      Company / Employer Name
                    </label>
                    <input
                      type="text"
                      value={formData.employerName}
                      onChange={(e) => handleInputChange('employerName', e.target.value)}
                      placeholder=""
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                    />
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={formData.streetAddress}
                      onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                      placeholder=""
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                    />
                  </div>

                  {/* City, State, ZIP */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-5">
                      <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder=""
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                        State
                      </label>
                      <div className="relative">
                        <select
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          className="w-full appearance-none px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all pr-10 cursor-pointer"
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
                      <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        placeholder=""
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* Employer Contact Information (Optional) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[14px] font-semibold text-slate-800">
                        Employer Contact Information
                      </label>
                      <span className="text-[13px] text-slate-400 font-normal">
                        Optional
                      </span>
                    </div>
                    <input
                      type="text"
                      value={formData.employerContact}
                      onChange={(e) => handleInputChange('employerContact', e.target.value)}
                      placeholder=""
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                    />
                  </div>

                  {/* Action: Save & Continue */}
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-secondary hover:bg-[#0089e0] text-white font-semibold text-[15px] px-6 py-3.5 rounded-xl shadow-sm hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer active:scale-98"
                    >
                      <span>Save & Continue</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Employee Information matching Figma media_1793597443452.png */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  {/* Step Header */}
                  <div className="flex items-start gap-3.5 pb-2">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-blue-50 text-secondary font-bold text-[13px] tracking-wide mt-0.5">
                      02
                    </span>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#092258]">
                        Employee information
                      </h2>
                      <p className="text-slate-400 text-[14px] mt-0.5">
                        Personal information is encrypted and handled securely.
                      </p>
                    </div>
                  </div>

                  {/* Employee Full Name */}
                  <div>
                    <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                      Employee Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.employeeName}
                      onChange={(e) => handleInputChange('employeeName', e.target.value)}
                      placeholder="Employee Full Name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                    />
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={formData.employeeAddress}
                      onChange={(e) => handleInputChange('employeeAddress', e.target.value)}
                      placeholder="Street Address"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                    />
                  </div>

                  {/* City, State, ZIP */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-5">
                      <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={formData.employeeCity}
                        onChange={(e) => handleInputChange('employeeCity', e.target.value)}
                        placeholder="City"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                        State
                      </label>
                      <div className="relative">
                        <select
                          value={formData.employeeState}
                          onChange={(e) => handleInputChange('employeeState', e.target.value)}
                          className="w-full appearance-none px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all pr-10 cursor-pointer"
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
                      <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={formData.employeeZipCode}
                        onChange={(e) => handleInputChange('employeeZipCode', e.target.value)}
                        placeholder="ZIP Code"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* Employee ID (Optional) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[14px] font-semibold text-slate-800">
                        Employee ID
                      </label>
                      <span className="text-[13px] text-slate-400 font-normal">
                        Optional
                      </span>
                    </div>
                    <input
                      type="text"
                      value={formData.employeeId}
                      onChange={(e) => handleInputChange('employeeId', e.target.value)}
                      placeholder=""
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                    />
                  </div>

                  {/* Actions: < Back (left), Save & Continue > (right) */}
                  <div className="flex items-center justify-between pt-6">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium text-[14.5px] hover:bg-slate-50 transition cursor-pointer"
                    >
                      &lt; Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-secondary hover:bg-[#0089e0] text-white font-semibold text-[15px] px-6 py-3.5 rounded-xl shadow-sm hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer active:scale-98"
                    >
                      <span>Save & Continue</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Deposit Details matching Figma media_1793597459968.png */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  {/* Step Header */}
                  <div className="flex items-start gap-3.5 pb-2">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-blue-50 text-secondary font-bold text-[13px] tracking-wide mt-0.5">
                      03
                    </span>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#092258]">
                        Deposit details
                      </h2>
                      <p className="text-slate-400 text-[14px] mt-0.5">
                        Enter the payment details for this informational slip.
                      </p>
                    </div>
                  </div>

                  {/* Amber Warning Notice matching Figma */}
                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-amber-800">
                    <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 stroke-[2]" />
                    <p className="text-[13.5px] font-normal leading-relaxed">
                      This document is not a bank-issued record or proof of a completed transaction.
                    </p>
                  </div>

                  {/* Row 1: Deposit Date & Pay Period */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                        Deposit Date
                      </label>
                      <input
                        type="text"
                        value={formData.depositDate}
                        onChange={(e) => handleInputChange('depositDate', e.target.value)}
                        placeholder="MM/DD/YY"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                        Pay Period
                      </label>
                      <input
                        type="text"
                        value={formData.payPeriod}
                        onChange={(e) => handleInputChange('payPeriod', e.target.value)}
                        placeholder="May 1 – May 15, 2025"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Payment Reference Number & Bank Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                        Payment Reference Number
                      </label>
                      <input
                        type="text"
                        value={formData.paymentReference}
                        onChange={(e) => handleInputChange('paymentReference', e.target.value)}
                        placeholder=""
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[13.5px] font-semibold text-slate-800">
                          Bank Name
                        </label>
                        <span className="text-[12.5px] text-slate-400 font-normal">
                          Optional
                        </span>
                      </div>
                      <input
                        type="text"
                        value={formData.bankName}
                        onChange={(e) => handleInputChange('bankName', e.target.value)}
                        placeholder=""
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 3: Account Holder Name */}
                  <div>
                    <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      value={formData.accountHolderName}
                      onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                      placeholder=""
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                    />
                  </div>

                  {/* Row 4: Account Type, Account Number, Deposit Amount (3 columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-4">
                      <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                        Account Type
                      </label>
                      <div className="relative">
                        <select
                          value={formData.accountType}
                          onChange={(e) => handleInputChange('accountType', e.target.value)}
                          className="w-full appearance-none px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all pr-10 cursor-pointer"
                        >
                          {accountTypeOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                        Account Number
                      </label>
                      <input
                        type="text"
                        value={formData.accountNumber}
                        onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                        placeholder="•••• 0000"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                        Deposit Amount
                      </label>
                      <input
                        type="text"
                        value={formData.depositAmount}
                        onChange={(e) => handleInputChange('depositAmount', e.target.value)}
                        placeholder="$0.00"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 5: Payment Description (Optional) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[13.5px] font-semibold text-slate-800">
                        Payment Description
                      </label>
                      <span className="text-[12.5px] text-slate-400 font-normal">
                        Optional
                      </span>
                    </div>
                    <input
                      type="text"
                      value={formData.paymentDescription}
                      onChange={(e) => handleInputChange('paymentDescription', e.target.value)}
                      placeholder=""
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                    />
                  </div>

                  {/* Actions: < Back (left), Save & Continue > (right) */}
                  <div className="flex items-center justify-between pt-6">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium text-[14.5px] hover:bg-slate-50 transition cursor-pointer"
                    >
                      &lt; Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-secondary hover:bg-[#0089e0] text-white font-semibold text-[15px] px-6 py-3.5 rounded-xl shadow-sm hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer active:scale-98"
                    >
                      <span>Save & Continue</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Review your document matching Figma media_1793597476365.png */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  {/* Step Header */}
                  <div className="flex items-start gap-3.5 pb-2">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-blue-50 text-secondary font-bold text-[13px] tracking-wide mt-0.5">
                      04
                    </span>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#092258]">
                        Review your document
                      </h2>
                      <p className="text-slate-400 text-[14px] mt-0.5">
                        Confirm everything is accurate before checkout.
                      </p>
                    </div>
                  </div>

                  {/* Section 1: Employer / Payer Details */}
                  <div className="p-5 rounded-2xl border border-slate-200/90 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-slate-900 text-[15px]">
                        Employer / Payer Details
                      </h3>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-secondary hover:underline text-[13px] font-medium cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 text-[13.5px]">
                      <div className="flex justify-between sm:justify-start sm:gap-6">
                        <span className="text-slate-500 w-36">Employer Name</span>
                        <strong className="text-slate-800">{formData.employerName || '—'}</strong>
                      </div>
                      <div className="flex justify-between sm:justify-start sm:gap-6">
                        <span className="text-slate-500 w-36">Employer Address</span>
                        <strong className="text-slate-800">{formData.streetAddress || '—'}</strong>
                      </div>
                      <div className="flex justify-between sm:justify-start sm:gap-6">
                        <span className="text-slate-500 w-36">Employer City</span>
                        <strong className="text-slate-800">{formData.city || '—'}</strong>
                      </div>
                      <div className="flex justify-between sm:justify-start sm:gap-6">
                        <span className="text-slate-500 w-36">Employer Zip</span>
                        <strong className="text-slate-800">{formData.zipCode || '—'}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Employee / Recipient Details */}
                  <div className="p-5 rounded-2xl border border-slate-200/90 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-slate-900 text-[15px]">
                        Employee / Recipient Details
                      </h3>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="text-secondary hover:underline text-[13px] font-medium cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 text-[13.5px]">
                      <div className="flex justify-between sm:justify-start sm:gap-6">
                        <span className="text-slate-500 w-36">Person Name</span>
                        <strong className="text-slate-800">{formData.employeeName || '—'}</strong>
                      </div>
                      <div className="flex justify-between sm:justify-start sm:gap-6">
                        <span className="text-slate-500 w-36">Person Address</span>
                        <strong className="text-slate-800">{formData.employeeAddress || '—'}</strong>
                      </div>
                      <div className="flex justify-between sm:justify-start sm:gap-6">
                        <span className="text-slate-500 w-36">Person City</span>
                        <strong className="text-slate-800">{formData.employeeCity || '—'}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Deposit Details */}
                  <div className="p-5 rounded-2xl border border-slate-200/90 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-slate-900 text-[15px]">
                        Deposit Details
                      </h3>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="text-secondary hover:underline text-[13px] font-medium cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 text-[13.5px]">
                      <div className="flex justify-between sm:justify-start sm:gap-6">
                        <span className="text-slate-500 w-36">Date</span>
                        <strong className="text-slate-800">{formData.depositDate || '—'}</strong>
                      </div>
                      <div className="flex justify-between sm:justify-start sm:gap-6">
                        <span className="text-slate-500 w-36">Period</span>
                        <strong className="text-slate-800">{formData.payPeriod || '—'}</strong>
                      </div>
                      <div className="flex justify-between sm:justify-start sm:gap-6">
                        <span className="text-slate-500 w-36">Reference</span>
                        <strong className="text-slate-800">{formData.paymentReference || '—'}</strong>
                      </div>
                      <div className="flex justify-between sm:justify-start sm:gap-6">
                        <span className="text-slate-500 w-36">Bank</span>
                        <strong className="text-slate-800">{formData.bankName || '—'}</strong>
                      </div>
                      <div className="flex justify-between sm:justify-start sm:gap-6">
                        <span className="text-slate-500 w-36">Amount</span>
                        <strong className="text-slate-800">${formData.depositAmount || '0.00'}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Document Price Banner Card matching Figma */}
                  <div className="p-5 rounded-2xl bg-[#F0F7FF] border border-blue-200/60 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#092258] text-[15px]">
                        Direct Deposit Slip
                      </p>
                      <p className="text-slate-500 text-[13px] mt-0.5">
                        Professionally formatted PDF
                      </p>
                    </div>
                    <div>
                      <span className="text-[14px] font-bold text-slate-700">Configured at checkout</span>
                    </div>
                  </div>

                  {/* Actions: < Back (left), Continue to Checkout (right) */}
                  <div className="flex items-center justify-between pt-6">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium text-[14.5px] hover:bg-slate-50 transition cursor-pointer"
                    >
                      &lt; Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-secondary hover:bg-[#0089e0] text-white font-semibold text-[15px] px-8 py-3.5 rounded-xl shadow-sm hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer active:scale-98"
                    >
                      <span>Continue to Checkout</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: Checkout matching Figma media_1793597494028.png */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  {paymentComplete ? (
                    <div className="py-8 px-6 text-center space-y-4 bg-emerald-50/50 rounded-2xl border border-emerald-200">
                      <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#092258]">
                        Payment Successful!
                      </h3>
                      <p className="text-slate-600 text-[14.5px] max-w-md mx-auto">
                        Your official Direct Deposit Slip for {formData.employeeName} has been generated. An email with your PDF has also been sent to <strong>{formData.email || 'your email'}</strong>.
                      </p>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => alert('Downloading official Direct Deposit Slip PDF...')}
                          className="bg-secondary hover:bg-[#0089e0] text-white font-semibold text-[15px] px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
                        >
                          <Download className="w-4 h-4 stroke-[2.5]" />
                          <span>Download Direct Deposit Slip (PDF)</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Email address * with Resend Code button */}
                      <div>
                        <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                          Email address <span className="text-rose-500">*</span>
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="Enter your email address here"
                            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                          />
                          <button
                            type="button"
                            onClick={handleSendCode}
                            className="px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 font-medium text-[13.5px] transition cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap bg-white hover:bg-slate-50"
                          >
                            <Mail className="w-4 h-4 text-slate-500" />
                            <span>{codeSent ? 'Resent Code' : 'Resend Code'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Verification code * */}
                      <div>
                        <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                          Verification code <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.verificationCode}
                          onChange={(e) => handleInputChange('verificationCode', e.target.value)}
                          placeholder="0000 0000 0000"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all tracking-wider"
                        />
                      </div>

                      {/* Terms Checkbox */}
                      <div className="flex items-start gap-2.5 pt-1">
                        <input
                          type="checkbox"
                          id="terms-conditions-dd"
                          checked={formData.agreedToTerms}
                          onChange={(e) => handleInputChange('agreedToTerms', e.target.checked)}
                          className="mt-1 w-4 h-4 rounded text-secondary border-slate-300 focus:ring-secondary cursor-pointer"
                        />
                        <label htmlFor="terms-conditions-dd" className="text-[13.5px] text-slate-700 cursor-pointer select-none">
                          I agree to the Terms & Conditions and Privacy Policy.
                        </label>
                      </div>

                      {/* Primary Action Button: Pay $14.99 securely */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (!formData.email) {
                              alert('Please enter your email address.');
                              return;
                            }
                            setPaymentComplete(true);
                          }}
                          className="w-full bg-secondary hover:bg-[#0089e0] text-white font-semibold text-[15.5px] py-3.5 rounded-xl shadow-sm hover:shadow transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer active:scale-98"
                        >
                          <Lock className="w-4 h-4 stroke-[2.2]" />
                          <span>Pay $14.99 securely</span>
                        </button>

                        <p className="text-center text-[13px] text-slate-400 mt-3">
                          Payments processed securely by Stripe.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* Right Column: Sticky Live Preview matching all 5 Figma images */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-28">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
              
              {/* Header: Live Preview Status & Zoom Controls */}
              <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-slate-800 text-[14px]">
                    Live preview
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-600">
                  <button
                    type="button"
                    onClick={() => handleZoom(-10)}
                    disabled={zoomLevel <= 70}
                    className="p-1 rounded hover:bg-slate-100 disabled:opacity-40 transition cursor-pointer"
                    aria-label="Zoom out"
                  >
                    <ZoomOut className="w-4 h-4 stroke-[2]" />
                  </button>
                  <span className="text-[13px] font-medium text-slate-700 min-w-[36px] text-center">
                    {zoomLevel}%
                  </span>
                  <button
                    type="button"
                    onClick={() => handleZoom(10)}
                    disabled={zoomLevel >= 120}
                    className="p-1 rounded hover:bg-slate-100 disabled:opacity-40 transition cursor-pointer"
                    aria-label="Zoom in"
                  >
                    <ZoomIn className="w-4 h-4 stroke-[2]" />
                  </button>
                </div>
              </div>

              {/* Inner Preview Canvas (#F1F9FF matching Figma) */}
              <div className="p-4 sm:p-5 bg-[#F1F9FF] flex items-center justify-center overflow-x-auto min-h-[360px]">
                <div
                  className="transition-transform duration-200 origin-top shadow-md bg-white border border-slate-300 w-full max-w-[380px] relative overflow-hidden"
                  style={{ transform: `scale(${zoomLevel / 100})` }}
                >
                  {/* Subtle Translucent PREVIEW Watermark matching Figma */}
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10"
                    aria-hidden="true"
                  >
                    <span className="text-[44px] font-black text-sky-500/10 rotate-[-25deg] tracking-widest">
                      PREVIEW
                    </span>
                  </div>

                  {/* Official Rendered Direct Deposit Slip */}
                  <div className="text-[9px] leading-tight font-sans text-slate-900 select-none">
                    
                    {/* Top Navy Header Banner matching Figma */}
                    <div className="bg-[#092258] text-white px-3 py-2 flex items-center justify-between">
                      <span className="text-[7.5px] uppercase tracking-wider font-semibold opacity-90">
                        PAYMENT ADVICE
                      </span>
                      <span className="text-[8.5px] uppercase font-bold tracking-wider">
                        DIRECT DEPOSIT
                      </span>
                    </div>

                    {/* Top Section: Employer & Deposit Amount */}
                    <div className="p-3 border-b border-slate-200 flex items-start justify-between">
                      <div>
                        <span className="text-[6.5px] uppercase tracking-wider text-slate-400 font-semibold block">
                          EMPLOYER
                        </span>
                        <p className="font-bold text-[11px] text-slate-900 mt-0.5">
                          {formData.employerName || 'Company Name'}
                        </p>
                        <p className="text-[7.5px] text-slate-500">{formData.streetAddress || '123 Business Avenue'}</p>
                        <p className="text-[7.5px] text-slate-500">{formData.city || 'City'}, {formData.state || 'ST'} {formData.zipCode || '00000'}</p>
                      </div>

                      <div className="text-right border-l border-slate-200 pl-4">
                        <span className="text-[6.5px] uppercase tracking-wider text-slate-400 font-semibold block">
                          DEPOSIT AMOUNT
                        </span>
                        <p className="font-bold text-[14px] text-secondary mt-0.5">
                          ${formData.depositAmount || '0.00'}
                        </p>
                        <span className="text-[6.5px] text-slate-400 block mt-0.5">
                          Deposit date: {formData.depositDate || '—'}
                        </span>
                      </div>
                    </div>

                    {/* Recipient Header Band */}
                    <div className="bg-sky-50/70 border-b border-slate-200 px-3 py-1.5 flex items-center justify-between text-[7px] text-slate-600">
                      <div>
                        <span className="text-slate-400 font-semibold">PAY TO: </span>
                        <strong className="text-slate-800">{formData.employeeName || 'Employee / Recipient Name'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold">REFERENCE: </span>
                        <span className="text-slate-700">{formData.paymentReference || '—'}</span>
                      </div>
                    </div>

                    {/* Account Grid Table */}
                    <div className="p-3">
                      <div className="grid grid-cols-3 border-b border-slate-200 pb-1 text-[7px] uppercase font-semibold text-slate-400">
                        <span>BANK</span>
                        <span>ACCOUNT</span>
                        <span className="text-right">TYPE</span>
                      </div>
                      <div className="grid grid-cols-3 py-2 text-[8px] text-slate-800 font-medium">
                        <span>{formData.bankName || 'Bank name'}</span>
                        <span className="font-mono text-slate-600">{formData.accountNumber || '•••• 0000'}</span>
                        <span className="text-right text-slate-700">{formData.accountType || 'Checking'}</span>
                      </div>
                    </div>

                    {/* Bottom Payment Total Summary */}
                    <div className="px-3 py-2.5 bg-slate-50/80 border-t border-slate-200 flex items-center justify-between">
                      <span className="font-semibold text-slate-700 text-[8px]">Payment total</span>
                      <span className="font-bold text-secondary text-[10px]">
                        ${formData.depositAmount || '0.00'}
                      </span>
                    </div>

                  </div>
                </div>
              </div>

              {/* Bottom Metadata & Price in Step 5 matching Figma media_1793597494028.png */}
              {currentStep === 5 ? (
                <div className="p-5 border-t border-slate-100 bg-white space-y-3">
                  <div className="flex items-center justify-between text-[14px]">
                    <span className="text-slate-500 font-normal">Template</span>
                    <span className="font-bold text-slate-800">Direct Deposit</span>
                  </div>
                  <div className="border-t border-slate-100" />
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-lg">Total</span>
                    <span className="font-bold text-secondary text-2xl">$14.99</span>
                  </div>
                </div>
              ) : (
                /* Bottom Security Callout matching Figma */
                <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-center gap-2 bg-white text-slate-500 text-[13px]">
                  <Lock className="w-3.5 h-3.5 text-slate-400 stroke-[2]" />
                  <span>Your information is encrypted and securely processed.</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DirectDepositGeneratorForm;
