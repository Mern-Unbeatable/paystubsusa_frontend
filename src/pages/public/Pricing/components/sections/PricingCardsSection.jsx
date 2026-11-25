import React from "react";
import { Link } from "react-router";
import { AlertCircle, Check, ChevronRight, RotateCw } from "lucide-react";
import monthlyFeatures from "../../../data/pricing/monthlyFeatures.json";
import { usePricingCatalog } from "../../hooks/usePricingCatalog";

const Skeleton = ({ className }) => <span className={`block animate-pulse rounded-lg bg-slate-200/80 ${className}`} />;

const PriceCard = ({ card }) => (
  <div
    className={
      card.isPopular
        ? "relative bg-white rounded-2xl border-2 border-secondary shadow-[0_4px_20px_rgba(0,155,251,0.12)] p-5 sm:p-7 flex flex-col justify-between"
        : "bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow p-5 sm:p-7 flex flex-col justify-between"
    }
  >
    {card.isPopular && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-0.5 rounded-full shadow-xs whitespace-nowrap">
        MOST POPULAR
      </div>
    )}

    <div>
      <h3 className="text-base font-semibold text-slate-800">{card.name}</h3>
      <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-3 sm:mb-4 tracking-tight">
        {card.price}
      </div>
      <div className="flex items-center gap-2 text-sm text-slate-600 mb-5 sm:mb-6">
        <Check className="w-4 h-4 text-secondary flex-shrink-0 stroke-[2.5]" />
        <span>{card.feature}</span>
      </div>
    </div>

    <Link
      to={card.btnLink}
      className={
        card.isPopular
          ? "w-full inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-secondary hover:bg-[#0089e0] text-white font-semibold text-sm transition-all shadow-sm hover:shadow transform hover:-translate-y-0.5 active:translate-y-0"
          : "w-full inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-white border border-slate-200 hover:border-secondary hover:text-secondary text-slate-700 font-semibold text-sm transition-all hover:bg-slate-50"
      }
    >
      <span>{card.btnText}</span>
      <ChevronRight className="w-4 h-4" />
    </Link>
  </div>
);

const CardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 space-y-4" aria-hidden="true">
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-9 w-24" />
    <Skeleton className="h-4 w-48" />
    <Skeleton className="h-11 w-full rounded-xl" />
  </div>
);

const LoadError = ({ message, onRetry }) => (
  <div
    role="alert"
    className="flex flex-col sm:flex-row items-center justify-center gap-3 rounded-2xl border border-rose-100 bg-rose-50 px-5 sm:px-6 py-6 sm:py-8 text-center text-sm text-rose-700"
  >
    <AlertCircle className="w-5 h-5 flex-shrink-0" />
    <span>{message}</span>
    <button
      type="button"
      onClick={onRetry}
      className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-white px-3 py-1.5 font-semibold text-rose-700 transition hover:bg-rose-100 cursor-pointer"
    >
      <RotateCw className="w-3.5 h-3.5" />
      Try again
    </button>
  </div>
);

const PricingCardsSection = ({ billingType, onBillingChange }) => {
  const { cards, pack, addonPrice, unlimited, loading, error, retry } = usePricingCatalog();
  const showSubscriptionTab = Boolean(unlimited);
  const showMonthly = billingType === "monthly" && showSubscriptionTab;

  return (
    <section className="w-full bg-[#F7FAFF] pt-2 pb-16 sm:pb-20 lg:pb-24 border-t border-slate-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-7 sm:space-y-10 lg:space-y-12">
        {/* Top Dark Navy Special Offer Banner */}
        {pack && (
          <div className="w-full bg-[#172E57] rounded-2xl p-5 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 relative overflow-hidden shadow-md">
            <div className="flex items-start sm:items-center gap-4 sm:gap-6 z-10 min-w-0">
              {pack.badge && (
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center px-1.5 text-white font-extrabold text-[11px] sm:text-[13px] text-center leading-tight shadow-md uppercase">
                  {pack.badge}
                </div>
              )}

              <div className="min-w-0">
                <span className="block text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-widest mb-0.5">
                  BEST VALUE
                </span>
                <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  Get {pack.quantity} Paystubs for {pack.price}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  {pack.quantity} professional paystubs.
                  {addonPrice && ` Each additional paystub costs ${addonPrice}.`}
                </p>
              </div>
            </div>

            <div className="z-10 flex-shrink-0 w-full md:w-auto">
              <Link
                to="/paystub-generator"
                className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl bg-secondary hover:bg-[#0089e0] text-white font-semibold text-sm sm:text-[15px] transition-all shadow-sm hover:shadow transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Get {pack.quantity} Paystubs</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Hide Monthly Subscription tab when Unlimited product is globally inactive. */}
        {showSubscriptionTab && (
          <div className="flex justify-center px-0">
            <div className="bg-[#EAF2FA] p-1 sm:p-1.5 rounded-xl flex w-full max-w-md sm:w-auto sm:inline-flex gap-1 border border-slate-200/60 shadow-xs">
              <button
                type="button"
                onClick={() => onBillingChange("one-time")}
                className={`flex-1 sm:flex-none px-3 sm:px-8 py-2.5 rounded-lg text-[13px] sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  !showMonthly ? "bg-white text-secondary shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                One-Time Purchase
              </button>
              <button
                type="button"
                onClick={() => onBillingChange("monthly")}
                className={`flex-1 sm:flex-none px-3 sm:px-8 py-2.5 rounded-lg text-[13px] sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  showMonthly ? "bg-white text-secondary shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Monthly Subscription
              </button>
            </div>
          </div>
        )}

        {error ? (
          <LoadError message={error} onRetry={retry} />
        ) : showMonthly ? (
          <div className="w-full bg-[#172E57] rounded-2xl p-5 sm:p-8 lg:p-12 relative overflow-hidden text-white shadow-xl">
            <div
              className="absolute -top-32 -right-32 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#1E3A6E] opacity-50 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-3xl">
              <span className="text-xs font-bold tracking-widest text-secondary uppercase block mb-3">UNLIMITED ACCESS</span>

              <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                Everything you need.
                <br />
                One simple plan.
              </h3>

              <div className="mt-4 mb-5 sm:mb-6 flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{unlimited.price}</span>
                <span className="text-slate-300 text-base font-normal">/ {unlimited.interval}</span>
              </div>

              <div className="h-px bg-slate-700/60 max-w-xl my-5 sm:my-6" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-sm sm:text-base text-slate-200 mb-6 sm:mb-8">
                {monthlyFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-secondary flex-shrink-0 stroke-[2.5]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <Link
                  to="/customer/subscription"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-secondary hover:bg-[#0089e0] text-white font-semibold text-sm sm:text-base transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Get Unlimited Access</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <span className="text-xs sm:text-sm text-slate-300 text-center sm:text-left">Cancel anytime • Secure checkout</span>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7 items-stretch"
            aria-busy={loading}
          >
            {loading
              ? Array.from({ length: 6 }, (_, i) => <CardSkeleton key={i} />)
              : cards.map((card) => <PriceCard key={card.id} card={card} />)}

            {!loading && addonPrice && (
              <div className="bg-[#EEF6FF] rounded-2xl border border-blue-100 p-5 sm:p-7 flex flex-col justify-center">
                <span className="text-sm font-semibold text-secondary">Need more paystubs?</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-2 tracking-tight">{addonPrice}</div>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  per additional paystub{pack ? ` after the first ${pack.quantity === 3 ? "three" : pack.quantity}` : ""}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingCardsSection;
