import React from 'react';
import { X, Download } from 'lucide-react';

const DocumentDetailsModal = ({ doc, onClose, onDownload }) => {
  if (!doc) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            Document Details
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Document Visual Preview Container */}
        <div className="bg-[#F4F8FC] p-6 sm:p-8 flex items-center justify-center border-b border-slate-100">
          <div className="bg-white rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.06)] border border-slate-200/90 p-5 sm:p-6 w-full max-w-[340px] text-[8px] leading-tight text-slate-800 font-sans select-none">
            {/* Invoice Top Bar */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 border-2 border-[#FFC711] rotate-45 flex items-center justify-center">
                  <div className="w-1 h-1 bg-[#FFC711]" />
                </div>
                <span className="font-bold text-slate-800 text-[10px] tracking-tight">Brand Name</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-slate-900 tracking-wider">INVOICE</span>
                <div className="h-1.5 w-full bg-[#FFC711] mt-0.5" />
              </div>
            </div>

            {/* Recipient & Invoice Info */}
            <div className="grid grid-cols-2 gap-3 py-3 text-slate-600 text-[7.5px]">
              <div>
                <span className="font-bold text-slate-800 text-[8px] block mb-0.5">Invoice to:</span>
                <p className="font-semibold text-slate-700">Dayana Clark</p>
                <p className="text-slate-500 text-[7px] leading-snug">
                  24 Dummy Street Area,<br />Location, Lorem Ipsum,<br />47000000
                </p>
              </div>
              <div className="text-right space-y-0.5">
                <div>
                  <span className="font-bold text-slate-700">Invoice#</span>{' '}
                  <span className="text-slate-500 font-mono">10148</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700">Date</span>{' '}
                  <span className="text-slate-500">01 / 03 / 2025</span>
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="mt-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#2B2B2B] text-white font-bold text-[7px]">
                    <th className="py-1 px-1.5 w-5">Sl.</th>
                    <th className="py-1 px-1.5">Item Description</th>
                    <th className="py-1 px-1.5 text-right">Price</th>
                    <th className="py-1 px-1.5 text-center w-6">Qty</th>
                    <th className="py-1 px-1.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 text-[7px]">
                  <tr>
                    <td className="py-1 px-1.5 text-slate-500">1</td>
                    <td className="py-1 px-1.5 font-medium">Lorem Ipsum Dolor</td>
                    <td className="py-1 px-1.5 text-right">$50.00</td>
                    <td className="py-1 px-1.5 text-center">1</td>
                    <td className="py-1 px-1.5 text-right font-semibold">$50.00</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-1.5 text-slate-500">2</td>
                    <td className="py-1 px-1.5 font-medium">Pellentesque id neque ligula</td>
                    <td className="py-1 px-1.5 text-right">$20.00</td>
                    <td className="py-1 px-1.5 text-center">3</td>
                    <td className="py-1 px-1.5 text-right font-semibold">$60.00</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-1.5 text-slate-500">3</td>
                    <td className="py-1 px-1.5 font-medium">Interdum et malesuada fames</td>
                    <td className="py-1 px-1.5 text-right">$15.00</td>
                    <td className="py-1 px-1.5 text-center">2</td>
                    <td className="py-1 px-1.5 text-right font-semibold">$30.00</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-1.5 text-slate-500">4</td>
                    <td className="py-1 px-1.5 font-medium">Vivamus volutpat faucibus</td>
                    <td className="py-1 px-1.5 text-right">$80.00</td>
                    <td className="py-1 px-1.5 text-center">1</td>
                    <td className="py-1 px-1.5 text-right font-semibold">$80.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Totals & Notes */}
            <div className="grid grid-cols-2 gap-3 mt-2.5 pt-2 text-[7px] border-t border-slate-100">
              <div className="space-y-0.5 text-slate-500 leading-snug">
                <p className="font-semibold text-slate-800">Thank you for your business</p>
                <p>
                  <strong className="text-slate-700">Terms &amp; Conditions:</strong>
                  <br />
                  Viverra dignissim pretium scelerisque.
                </p>
              </div>
              <div className="space-y-0.5">
                <div className="flex justify-between text-slate-600 px-1">
                  <span>Sub Total:</span>
                  <span className="font-semibold text-slate-800">$220.00</span>
                </div>
                <div className="flex justify-between text-slate-600 px-1">
                  <span>Tax:</span>
                  <span className="font-semibold text-slate-800">0.00%</span>
                </div>
                <div className="bg-[#FFC711] text-slate-900 font-extrabold px-1.5 py-0.5 rounded-xs flex justify-between text-[7.5px] mt-0.5 shadow-xs">
                  <span>Total:</span>
                  <span>$220.00</span>
                </div>
              </div>
            </div>

            {/* Signature row */}
            <div className="mt-3 pt-2 flex justify-between items-end border-t border-slate-100 text-[6.5px] text-slate-400">
              <span>Phone # | Address | Website</span>
              <span className="border-t border-slate-300 pt-0.5 font-medium text-slate-600">Authorized Sign</span>
            </div>
          </div>
        </div>

        {/* Document Details Metadata */}
        <div className="p-6 grid grid-cols-2 gap-y-4 gap-x-6 text-xs">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              DOCUMENT NAME
            </span>
            <p className="font-bold text-slate-900 text-sm mt-0.5">
              {doc.name}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              CREATED
            </span>
            <p className="font-bold text-slate-900 text-sm mt-0.5">
              {doc.date}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              DOCUMENT ID
            </span>
            <p className="font-bold text-slate-800 font-mono text-xs mt-0.5">
              {doc.id}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              STATUS
            </span>
            <div className="mt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{doc.status || 'Completed'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons Footer */}
        <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs sm:text-sm transition cursor-pointer"
          >
            Back to Documents
          </button>

          <button
            type="button"
            onClick={() => {
              if (onDownload) onDownload(doc.name);
            }}
            className="px-6 py-2.5 rounded-xl bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition cursor-pointer active:scale-98"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetailsModal;
