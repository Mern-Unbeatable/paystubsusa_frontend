import React from 'react';
import { ArrowRight } from 'lucide-react';

const DocumentsSection = () => {
  return (
    <section className="w-full bg-[#EBF1F8] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-secondary font-semibold text-xs sm:text-[13px] tracking-widest uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span>
            <span>DOCUMENTS</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 tracking-tight leading-tight">
            Document Solutions for Every Need
          </h2>
          
          <p className="mt-3 text-slate-600 text-base sm:text-[17px] font-normal leading-relaxed">
            Choose the document you need and get started in just a few simple steps.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Featured Paystub Generator Card */}
          <div className="lg:col-span-5 xl:col-span-5 bg-[#1d63ff] rounded-[28px] p-6 sm:p-7 text-white shadow-[0_12px_40px_rgba(29,99,255,0.22)] flex flex-col justify-between">
            <div>
              {/* Badge */}
              <div className="inline-block bg-white/20 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                Most popular
              </div>

              {/* Title & Price */}
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Paystub Generator
              </h3>
              <p className="text-blue-100 text-sm font-medium mt-1 mb-5">
                Starting at $12.99
              </p>

              {/* Interactive Mock Paystub Preview Document */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 text-slate-800 shadow-xs border border-white/60">
                
                {/* Header Statement */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-100 text-[11px]">
                  <div>
                    <span className="text-[10px] font-bold text-secondary tracking-wider uppercase block">
                      EARNINGS STATEMENT
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-0.5">
                      Acme Logistics LLC
                    </h4>
                    <p className="text-slate-500 text-[11px]">
                      1200 Market St, Austin, TX 78701
                    </p>
                  </div>
                  <div className="text-right text-[11px] text-slate-500 space-y-0.5">
                    <p className="text-[10px] text-slate-400">Pay Period</p>
                    <p className="font-medium text-slate-700">09/01/2026 - 09/15/2026</p>
                    <p className="text-[10px] text-slate-400">Pay Date: <span className="text-slate-600 font-medium">09/16/2026</span></p>
                  </div>
                </div>

                {/* Employee / Employer row */}
                <div className="grid grid-cols-2 gap-4 py-3 border-b border-slate-100 text-[11px]">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                      EMPLOYEE
                    </span>
                    <p className="font-semibold text-slate-800 mt-0.5">Jordan Smith</p>
                    <p className="text-slate-500 text-[10px]">SSN: XXX-XX-4821</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                      EMPLOYER
                    </span>
                    <p className="text-slate-600 text-[10px] mt-0.5">EIN: 74-XXXX392</p>
                    <p className="text-slate-500 text-[10px]">Employee ID: 00418</p>
                  </div>
                </div>

                {/* Gross Earnings vs Tax Deductions */}
                <div className="grid grid-cols-2 gap-4 py-3 border-b border-slate-100 text-[11px]">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      GROSS EARNINGS
                    </span>
                    <div className="flex justify-between text-slate-600 text-[10px] py-0.5">
                      <span>Regular (80 hrs)</span>
                      <span className="font-medium text-slate-800">$2,400.00</span>
                    </div>
                    <div className="flex justify-between text-slate-600 text-[10px] py-0.5">
                      <span>Overtime (4 hrs)</span>
                      <span className="font-medium text-slate-800">$270.00</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900 text-[11px] pt-1.5 border-t border-slate-100 mt-1">
                      <span>Total Gross</span>
                      <span>$2,670.00</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      TAX DEDUCTIONS
                    </span>
                    <div className="flex justify-between text-slate-600 text-[10px] py-0.5">
                      <span>Federal Tax</span>
                      <span className="font-medium text-slate-800">$293.70</span>
                    </div>
                    <div className="flex justify-between text-slate-600 text-[10px] py-0.5">
                      <span>Social Security</span>
                      <span className="font-medium text-slate-800">$165.54</span>
                    </div>
                    <div className="flex justify-between text-slate-600 text-[10px] py-0.5">
                      <span>Medicare</span>
                      <span className="font-medium text-slate-800">$38.72</span>
                    </div>
                    <div className="flex justify-between text-slate-600 text-[10px] py-0.5">
                      <span>State Tax</span>
                      <span className="font-medium text-slate-800">$0.00</span>
                    </div>
                  </div>
                </div>

                {/* Net Pay highlight row */}
                <div className="bg-[#eff6ff] rounded-xl px-4 py-3 flex items-center justify-between mt-3.5">
                  <span className="text-slate-700 font-semibold text-xs sm:text-sm">
                    Net Pay
                  </span>
                  <span className="text-secondary font-bold text-lg sm:text-xl">
                    $2,172.04
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-5">
              <button
                type="button"
                className="bg-white hover:bg-slate-50 text-[#1d63ff] font-semibold text-[14px] px-5 py-3 rounded-xl shadow-xs transition-all duration-200 cursor-pointer inline-flex items-center gap-2 group"
              >
                <span>Create Paystub</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: 3 Cards (W-2, 1099, Direct Deposit Slip) */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col gap-6">
            
            {/* Top row: W-2 Generator & 1099 Generator side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* W-2 Generator Card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100/80 flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
                <div>
                  {/* Mock Preview Area */}
                  <div className="bg-[#fafcff] rounded-2xl p-4 border border-slate-100 mb-5">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-3">
                      <span className="text-secondary uppercase tracking-wider">WAGE & TAX</span>
                      <span className="text-slate-800">W-2</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={`w2-l-${i}`} className="bg-white border border-slate-100 rounded-lg p-2 h-9 flex flex-col justify-center">
                          <div className="w-12 h-1.5 bg-blue-100 rounded-full mb-1"></div>
                          <div className="w-8 h-1.5 bg-slate-100 rounded-full"></div>
                        </div>
                      ))}
                      {[1, 2, 3, 4].map((i) => (
                        <div key={`w2-r-${i}`} className="bg-white border border-slate-100 rounded-lg p-2 h-9 flex flex-col justify-center">
                          <div className="w-14 h-1.5 bg-blue-100 rounded-full mb-1"></div>
                          <div className="w-6 h-1.5 bg-slate-100 rounded-full"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Info */}
                  <h4 className="font-bold text-slate-900 text-lg">
                    W-2 Generator
                  </h4>
                  <p className="text-slate-500 text-xs mt-0.5">
                    $14.99
                  </p>
                </div>

                <div className="mt-4 pt-3 flex items-center justify-end">
                  <a
                    href="#w2"
                    className="inline-flex items-center gap-1.5 text-secondary font-semibold text-xs sm:text-sm hover:underline group"
                  >
                    <span>Create W-2</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>

              {/* 1099 Generator Card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100/80 flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
                <div>
                  {/* Mock Preview Area */}
                  <div className="bg-[#fafcff] rounded-2xl p-4 border border-slate-100 mb-5">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-3">
                      <span className="text-secondary uppercase tracking-wider">NONEMPLOYEE</span>
                      <span className="text-slate-800">1099-NEC</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={`1099-l-${i}`} className="bg-white border border-slate-100 rounded-lg p-2 h-9 flex flex-col justify-center">
                          <div className="w-10 h-1.5 bg-blue-100 rounded-full mb-1"></div>
                          <div className="w-14 h-1.5 bg-slate-100 rounded-full"></div>
                        </div>
                      ))}
                      {[1, 2, 3, 4].map((i) => (
                        <div key={`1099-r-${i}`} className="bg-white border border-slate-100 rounded-lg p-2 h-9 flex flex-col justify-center">
                          <div className="w-16 h-1.5 bg-blue-100 rounded-full mb-1"></div>
                          <div className="w-8 h-1.5 bg-slate-100 rounded-full"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Info */}
                  <h4 className="font-bold text-slate-900 text-lg">
                    1099 Generator
                  </h4>
                  <p className="text-slate-500 text-xs mt-0.5">
                    $14.99
                  </p>
                </div>

                <div className="mt-4 pt-3 flex items-center justify-end">
                  <a
                    href="#1099"
                    className="inline-flex items-center gap-1.5 text-secondary font-semibold text-xs sm:text-sm hover:underline group"
                  >
                    <span>Create 1099</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>

            </div>

            {/* Bottom Row: Direct Deposit Slip (Wide Card) */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100/80 hover:shadow-md transition-shadow duration-200">
              {/* Mock Preview Area */}
              <div className="bg-[#fafcff] rounded-2xl p-4 sm:p-5 border border-slate-100 mb-5">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-3">
                  <span className="text-secondary uppercase tracking-wider">DIRECT DEPOSIT</span>
                  <span className="text-slate-800">AUTHORIZATION</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white border border-slate-100 rounded-xl p-3">
                    <span className="text-[10px] text-slate-400 block">Bank</span>
                    <span className="font-semibold text-slate-800 text-xs sm:text-sm mt-0.5 block">First National</span>
                  </div>
                  <div className="bg-white border border-slate-100 rounded-xl p-3">
                    <span className="text-[10px] text-slate-400 block">Routing</span>
                    <span className="font-semibold text-slate-800 text-xs sm:text-sm mt-0.5 block">•••• 0210</span>
                  </div>
                  <div className="bg-white border border-slate-100 rounded-xl p-3">
                    <span className="text-[10px] text-slate-400 block">Account</span>
                    <span className="font-semibold text-slate-800 text-xs sm:text-sm mt-0.5 block">•••• 8841</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-1">
                <h4 className="font-bold text-slate-900 text-lg">
                  Direct Deposit Slip
                </h4>
                <a
                  href="#direct-deposit"
                  className="inline-flex items-center gap-1.5 text-secondary font-semibold text-xs sm:text-sm hover:underline group"
                >
                  <span>Create Slip</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default DocumentsSection;
