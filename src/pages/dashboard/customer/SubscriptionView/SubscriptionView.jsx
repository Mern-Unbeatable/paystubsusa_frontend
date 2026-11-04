import React from 'react';
import { Star, Check, HelpCircle } from 'lucide-react';
import { DashboardHeader } from '../../shared';

const SubscriptionView = () => {
  const planFeatures = [
    'Unlimited Paystub Generation',
    'Unlimited W-2 Generation',
    'Unlimited 1099 Generation',
    'Access to All Supported Document Types',
  ];

  const metadataItems = [
    { label: 'Billing frequency', value: 'Monthly' },
    { label: 'Expiry Date', value: 'June 28, 2026' },
    { label: 'Next billing date', value: 'June 29, 2026' },
    { label: 'Payment method', value: 'Visa ending in 4821' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <DashboardHeader
        title="My Subscription"
        description="View your current subscription and unlimited access details."
      />

      {/* Navy Blue Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B254E] via-[#0E2D5E] to-[#12366F] text-white p-6 sm:p-8 lg:p-10 shadow-lg">
        {/* Subtle decorative curved highlight on right */}
        <div
          className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 rounded-l-full pointer-events-none blur-xl"
          aria-hidden="true"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Plan Details */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 text-[#009BFB]" />
              <span>CURRENT PLAN</span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Unlimited Access
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-md">
                Everything you need to create professional documents, without limits.
              </p>
            </div>

            <div className="pt-2">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  $199
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  /month
                </span>
              </div>

              <div className="mt-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Active</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Included With Your Plan */}
          <div className="lg:col-span-5 bg-white/5 backdrop-blur-xs rounded-2xl p-5 sm:p-6 border border-white/10">
            <h3 className="text-xs font-semibold text-slate-200 mb-3.5">
              Included with your plan
            </h3>
            <ul className="space-y-2.5">
              {planFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-[#009BFB]/20 text-[#009BFB] flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Metadata Bar */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-5 sm:p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metadataItems.map((item, idx) => (
            <div key={idx}>
              <span className="text-[11px] font-medium text-slate-400 block mb-1">
                {item.label}
              </span>
              <p className="font-bold text-xs sm:text-sm text-slate-900">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Secure Subscription Management Notice Box */}
      <div className="bg-[#F0F7FF] border border-sky-100/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <div className="w-5 h-5 text-[#009BFB] flex-shrink-0 mt-0.5">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-xs sm:text-sm text-slate-900">
            Secure subscription management
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            You'll be redirected to Stripe's secure customer portal to update payment details or manage your plan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionView;
