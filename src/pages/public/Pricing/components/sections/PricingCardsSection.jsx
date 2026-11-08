import React, { useState } from "react";
import { Link } from "react-router";
import { Check, ChevronRight } from "lucide-react";
import monthlyFeatures from "../../../data/pricing/monthlyFeatures.json";
import oneTimeCards from "../../../data/pricing/oneTimeCards.json";

const PricingCardsSection = () => {
  const [billingType, setBillingType] = useState("one-time"); // 'one-time' | 'monthly'

  return (
    <section className="w-full bg-[#F7FAFF] pt-2 pb-24 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
      <div className="max-w-[1240px] mx-auto space-y-10 sm:space-y-12">
        {/* Top Dark Navy Special Offer Banner */}
        <div className="w-full bg-[#172E57] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-md">
          <div className="flex items-center gap-5 sm:gap-6 z-10">
            {/* Round Badge: SAVE 35% */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center text-white font-extrabold text-xs sm:text-[13px] text-center leading-tight shadow-md uppercase">
              SAVE
              <br />
              35%
            </div>

            {/* Banner Text Details */}
            <div>
              <span className="block text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-widest mb-0.5">
                BEST VALUE
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Get 3 Paystubs for $24.99
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Three professional paystubs. Each additional paystub costs
                $7.99.
              </p>
            </div>
          </div>

          {/* Banner Action Button */}
          <div className="z-10 flex-shrink-0">
            <Link
              to="/paystub-generator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl bg-secondary hover:bg-[#0089e0] text-white font-semibold text-sm sm:text-[15px] transition-all shadow-sm hover:shadow transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Get 3 Paystubs</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Toggle Switcher: One-Time Purchase vs Monthly Subscription */}
        <div className="flex justify-center">
          <div className="bg-[#EAF2FA] p-1 sm:p-1.5 rounded-xl inline-flex gap-1 border border-slate-200/60 shadow-xs">
            <button
              type="button"
              onClick={() => setBillingType("one-time")}
              className={`px-6 sm:px-8 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                billingType === "one-time"
                  ? "bg-white text-secondary shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              One-Time Purchase
            </button>
            <button
              type="button"
              onClick={() => setBillingType("monthly")}
              className={`px-6 sm:px-8 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                billingType === "monthly"
                  ? "bg-white text-secondary shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Monthly Subscription
            </button>
          </div>
        </div>

        {/* Dynamic Content based on selected toggle */}
        {billingType === "one-time" ? (
          /* One-Time Purchase Grid: 6 Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {oneTimeCards.map((card) => {
              if (card.isPopular) {
                return (
                  <div
                    key={card.id}
                    className="relative bg-white rounded-2xl border-2 border-secondary shadow-[0_4px_20px_rgba(0,155,251,0.12)] p-6 sm:p-7 flex flex-col justify-between"
                  >
                    {/* Top Center Pill Badge */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                      MOST POPULAR
                    </div>

                    <div>
                      <h3 className="text-base font-semibold text-slate-800">
                        {card.name}
                      </h3>
                      <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-4 tracking-tight">
                        {card.price}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-600 mb-6">
                        <Check className="w-4 h-4 text-secondary flex-shrink-0 stroke-[2.5]" />
                        <span>{card.feature}</span>
                      </div>
                    </div>

                    <Link
                      to={card.btnLink}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-secondary hover:bg-[#0089e0] text-white font-semibold text-sm transition-all shadow-sm hover:shadow transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <span>{card.btnText}</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                );
              }

              return (
                <div
                  key={card.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-base font-semibold text-slate-800">
                      {card.name}
                    </h3>
                    <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-4 tracking-tight">
                      {card.price}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-6">
                      <Check className="w-4 h-4 text-secondary flex-shrink-0 stroke-[2.5]" />
                      <span>{card.feature}</span>
                    </div>
                  </div>

                  <Link
                    to={card.btnLink}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-white border border-slate-200 hover:border-secondary hover:text-secondary text-slate-700 font-semibold text-sm transition-all hover:bg-slate-50"
                  >
                    <span>{card.btnText}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}

            {/* 6th Card: Need more paystubs? */}
            <div className="bg-[#EEF6FF] rounded-2xl border border-blue-100 p-6 sm:p-7 flex flex-col justify-center">
              <span className="text-sm font-semibold text-secondary">
                Need more paystubs?
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-2 tracking-tight">
                $7.99
              </div>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                per additional paystub after the first three
              </p>
            </div>
          </div>
        ) : (
          /* Monthly Subscription View: Big Dark Navy Plan Card */
          <div className="w-full bg-[#172E57] rounded-2xl p-8 sm:p-12 relative overflow-hidden text-white shadow-xl">
            {/* Top Right Decorative Arc */}
            <div
              className="absolute -top-32 -right-32 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#1E3A6E] opacity-50 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-3xl">
              <span className="text-xs font-bold tracking-widest text-secondary uppercase block mb-3">
                UNLIMITED ACCESS
              </span>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                Everything you need.
                <br />
                One simple plan.
              </h3>

              <div className="mt-4 mb-6 flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  $199
                </span>
                <span className="text-slate-300 text-base font-normal">
                  / month
                </span>
              </div>

              {/* Thin Divider Line */}
              <div className="h-px bg-slate-700/60 max-w-xl my-6" />

              {/* 4 Feature Checkmarks in 2 Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-8 text-sm sm:text-base text-slate-200 mb-8">
                {monthlyFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-secondary flex-shrink-0 stroke-[2.5]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Button & Disclaimer */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Link
                  to="/paystub-generator"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-secondary hover:bg-[#0089e0] text-white font-semibold text-sm sm:text-base transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Get Unlimited Access</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <span className="text-xs sm:text-sm text-slate-300">
                  Cancel anytime • Secure checkout
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingCardsSection;
