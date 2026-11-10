import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../../assets/logo.png";

const AuthInvoicePreview = () => {
  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-b from-slate-50 via-sky-50/40 to-slate-100/60 p-8 sm:p-12 lg:p-14 flex flex-col justify-center items-center relative overflow-hidden select-none border-r border-slate-200/60">
      {/* Background Soft Glow */}
      <div
        className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-blue-100/40 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-20 w-72 h-72 rounded-full bg-sky-100/50 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="relative z-10 text-center mb-6 max-w-sm">
        <Link to="/" className="inline-block mb-4">
          <img
            src={logoImg}
            alt="Logo"
            className="h-10 w-auto object-contain"
            loading="eager"
            decoding="async"
          />
        </Link>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
          Official Invoice Preview
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Accurate tax calculations and print-ready PDF output
        </p>
      </div>

      {/* Clean Rendered Invoice Sheet */}
      <div className="relative z-10 flex items-center justify-center w-full max-w-[370px]">
        <div className="bg-white rounded-xl shadow-[0_20px_45px_rgba(15,23,42,0.08),0_2px_6px_rgba(15,23,42,0.04)] border border-slate-200/90 p-5 sm:p-6 w-full text-[8.5px] leading-tight text-slate-800 font-sans transition-all">
          {/* Invoice Top Bar */}
          <div className="flex items-start justify-between pb-3.5 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 border-2 border-[#FFC711] rotate-45 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#FFC711]" />
              </div>
              <span className="font-bold text-slate-800 text-[10.5px] tracking-tight">
                Brand Name
              </span>
            </div>
            <div className="text-right">
              <span className="text-sm font-extrabold text-slate-900 tracking-wider">
                INVOICE
              </span>
              <div className="h-1.5 w-full bg-[#FFC711] mt-0.5" />
            </div>
          </div>

          {/* Recipient & Invoice Info */}
          <div className="grid grid-cols-2 gap-4 py-3.5 text-slate-600 text-[8px]">
            <div>
              <span className="font-bold text-slate-800 text-[8.5px] block mb-0.5">
                Invoice to:
              </span>
              <p className="font-semibold text-slate-700">Dayana Clark</p>
              <p className="text-slate-500 text-[7.5px] leading-snug">
                24 Dummy Street Area,
                <br />
                Location, Lorem Ipsum,
                <br />
                47000000
              </p>
            </div>
            <div className="text-right space-y-1">
              <div>
                <span className="font-bold text-slate-700">Invoice#</span>{" "}
                <span className="text-slate-500 font-mono">10148</span>
              </div>
              <div>
                <span className="font-bold text-slate-700">Date</span>{" "}
                <span className="text-slate-500">01 / 03 / 2025</span>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="mt-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#2B2B2B] text-white font-bold text-[7.5px]">
                  <th className="py-1.5 px-2 w-6">Sl.</th>
                  <th className="py-1.5 px-2">Item Description</th>
                  <th className="py-1.5 px-2 text-right">Price</th>
                  <th className="py-1.5 px-2 text-center w-7">Qty</th>
                  <th className="py-1.5 px-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-[7.5px]">
                <tr>
                  <td className="py-1.5 px-2 text-slate-500">1</td>
                  <td className="py-1.5 px-2 font-medium">Lorem Ipsum Dolor</td>
                  <td className="py-1.5 px-2 text-right">$50.00</td>
                  <td className="py-1.5 px-2 text-center">1</td>
                  <td className="py-1.5 px-2 text-right font-semibold">
                    $50.00
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 text-slate-500">2</td>
                  <td className="py-1.5 px-2 font-medium">
                    Pellentesque id neque ligula
                  </td>
                  <td className="py-1.5 px-2 text-right">$20.00</td>
                  <td className="py-1.5 px-2 text-center">3</td>
                  <td className="py-1.5 px-2 text-right font-semibold">
                    $60.00
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 text-slate-500">3</td>
                  <td className="py-1.5 px-2 font-medium">
                    Interdum et malesuada fames
                  </td>
                  <td className="py-1.5 px-2 text-right">$15.00</td>
                  <td className="py-1.5 px-2 text-center">2</td>
                  <td className="py-1.5 px-2 text-right font-semibold">
                    $30.00
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 text-slate-500">4</td>
                  <td className="py-1.5 px-2 font-medium">
                    Vivamus volutpat faucibus
                  </td>
                  <td className="py-1.5 px-2 text-right">$80.00</td>
                  <td className="py-1.5 px-2 text-center">1</td>
                  <td className="py-1.5 px-2 text-right font-semibold">
                    $80.00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals & Notes */}
          <div className="grid grid-cols-2 gap-4 mt-3 pt-2.5 text-[7.5px] border-t border-slate-100">
            <div className="space-y-1 text-slate-500 leading-snug">
              <p className="font-semibold text-slate-800">
                Thank you for your business
              </p>
              <p>
                <strong className="text-slate-700">
                  Terms &amp; Conditions:
                </strong>
                <br />
                Viverra dignissim pretium scelerisque.
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-slate-600 px-1">
                <span>Sub Total:</span>
                <span className="font-semibold text-slate-800">$220.00</span>
              </div>
              <div className="flex justify-between text-slate-600 px-1">
                <span>Tax:</span>
                <span className="font-semibold text-slate-800">0.00%</span>
              </div>
              <div className="bg-[#FFC711] text-slate-900 font-extrabold px-2 py-1 rounded-xs flex justify-between text-[8.5px] mt-1 shadow-xs">
                <span>Total:</span>
                <span>$220.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthInvoicePreview;
