import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SpecialOfferSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.offer-card-box', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true,
        },
        y: 40,
        opacity: 0,
        scale: 0.98,
        duration: 0.85,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#EBF1F8] py-14 sm:py-18 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Prominent Elevated Offer Container */}
        <div className="offer-card-box max-w-4xl mx-auto bg-white rounded-[28px] p-8 sm:p-12 shadow-[0_12px_45px_rgba(0,0,0,0.06)] border border-slate-100/80">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="md:col-span-7 flex flex-col items-start">
              {/* Discount Tag */}
              <div className="bg-[#1d63ff] text-white text-[14px] font-bold tracking-wider px-3.5 py-1 rounded-full uppercase mb-4 shadow-xs">
                SAVE 35%
              </div>

              {/* Headline */}
              <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-900 tracking-tight leading-tight">
                Get More Paystubs. Save More.
              </h3>

              {/* Price Callout */}
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#1d63ff] tracking-tight">
                  $24.99
                </span>
                <span className="text-slate-800 font-bold text-base sm:text-lg">
                  for 3 Paystubs
                </span>
              </div>

              {/* Additional Cost Note */}
              <p className="text-slate-500 text-sm mt-1 mb-6 font-normal">
                Each additional paystub costs $7.99.
              </p>

              {/* CTA Button */}
              <a
                href="#get-3-paystubs"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-[#008be0] active:scale-[0.98] text-white font-semibold text-[15px] px-6 py-3.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <span>Get 3 Paystubs</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Right: Stacked Paystub Document Cards Preview */}
            <div className="md:col-span-5 flex items-center justify-center pt-4 md:pt-0">
              <div className="relative w-64 h-52 flex items-center justify-center">
                
                {/* 3rd Card in stack (backmost) */}
                <div 
                  className="absolute w-56 h-40 bg-white/60 border border-slate-200/60 rounded-2xl shadow-sm rotate-6 translate-x-3 translate-y-3 pointer-events-none"
                  aria-hidden="true"
                />

                {/* 2nd Card in stack (middle) */}
                <div 
                  className="absolute w-56 h-40 bg-white/80 border border-slate-200/80 rounded-2xl shadow-md rotate-3 translate-x-1.5 translate-y-1.5 pointer-events-none"
                  aria-hidden="true"
                />

                {/* 1st Card in stack (front active document) */}
                <div className="relative w-64 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-lg text-[14px]">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-[14px]">
                    <span className="text-secondary font-bold tracking-wider">
                      PAYSTUB #3
                    </span>
                    <span className="text-slate-700 font-semibold">
                      ACME LLC
                    </span>
                  </div>

                  {/* Earnings Breakdown */}
                  <div className="py-2.5 space-y-1.5 text-[14px]">
                    <div className="flex justify-between text-slate-500">
                      <span>Gross Pay</span>
                      <span className="font-semibold text-slate-800">$2,670.00</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Deductions</span>
                      <span className="font-semibold text-rose-500">-$497.96</span>
                    </div>
                  </div>

                  {/* Net Pay */}
                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[14px]">
                    <span className="font-bold text-slate-900">Net Pay</span>
                    <span className="font-bold text-[#1d63ff] text-base">
                      $2,172.04
                    </span>
                  </div>

                  {/* Bottom Accent Bar */}
                  <div className="mt-3 w-full h-1.5 bg-blue-100 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-secondary rounded-full"></div>
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
