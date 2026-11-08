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
import STEPS from '../../../data/tax1099/steps.json';
import US_STATES from '../../../data/shared/usStates.json';

const Nec1099GeneratorForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(90);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Payer Information
    payerName: 'Acme Creative Studio LLC',
    streetAddress: '100 Innovation Way',
    city: 'Austin',
    state: 'TX',
    zipCode: '78701',
    payerTin: '74-1234567',
    accountNumber: 'ACCT-48210',

    // Step 2: Recipient Information
    recipientName: 'Alex R. Rivera',
    recipientStreetAddress: '240 Evergreen Ter',
    recipientCity: 'Austin',
    recipientState: 'TX',
    recipientZipCode: '78704',
    recipientTin: '456-78-9012',
    recipientAccountNumber: '',

    // Step 3: Compensation Details
    box1NonemployeeComp: '18,500.00',
    box2DirectSales: false,
    box3ExcessGoldenParachute: '',
    box4FederalTax: '2,200.00',

    // State reporting
    stateReportingState: 'TX',
    stateTaxWithheld: '',
    statePayerNo: 'TX-882109',
    stateIncome: '18,500.00',

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
    setFormData((prev) => ({ ...prev, verificationCode: '918273' }));
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
              
              {/* STEP 1: Payer Information matching Figma media_1793596986920.png */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* Step Header */}
                  <div className="flex items-start gap-3.5 pb-2">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-blue-50 text-secondary font-bold text-[13px] tracking-wide mt-0.5">
                      01
                    </span>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#092258]">
                        Payer information
                      </h2>
                      <p className="text-slate-400 text-[14px] mt-0.5">
                        Enter the legal details exactly as they should appear.
                      </p>
                    </div>
                  </div>

                  {/* Payer Name */}
                  <div>
                    <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                      Payer Name
                    </label>
                    <input
                      type="text"
                      value={formData.payerName}
                      onChange={(e) => handleInputChange('payerName', e.target.value)}
                      placeholder="Payer Name"
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

                  {/* Payer TIN */}
                  <div>
                    <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                      Payer TIN
                    </label>
                    <input
                      type="text"
                      value={formData.payerTin}
                      onChange={(e) => handleInputChange('payerTin', e.target.value)}
                      placeholder="12-3456789"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                    />
                  </div>

                  {/* Account Number (Optional) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[14px] font-semibold text-slate-800">
                        Account Number
                      </label>
                      <span className="text-[13px] text-slate-400 font-normal">
                        Optional
                      </span>
                    </div>
                    <input
                      type="text"
                      value={formData.accountNumber}
                      onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                      placeholder="Account Number"
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

              {/* STEP 2: Recipient Information matching Figma media_1793597004916.png */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  {/* Step Header */}
                  <div className="flex items-start gap-3.5 pb-2">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-blue-50 text-secondary font-bold text-[13px] tracking-wide mt-0.5">
                      02
                    </span>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#092258]">
                        Recipient information
                      </h2>
                      <p className="text-slate-400 text-[14px] mt-0.5">
                        Personal information is encrypted and handled securely.
                      </p>
                    </div>
                  </div>

                  {/* Recipient Name */}
                  <div>
                    <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      value={formData.recipientName}
                      onChange={(e) => handleInputChange('recipientName', e.target.value)}
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
                      value={formData.recipientStreetAddress}
                      onChange={(e) => handleInputChange('recipientStreetAddress', e.target.value)}
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
                        value={formData.recipientCity}
                        onChange={(e) => handleInputChange('recipientCity', e.target.value)}
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
                          value={formData.recipientState}
                          onChange={(e) => handleInputChange('recipientState', e.target.value)}
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
                        value={formData.recipientZipCode}
                        onChange={(e) => handleInputChange('recipientZipCode', e.target.value)}
                        placeholder=""
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* Recipient TIN */}
                  <div>
                    <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                      Recipient TIN
                    </label>
                    <input
                      type="text"
                      value={formData.recipientTin}
                      onChange={(e) => handleInputChange('recipientTin', e.target.value)}
                      placeholder="..-......."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                    />
                  </div>

                  {/* Account Number (Optional) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[14px] font-semibold text-slate-800">
                        Account Number
                      </label>
                      <span className="text-[13px] text-slate-400 font-normal">
                        Optional
                      </span>
                    </div>
                    <input
                      type="text"
                      value={formData.recipientAccountNumber}
                      onChange={(e) => handleInputChange('recipientAccountNumber', e.target.value)}
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

              {/* STEP 3: Compensation Details matching Figma media_1793597021070.png */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  {/* Step Header */}
                  <div className="flex items-start gap-3.5 pb-2">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-blue-50 text-secondary font-bold text-[13px] tracking-wide mt-0.5">
                      03
                    </span>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#092258]">
                        Compensation details
                      </h2>
                      <p className="text-slate-400 text-[14px] mt-0.5">
                        Enter values from your records. We do not calculate tax liability.
                      </p>
                    </div>
                  </div>

                  {/* Row 1: Box 1 & Box 3 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                        Box 1 – Nonemployee compensation
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                          $
                        </span>
                        <input
                          type="text"
                          value={formData.box1NonemployeeComp}
                          onChange={(e) => handleInputChange('box1NonemployeeComp', e.target.value)}
                          placeholder=""
                          className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                        Box 3 – Excess golden parachute payments
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                          $
                        </span>
                        <input
                          type="text"
                          value={formData.box3ExcessGoldenParachute}
                          onChange={(e) => handleInputChange('box3ExcessGoldenParachute', e.target.value)}
                          placeholder=""
                          className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Box 4 Federal Tax */}
                  <div className="sm:w-1/2 sm:pr-2">
                    <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                      Box 4 – Federal income tax withheld
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                        $
                      </span>
                      <input
                        type="text"
                        value={formData.box4FederalTax}
                        onChange={(e) => handleInputChange('box4FederalTax', e.target.value)}
                        placeholder=""
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 3: Box 2 Checkbox Card */}
                  <div className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="box2-direct-sales"
                      checked={formData.box2DirectSales}
                      onChange={(e) => handleInputChange('box2DirectSales', e.target.checked)}
                      className="w-4 h-4 rounded text-secondary border-slate-300 focus:ring-secondary cursor-pointer"
                    />
                    <label htmlFor="box2-direct-sales" className="text-[14px] text-slate-800 font-medium cursor-pointer select-none">
                      Box 2 – Payer made direct sales of $5,000 or more
                    </label>
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

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                          State
                        </label>
                        <div className="relative">
                          <select
                            value={formData.stateReportingState}
                            onChange={(e) => handleInputChange('stateReportingState', e.target.value)}
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
                          State tax withheld
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                            $
                          </span>
                          <input
                            type="text"
                            value={formData.stateTaxWithheld}
                            onChange={(e) => handleInputChange('stateTaxWithheld', e.target.value)}
                            placeholder=""
                            className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                          State/Payer's state no.
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                            $
                          </span>
                          <input
                            type="text"
                            value={formData.statePayerNo}
                            onChange={(e) => handleInputChange('statePayerNo', e.target.value)}
                            placeholder=""
                            className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                          />
                        </div>
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

              {/* STEP 4: Review your document matching Figma media_1793597036209.png */}
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
                        <strong className="text-slate-800">{formData.payerName || '—'}</strong>
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
                        <strong className="text-slate-800">{formData.recipientName || '—'}</strong>
                      </div>
                      <div className="flex justify-between sm:justify-start sm:gap-6">
                        <span className="text-slate-500 w-36">Person Address</span>
                        <strong className="text-slate-800">{formData.recipientStreetAddress || '—'}</strong>
                      </div>
                      <div className="flex justify-between sm:justify-start sm:gap-6">
                        <span className="text-slate-500 w-36">Person City</span>
                        <strong className="text-slate-800">{formData.recipientCity || '—'}</strong>
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
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[13.5px]">
                      <div>
                        <span className="text-slate-400 block text-[12px]">Box1</span>
                        <strong className="text-slate-800">{formData.box1NonemployeeComp || '0.00'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[12px]">Box3</span>
                        <strong className="text-slate-800">{formData.box3ExcessGoldenParachute || '0.00'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[12px]">Box4</span>
                        <strong className="text-slate-800">{formData.box4FederalTax || '0.00'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[12px]">State Wages</span>
                        <strong className="text-slate-800">{formData.stateIncome || '0.00'}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Document Price Banner Card matching Figma */}
                  <div className="p-5 rounded-2xl bg-[#F0F7FF] border border-blue-200/60 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#092258] text-[15px]">
                        1099-NEC Document
                      </p>
                      <p className="text-slate-500 text-[13px] mt-0.5">
                        Professionally formatted PDF
                      </p>
                    </div>
                    <div>
                      <span className="text-xl font-black text-[#092258]">$14.99</span>
                    </div>
                  </div>

                  {/* Actions: < Back (left), Continue to Checkout > (right) */}
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

              {/* STEP 5: Checkout matching Figma media_1793597054583.png */}
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
                        Your official Form 1099-NEC for {formData.recipientName} has been generated. An IRS compliant PDF has also been sent to <strong>{formData.email || 'your email'}</strong>.
                      </p>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => alert('Downloading official Form 1099-NEC PDF...')}
                          className="bg-secondary hover:bg-[#0089e0] text-white font-semibold text-[15px] px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
                        >
                          <Download className="w-4 h-4 stroke-[2.5]" />
                          <span>Download Form 1099-NEC (PDF)</span>
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
                          id="terms-conditions-1099"
                          checked={formData.agreedToTerms}
                          onChange={(e) => handleInputChange('agreedToTerms', e.target.checked)}
                          className="mt-1 w-4 h-4 rounded text-secondary border-slate-300 focus:ring-secondary cursor-pointer"
                        />
                        <label htmlFor="terms-conditions-1099" className="text-[13.5px] text-slate-700 cursor-pointer select-none">
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
                  className="transition-transform duration-200 origin-top shadow-md bg-white border border-slate-300 w-full max-w-[480px]"
                  style={{ transform: `scale(${zoomLevel / 100})` }}
                >
                  {/* Official Rendered IRS Form 1099-NEC */}
                  <div className="p-3 text-[9px] leading-tight font-sans text-slate-900 select-none">
                    
                    {/* Header: VOID, CORRECTED */}
                    <div className="flex items-center justify-center gap-6 border-b border-slate-400 pb-1 text-[8px] text-slate-600 font-medium">
                      <div className="flex items-center gap-1">
                        <div className="w-2.5 h-2.5 border border-slate-400" />
                        <span>VOID</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2.5 h-2.5 border border-slate-400" />
                        <span>CORRECTED</span>
                      </div>
                    </div>

                    {/* Middle Grid */}
                    <div className="grid grid-cols-12 border-b border-slate-400">
                      
                      {/* Left Side (Payer, Recipient details) */}
                      <div className="col-span-7 border-r border-slate-400">
                        {/* Payer's Details */}
                        <div className="p-1 border-b border-slate-400 min-h-[50px]">
                          <span className="text-[6.5px] text-slate-500 block leading-tight">
                            PAYER'S name, street address, city, state, ZIP, and telephone no.
                          </span>
                          <p className="font-bold text-[8.5px] mt-0.5">{formData.payerName || 'Payer Name'}</p>
                          <p className="text-[7.5px] text-slate-700">{formData.streetAddress || '100 Innovation Way'}</p>
                          <p className="text-[7.5px] text-slate-700">{formData.city || 'Austin'}, {formData.state || 'TX'} {formData.zipCode || '78701'}</p>
                        </div>

                        {/* TINs Row */}
                        <div className="grid grid-cols-2 border-b border-slate-400 min-h-[26px]">
                          <div className="p-1 border-r border-slate-400">
                            <span className="text-[6.5px] text-slate-500 block">PAYER'S TIN</span>
                            <span className="font-semibold text-[8px]">{formData.payerTin || '12-3456789'}</span>
                          </div>
                          <div className="p-1">
                            <span className="text-[6.5px] text-slate-500 block">RECIPIENT'S TIN</span>
                            <span className="font-semibold text-[8px]">{formData.recipientTin || '456-78-9012'}</span>
                          </div>
                        </div>

                        {/* Recipient's Name */}
                        <div className="p-1 border-b border-slate-400 min-h-[26px]">
                          <span className="text-[6.5px] text-slate-500 block">RECIPIENT'S name</span>
                          <p className="font-bold text-[8.5px] uppercase">{formData.recipientName || 'Alex R. Rivera'}</p>
                        </div>

                        {/* Recipient's Street Address */}
                        <div className="p-1 border-b border-slate-400 min-h-[26px]">
                          <span className="text-[6.5px] text-slate-500 block">Street address (including apt. no.)</span>
                          <p className="text-[7.5px]">{formData.recipientStreetAddress || '240 Evergreen Ter'}</p>
                        </div>

                        {/* City, State, ZIP */}
                        <div className="p-1 border-b border-slate-400 min-h-[26px]">
                          <span className="text-[6.5px] text-slate-500 block">City or town, state or province, country, and ZIP</span>
                          <p className="text-[7.5px]">{formData.recipientCity || 'Austin'}, {formData.recipientState || 'TX'} {formData.recipientZipCode || '78704'}</p>
                        </div>

                        {/* Account Number */}
                        <div className="p-1 min-h-[22px]">
                          <span className="text-[6.5px] text-slate-500 block">Account number (see instructions)</span>
                          <p className="text-[7.5px]">{formData.accountNumber || formData.recipientAccountNumber || ''}</p>
                        </div>
                      </div>

                      {/* Right Side (Boxes 1 - 7) */}
                      <div className="col-span-5">
                        
                        {/* Title & OMB */}
                        <div className="p-1 border-b border-slate-400 bg-slate-100/60 min-h-[46px] flex flex-col justify-between">
                          <div className="flex items-center justify-between text-[7px] text-slate-500">
                            <span>OMB No. 1545-0115</span>
                            <strong className="text-slate-900 text-[10px]">2022</strong>
                          </div>
                          <div>
                            <span className="font-bold text-[9px] block">Nonemployee Compensation</span>
                            <span className="text-[6.5px] text-slate-500">Copy 1 For State Tax Department</span>
                          </div>
                        </div>

                        {/* Box 1: Nonemployee compensation */}
                        <div className="p-1 border-b border-slate-400 min-h-[30px]">
                          <span className="text-[6.5px] text-slate-500 block">1 Nonemployee compensation</span>
                          <span className="font-bold text-[9px] block text-right">${formData.box1NonemployeeComp || '0.00'}</span>
                        </div>

                        {/* Box 2: Direct Sales */}
                        <div className="p-1 border-b border-slate-400 text-[6.5px] text-slate-600 min-h-[24px] flex items-center justify-between">
                          <span>2 Payer made direct sales totaling $5,000 or more</span>
                          <span className="font-bold">{formData.box2DirectSales ? '☑' : '□'}</span>
                        </div>

                        {/* Box 3: Excess Golden Parachute */}
                        <div className="p-1 border-b border-slate-400 min-h-[22px]">
                          <span className="text-[6.5px] text-slate-500 block">3 Excess golden parachute payments</span>
                          <span className="text-[7.5px] block text-right">{formData.box3ExcessGoldenParachute ? `$${formData.box3ExcessGoldenParachute}` : ''}</span>
                        </div>

                        {/* Box 4: Federal Tax Withheld */}
                        <div className="p-1 border-b border-slate-400 min-h-[26px]">
                          <span className="text-[6.5px] text-slate-500 block">4 Federal income tax withheld</span>
                          <span className="font-bold text-[8.5px] block text-right">${formData.box4FederalTax || '0.00'}</span>
                        </div>

                        {/* Boxes 5 - 7: State Tax */}
                        <div className="grid grid-cols-3 text-[6.5px] p-0.5">
                          <div className="border-r border-slate-300 pr-0.5">
                            <span className="text-slate-500 block">5 State tax</span>
                            <span className="text-[7.5px] font-semibold">{formData.stateTaxWithheld ? `$${formData.stateTaxWithheld}` : '—'}</span>
                          </div>
                          <div className="border-r border-slate-300 px-0.5">
                            <span className="text-slate-500 block">6 State no.</span>
                            <span className="text-[7.5px] truncate block">{formData.statePayerNo || '—'}</span>
                          </div>
                          <div className="pl-0.5">
                            <span className="text-slate-500 block">7 State income</span>
                            <span className="text-[7.5px] font-semibold">${formData.stateIncome || '0.00'}</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Official IRS Title Footer */}
                    <div className="pt-2 flex items-center justify-between font-bold text-[8px]">
                      <div className="flex items-baseline gap-1">
                        <span className="text-[10px] font-black text-slate-900">Form 1099-NEC</span>
                        <span className="text-[7px] text-slate-500 font-normal">(Rev. 1-2022)</span>
                      </div>
                      <span className="text-[6.5px] text-slate-500 font-normal">
                        Department of the Treasury—Internal Revenue Service
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Metadata & Price in Step 5 matching Figma media_1793597054583.png */}
              {currentStep === 5 ? (
                <div className="p-5 border-t border-slate-100 bg-white space-y-3">
                  <div className="flex items-center justify-between text-[14px]">
                    <span className="text-slate-500 font-normal">Template</span>
                    <span className="font-bold text-slate-800">1099-NEC</span>
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

export default Nec1099GeneratorForm;
