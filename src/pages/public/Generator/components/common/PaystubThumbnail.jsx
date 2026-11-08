import React from "react";
import stubData from "../../../data/generator/templateStubData.json";
import templates from "../../../data/generator/templates.json";
import ScaledDocument from "./ScaledDocument";
import {
  CompanyLogo,
  DOCUMENT_PAGE,
  SAMPLE_PAYSTUB_DOCUMENT,
  TemplateDocument,
  hasTemplateDocument,
} from "../../templates";

const STUB_DATA = stubData;
export const TEMPLATES = templates;

// Card thumbnails show the top of the page so they line up with the other cards.
const THUMBNAIL_VISIBLE_HEIGHT = 880;

const DocumentThumbnail = ({ template, full }) => (
  <div className="w-full bg-white border border-slate-200/80 rounded-md overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
    <ScaledDocument
      width={DOCUMENT_PAGE.width}
      height={DOCUMENT_PAGE.height}
      visibleHeight={full ? DOCUMENT_PAGE.height : THUMBNAIL_VISIBLE_HEIGHT}
    >
      <TemplateDocument template={template} data={SAMPLE_PAYSTUB_DOCUMENT} />
    </ScaledDocument>
  </div>
);

// Company block: optional logo on the left, a divider, then the company details.
const ThumbnailCompany = ({ logo, dark = false, children }) => (
  <div className="flex items-center gap-1.5 min-w-0">
    {logo && (
      <>
        <CompanyLogo src={logo} boxWidth={40} boxHeight={24} shrink />
        <span className={`self-stretch w-px shrink-0 ${dark ? "bg-white/40" : "bg-slate-300"}`} />
      </>
    )}
    <div className="min-w-0">{children}</div>
  </div>
);

// Miniature rendered Paystub Document matching Figma
export const PaystubThumbnail = ({ template, full = false, data = STUB_DATA }) => {
  if (hasTemplateDocument(template)) return <DocumentThumbnail template={template} full={full} />;

  const stub = data;
  const { headerVariant, netPayVariant, tableVariant } = template;

  return (
    <div className="w-full bg-white border border-slate-200/80 rounded-md p-2.5 sm:p-3 text-[7.5px] leading-tight select-none shadow-[0_1px_3px_rgba(0,0,0,0.03)] font-sans">
      {/* 1. Top Header Banner */}
      {headerVariant === "dark-full" && (
        <div className="bg-[#092258] text-white p-2 rounded flex justify-between items-center mb-2">
          <div>
            <ThumbnailCompany logo={stub.company.logo} dark>
              <p className="font-bold text-[8.5px]">{stub.company.name}</p>
              <p className="text-white/80 text-[6.5px]">
                {stub.company.address}
              </p>
              <p className="text-white/80 text-[6.5px]">
                {stub.company.cityStateZip}
              </p>
              <p className="text-white/80 text-[6.5px]">
                {stub.company.ein}
              </p>
              {stub.company.phone && <p className="text-white/80 text-[6.5px]">{stub.company.phone}</p>}
            </ThumbnailCompany>
          </div>
          <div className="text-right">
            <p className="font-bold text-[8px] uppercase tracking-wider">
              {stub.statement.title}
            </p>
            <p className="text-white/80 text-[6.5px]">
              {stub.statement.payDate}
            </p>
          </div>
        </div>
      )}

      {headerVariant === "blue-full" && (
        <div className="bg-[#1E60F2] text-white p-2 rounded flex justify-between items-center mb-2">
          <div>
            <ThumbnailCompany logo={stub.company.logo} dark>
              <p className="font-bold text-[8.5px]">{stub.company.name}</p>
              <p className="text-white/80 text-[6.5px]">
                {stub.company.address}
              </p>
              <p className="text-white/80 text-[6.5px]">
                {stub.company.cityStateZip}
              </p>
              <p className="text-white/80 text-[6.5px]">
                {stub.company.ein}
              </p>
              {stub.company.phone && <p className="text-white/80 text-[6.5px]">{stub.company.phone}</p>}
            </ThumbnailCompany>
          </div>
          <div className="text-right">
            <p className="font-bold text-[8px] uppercase tracking-wider">
              {stub.statement.title}
            </p>
            <p className="text-white/80 text-[6.5px]">
              {stub.statement.payDate}
            </p>
          </div>
        </div>
      )}

      {headerVariant === "minimal-blue-line" && (
        <div className="border-b border-[#1E60F2] pb-1.5 mb-2 flex justify-between items-center">
          <div>
            <ThumbnailCompany logo={stub.company.logo}>
              <p className="font-bold text-[#1E60F2] text-[8.5px]">
                {stub.company.name}
              </p>
              <p className="text-slate-500 text-[6.5px]">
                {stub.company.address}
              </p>
              <p className="text-slate-500 text-[6.5px]">
                {stub.company.cityStateZip}
              </p>
              <p className="text-slate-500 text-[6.5px]">
                {stub.company.ein}
              </p>
              {stub.company.phone && <p className="text-slate-500 text-[6.5px]">{stub.company.phone}</p>}
            </ThumbnailCompany>
          </div>
          <div className="text-right">
            <p className="font-bold text-slate-800 text-[8px]">
              {stub.statement.title}
            </p>
            <p className="text-slate-500 text-[6.5px]">
              {stub.statement.payDate}
            </p>
          </div>
        </div>
      )}

      {headerVariant === "minimal-dark-line" && (
        <div className="border-b border-slate-800 pb-1.5 mb-2 flex justify-between items-center">
          <div>
            <ThumbnailCompany logo={stub.company.logo}>
              <p className="font-bold text-slate-900 text-[8.5px]">
                {stub.company.name}
              </p>
              <p className="text-slate-500 text-[6.5px]">
                {stub.company.address}
              </p>
              <p className="text-slate-500 text-[6.5px]">
                {stub.company.cityStateZip}
              </p>
              <p className="text-slate-500 text-[6.5px]">
                {stub.company.ein}
              </p>
              {stub.company.phone && <p className="text-slate-500 text-[6.5px]">{stub.company.phone}</p>}
            </ThumbnailCompany>
          </div>
          <div className="text-right">
            <p className="font-bold text-slate-800 text-[8px]">
              {stub.statement.title}
            </p>
            <p className="text-slate-500 text-[6.5px]">
              {stub.statement.payDate}
            </p>
          </div>
        </div>
      )}

      {headerVariant === "boxed" && (
        <div className="border border-slate-200 p-1.5 rounded mb-2 flex justify-between items-center">
          <div>
            <ThumbnailCompany logo={stub.company.logo}>
              <p className="font-bold text-[#1E60F2] text-[8px]">
                {stub.company.name}
              </p>
              <p className="text-slate-500 text-[6.5px]">
                {stub.company.address}
              </p>
              <p className="text-slate-500 text-[6.5px]">
                {stub.company.cityStateZip}
              </p>
              <p className="text-slate-500 text-[6.5px]">
                {stub.company.ein}
              </p>
              {stub.company.phone && <p className="text-slate-500 text-[6.5px]">{stub.company.phone}</p>}
            </ThumbnailCompany>
          </div>
          <div className="text-right">
            <p className="font-bold text-slate-800 text-[7.5px]">
              {stub.statement.title}
            </p>
            <p className="text-slate-500 text-[6.5px]">
              {stub.statement.payDate}
            </p>
          </div>
        </div>
      )}

      {headerVariant === "split-dark" && (
        <div className="flex justify-between items-stretch mb-2 overflow-hidden rounded">
          <div className="bg-[#092258] text-white p-1.5 w-[56%]">
            <ThumbnailCompany logo={stub.company.logo} dark>
              <p className="font-bold text-[8px]">{stub.company.name}</p>
              <p className="text-white/80 text-[6px]">
                {stub.company.address}
              </p>
              <p className="text-white/80 text-[6px]">
                {stub.company.cityStateZip}
              </p>
              <p className="text-white/80 text-[6px]">{stub.company.ein}</p>
              {stub.company.phone && <p className="text-white/80 text-[6px]">{stub.company.phone}</p>}
            </ThumbnailCompany>
          </div>
          <div className="p-1.5 text-right w-[44%] flex flex-col justify-center">
            <p className="font-bold text-slate-800 text-[7.5px]">
              {stub.statement.title}
            </p>
            <p className="text-slate-500 text-[6px]">
              {stub.statement.payDate}
            </p>
          </div>
        </div>
      )}

      {headerVariant === "split-blue" && (
        <div className="flex justify-between items-stretch mb-2 overflow-hidden rounded">
          <div className="bg-[#1E60F2] text-white p-1.5 w-[56%]">
            <ThumbnailCompany logo={stub.company.logo} dark>
              <p className="font-bold text-[8px]">{stub.company.name}</p>
              <p className="text-white/80 text-[6px]">
                {stub.company.address}
              </p>
              <p className="text-white/80 text-[6px]">
                {stub.company.cityStateZip}
              </p>
              <p className="text-white/80 text-[6px]">{stub.company.ein}</p>
              {stub.company.phone && <p className="text-white/80 text-[6px]">{stub.company.phone}</p>}
            </ThumbnailCompany>
          </div>
          <div className="p-1.5 text-right w-[44%] flex flex-col justify-center">
            <p className="font-bold text-slate-800 text-[7.5px]">
              {stub.statement.title}
            </p>
            <p className="text-slate-500 text-[6px]">
              {stub.statement.payDate}
            </p>
          </div>
        </div>
      )}

      {/* 2. Employee Info & Net Pay Row */}
      <div className="grid grid-cols-12 gap-1.5 mb-2.5 items-center">
        {/* Employee */}
        <div className="col-span-4 bg-slate-50/70 p-1.5 rounded border border-slate-100">
          <p className="text-slate-400 text-[6px] uppercase font-semibold">
            Employee
          </p>
          <p className="font-bold text-slate-800 text-[7px] truncate">
            {stub.employee.name}
          </p>
          <p className="text-slate-500 text-[6px] truncate">
            {stub.employee.address}
          </p>
          <p className="text-slate-500 text-[6px] truncate">
            {stub.employee.cityStateZip}
          </p>
        </div>

        {/* Pay Period */}
        <div className="col-span-4 bg-slate-50/70 p-1.5 rounded border border-slate-100">
          <p className="text-slate-400 text-[6px] uppercase font-semibold">
            Pay Period
          </p>
          <p className="font-medium text-slate-800 text-[6.5px] truncate">
            {stub.payPeriod.dates}
          </p>
          <p className="text-slate-500 text-[6px] truncate">
            {stub.payPeriod.frequency}
          </p>
          <p className="text-slate-500 text-[6px] truncate">
            {stub.payPeriod.id}
          </p>
        </div>

        {/* Net Pay Callout */}
        <div
          className={`col-span-4 p-1.5 rounded text-center flex flex-col justify-center ${
            netPayVariant === "blue"
              ? "bg-[#1E60F2] text-white"
              : "bg-[#092258] text-white"
          }`}
        >
          <p className="text-[6px] uppercase tracking-wider text-white/80 font-medium">
            Net Pay
          </p>
          <p className="font-bold text-[9.5px] sm:text-[10.5px]">
            {stub.netPay}
          </p>
        </div>
      </div>

      {/* 3. Earnings & Taxes Breakdown */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        {/* Earnings Table */}
        <div>
          <div
            className={`px-1.5 py-0.5 rounded-t text-[6.5px] font-bold flex justify-between ${
              tableVariant === "solid-blue"
                ? "bg-[#1E60F2] text-white"
                : tableVariant === "solid-dark"
                  ? "bg-[#092258] text-white"
                  : tableVariant === "minimal-gray"
                    ? "bg-slate-800 text-white"
                    : "bg-[#EBF2FA] text-[#092258]"
            }`}
          >
            <span>EARNINGS</span>
            <span>AMOUNT</span>
          </div>
          <div className="space-y-0.5 py-1 text-[6.5px]">
            {stub.earnings.map((e, idx) => (
              <div key={idx} className="flex justify-between text-slate-600">
                <span className="truncate">
                  {e.desc}{" "}
                  {e.rate && (
                    <span className="text-slate-400 text-[5.5px]">
                      {e.rate}
                    </span>
                  )}
                </span>
                <span className="font-medium text-slate-700">{e.amount}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-slate-900 border-t border-slate-100 pt-0.5 mt-0.5">
              <span>Gross Pay</span>
              <span>{stub.grossPay}</span>
            </div>
          </div>
        </div>

        {/* Taxes Table */}
        <div>
          <div
            className={`px-1.5 py-0.5 rounded-t text-[6.5px] font-bold flex justify-between ${
              tableVariant === "solid-blue"
                ? "bg-[#1E60F2] text-white"
                : tableVariant === "solid-dark"
                  ? "bg-[#092258] text-white"
                  : tableVariant === "minimal-gray"
                    ? "bg-slate-800 text-white"
                    : "bg-[#EBF2FA] text-[#092258]"
            }`}
          >
            <span>TAXES</span>
            <span>AMOUNT</span>
          </div>
          <div className="space-y-0.5 py-1 text-[6.5px]">
            {stub.taxes.map((t, idx) => (
              <div key={idx} className="flex justify-between text-slate-600">
                <span className="truncate">{t.desc}</span>
                <span className="font-medium text-slate-700">{t.amount}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-slate-900 border-t border-slate-100 pt-0.5 mt-0.5">
              <span>Total Taxes</span>
              <span>{stub.totalTaxes}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Other Deductions & Bottom Summary */}
      <div className="border-t border-slate-150 pt-1 text-[6.5px] flex justify-between text-slate-500 font-medium">
        <span>
          Gross Pay:{" "}
          <strong className="text-slate-800">{stub.summary.gross}</strong>
        </span>
        <span>
          Deductions:{" "}
          <strong className="text-slate-800">
            {stub.summary.deductions}
          </strong>
        </span>
        <span>
          Net Pay:{" "}
          <strong className="text-slate-800">{stub.summary.net}</strong>
        </span>
      </div>
    </div>
  );
};
