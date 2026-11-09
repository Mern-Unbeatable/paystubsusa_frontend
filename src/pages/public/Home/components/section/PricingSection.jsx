import React, { useEffect, useRef } from "react";
import { CheckCircle2, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import gsap from "gsap";
import { PATHS } from "../../../../../config/paths";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import oneTimeItems from "../../../data/home/pricingOneTimeItems.json";
import subscriptionFeatures from "../../../data/home/pricingSubscriptionFeatures.json";

gsap.registerPlugin(ScrollTrigger);

const PricingSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pricing-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
      });

      gsap.fromTo(
        ".pricing-card",
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
          y: 0,
          opacity: 1,
          stagger: 0.16,
          duration: 0.85,
          ease: "power3.out",
          clearProps: "transform,opacity",
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-28"
    >
      {/* Ambient accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-[380px] w-[380px] rounded-full bg-secondary/[0.07] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-blue-300/10 blur-3xl"
      />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pricing-header mx-auto mb-14 max-w-2xl text-center sm:mb-18">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-3.5 py-1.5 text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
              Pricing
            </span>
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[44px]">
            Simple Pricing for{" "}
            <span className="bg-gradient-to-r from-secondary to-blue-400 bg-clip-text text-transparent">
              Every Need
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base font-normal leading-relaxed text-slate-600 sm:text-[17px]">
            Choose between a one-time purchase or unlimited monthly access.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* ── Card 1: One-Time Purchase ── */}
          <div className="pricing-card lg:col-span-7">
            <div className="group relative flex h-full flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-8 shadow-[0_4px_24px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_50px_-24px_rgba(15,23,42,0.16)] sm:p-10">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                    One-Time Purchase
                  </h3>
                </div>
                <p className="mb-8 text-sm font-normal text-slate-500">
                  Pay only for what you need — no commitment.
                </p>

                {/* Price rows */}
                <div className="overflow-hidden rounded-2xl border border-slate-100">
                  {oneTimeItems.map((item, i) => (
                    <div
                      key={item.name}
                      className={`flex items-center justify-between px-4 py-3.5 text-sm transition-colors duration-150 hover:bg-slate-50 sm:text-[15px] ${
                        i !== oneTimeItems.length - 1
                          ? "border-b border-slate-100"
                          : ""
                      }`}
                    >
                      <span className="font-medium text-slate-700">
                        {item.name}
                      </span>
                      <span className="font-bold tracking-tight text-slate-900">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8">
                <Link
                  to={PATHS.PUBLIC.paystubGenerator}
                  className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-xl border border-secondary bg-white px-6 py-3.5 text-[15px] font-semibold text-secondary transition-all duration-200 hover:bg-secondary/5 active:scale-[0.99]"
                >
                  <span>Generate Paystub</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* ── Card 2: Featured Subscription ── */}
          <div className="pricing-card lg:col-span-5">
            {/* Gradient border wrapper */}
            <div className="h-full rounded-3xl bg-gradient-to-b from-secondary to-blue-400 p-px shadow-[0_20px_50px_-24px_rgba(0,155,251,0.45)]">
              <div className="relative flex h-full flex-col justify-between rounded-[23px] bg-white p-8 sm:p-10">
                {/* Best value badge */}
                <div className="absolute -top-3.5 right-8 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3.5 py-1 text-[12px] font-semibold text-white shadow-md shadow-secondary/30">
                  <Sparkles className="h-3.5 w-3.5" />
                  Best Value
                </div>

                <div className="relative">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                    Unlimited Monthly Subscription
                  </h3>
                  <p className="mt-1 text-sm font-normal text-slate-500">
                    Unlimited documents, one flat price.
                  </p>

                  {/* Price */}
                  <div className="mt-5 mb-6 flex items-baseline gap-1.5">
                    <span className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                      $199
                    </span>
                    <span className="text-sm font-medium text-slate-500">
                      / month
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="mb-6 h-px w-full bg-gradient-to-r from-secondary/30 via-slate-200 to-transparent" />

                  {/* Feature list */}
                  <div className="mb-8 space-y-3.5">
                    {subscriptionFeatures.map((feat) => (
                      <div key={feat} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary" />
                        <span className="text-sm leading-snug text-slate-600 sm:text-[15px]">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="relative mt-2">
                  <Link
                    to={PATHS.PUBLIC.paystubGenerator}
                    className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-6 py-3.5 text-[15px] font-semibold text-white shadow-md shadow-secondary/25 transition-all duration-200 hover:bg-[#0089e0] hover:shadow-lg hover:shadow-secondary/30 active:scale-[0.99]"
                  >
                    <span>Get Unlimited Access</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </Link>
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-[12px] text-slate-500">
                    <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
                    Cancel anytime · No hidden fees
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
