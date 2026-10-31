import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const PricingSection = () => {
  const oneTimeItems = [
    { name: '1 Paystub', price: '$12.99' },
    { name: '3 Paystubs', price: '$24.99' },
    { name: 'Each additional Paystub', price: '$7.99' },
    { name: 'W-2', price: '$14.99' },
    { name: '1099', price: '$14.99' },
  ];

  const subscriptionFeatures = [
    'Unlimited Paystub generation',
    'Unlimited W-2 generation',
    'Unlimited 1099 generation',
    'Unlimited access to supported document types',
  ];

  return (
    <section id="pricing" className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-secondary font-semibold text-xs sm:text-[13px] tracking-widest uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span>
            <span>PRICING</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 tracking-tight leading-tight">
            Simple Pricing for Every Need
          </h2>
          
          <p className="mt-3 text-slate-600 text-base sm:text-[17px] font-normal leading-relaxed">
            Choose between a one-time purchase or unlimited monthly access.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: One-Time Purchase */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                One-Time Purchase
              </h3>
              <p className="text-slate-500 text-sm mt-1 mb-8 font-normal">
                Pay only for what you need.
              </p>

              {/* Price Rows */}
              <div className="space-y-4">
                {oneTimeItems.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between py-2 text-sm sm:text-[15px]"
                  >
                    <span className="text-slate-700 font-medium">{item.name}</span>
                    <span className="text-slate-900 font-bold tracking-tight">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Button */}
            <div className="mt-8 pt-4">
              <button
                type="button"
                className="w-full border border-secondary text-secondary hover:bg-secondary/5 font-semibold text-[15px] py-3.5 px-6 rounded-xl transition-all duration-200 cursor-pointer shadow-xs active:scale-[0.99]"
              >
                Create a Document
              </button>
            </div>
          </div>

          {/* Card 2: Unlimited Monthly Subscription (Featured) */}
          <div className="lg:col-span-5 relative bg-white rounded-3xl p-8 sm:p-10 border-2 border-secondary shadow-[0_8px_30px_rgba(0,155,251,0.12)] flex flex-col justify-between">
            {/* Best Value Pill Badge */}
            <div className="absolute -top-3.5 right-8 bg-secondary text-white text-xs font-semibold px-3.5 py-1 rounded-full shadow-sm">
              Best value
            </div>

            <div>
              <h3 className="font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                Unlimited Monthly Subscription
              </h3>

              {/* Price display */}
              <div className="mt-4 mb-6 flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                  $199
                </span>
                <span className="text-slate-500 text-sm font-medium">
                  / month
                </span>
              </div>

              {/* Features checkmarks list */}
              <div className="space-y-3.5 mb-8">
                {subscriptionFeatures.map((feat) => (
                  <div key={feat} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm sm:text-[15px] leading-snug">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Button */}
            <div className="mt-4">
              <button
                type="button"
                className="w-full bg-secondary hover:bg-[#008be0] active:scale-[0.99] text-white font-semibold text-[15px] py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer text-center"
              >
                Get Unlimited Access
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PricingSection;
