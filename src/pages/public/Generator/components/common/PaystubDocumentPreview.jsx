import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

const PaystubDocumentPreview = ({ formData, calculations }) => (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden p-3.5 sm:p-5 text-[8.5px] sm:text-[9px] leading-tight select-none font-sans">
      {/* Top Company Banner */}
      <div className="bg-[#092258] text-white p-2.5 sm:p-3 rounded-lg flex justify-between items-center mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {formData.companyLogo && (
            <div className="w-12 h-10 sm:w-14 sm:h-11 shrink-0 bg-white rounded-md p-1 flex items-center justify-center">
              <img src={formData.companyLogo} alt="" className="max-w-full max-h-full object-contain" />
            </div>
          )}
          <div className="min-w-0">
            <p className="font-bold text-[10.5px] sm:text-[11.5px]">{formData.companyName || 'Company Name'}</p>
            <p className="text-white/80 text-[8px]">{formData.companyAddress || '123 Main St'}</p>
            <p className="text-white/80 text-[8px]">
              {formData.companyCity ? `${formData.companyCity}, ` : ''}{formData.companyState} {formData.companyZip}
            </p>
            <p className="text-white/80 text-[8px]">EIN: {formData.companyEin || '12-3456789'}</p>
          </div>
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

export default PaystubDocumentPreview;