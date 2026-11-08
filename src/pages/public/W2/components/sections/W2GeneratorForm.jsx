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
  Plus,
} from 'lucide-react';
import STEPS from '../../../data/w2/steps.json';
import US_STATES from '../../../data/shared/usStates.json';

const W2GeneratorForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(90);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Employer Information
    ein: '12-3456789',
    employerName: 'Northwind Logistics LLC',
    streetAddress: '450 Market St',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    controlNumber: 'CTRL-88219',

    // Step 2: Employee Information
    ssn: '123-45-6789',
    firstName: 'Jordan',
    middleInitial: 'A',
    lastName: 'Miller',
    employeeAddress: '88 Pine Ave',
    employeeCity: 'Oakland',
    employeeState: 'CA',
    employeeZip: '94607',

    // Step 3: Wage & Tax Information
    box1Wages: '65,000.00',
    box2FederalTax: '8,450.00',
    box3SocialSecurityWages: '65,000.00',
    box4SocialSecurityTax: '4,030.00',
    box5MedicareWages: '65,000.00',
    box6MedicareTax: '942.50',
    box7SocialSecurityTips: '',
    box8AllocatedTips: '',
    box10DependentCare: '',
    box11NonqualifiedPlans: '',
    box13StatutoryEmployee: false,
    box12Code: 'DD',
    box12Amount: '6,200.00',

    // State reporting
    box15State: 'CA',
    box15StateId: 'CA-94105-01',
    box16StateWages: '65,000.00',
    box17StateTax: '3,250.00',
    box18LocalWages: '',
    box19LocalTax: '',
    box20Locality: '',

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
    setFormData((prev) => ({ ...prev, verificationCode: '849204' }));
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
              
              {/* STEP 1: Employer Information */}
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

                  {/* EIN */}
                  <div>
                    <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                      Employer Identification Number (EIN)
                    </label>
                    <input
                      type="text"
                      value={formData.ein}
                      onChange={(e) => handleInputChange('ein', e.target.value)}
                      placeholder="12-3456789"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                    />
                  </div>

                  {/* Employer Name */}
                  <div>
                    <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                      Employer Name
                    </label>
                    <input
                      type="text"
                      value={formData.employerName}
                      onChange={(e) => handleInputChange('employerName', e.target.value)}
                      placeholder="Employee name"
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
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
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
                        placeholder="Zip Code"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* Control Number */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[14px] font-semibold text-slate-800">
                        Control Number
                      </label>
                      <span className="text-[13px] text-slate-400 font-normal">
                        Optional
                      </span>
                    </div>
                    <input
                      type="text"
                      value={formData.controlNumber}
                      onChange={(e) => handleInputChange('controlNumber', e.target.value)}
                      placeholder="Control Number"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                    />
                  </div>

                  {/* Action */}
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

              {/* STEP 2: Employee Information matching Figma media_1793596594370.png */}
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

                  {/* SSN */}
                  <div>
                    <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                      Social Security Number (SSN)
                    </label>
                    <input
                      type="text"
                      value={formData.ssn}
                      onChange={(e) => handleInputChange('ssn', e.target.value)}
                      placeholder="...-..-...."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                    />
                  </div>

                  {/* First Name, Middle Initial (Optional), Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-5">
                      <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder=""
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-[14px] font-semibold text-slate-800">
                          Middle Initial
                        </label>
                        <span className="text-[12px] text-slate-400 font-normal">
                          Optional
                        </span>
                      </div>
                      <input
                        type="text"
                        value={formData.middleInitial}
                        onChange={(e) => handleInputChange('middleInitial', e.target.value)}
                        placeholder=""
                        maxLength={2}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>
                    <div className="sm:col-span-4">
                      <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder=""
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>
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
                        value={formData.employeeCity}
                        onChange={(e) => handleInputChange('employeeCity', e.target.value)}
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
                        value={formData.employeeZip}
                        onChange={(e) => handleInputChange('employeeZip', e.target.value)}
                        placeholder=""
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>
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

              {/* STEP 3: Wage & Tax Information matching Figma media_1793596615235.png */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  {/* Step Header */}
                  <div className="flex items-start gap-3.5 pb-2">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-blue-50 text-secondary font-bold text-[13px] tracking-wide mt-0.5">
                      03
                    </span>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#092258]">
                        Wage & tax information
                      </h2>
                      <p className="text-slate-400 text-[14px] mt-0.5">
                        Enter values from your records. We do not calculate tax liability.
                      </p>
                    </div>
                  </div>

                  {/* 2-Column Grid matching Figma */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Box 1 & Box 2 */}
                    <div>
                      <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                        Box 1 – Wages, tips, other compensation
                      </label>
                      <input
                        type="text"
                        value={formData.box1Wages}
                        onChange={(e) => handleInputChange('box1Wages', e.target.value)}
                        placeholder="$0.00"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                        Box 2 – Federal income tax withheld
                      </label>
                      <input
                        type="text"
                        value={formData.box2FederalTax}
                        onChange={(e) => handleInputChange('box2FederalTax', e.target.value)}
                        placeholder="$0.00"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>

                    {/* Box 3 & Box 4 */}
                    <div>
                      <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                        Box 3 – Social Security wages
                      </label>
                      <input
                        type="text"
                        value={formData.box3SocialSecurityWages}
                        onChange={(e) => handleInputChange('box3SocialSecurityWages', e.target.value)}
                        placeholder="$0.00"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                        Box 4 – Social Security tax withheld
                      </label>
                      <input
                        type="text"
                        value={formData.box4SocialSecurityTax}
                        onChange={(e) => handleInputChange('box4SocialSecurityTax', e.target.value)}
                        placeholder="$0.00"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>

                    {/* Box 5 & Box 6 */}
                    <div>
                      <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                        Box 5 – Medicare wages and tips
                      </label>
                      <input
                        type="text"
                        value={formData.box5MedicareWages}
                        onChange={(e) => handleInputChange('box5MedicareWages', e.target.value)}
                        placeholder="$0.00"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                        Box 6 – Medicare tax withheld
                      </label>
                      <input
                        type="text"
                        value={formData.box6MedicareTax}
                        onChange={(e) => handleInputChange('box6MedicareTax', e.target.value)}
                        placeholder="$0.00"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>

                    {/* Box 7 & Box 8 */}
                    <div>
                      <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                        Box 7 – Social Security tips
                      </label>
                      <input
                        type="text"
                        value={formData.box7SocialSecurityTips}
                        onChange={(e) => handleInputChange('box7SocialSecurityTips', e.target.value)}
                        placeholder="$0.00"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                        Box 8 – Allocated tips
                      </label>
                      <input
                        type="text"
                        value={formData.box8AllocatedTips}
                        onChange={(e) => handleInputChange('box8AllocatedTips', e.target.value)}
                        placeholder="$0.00"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>

                    {/* Box 10 & Box 11 */}
                    <div>
                      <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                        Box 10 – Dependent care benefits
                      </label>
                      <input
                        type="text"
                        value={formData.box10DependentCare}
                        onChange={(e) => handleInputChange('box10DependentCare', e.target.value)}
                        placeholder="$0.00"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                        Box 11 – Nonqualified plans
                      </label>
                      <input
                        type="text"
                        value={formData.box11NonqualifiedPlans}
                        onChange={(e) => handleInputChange('box11NonqualifiedPlans', e.target.value)}
                        placeholder="$0.00"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* Box 13 – Statutory employee Checkbox in full width row */}
                  <div className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="box13-statutory"
                      checked={formData.box13StatutoryEmployee}
                      onChange={(e) => handleInputChange('box13StatutoryEmployee', e.target.checked)}
                      className="w-4 h-4 rounded text-secondary border-slate-300 focus:ring-secondary cursor-pointer"
                    />
                    <label htmlFor="box13-statutory" className="text-[14px] text-slate-800 font-medium cursor-pointer select-none">
                      Box 13 – Statutory employee
                    </label>
                  </div>

                  {/* Box 12 Code & Amount */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                        Box 12 – Code
                      </label>
                      <input
                        type="text"
                        value={formData.box12Code}
                        onChange={(e) => handleInputChange('box12Code', e.target.value)}
                        placeholder="DD"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                        Box 12 – Amount
                      </label>
                      <input
                        type="text"
                        value={formData.box12Amount}
                        onChange={(e) => handleInputChange('box12Amount', e.target.value)}
                        placeholder="$0.00"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* State Reporting Section matching Figma */}
                  <div className="pt-3">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-[15px] font-bold text-slate-900">
                          State reporting
                        </h3>
                        <p className="text-[13px] text-slate-400 mt-0.5">
                          Add applicable state and local values.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert('Additional state reporting added.')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:border-secondary text-slate-700 hover:text-secondary text-[13px] font-medium transition cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Add state</span>
                      </button>
                    </div>

                    {/* Row 1: Box 15 State, Box 16 State wages, Box 17 State tax */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                          Box 15 – State
                        </label>
                        <div className="relative">
                          <select
                            value={formData.box15State}
                            onChange={(e) => handleInputChange('box15State', e.target.value)}
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

                      <div>
                        <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                          Box 16 – State wages
                        </label>
                        <input
                          type="text"
                          value={formData.box16StateWages}
                          onChange={(e) => handleInputChange('box16StateWages', e.target.value)}
                          placeholder=""
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                          Box 17 – State tax
                        </label>
                        <input
                          type="text"
                          value={formData.box17StateTax}
                          onChange={(e) => handleInputChange('box17StateTax', e.target.value)}
                          placeholder=""
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: Box 18 Local wages, Box 19 Local tax, Box 20 Locality */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                          Box 18 – Local wages
                        </label>
                        <input
                          type="text"
                          value={formData.box18LocalWages}
                          onChange={(e) => handleInputChange('box18LocalWages', e.target.value)}
                          placeholder=""
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                          Box 19 – Local tax
                        </label>
                        <input
                          type="text"
                          value={formData.box19LocalTax}
                          onChange={(e) => handleInputChange('box19LocalTax', e.target.value)}
                          placeholder=""
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                          Box 20 – Locality
                        </label>
                        <input
                          type="text"
                          value={formData.box20Locality}
                          onChange={(e) => handleInputChange('box20Locality', e.target.value)}
                          placeholder=""
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                        />
                      </div>
                    </div>
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

              {/* STEP 4: Review your document matching Figma media_1793596633994.png */}
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
                        <span className="text-slate-500 w-36">First Name</span>
                        <strong className="text-slate-800">{formData.firstName || '—'}</strong>
                      </div>
                      <div className="flex justify-between sm:justify-start sm:gap-6">
                        <span className="text-slate-500 w-36">Last Name</span>
                        <strong className="text-slate-800">{formData.lastName || '—'}</strong>
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

                  {/* Section 3: Tax & Compensation */}
                  <div className="p-5 rounded-2xl border border-slate-200/90 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-slate-900 text-[15px]">
                        Tax & Compensation
                      </h3>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="text-secondary hover:underline text-[13px] font-medium cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                    {formData.box1Wages ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[13.5px]">
                        <div>
                          <span className="text-slate-400 block text-[12px]">Wages</span>
                          <strong className="text-slate-800">${formData.box1Wages}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[12px]">Federal Tax</span>
                          <strong className="text-slate-800">${formData.box2FederalTax || '0.00'}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[12px]">Social Security</span>
                          <strong className="text-slate-800">${formData.box4SocialSecurityTax || '0.00'}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[12px]">Medicare Tax</span>
                          <strong className="text-slate-800">${formData.box6MedicareTax || '0.00'}</strong>
                        </div>
                      </div>
                    ) : (
                      <p className="text-slate-400 text-[13.5px]">No information entered yet.</p>
                    )}
                  </div>

                  {/* Section 4: Document Price Banner Card matching Figma */}
                  <div className="p-5 rounded-2xl bg-[#F0F7FF] border border-blue-200/60 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#092258] text-[15px]">
                        W-2 Document
                      </p>
                      <p className="text-slate-500 text-[13px] mt-0.5">
                        Professionally formatted PDF
                      </p>
                    </div>
                    <div>
                      <span className="text-xl font-black text-[#092258]">$14.99</span>
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
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: Checkout matching Figma media_1793596651319.png */}
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
                        Your official W-2 document for {formData.firstName} {formData.lastName} has been generated. An IRS compliant PDF has also been sent to <strong>{formData.email || 'your email'}</strong>.
                      </p>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => alert('Downloading official Form W-2 PDF...')}
                          className="bg-secondary hover:bg-[#0089e0] text-white font-semibold text-[15px] px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
                        >
                          <Download className="w-4 h-4 stroke-[2.5]" />
                          <span>Download Form W-2 (PDF)</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Email address * with Resend Code button on right */}
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
                          id="terms-conditions"
                          checked={formData.agreedToTerms}
                          onChange={(e) => handleInputChange('agreedToTerms', e.target.checked)}
                          className="mt-1 w-4 h-4 rounded text-secondary border-slate-300 focus:ring-secondary cursor-pointer"
                        />
                        <label htmlFor="terms-conditions" className="text-[13.5px] text-slate-700 cursor-pointer select-none">
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

          {/* Right Column: Dynamic Live Preview (Steps 1-4) or Order Summary (Step 5) */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-28">
            {currentStep === 5 ? (
              /* Order summary card matching Figma media_1793596651319.png */
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 space-y-6">
                <h3 className="font-bold text-xl text-[#092258]">
                  Order summary
                </h3>

                {/* Document Thumbnail Preview in soft blue frame */}
                <div className="p-3 bg-[#F1F9FF] rounded-xl flex items-center justify-center">
                  <div className="bg-white border border-slate-300 rounded shadow-xs p-2.5 w-full max-w-[280px]">
                    <div className="border border-slate-400 p-1.5 text-[7px] leading-tight text-slate-800">
                      <div className="flex justify-between border-b border-slate-400 pb-0.5 mb-1 font-bold">
                        <span>22222 Void □</span>
                        <span>a SSN: {formData.ssn || '***-**-****'}</span>
                        <span>OMB No. 1545-0008</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 border-b border-slate-400 pb-1 mb-1">
                        <div>
                          <p className="font-bold text-[7.5px] truncate">{formData.employerName || 'Employer Name'}</p>
                          <p className="text-[6.5px] text-slate-500 truncate">{formData.streetAddress}, {formData.city}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[6.5px] text-slate-400 block">1 Wages:</span>
                          <strong className="text-[7.5px]">${formData.box1Wages || '0.00'}</strong>
                        </div>
                      </div>
                      <div className="flex justify-between items-baseline pt-0.5">
                        <span className="font-black text-[8px]">W-2</span>
                        <span className="text-[6.5px] text-slate-500">Wage and Tax Statement 2025</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Template metadata row */}
                <div className="flex items-center justify-between text-[14px]">
                  <span className="text-slate-500 font-normal">Template</span>
                  <span className="font-bold text-slate-800">W-2</span>
                </div>

                <div className="border-t border-slate-100" />

                {/* Total row matching Figma */}
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-lg">Total</span>
                  <span className="font-bold text-secondary text-2xl">$14.99</span>
                </div>
              </div>
            ) : (
              /* Live preview card matching Figma steps 1-4 */
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
                    className="transition-transform duration-200 origin-top shadow-md bg-white border border-slate-300 w-full max-w-[480px]"
                    style={{ transform: `scale(${zoomLevel / 100})` }}
                  >
                    {/* Official Rendered IRS Form W-2 */}
                    <div className="p-3 text-[9px] leading-tight font-sans text-slate-900 select-none">
                      
                      {/* Top Row: 22222, Void, SSN, OMB */}
                      <div className="grid grid-cols-12 border-b border-slate-400">
                        <div className="col-span-2 border-r border-slate-400 p-1 font-bold text-[10px]">
                          22222
                        </div>
                        <div className="col-span-2 border-r border-slate-400 p-1 flex items-center gap-1 text-[8px] text-slate-500">
                          <span>Void</span>
                          <div className="w-2.5 h-2.5 border border-slate-400" />
                        </div>
                        <div className="col-span-5 border-r border-slate-400 p-1">
                          <span className="text-[7.5px] text-slate-500 block">a Employee's social security number</span>
                          <strong className="text-[9.5px] tracking-wider">{formData.ssn || '000-00-0000'}</strong>
                        </div>
                        <div className="col-span-3 p-1 text-right text-[7.5px] text-slate-500 font-medium">
                          OMB No. 1545-0008
                        </div>
                      </div>

                      {/* Middle Rows Grid */}
                      <div className="grid grid-cols-12 border-b border-slate-400">
                        {/* Left Column (Boxes b, c, d, e, f) */}
                        <div className="col-span-6 border-r border-slate-400">
                          {/* Box b: EIN */}
                          <div className="p-1 border-b border-slate-400 min-h-[28px]">
                            <span className="text-[7.5px] text-slate-500 block">b Employer identification number (EIN)</span>
                            <span className="font-semibold">{formData.ein || '12-3456789'}</span>
                          </div>

                          {/* Box c: Employer Name & Address */}
                          <div className="p-1 border-b border-slate-400 min-h-[48px]">
                            <span className="text-[7.5px] text-slate-500 block">c Employer's name, address, and ZIP code</span>
                            <p className="font-bold text-[8.5px]">{formData.employerName || 'Employer Name'}</p>
                            <p className="text-[8px] text-slate-700">{formData.streetAddress || '123 Business St'}</p>
                            <p className="text-[8px] text-slate-700">{formData.city || 'City'}, {formData.state || 'ST'} {formData.zipCode || '00000'}</p>
                          </div>

                          {/* Box d: Control number */}
                          <div className="p-1 border-b border-slate-400 min-h-[22px]">
                            <span className="text-[7.5px] text-slate-500 block">d Control number</span>
                            <span className="text-[8px]">{formData.controlNumber || ''}</span>
                          </div>

                          {/* Box e: Employee Name */}
                          <div className="p-1 border-b border-slate-400 min-h-[28px]">
                            <span className="text-[7.5px] text-slate-500 block">e Employee's first name, M.I., last name</span>
                            <p className="font-bold text-[9px] uppercase">
                              {formData.firstName || 'Jordan'} {formData.middleInitial ? `${formData.middleInitial}.` : ''} {formData.lastName || 'Miller'}
                            </p>
                          </div>

                          {/* Box f: Employee Address */}
                          <div className="p-1 min-h-[36px]">
                            <span className="text-[7.5px] text-slate-500 block">f Employee's address and ZIP code</span>
                            <p className="text-[8px]">{formData.employeeAddress || '88 Pine Ave'}</p>
                            <p className="text-[8px]">{formData.employeeCity || 'Oakland'}, {formData.employeeState || 'CA'} {formData.employeeZip || '94607'}</p>
                          </div>
                        </div>

                        {/* Right Column (Numbered Boxes 1 to 14) */}
                        <div className="col-span-6">
                          {/* Row 1 & 2 */}
                          <div className="grid grid-cols-2 border-b border-slate-400">
                            <div className="p-1 border-r border-slate-400 min-h-[26px]">
                              <span className="text-[7px] text-slate-500 block">1 Wages, tips, other comp.</span>
                              <span className="font-semibold block text-right">${formData.box1Wages || '0.00'}</span>
                            </div>
                            <div className="p-1 min-h-[26px]">
                              <span className="text-[7px] text-slate-500 block">2 Federal income tax</span>
                              <span className="font-semibold block text-right">${formData.box2FederalTax || '0.00'}</span>
                            </div>
                          </div>

                          {/* Row 3 & 4 */}
                          <div className="grid grid-cols-2 border-b border-slate-400">
                            <div className="p-1 border-r border-slate-400 min-h-[26px]">
                              <span className="text-[7px] text-slate-500 block">3 Social security wages</span>
                              <span className="font-semibold block text-right">${formData.box3SocialSecurityWages || '0.00'}</span>
                            </div>
                            <div className="p-1 min-h-[26px]">
                              <span className="text-[7px] text-slate-500 block">4 Social security tax</span>
                              <span className="font-semibold block text-right">${formData.box4SocialSecurityTax || '0.00'}</span>
                            </div>
                          </div>

                          {/* Row 5 & 6 */}
                          <div className="grid grid-cols-2 border-b border-slate-400">
                            <div className="p-1 border-r border-slate-400 min-h-[26px]">
                              <span className="text-[7px] text-slate-500 block">5 Medicare wages</span>
                              <span className="font-semibold block text-right">${formData.box5MedicareWages || '0.00'}</span>
                            </div>
                            <div className="p-1 min-h-[26px]">
                              <span className="text-[7px] text-slate-500 block">6 Medicare tax withheld</span>
                              <span className="font-semibold block text-right">${formData.box6MedicareTax || '0.00'}</span>
                            </div>
                          </div>

                          {/* Row 7 & 8 */}
                          <div className="grid grid-cols-2 border-b border-slate-400 text-slate-400">
                            <div className="p-1 border-r border-slate-400 min-h-[22px]">
                              <span className="text-[7px] block">7 Social security tips</span>
                              <span className="text-[7.5px] text-slate-700 block text-right">{formData.box7SocialSecurityTips ? `$${formData.box7SocialSecurityTips}` : ''}</span>
                            </div>
                            <div className="p-1 min-h-[22px]">
                              <span className="text-[7px] block">8 Allocated tips</span>
                              <span className="text-[7.5px] text-slate-700 block text-right">{formData.box8AllocatedTips ? `$${formData.box8AllocatedTips}` : ''}</span>
                            </div>
                          </div>

                          {/* Row 10 & 11 */}
                          <div className="grid grid-cols-2 border-b border-slate-400 text-slate-400">
                            <div className="p-1 border-r border-slate-400 min-h-[22px]">
                              <span className="text-[7px] block">10 Dependent care</span>
                              <span className="text-[7.5px] text-slate-700 block text-right">{formData.box10DependentCare ? `$${formData.box10DependentCare}` : ''}</span>
                            </div>
                            <div className="p-1 min-h-[22px]">
                              <span className="text-[7px] block">11 Nonqualified plans</span>
                              <span className="text-[7.5px] text-slate-700 block text-right">{formData.box11NonqualifiedPlans ? `$${formData.box11NonqualifiedPlans}` : ''}</span>
                            </div>
                          </div>

                          {/* Box 12 */}
                          <div className="p-1 border-b border-slate-400 flex items-center justify-between text-[7.5px]">
                            <span className="text-[7px] text-slate-500">12a {formData.box12Code || 'DD'}</span>
                            <span className="font-semibold">${formData.box12Amount || '0.00'}</span>
                          </div>

                          {/* Box 13 */}
                          <div className="p-1 flex items-center justify-between text-[7.5px] text-slate-600">
                            <div className="flex items-center gap-1">
                              <span className="text-[7px] text-slate-400">13</span>
                              <span>Statutory {formData.box13StatutoryEmployee ? '☑' : '□'}</span>
                              <span>Retirement □</span>
                            </div>
                            <div className="text-[7px] text-slate-400">
                              14 Other
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom State Taxes (Boxes 15 - 20) */}
                      <div className="grid grid-cols-12 border-b border-slate-400 text-[7.5px] min-h-[24px]">
                        <div className="col-span-3 border-r border-slate-400 p-0.5">
                          <span className="text-[6.5px] text-slate-500 block">15 State / Employer's ID</span>
                          <span className="font-semibold">{formData.box15State || 'CA'} {formData.box15StateId || ''}</span>
                        </div>
                        <div className="col-span-3 border-r border-slate-400 p-0.5">
                          <span className="text-[6.5px] text-slate-500 block">16 State wages</span>
                          <span className="font-semibold block text-right">${formData.box16StateWages || '0.00'}</span>
                        </div>
                        <div className="col-span-3 border-r border-slate-400 p-0.5">
                          <span className="text-[6.5px] text-slate-500 block">17 State income tax</span>
                          <span className="font-semibold block text-right">${formData.box17StateTax || '0.00'}</span>
                        </div>
                        <div className="col-span-3 p-0.5">
                          <span className="text-[6.5px] text-slate-500 block">18 Local wages / 19 Tax</span>
                          <span className="text-slate-700 block text-right">{formData.box18LocalWages ? `$${formData.box18LocalWages}` : '—'}</span>
                        </div>
                      </div>

                      {/* Official IRS Title Footer */}
                      <div className="pt-2 flex items-center justify-between font-bold text-[8.5px]">
                        <div className="flex items-baseline gap-1">
                          <span className="text-[11px] font-black text-slate-900">W-2</span>
                          <span className="text-[8px] text-slate-600 font-medium">Wage and Tax Statement</span>
                          <span className="text-[11px] font-black text-slate-900 ml-1">2025</span>
                        </div>
                        <span className="text-[7px] text-slate-500 font-normal">
                          Department of the Treasury—Internal Revenue Service
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Security Callout matching Figma */}
                <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-center gap-2 bg-white text-slate-500 text-[13px]">
                  <Lock className="w-3.5 h-3.5 text-slate-400 stroke-[2]" />
                  <span>Your information is encrypted and securely processed.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default W2GeneratorForm;
