import React, { useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router";
import { PATHS } from "../../../../../config/paths";

gsap.registerPlugin(ScrollTrigger);

const SpecialOfferSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".offer-card-box", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          once: true,
        },
        y: 40,
        opacity: 0,
        scale: 0.98,
        duration: 0.85,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-8 sm:py-10 lg:py-12"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prominent Elevated Offer Container */}
        <div className="offer-card-box relative overflow-hidden bg-primary rounded-2xl sm:rounded-[28px] p-5 pt-12 sm:p-12 sm:pt-14 shadow-sm border border-slate-100/80">
          {/* Top-left diagonal ribbon */}
          <div
            className="pointer-events-none absolute -left-[3.5rem] top-5 sm:-left-[3.25rem] sm:top-6 z-20 w-[11rem] sm:w-[11.5rem] -rotate-45 bg-secondary py-1.5 sm:py-2 text-center shadow-[0_2px_8px_rgba(29,99,255,0.35)]"
            aria-label="Save 35 percent"
          >
            <span className="block text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.16em] text-white">
              35% Save
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center">
            {/* Left Content */}
            <div className="md:col-span-7 flex flex-col items-start">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-[#ffffff] bg-slate-400 px-3 py-1 rounded-full mb-3 sm:mb-4">
                <Sparkles className="w-3 h-3" />
                Special Offer
              </span>

              <h3 className="text-[1.5rem] sm:text-3xl lg:text-[34px] font-bold text-slate-400 tracking-tight leading-tight">
                Get More Paystubs & Save More.
              </h3>

              <div className="mt-2 sm:mt-3 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3 sm:gap-y-2">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#f6f6fa] tracking-tight">
                    $24.99
                  </span>
                  <span className="text-slate-400 line-through text-lg font-semibold">
                    $38.37
                  </span>
                </div>
                <span className="text-slate-200 font-bold text-base sm:text-lg">
                  for 3 Paystubs
                </span>
              </div>

              <p className="text-slate-500 text-sm mt-2 mb-4 sm:mb-6 font-normal">
                Each additional paystub costs $7.99.
              </p>

              <Link
                to={PATHS.PUBLIC.paystubGenerator}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-secondary hover:bg-[#008be0] active:scale-[0.98] text-white font-semibold text-[15px] px-6 py-3.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <span>Get 3 Paystubs</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Right: Stacked Paystub Document Cards Preview (desktop+) */}
            <div className="hidden md:col-span-5 md:flex items-center justify-center">
              <div className="relative w-full max-w-[18rem] h-60 flex items-center justify-center mx-auto">
                {/* 3rd Card (backmost) — softest, most rotated */}
                <div
                  className="absolute w-60 h-44 bg-gradient-to-br from-white/70 to-slate-50/60 border border-slate-200/50 rounded-2xl shadow-sm rotate-[7deg] translate-x-4 translate-y-4 pointer-events-none backdrop-blur-[2px]"
                  aria-hidden="true"
                />

                {/* 2nd Card (middle) — intermediate depth */}
                <div
                  className="absolute w-60 h-44 bg-gradient-to-br from-white/90 to-slate-50/80 border border-slate-200/70 rounded-2xl shadow-md rotate-[3.5deg] translate-x-2 translate-y-2 pointer-events-none backdrop-blur-[1.5px]"
                  aria-hidden="true"
                />

                {/* 1st Card (front active document) — polished hero card */}
                <div className="group relative w-full max-w-[18rem] bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xl shadow-slate-200/40 text-[14px] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-slate-300/50">
                  {/* Status dot — live indicator */}
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white shadow-sm" />
                  </span>

                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-[11px] font-bold tracking-wider text-[#3d40ff] bg-[#3d40ff]/10 px-2.5 py-1 rounded-full uppercase">
                      Paystub #3
                    </span>
                    <span className="text-slate-700 font-semibold text-sm tracking-tight">
                      ACME LLC
                    </span>
                  </div>

                  {/* Earnings Breakdown */}
                  <div className="py-3 space-y-2">
                    <div className="flex justify-between items-center text-slate-500">
                      <span className="text-sm">Gross Pay</span>
                      <span className="font-semibold text-slate-800 text-sm tabular-nums">
                        $2,670.00
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-slate-500">
                      <span className="text-sm">Deductions</span>
                      <span className="font-semibold text-rose-500 text-sm tabular-nums">
                        −$497.96
                      </span>
                    </div>
                  </div>

                  {/* Net Pay — emphasized */}
                  <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                    <span className="font-bold text-slate-900 text-sm">
                      Net Pay
                    </span>
                    <span className="font-bold text-[#1d63ff] text-lg tabular-nums tracking-tight">
                      $2,172.04
                    </span>
                  </div>

                  {/* Bottom Accent Bar — gradient + hover grow */}
                  <div className="mt-4 w-full h-2 bg-blue-100 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full rounded-full bg-gradient-to-r from-[#1d63ff] to-blue-400 shadow-sm shadow-blue-200 transition-all duration-300 group-hover:w-[72%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOfferSection;
