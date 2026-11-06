import React, { useState, useMemo } from 'react';
import {
  Calendar,
  ChevronDown,
  Trash2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Edit2,
  FileText,
  Mail,
  Check,
  CheckCircle2,
  Minus,
  Plus,
  Download,
  RotateCcw,
} from 'lucide-react';

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
].filter(Boolean);

const PaystubGeneratorForm = ({ selectedTemplateId = '01', onChangeTemplate }) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State initialized to exact Figma defaults
  const [formData, setFormData] = useState({
    // Step 1: Employer Information
    companyName: 'Acme Corporation',
    companyAddress: '123 Main Street',
    companyCity: 'Des Moines',
    companyState: 'IA',
    companyZip: '50309',
    companyEin: '12-3456789',

    // Step 2: Employee Information
    employeeName: 'Jane Doe',
    employeeAddress: '123 main street',
    employeeCity: 'dhaka',
    employeeState: 'IA',
    employeeZip: '10001',
    employeeId: 'EMP-002',

    // Step 3: Pay Details
    payPeriodStart: '2026-10-24',
    payPeriodEnd: '2026-10-29',
    payDate: '2026-10-30',
    payFrequency: 'Semi-Monthly',
    payType: 'Hourly', // 'Hourly' | 'Salary'
    hourlyRate: '200',
    regularHours: '80',
    overtimeHours: '20',
    salaryAmount: '22000',

    // Additional earnings
    additionalEarnings: [],

    // Tax withholdings
    taxes: [
      { id: 'fed', label: 'Federal Income Tax', amount: '0.00' },
      { id: 'ss', label: 'Social Security', amount: '0.00' },
      { id: 'med', label: 'Medicare', amount: '0.00' },
      { id: 'state', label: 'State Income Tax', amount: '0.00' },
    ],

    // Deductions
    deductions: [],
  });

  // Step 5 & 6: Package & Checkout State
  const [selectedPackage, setSelectedPackage] = useState('3paystubs'); // '1paystub' | '3paystubs' | 'unlimited'
  const [additionalCount, setAdditionalCount] = useState(0);
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('0000 0000 0000');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Live calculations
  const calculations = useMemo(() => {
    let regularEarnings = 0;
    let overtimeEarnings = 0;
    let totalGross = 0;

    if (formData.payType === 'Hourly') {
      const rate = parseFloat(formData.hourlyRate) || 0;
      const hours = parseFloat(formData.regularHours) || 0;
      const otHours = parseFloat(formData.overtimeHours) || 0;
      regularEarnings = rate * hours;
      overtimeEarnings = rate * 1.5 * otHours;
      totalGross = regularEarnings + overtimeEarnings;
    } else {
      totalGross = parseFloat(formData.salaryAmount) || 0;
      regularEarnings = totalGross;
    }

    // Add extra earnings
    const extraEarningsTotal = formData.additionalEarnings.reduce(
      (sum, item) => sum + (parseFloat(item.amount) || 0),
      0
    );
    totalGross += extraEarningsTotal;

    // Sum taxes
    const totalTaxes = formData.taxes.reduce(
      (sum, item) => sum + (parseFloat(item.amount) || 0),
      0
    );

    // Sum deductions
    const totalDeductions = formData.deductions.reduce(
      (sum, item) => sum + (parseFloat(item.amount) || 0),
      0
    );

    const allDeductions = totalTaxes + totalDeductions;
    const netPay = Math.max(0, totalGross - allDeductions);

    return {
      regularEarnings,
      overtimeEarnings,
      totalGross,
      totalTaxes,
      totalDeductions,
      allDeductions,
      netPay,
    };
  }, [formData]);

  // Packages pricing calculation
  const packagesConfig = {
    '1paystub': {
      id: '1paystub',
      name: '1 Paystub',
      displayPrice: '$12.99',
      price: 12.99,
      subtitle: 'Single document',
      orderSummaryName: '1 paystub',
    },
    '3paystubs': {
      id: '3paystubs',
      name: '3 Paystubs',
      displayPrice: '$24.99',
      price: 24.99,
      subtitle: 'Best value',
      badge: 'Save 35%',
      orderSummaryName: '3 paystubs',
    },
    'unlimited': {
      id: 'unlimited',
      name: 'Unlimited Access',
      displayPrice: '$199',
      price: 199.00,
      period: '/month',
      subtitle: 'All supported document types',
      orderSummaryName: 'Unlimited Access ($199/mo)',
    },
  };

  const currentPkg = packagesConfig[selectedPackage] || packagesConfig['3paystubs'];
  const additionalCost = additionalCount * 7.99;
  const grandTotal = currentPkg.price + additionalCost;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(val || 0);
  };

  // Add custom tax row
  const handleAddTax = () => {
    const id = Date.now().toString();
    setFormData((prev) => ({
      ...prev,
      taxes: [...prev.taxes, { id, label: 'Custom Tax', amount: '0.00' }],
    }));
  };

  const handleRemoveTax = (id) => {
    setFormData((prev) => ({
      ...prev,
      taxes: prev.taxes.filter((t) => t.id !== id),
    }));
  };

  const handleTaxAmountChange = (id, amount) => {
    setFormData((prev) => ({
      ...prev,
      taxes: prev.taxes.map((t) => (t.id === id ? { ...t, amount } : t)),
    }));
  };

  // Add custom earning row
  const handleAddEarning = () => {
    const id = Date.now().toString();
    setFormData((prev) => ({
      ...prev,
      additionalEarnings: [
        ...prev.additionalEarnings,
        { id, desc: 'Bonus / Commission', amount: '0.00' },
      ],
    }));
  };

  const handleRemoveEarning = (id) => {
    setFormData((prev) => ({
      ...prev,
      additionalEarnings: prev.additionalEarnings.filter((e) => e.id !== id),
    }));
  };

  // Add deduction row
  const handleAddDeduction = () => {
    const id = Date.now().toString();
    setFormData((prev) => ({
      ...prev,
      deductions: [
        ...prev.deductions,
        { id, desc: '401(k) / Insurance', amount: '0.00' },
      ],
    }));
  };

  const handleRemoveDeduction = (id) => {
    setFormData((prev) => ({
      ...prev,
      deductions: prev.deductions.filter((d) => d.id !== id),
    }));
  };

  const handlePay = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setCurrentStep(7); // Success
    }, 1200);
  };

  const stepsList = [
    { num: 1, label: 'Employer Information' },
    { num: 2, label: 'Employee Information' },
    { num: 3, label: 'Pay Details' },
    { num: 4, label: 'Review Paystub' },
  ];

  // Reusable Paystub Document Component for Live Preview
  const PaystubDocumentPreview = () => (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden p-3.5 sm:p-5 text-[8.5px] sm:text-[9px] leading-tight select-none font-sans">
      {/* Top Company Banner */}
      <div className="bg-[#092258] text-white p-2.5 sm:p-3 rounded-lg flex justify-between items-center mb-3">
        <div>
          <p className="font-bold text-[10.5px] sm:text-[11.5px]">{formData.companyName || 'Company Name'}</p>
          <p className="text-white/80 text-[8px]">{formData.companyAddress || '123 Main St'}</p>
          <p className="text-white/80 text-[8px]">
            {formData.companyCity ? `${formData.companyCity}, ` : ''}{formData.companyState} {formData.companyZip}
          </p>
          <p className="text-white/80 text-[8px]">EIN: {formData.companyEin || '12-3456789'}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-[9px] uppercase tracking-wider">EARNINGS STATEMENT</p>
          <p className="text-white/80 text-[8px]">Pay Date: {formData.payDate}</p>
        </div>
      </div>

      {/* Employee, Pay Period & Net Pay Row */}
      <div className="grid grid-cols-12 gap-2 mb-3 items-stretch">
        <div className="col-span-4 bg-slate-50/80 p-2 rounded-lg border border-slate-100">
          <p className="text-slate-400 text-[7px] uppercase font-bold">EMPLOYEE</p>
          <p className="font-bold text-slate-800 text-[9px] truncate mt-0.5">{formData.employeeName || 'Jane Doe'}</p>
          <p className="text-slate-500 text-[7.5px] truncate">{formData.employeeAddress}</p>
          <p className="text-slate-500 text-[7.5px] truncate">
            {formData.employeeCity ? `${formData.employeeCity}, ` : ''}{formData.employeeState} {formData.employeeZip}
          </p>
        </div>

        <div className="col-span-4 bg-slate-50/80 p-2 rounded-lg border border-slate-100">
          <p className="text-slate-400 text-[7px] uppercase font-bold">PAY PERIOD</p>
          <p className="font-medium text-slate-800 text-[8px] truncate mt-0.5">
            {formData.payPeriodStart} – {formData.payPeriodEnd}
          </p>
          <p className="text-slate-500 text-[7.5px] truncate">{formData.payFrequency}</p>
          <p className="text-slate-500 text-[7.5px] truncate">ID: {formData.employeeId}</p>
        </div>

        <div className="col-span-4 bg-[#092258] text-white p-2 rounded-lg flex flex-col justify-center text-center">
          <p className="text-[7px] uppercase tracking-wider text-white/80 font-medium">NET PAY</p>
          <p className="font-bold text-[12px] sm:text-[14px] text-white mt-0.5">
            {formatCurrency(calculations.netPay)}
          </p>
        </div>
      </div>

      {/* Earnings & Taxes Breakdown Tables */}
      <div className="grid grid-cols-2 gap-2.5 mb-3">
        <div>
          <div className="bg-[#EBF2FA] text-[#092258] px-2 py-0.5 rounded-t text-[7.5px] font-bold flex justify-between">
            <span>EARNINGS</span>
            <span>AMOUNT</span>
          </div>
          <div className="py-1 space-y-0.5 text-[8px]">
            {formData.payType === 'Hourly' ? (
              <>
                <div className="flex justify-between text-slate-600">
                  <span>Regular <span className="text-slate-400 text-[7px]">{formData.regularHours}h × ${formData.hourlyRate}</span></span>
                  <span className="font-semibold text-slate-800">{formatCurrency(calculations.regularEarnings)}</span>
                </div>
                {parseFloat(formData.overtimeHours) > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Overtime <span className="text-slate-400 text-[7px]">{formData.overtimeHours}h × 1.5</span></span>
                    <span className="font-semibold text-slate-800">{formatCurrency(calculations.overtimeEarnings)}</span>
                  </div>
                )}
              </>
            ) : (
              <div className="flex justify-between text-slate-600">
                <span>Salary</span>
                <span className="font-semibold text-slate-800">{formatCurrency(calculations.regularEarnings)}</span>
              </div>
            )}

            {formData.additionalEarnings.map((item, idx) => (
              <div key={idx} className="flex justify-between text-slate-600">
                <span>{item.desc}</span>
                <span className="font-semibold text-slate-800">{formatCurrency(parseFloat(item.amount) || 0)}</span>
              </div>
            ))}

            <div className="flex justify-between font-bold text-slate-900 border-t border-slate-100 pt-0.5 mt-0.5">
              <span>Gross Pay</span>
              <span>{formatCurrency(calculations.totalGross)}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-[#EBF2FA] text-[#092258] px-2 py-0.5 rounded-t text-[7.5px] font-bold flex justify-between">
            <span>TAXES</span>
            <span>AMOUNT</span>
          </div>
          <div className="py-1 space-y-0.5 text-[8px]">
            {formData.taxes.map((t, idx) => (
              <div key={idx} className="flex justify-between text-slate-600">
                <span>{t.label}</span>
                <span className="font-semibold text-slate-800">{formatCurrency(parseFloat(t.amount) || 0)}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-slate-900 border-t border-slate-100 pt-0.5 mt-0.5">
              <span>Total Taxes</span>
              <span>{formatCurrency(calculations.totalTaxes)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Summary Line */}
      <div className="border-t border-slate-150 pt-1.5 text-[7.5px] flex justify-between text-slate-500 font-medium">
        <span>Gross Pay <strong className="text-slate-800">{formatCurrency(calculations.totalGross)}</strong></span>
        <span>Deductions <strong className="text-slate-800">{formatCurrency(calculations.allDeductions)}</strong></span>
        <span>Net Pay <strong className="text-slate-800">{formatCurrency(calculations.netPay)}</strong></span>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 select-none">
      
      {/* ========================================================
          STEPS 1 - 4: Progress Bar + Form / Preview Grid
          ======================================================== */}
      {currentStep <= 4 && (
        <>
          {/* 4-Step Progress Indicator Header */}
          <div className="mb-10 sm:mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 border-b border-slate-200/80 pb-3">
              {stepsList.map((step) => {
                const isActive = currentStep === step.num;
                const isCompleted = currentStep > step.num;

                return (
                  <div
                    key={step.num}
                    onClick={() => setCurrentStep(step.num)}
                    className={`flex items-center gap-2.5 pb-2.5 relative cursor-pointer transition-colors ${
                      isActive || isCompleted
                        ? 'text-slate-900 font-semibold'
                        : 'text-slate-400 font-medium'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold border transition-colors ${
                        isActive || isCompleted
                          ? 'border-[#1E60F2] text-[#1E60F2] bg-blue-50/60'
                          : 'border-slate-300 text-slate-400 bg-white'
                      }`}
                    >
                      {step.num}
                    </div>
                    <span className="text-[13px] sm:text-[14px] truncate">{step.label}</span>

                    {(isActive || isCompleted) && (
                      <div className="absolute -bottom-3.5 left-0 right-0 h-[2.5px] bg-[#1E60F2]" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main 2-Column Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Form Card */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
              
              {/* Step 1: Employer Information */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in-50 duration-200">
                  <div>
                    <p className="text-[#1E60F2] font-bold text-[12px] uppercase tracking-wider mb-1">
                      STEP 1 OF 4
                    </p>
                    <h2 className="text-2xl sm:text-[26px] font-bold text-[#092258]">
                      Employer Information
                    </h2>
                    <p className="text-slate-400 text-[13px] mt-0.5">
                      Fields marked <span className="text-rose-500">*</span> are required.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                      Company / Employer Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => updateField('companyName', e.target.value)}
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
                      onChange={(e) => updateField('companyAddress', e.target.value)}
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
                        onChange={(e) => updateField('companyCity', e.target.value)}
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
                          onChange={(e) => updateField('companyState', e.target.value)}
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
                        onChange={(e) => updateField('companyZip', e.target.value)}
                        placeholder="Zip code"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                      Employer Identification Number (EIN){' '}
                      <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.companyEin}
                      onChange={(e) => updateField('companyEin', e.target.value)}
                      placeholder="Employer verification number"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition"
                    />
                    <p className="text-[12px] text-slate-400 mt-1">
                      9-digit federal tax ID, where applicable.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={onChangeTemplate}
                      className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium text-[14px] hover:bg-slate-50 transition"
                    >
                      &lt; Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-2.5 rounded-lg bg-[#1E60F2] text-white font-semibold text-[14px] shadow-sm hover:bg-[#1550cf] transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Continue</span>
                      <span>&gt;</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Employee Information */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-in fade-in-50 duration-200">
                  <div>
                    <p className="text-[#1E60F2] font-bold text-[12px] uppercase tracking-wider mb-1">
                      STEP 2 OF 4
                    </p>
                    <h2 className="text-2xl sm:text-[26px] font-bold text-[#092258]">
                      Employee Information
                    </h2>
                    <p className="text-slate-400 text-[13px] mt-0.5">
                      Fields marked <span className="text-rose-500">*</span> are required.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                      Employee Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.employeeName}
                      onChange={(e) => updateField('employeeName', e.target.value)}
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
                      onChange={(e) => updateField('employeeAddress', e.target.value)}
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
                        onChange={(e) => updateField('employeeCity', e.target.value)}
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
                          onChange={(e) => updateField('employeeState', e.target.value)}
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
                        onChange={(e) => updateField('employeeZip', e.target.value)}
                        placeholder="10001"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                      Employee ID{' '}
                      <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.employeeId}
                      onChange={(e) => updateField('employeeId', e.target.value)}
                      placeholder="EMP-002"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium text-[14px] hover:bg-slate-50 transition"
                    >
                      &lt; Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-2.5 rounded-lg bg-[#1E60F2] text-white font-semibold text-[14px] shadow-sm hover:bg-[#1550cf] transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Continue</span>
                      <span>&gt;</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Pay Details */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in-50 duration-200">
                  <div>
                    <p className="text-[#1E60F2] font-bold text-[12px] uppercase tracking-wider mb-1">
                      STEP 3 OF 4
                    </p>
                    <h2 className="text-2xl sm:text-[26px] font-bold text-[#092258]">
                      Pay Details
                    </h2>
                    <p className="text-slate-400 text-[13px] mt-0.5">
                      Fields marked <span className="text-rose-500">*</span> are required.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                        Pay Period Start <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.payPeriodStart}
                        onChange={(e) => updateField('payPeriodStart', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-[#1E60F2] text-[13px] text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                        Pay Period End <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.payPeriodEnd}
                        onChange={(e) => updateField('payPeriodEnd', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-[#1E60F2] text-[13px] text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                        Pay Date <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.payDate}
                        onChange={(e) => updateField('payDate', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-[#1E60F2] text-[13px] text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                        Pay Frequency <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.payFrequency}
                          onChange={(e) => updateField('payFrequency', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] text-[14px] text-slate-800 bg-white appearance-none cursor-pointer pr-8"
                        >
                          <option value="Semi-Monthly">Semi-Monthly</option>
                          <option value="Bi-Weekly">Bi-Weekly</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                        Pay Type <span className="text-rose-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-lg">
                        <button
                          type="button"
                          onClick={() => updateField('payType', 'Hourly')}
                          className={`py-1.5 text-[14px] font-semibold rounded-md transition ${
                            formData.payType === 'Hourly'
                              ? 'bg-[#009BFB] text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Hourly
                        </button>
                        <button
                          type="button"
                          onClick={() => updateField('payType', 'Salary')}
                          className={`py-1.5 text-[14px] font-semibold rounded-md transition ${
                            formData.payType === 'Salary'
                              ? 'bg-[#009BFB] text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Salary
                        </button>
                      </div>
                    </div>
                  </div>

                  {formData.payType === 'Hourly' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                          Hourly Rate <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={formData.hourlyRate}
                          onChange={(e) => updateField('hourlyRate', e.target.value)}
                          placeholder="200"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] text-[14px] text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                          Regular Hours <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={formData.regularHours}
                          onChange={(e) => updateField('regularHours', e.target.value)}
                          placeholder="80"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] text-[14px] text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                          Overtime <span className="text-slate-400 font-normal">Hours (optional)</span>
                        </label>
                        <input
                          type="number"
                          value={formData.overtimeHours}
                          onChange={(e) => updateField('overtimeHours', e.target.value)}
                          placeholder="20"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] text-[14px] text-slate-800"
                        />
                        <p className="text-[11px] text-slate-400 mt-1">Paid at 1.5×</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                        Gross Salary Amount <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={formData.salaryAmount}
                        onChange={(e) => updateField('salaryAmount', e.target.value)}
                        placeholder="22000"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] text-[14px] text-slate-800"
                      />
                    </div>
                  )}

                  <div className="bg-slate-50/60 rounded-xl p-4 border border-slate-150">
                    <h4 className="font-semibold text-slate-800 text-[14px] mb-3">
                      Additional Earnings
                    </h4>
                    {formData.additionalEarnings.map((earning) => (
                      <div key={earning.id} className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          value={earning.desc}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              additionalEarnings: prev.additionalEarnings.map((item) =>
                                item.id === earning.id ? { ...item, desc: val } : item
                              ),
                            }));
                          }}
                          className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-[13px]"
                        />
                        <div className="relative w-28">
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[13px]">$</span>
                          <input
                            type="number"
                            value={earning.amount}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                additionalEarnings: prev.additionalEarnings.map((item) =>
                                  item.id === earning.id ? { ...item, amount: val } : item
                                ),
                              }));
                            }}
                            className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-slate-200 bg-white text-[13px]"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveEarning(earning.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-500 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={handleAddEarning}
                      className="text-[13px] font-medium text-[#1E60F2] hover:underline cursor-pointer pt-1"
                    >
                      + Add earning (bonus, commission, tips...)
                    </button>
                  </div>

                  <div className="bg-slate-50/60 rounded-xl p-4 border border-slate-150">
                    <h4 className="font-semibold text-slate-800 text-[14px] mb-1">
                      Tax Withholdings
                    </h4>
                    <p className="text-slate-400 text-[12px] mb-3">
                      Enter withholding amounts for this pay period. Automatic tax calculation will be available once the tax service is connected.
                    </p>

                    <div className="space-y-2 mb-3">
                      {formData.taxes.map((t) => (
                        <div key={t.id} className="flex items-center gap-2">
                          <span className="flex-1 text-[13.5px] text-slate-700 font-medium">
                            {t.label}
                          </span>
                          <div className="relative w-28">
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[13px]">$</span>
                            <input
                              type="number"
                              value={t.amount}
                              onChange={(e) => handleTaxAmountChange(t.id, e.target.value)}
                              className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-slate-200 bg-white text-[13px] text-slate-800 text-right"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveTax(t.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-500 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleAddTax}
                      className="text-[13px] font-medium text-[#1E60F2] hover:underline cursor-pointer"
                    >
                      + Add tax
                    </button>
                  </div>

                  <div className="bg-slate-50/60 rounded-xl p-4 border border-slate-150">
                    <h4 className="font-semibold text-slate-800 text-[14px] mb-2">
                      Other Deductions
                    </h4>
                    {formData.deductions.map((d) => (
                      <div key={d.id} className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          value={d.desc}
                          className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-[13px]"
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              deductions: prev.deductions.map((item) =>
                                item.id === d.id ? { ...item, desc: val } : item
                              ),
                            }));
                          }}
                        />
                        <div className="relative w-28">
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[13px]">$</span>
                          <input
                            type="number"
                            value={d.amount}
                            className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-slate-200 bg-white text-[13px]"
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                deductions: prev.deductions.map((item) =>
                                  item.id === d.id ? { ...item, amount: val } : item
                                ),
                              }));
                            }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveDeduction(d.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-500 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddDeduction}
                      className="text-[13px] font-medium text-[#1E60F2] hover:underline cursor-pointer"
                    >
                      + Add deduction (401(k), health insurance...)
                    </button>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center justify-between text-center">
                    <div>
                      <p className="text-[11px] text-slate-400 font-semibold uppercase">Gross Pay</p>
                      <p className="font-bold text-slate-900 text-[16px] sm:text-[18px]">
                        {formatCurrency(calculations.totalGross)}
                      </p>
                    </div>
                    <div className="h-8 w-px bg-slate-200" />
                    <div>
                      <p className="text-[11px] text-slate-400 font-semibold uppercase">Total Deductions</p>
                      <p className="font-bold text-slate-900 text-[16px] sm:text-[18px]">
                        {formatCurrency(calculations.allDeductions)}
                      </p>
                    </div>
                    <div className="h-8 w-px bg-slate-200" />
                    <div>
                      <p className="text-[11px] text-secondary font-semibold uppercase">Net Pay</p>
                      <p className="font-bold text-secondary text-[16px] sm:text-[18px]">
                        {formatCurrency(calculations.netPay)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium text-[14px] hover:bg-slate-50 transition"
                    >
                      &lt; Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="px-6 py-2.5 rounded-lg bg-[#1E60F2] text-white font-semibold text-[14px] shadow-sm hover:bg-[#1550cf] transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Continue</span>
                      <span>&gt;</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Review Paystub */}
              {currentStep === 4 && (
                <div className="space-y-5 animate-in fade-in-50 duration-200">
                  <div>
                    <p className="text-[#1E60F2] font-bold text-[12px] uppercase tracking-wider mb-1">
                      STEP 4 OF 4
                    </p>
                    <h2 className="text-2xl sm:text-[26px] font-bold text-[#092258]">
                      Review Paystub
                    </h2>
                    <p className="text-slate-400 text-[13px] mt-0.5">
                      Fields marked <span className="text-rose-500">*</span> are required.
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-blue-50/60 rounded-xl border border-blue-100/80">
                    <span className="text-slate-600 text-[14px] font-medium">Selected template</span>
                    <span className="text-slate-900 font-bold text-[14px]">
                      Template {selectedTemplateId}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="p-4 rounded-xl border border-slate-200/90 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-slate-800 text-[14px]">Employer</h4>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="text-[#1E60F2] text-[13px] font-semibold hover:underline"
                        >
                          Edit
                        </button>
                      </div>
                      <p className="text-[13px] font-medium text-slate-700">{formData.companyName}</p>
                      <p className="text-[12.5px] text-slate-500">{formData.companyAddress}</p>
                      <p className="text-[12.5px] text-slate-500">
                        {formData.companyCity}, {formData.companyState} {formData.companyZip}
                      </p>
                      <p className="text-[12px] text-slate-400 mt-1">EIN {formData.companyEin}</p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200/90 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-slate-800 text-[14px]">Employee</h4>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="text-[#1E60F2] text-[13px] font-semibold hover:underline"
                        >
                          Edit
                        </button>
                      </div>
                      <p className="text-[13px] font-medium text-slate-700">{formData.employeeName}</p>
                      <p className="text-[12.5px] text-slate-500">{formData.employeeAddress}</p>
                      <p className="text-[12.5px] text-slate-500">
                        {formData.employeeCity}, {formData.employeeState} {formData.employeeZip}
                      </p>
                      <p className="text-[12px] text-slate-400 mt-1">ID {formData.employeeId}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200/90 bg-white">
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-bold text-slate-800 text-[14px]">Pay Period</h4>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="text-[#1E60F2] text-[13px] font-semibold hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-[13px] text-slate-700">
                      {formData.payPeriodStart} → {formData.payPeriodEnd}
                    </p>
                    <p className="text-[12.5px] text-slate-500">
                      Pay date {formData.payDate} • {formData.payFrequency}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="p-4 rounded-xl border border-slate-200/90 bg-white">
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="font-bold text-slate-800 text-[14px]">Earnings</h4>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(3)}
                          className="text-[#1E60F2] text-[13px] font-semibold hover:underline"
                        >
                          Edit
                        </button>
                      </div>
                      <p className="text-[13px] text-slate-600">
                        Gross pay {formatCurrency(calculations.totalGross)}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200/90 bg-white">
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="font-bold text-slate-800 text-[14px]">Deductions</h4>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(3)}
                          className="text-[#1E60F2] text-[13px] font-semibold hover:underline"
                        >
                          Edit
                        </button>
                      </div>
                      <p className="text-[12.5px] text-slate-600">
                        Taxes {formatCurrency(calculations.totalTaxes)}
                      </p>
                      <p className="text-[12.5px] text-slate-600">
                        Other {formatCurrency(calculations.totalDeductions)}
                      </p>
                    </div>
                  </div>

                  {/* Dark Navy Review Net Pay Callout Banner */}
                  <div className="bg-[#092258] text-white rounded-xl p-4 sm:p-5 flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-[12px] font-medium">
                        Gross {formatCurrency(calculations.totalGross)}
                      </p>
                      <p className="font-bold text-lg sm:text-xl">Net Pay</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-2xl sm:text-3xl text-white">
                        {formatCurrency(calculations.netPay)}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium text-[14px] hover:bg-slate-50 transition"
                    >
                      &lt; Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(5)}
                      className="px-7 py-3 rounded-lg bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-[15px] shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Continue to Checkout</span>
                      <span>&gt;</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* RIGHT COLUMN: The Sticky Live Preview */}
            <div className="lg:col-span-6 sticky top-24">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-[14px] font-bold text-slate-800">
                  Live Preview • Template {selectedTemplateId}
                </span>
                <button
                  type="button"
                  onClick={onChangeTemplate}
                  className="text-[13px] font-medium text-slate-500 hover:text-secondary hover:underline transition cursor-pointer"
                >
                  Change Template
                </button>
              </div>

              <PaystubDocumentPreview />

              <div className="flex items-center gap-1.5 mt-2.5 text-slate-400 text-[12px]">
                <Lock className="w-3.5 h-3.5" />
                <span>Your final document is available after checkout.</span>
              </div>
            </div>

          </div>
        </>
      )}

      {/* ========================================================
          STEP 5: Choose your package (Matching Screenshot 1)
          ======================================================== */}
      {currentStep === 5 && (
        <div className="animate-in fade-in-50 duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Package Options */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Back to review link */}
              <div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="inline-flex items-center gap-1 text-[13.5px] font-semibold text-[#1E60F2] hover:underline cursor-pointer mb-3"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to review</span>
                </button>
                <h2 className="text-2xl sm:text-[32px] font-bold text-[#092258] tracking-tight">
                  Choose your package
                </h2>
                <p className="text-slate-500 text-[14px] mt-1">
                  Each additional paystub — $7.99.
                </p>
              </div>

              {/* 3 Package Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {/* Package 1: 1 Paystub */}
                <div
                  onClick={() => setSelectedPackage('1paystub')}
                  className={`bg-white rounded-xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[145px] ${
                    selectedPackage === '1paystub'
                      ? 'border-2 border-[#1E60F2] shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <h3 className="font-bold text-slate-800 text-[15px]">1 Paystub</h3>
                    <p className="text-2xl sm:text-[26px] font-bold text-slate-900 my-1.5">$12.99</p>
                  </div>
                  <p className="text-slate-400 text-[13px]">Single document</p>
                </div>

                {/* Package 2: 3 Paystubs (Selected by default with Save 35% badge) */}
                <div
                  onClick={() => setSelectedPackage('3paystubs')}
                  className={`relative bg-white rounded-xl p-5 border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[145px] ${
                    selectedPackage === '3paystubs'
                      ? 'border-[#1E60F2] shadow-md'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Save 35% Badge Pill */}
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1E60F2] text-white text-[11px] font-bold py-0.5 px-3 rounded-full shadow-xs whitespace-nowrap">
                    Save 35%
                  </span>

                  {/* Top-Right Checkmark when selected */}
                  {selectedPackage === '3paystubs' && (
                    <Check className="w-4 h-4 text-[#1E60F2] stroke-[3] absolute top-4 right-4" />
                  )}

                  <div>
                    <h3 className="font-bold text-slate-800 text-[15px]">3 Paystubs</h3>
                    <p className="text-2xl sm:text-[26px] font-bold text-slate-900 my-1.5">$24.99</p>
                  </div>
                  <p className="text-slate-400 text-[13px]">Best value</p>
                </div>

                {/* Package 3: Unlimited Access */}
                <div
                  onClick={() => setSelectedPackage('unlimited')}
                  className={`bg-white rounded-xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[145px] ${
                    selectedPackage === 'unlimited'
                      ? 'border-2 border-[#1E60F2] shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <h3 className="font-bold text-slate-800 text-[15px]">Unlimited Access</h3>
                    <p className="text-2xl sm:text-[26px] font-bold text-slate-900 my-1.5">
                      $199<span className="text-[13px] font-normal text-slate-400">/month</span>
                    </p>
                  </div>
                  <p className="text-slate-400 text-[13px] leading-tight">All supported document types</p>
                </div>
              </div>

              {/* Additional Paystubs Stepper Box */}
              <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800 text-[15px]">Additional paystubs</h4>
                  <p className="text-slate-400 text-[13px] mt-0.5">$7.99 each</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={additionalCount <= 0}
                    onClick={() => setAdditionalCount((prev) => Math.max(0, prev - 1))}
                    className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center font-bold text-slate-800 text-[15px]">
                    {additionalCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setAdditionalCount((prev) => prev + 1)}
                    className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Continue Button */}
              <div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(6)}
                  className="px-7 py-3 rounded-lg bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-[14px] shadow-sm transition inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Continue</span>
                  <span>&gt;</span>
                </button>
              </div>

            </div>

            {/* Right Column: Order Summary Card */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm sticky top-24">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Order summary</h3>

              {/* Paystub Document Thumbnail */}
              <div className="mb-5 overflow-hidden">
                <PaystubDocumentPreview />
              </div>

              {/* Line Items */}
              <div className="space-y-3 pt-2 text-[14px]">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Template</span>
                  <span className="font-bold text-slate-800">Template {selectedTemplateId}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Package</span>
                  <span className="font-bold text-slate-800">{currentPkg.orderSummaryName}</span>
                </div>
                {additionalCount > 0 && (
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Additional paystubs ({additionalCount})</span>
                    <span className="font-bold text-slate-800">{formatCurrency(additionalCost)}</span>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 my-4" />

              {/* Total Row */}
              <div className="flex items-center justify-between">
                <span className="text-[17px] font-bold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-[#1E60F2]">
                  {formatCurrency(grandTotal)}
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          STEP 6: Checkout (Matching Screenshot 2)
          ======================================================== */}
      {currentStep === 6 && (
        <div className="animate-in fade-in-50 duration-200 max-w-xl mx-auto">
          {/* Back to package link */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setCurrentStep(5)}
              className="inline-flex items-center gap-1 text-[13.5px] font-semibold text-[#1E60F2] hover:underline cursor-pointer mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to review</span>
            </button>
            <h2 className="text-2xl sm:text-[32px] font-bold text-[#092258] tracking-tight">
              Checkout
            </h2>
            <p className="text-slate-500 text-[14px] mt-1">
              No account needed — we'll send your documents to your email.
            </p>
          </div>

          {/* Checkout Card Form */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            {/* Email Address */}
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Email address <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={checkoutEmail}
                  onChange={(e) => setCheckoutEmail(e.target.value)}
                  placeholder="Enter your email address here"
                  className="flex-1 px-3.5 py-2.5 rounded-lg bg-[#F0F6FF] border border-blue-100 focus:border-[#1E60F2] focus:bg-white text-[14px] text-slate-800 placeholder:text-slate-400 outline-none transition"
                />
                <button
                  type="button"
                  className="px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[13px] font-medium transition flex items-center gap-1.5 whitespace-nowrap shadow-2xs"
                >
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span>Resend Code</span>
                </button>
              </div>
            </div>

            {/* Verification Code */}
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Verification code <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="0000 0000 0000"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F0F6FF] border border-blue-100 focus:border-[#1E60F2] focus:bg-white text-[14px] text-slate-800 placeholder:text-slate-400 tracking-wider outline-none transition"
              />
            </div>

            {/* Terms Checkbox */}
            <div
              onClick={() => setAgreedToTerms(!agreedToTerms)}
              className="flex items-center gap-2.5 cursor-pointer pt-1"
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                  agreedToTerms
                    ? 'bg-[#1E60F2] text-white'
                    : 'border border-slate-300 bg-white'
                }`}
              >
                {agreedToTerms && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <span className="text-[13px] text-slate-600">
                I agree to the Terms &amp; Conditions and Privacy Policy.
              </span>
            </div>

            {/* Submit Payment Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessingPayment}
                className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-semibold text-[15px] shadow-sm transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isProcessingPayment ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing Payment...
                  </span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay {formatCurrency(grandTotal)} securely</span>
                  </>
                )}
              </button>
              <p className="text-center text-slate-400 text-[12px] mt-2.5">
                Payments processed securely by Stripe.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 7: Payment Success / Document Ready
          ======================================================== */}
      {currentStep === 7 && (
        <div className="animate-in zoom-in-95 duration-200 max-w-lg mx-auto bg-white rounded-2xl p-8 border border-slate-200 shadow-lg text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Payment Successful!</h2>
            <p className="text-slate-500 text-[14px] mt-1.5">
              Your professional paystub for <strong className="text-slate-800">{formData.employeeName}</strong> is ready.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-150 text-left text-[13px] space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Order Total</span>
              <span className="font-bold text-slate-800">{formatCurrency(grandTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Document Package</span>
              <span className="font-bold text-slate-800">{currentPkg.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Delivery Email</span>
              <span className="font-bold text-slate-800">{checkoutEmail || 'Delivered to your email'}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => alert('Downloading official PDF paystub...')}
              className="w-full py-3 rounded-xl bg-[#1E60F2] hover:bg-[#1550cf] text-white font-semibold text-[15px] shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Paystub PDF</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-[14px] transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Create Another Paystub</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default PaystubGeneratorForm;
