import React, { useState, useEffect, useRef } from 'react';
import { Check, Eye, X } from 'lucide-react';
import gsap from 'gsap';

// Mock data common across templates
const STUB_DATA = {
  company: {
    name: 'Northwind Logistics LLC',
    address: '450 Market St',
    cityStateZip: 'San Francisco, CA, 94105',
    ein: 'EIN: 12-3456789',
  },
  statement: {
    title: 'EARNINGS STATEMENT',
    payDate: 'Pay Date: 10/17/2026',
  },
  employee: {
    name: 'Jordan A. Miller',
    address: '88 Pine Ave',
    cityStateZip: 'Oakland, CA, 94607',
  },
  payPeriod: {
    dates: '10/1/2026 - 10/14/2026',
    frequency: 'Bi-Weekly',
    id: 'ID: EMP-0421',
  },
  netPay: '$1,908.62',
  earnings: [
    { desc: 'Regular', rate: '80h × $28.00', amount: '$2,240.00' },
    { desc: 'Overtime', rate: '4h × 1.5', amount: '$168.00' },
    { desc: 'Bonus', rate: '', amount: '$150.00' },
  ],
  grossPay: '$2,558.00',
  taxes: [
    { desc: 'Federal Income Tax', amount: '$248.10' },
    { desc: 'Social Security', amount: '$153.08' },
    { desc: 'Medicare', amount: '$35.80' },
    { desc: 'State Income Tax', amount: '$92.40' },
  ],
  totalTaxes: '$529.38',
  deductions: [
    { desc: '401(k)', amount: '$120.00' },
  ],
  totalDeductions: '$120.00',
  summary: {
    gross: '$2,558.00',
    deductions: '$649.38',
    net: '$1,908.62',
  },
};

export const TEMPLATES = [
  {
    id: '01',
    title: 'Template 01',
    subtitle: 'Classic layout',
    headerVariant: 'dark-full',
    netPayVariant: 'dark',
    tableVariant: 'light-blue',
  },
  {
    id: '02',
    title: 'Template 02',
    subtitle: 'Minimal layout',
    headerVariant: 'minimal-blue-line',
    netPayVariant: 'blue',
    tableVariant: 'solid-blue',
  },
  {
    id: '03',
    title: 'Template 03',
    subtitle: 'Boxed layout',
    headerVariant: 'boxed',
    netPayVariant: 'blue',
    tableVariant: 'light-blue',
  },
  {
    id: '04',
    title: 'Template 04',
    subtitle: 'Corporate layout',
    headerVariant: 'split-dark',
    netPayVariant: 'dark',
    tableVariant: 'solid-dark',
  },
  {
    id: '05',
    title: 'Template 05',
    subtitle: 'Modern layout',
    headerVariant: 'blue-full',
    netPayVariant: 'blue',
    tableVariant: 'solid-blue',
  },
  {
    id: '06',
    title: 'Template 06',
    subtitle: 'Executive layout',
    headerVariant: 'minimal-dark-line',
    netPayVariant: 'dark',
    tableVariant: 'minimal-gray',
  },
  {
    id: '07',
    title: 'Template 07',
    subtitle: 'Detailed layout',
    headerVariant: 'boxed',
    netPayVariant: 'dark',
    tableVariant: 'solid-dark',
  },
  {
    id: '08',
    title: 'Template 08',
    subtitle: 'Compact layout',
    headerVariant: 'split-blue',
    netPayVariant: 'blue',
    tableVariant: 'light-blue',
  },
];

// Miniature rendered Paystub Document matching Figma
export const PaystubThumbnail = ({ template }) => {
  const { headerVariant, netPayVariant, tableVariant } = template;

  return (
    <div className="w-full bg-white border border-slate-200/80 rounded-md p-2.5 sm:p-3 text-[7.5px] leading-tight select-none shadow-[0_1px_3px_rgba(0,0,0,0.03)] font-sans">
      
      {/* 1. Top Header Banner */}
      {headerVariant === 'dark-full' && (
        <div className="bg-[#092258] text-white p-2 rounded flex justify-between items-center mb-2">
          <div>
            <p className="font-bold text-[8.5px]">{STUB_DATA.company.name}</p>
            <p className="text-white/80 text-[6.5px]">{STUB_DATA.company.address}</p>
            <p className="text-white/80 text-[6.5px]">{STUB_DATA.company.cityStateZip}</p>
            <p className="text-white/80 text-[6.5px]">{STUB_DATA.company.ein}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-[8px] uppercase tracking-wider">{STUB_DATA.statement.title}</p>
            <p className="text-white/80 text-[6.5px]">{STUB_DATA.statement.payDate}</p>
          </div>
        </div>
      )}

      {headerVariant === 'blue-full' && (
        <div className="bg-[#1E60F2] text-white p-2 rounded flex justify-between items-center mb-2">
          <div>
            <p className="font-bold text-[8.5px]">{STUB_DATA.company.name}</p>
            <p className="text-white/80 text-[6.5px]">{STUB_DATA.company.address}</p>
            <p className="text-white/80 text-[6.5px]">{STUB_DATA.company.cityStateZip}</p>
            <p className="text-white/80 text-[6.5px]">{STUB_DATA.company.ein}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-[8px] uppercase tracking-wider">{STUB_DATA.statement.title}</p>
            <p className="text-white/80 text-[6.5px]">{STUB_DATA.statement.payDate}</p>
          </div>
        </div>
      )}

      {headerVariant === 'minimal-blue-line' && (
        <div className="border-b border-[#1E60F2] pb-1.5 mb-2 flex justify-between items-center">
          <div>
            <p className="font-bold text-[#1E60F2] text-[8.5px]">{STUB_DATA.company.name}</p>
            <p className="text-slate-500 text-[6.5px]">{STUB_DATA.company.address}</p>
            <p className="text-slate-500 text-[6.5px]">{STUB_DATA.company.cityStateZip}</p>
            <p className="text-slate-500 text-[6.5px]">{STUB_DATA.company.ein}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-slate-800 text-[8px]">{STUB_DATA.statement.title}</p>
            <p className="text-slate-500 text-[6.5px]">{STUB_DATA.statement.payDate}</p>
          </div>
        </div>
      )}

      {headerVariant === 'minimal-dark-line' && (
        <div className="border-b border-slate-800 pb-1.5 mb-2 flex justify-between items-center">
          <div>
            <p className="font-bold text-slate-900 text-[8.5px]">{STUB_DATA.company.name}</p>
            <p className="text-slate-500 text-[6.5px]">{STUB_DATA.company.address}</p>
            <p className="text-slate-500 text-[6.5px]">{STUB_DATA.company.cityStateZip}</p>
            <p className="text-slate-500 text-[6.5px]">{STUB_DATA.company.ein}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-slate-800 text-[8px]">{STUB_DATA.statement.title}</p>
            <p className="text-slate-500 text-[6.5px]">{STUB_DATA.statement.payDate}</p>
          </div>
        </div>
      )}

      {headerVariant === 'boxed' && (
        <div className="border border-slate-200 p-1.5 rounded mb-2 flex justify-between items-center">
          <div>
            <p className="font-bold text-[#1E60F2] text-[8px]">{STUB_DATA.company.name}</p>
            <p className="text-slate-500 text-[6.5px]">{STUB_DATA.company.address}</p>
            <p className="text-slate-500 text-[6.5px]">{STUB_DATA.company.cityStateZip}</p>
            <p className="text-slate-500 text-[6.5px]">{STUB_DATA.company.ein}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-slate-800 text-[7.5px]">{STUB_DATA.statement.title}</p>
            <p className="text-slate-500 text-[6.5px]">{STUB_DATA.statement.payDate}</p>
          </div>
        </div>
      )}

      {headerVariant === 'split-dark' && (
        <div className="flex justify-between items-stretch mb-2 overflow-hidden rounded">
          <div className="bg-[#092258] text-white p-1.5 w-[56%]">
            <p className="font-bold text-[8px]">{STUB_DATA.company.name}</p>
            <p className="text-white/80 text-[6px]">{STUB_DATA.company.address}</p>
            <p className="text-white/80 text-[6px]">{STUB_DATA.company.cityStateZip}</p>
            <p className="text-white/80 text-[6px]">{STUB_DATA.company.ein}</p>
          </div>
          <div className="p-1.5 text-right w-[44%] flex flex-col justify-center">
            <p className="font-bold text-slate-800 text-[7.5px]">{STUB_DATA.statement.title}</p>
            <p className="text-slate-500 text-[6px]">{STUB_DATA.statement.payDate}</p>
          </div>
        </div>
      )}

      {headerVariant === 'split-blue' && (
        <div className="flex justify-between items-stretch mb-2 overflow-hidden rounded">
          <div className="bg-[#1E60F2] text-white p-1.5 w-[56%]">
            <p className="font-bold text-[8px]">{STUB_DATA.company.name}</p>
            <p className="text-white/80 text-[6px]">{STUB_DATA.company.address}</p>
            <p className="text-white/80 text-[6px]">{STUB_DATA.company.cityStateZip}</p>
            <p className="text-white/80 text-[6px]">{STUB_DATA.company.ein}</p>
          </div>
          <div className="p-1.5 text-right w-[44%] flex flex-col justify-center">
            <p className="font-bold text-slate-800 text-[7.5px]">{STUB_DATA.statement.title}</p>
            <p className="text-slate-500 text-[6px]">{STUB_DATA.statement.payDate}</p>
          </div>
        </div>
      )}

      {/* 2. Employee Info & Net Pay Row */}
      <div className="grid grid-cols-12 gap-1.5 mb-2.5 items-center">
        {/* Employee */}
        <div className="col-span-4 bg-slate-50/70 p-1.5 rounded border border-slate-100">
          <p className="text-slate-400 text-[6px] uppercase font-semibold">Employee</p>
          <p className="font-bold text-slate-800 text-[7px] truncate">{STUB_DATA.employee.name}</p>
          <p className="text-slate-500 text-[6px] truncate">{STUB_DATA.employee.address}</p>
          <p className="text-slate-500 text-[6px] truncate">{STUB_DATA.employee.cityStateZip}</p>
        </div>

        {/* Pay Period */}
        <div className="col-span-4 bg-slate-50/70 p-1.5 rounded border border-slate-100">
          <p className="text-slate-400 text-[6px] uppercase font-semibold">Pay Period</p>
          <p className="font-medium text-slate-800 text-[6.5px] truncate">{STUB_DATA.payPeriod.dates}</p>
          <p className="text-slate-500 text-[6px] truncate">{STUB_DATA.payPeriod.frequency}</p>
          <p className="text-slate-500 text-[6px] truncate">{STUB_DATA.payPeriod.id}</p>
        </div>

        {/* Net Pay Callout */}
        <div
          className={`col-span-4 p-1.5 rounded text-center flex flex-col justify-center ${
            netPayVariant === 'blue'
              ? 'bg-[#1E60F2] text-white'
              : 'bg-[#092258] text-white'
          }`}
        >
          <p className="text-[6px] uppercase tracking-wider text-white/80 font-medium">Net Pay</p>
          <p className="font-bold text-[9.5px] sm:text-[10.5px]">{STUB_DATA.netPay}</p>
        </div>
      </div>

      {/* 3. Earnings & Taxes Breakdown */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        {/* Earnings Table */}
        <div>
          <div
            className={`px-1.5 py-0.5 rounded-t text-[6.5px] font-bold flex justify-between ${
              tableVariant === 'solid-blue'
                ? 'bg-[#1E60F2] text-white'
                : tableVariant === 'solid-dark'
                ? 'bg-[#092258] text-white'
                : tableVariant === 'minimal-gray'
                ? 'bg-slate-800 text-white'
                : 'bg-[#EBF2FA] text-[#092258]'
            }`}
          >
            <span>EARNINGS</span>
            <span>AMOUNT</span>
          </div>
          <div className="space-y-0.5 py-1 text-[6.5px]">
            {STUB_DATA.earnings.map((e, idx) => (
              <div key={idx} className="flex justify-between text-slate-600">
                <span className="truncate">{e.desc} {e.rate && <span className="text-slate-400 text-[5.5px]">{e.rate}</span>}</span>
                <span className="font-medium text-slate-700">{e.amount}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-slate-900 border-t border-slate-100 pt-0.5 mt-0.5">
              <span>Gross Pay</span>
              <span>{STUB_DATA.grossPay}</span>
            </div>
          </div>
        </div>

        {/* Taxes Table */}
        <div>
          <div
            className={`px-1.5 py-0.5 rounded-t text-[6.5px] font-bold flex justify-between ${
              tableVariant === 'solid-blue'
                ? 'bg-[#1E60F2] text-white'
                : tableVariant === 'solid-dark'
                ? 'bg-[#092258] text-white'
                : tableVariant === 'minimal-gray'
                ? 'bg-slate-800 text-white'
                : 'bg-[#EBF2FA] text-[#092258]'
            }`}
          >
            <span>TAXES</span>
            <span>AMOUNT</span>
          </div>
          <div className="space-y-0.5 py-1 text-[6.5px]">
            {STUB_DATA.taxes.map((t, idx) => (
              <div key={idx} className="flex justify-between text-slate-600">
                <span className="truncate">{t.desc}</span>
                <span className="font-medium text-slate-700">{t.amount}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-slate-900 border-t border-slate-100 pt-0.5 mt-0.5">
              <span>Total Taxes</span>
              <span>{STUB_DATA.totalTaxes}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Other Deductions & Bottom Summary */}
      <div className="border-t border-slate-150 pt-1 text-[6.5px] flex justify-between text-slate-500 font-medium">
        <span>Gross Pay: <strong className="text-slate-800">{STUB_DATA.summary.gross}</strong></span>
        <span>Deductions: <strong className="text-slate-800">{STUB_DATA.summary.deductions}</strong></span>
        <span>Net Pay: <strong className="text-slate-800">{STUB_DATA.summary.net}</strong></span>
      </div>
    </div>
  );
};

const TemplateSelectionSection = ({
  selectedTemplateId = '01',
  onSelectTemplate,
}) => {
  const [internalSelected, setInternalSelected] = useState(selectedTemplateId);
  const selectedTemplate = onSelectTemplate ? selectedTemplateId : internalSelected;

  const handleSelect = (id) => {
    setInternalSelected(id);
    onSelectTemplate?.(id);
  };

  const [previewTemplate, setPreviewTemplate] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.template-card-item',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'transform',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F0F5FA] py-14 sm:py-20 select-none border-t border-slate-200/60"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Figma */}
        <div className="mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#092258] tracking-tight">
            Choose Your Paystub Template
          </h2>
          <p className="mt-1.5 text-slate-500 text-[14px] sm:text-[15px]">
            Select the layout that best suits your needs.
          </p>
        </div>

        {/* 8 Templates Grid (4 columns desktop, 2 tablet, 1 mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {TEMPLATES.map((tmpl) => {
            const isSelected = selectedTemplate === tmpl.id;

            return (
              <div
                key={tmpl.id}
                onClick={() => handleSelect(tmpl.id)}
                className={`template-card-item group relative bg-white rounded-xl p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-2 border-[#1E60F2] shadow-[0_4px_16px_rgba(30,96,242,0.12)]'
                    : 'border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {/* Checkmark Badge on Top Right when selected */}
                {isSelected && (
                  <div
                    className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-[#1E60F2] text-white flex items-center justify-center shadow-md z-20 animate-in zoom-in-50 duration-200"
                    aria-label="Selected Template"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}

                {/* Inner Paystub Document Thumbnail */}
                <div className="w-full mb-3.5 overflow-hidden">
                  <PaystubThumbnail template={tmpl} />
                </div>

                {/* Card Footer: Title, Layout label & Preview Button */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-[#111827] text-[15px] leading-tight">
                        {tmpl.title}
                      </h3>
                      <p className="text-slate-400 text-[13px] font-normal mt-0.5">
                        {tmpl.subtitle}
                      </p>
                    </div>

                    {/* Preview Trigger */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewTemplate(tmpl);
                      }}
                      className="inline-flex items-center gap-1.5 text-secondary hover:text-[#0080d0] text-[13px] font-medium transition cursor-pointer py-1 px-1.5 rounded hover:bg-sky-50"
                      aria-label={`Preview ${tmpl.title}`}
                    >
                      <Eye className="w-4 h-4 stroke-[2]" />
                      <span>Preview</span>
                    </button>
                  </div>

                  {/* Select / Selected Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(tmpl.id);
                    }}
                    className={`w-full py-2.5 rounded-lg font-semibold text-[14px] transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#1E60F2] text-white shadow-sm hover:bg-[#1550cf]'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Select Template'}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Modal Preview Dialog matching exact Figma design */}
      {previewTemplate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
          onClick={() => setPreviewTemplate(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl sm:max-w-2xl w-full p-5 sm:p-6 shadow-2xl relative max-h-[94vh] overflow-y-auto animate-in zoom-in-95 duration-200 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-[17px] font-bold text-slate-900">
                {previewTemplate.title} preview
              </h3>
              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Paystub Document View */}
            <div className="mb-5 overflow-hidden">
              <PaystubThumbnail template={previewTemplate} />
            </div>

            {/* Full-width Action Button */}
            <div>
              <button
                type="button"
                onClick={() => {
                  handleSelect(previewTemplate.id);
                  setPreviewTemplate(null);
                }}
                className="w-full py-3 rounded-lg bg-[#009BFB] hover:bg-[#0089e0] active:bg-[#007cc7] text-white font-semibold text-[15px] shadow-sm transition cursor-pointer text-center"
              >
                Use this template
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default TemplateSelectionSection;
