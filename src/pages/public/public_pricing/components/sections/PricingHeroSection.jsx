import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const PricingHeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', clearProps: 'transform' }
      );
    }
  }, []);

  return (
    <section className="relative w-full bg-white pt-14 sm:pt-20 pb-12 sm:pb-16 overflow-hidden select-none">
      {/* Decorative Pastel Background Balls matching Design System */}
      <div
        className="absolute -bottom-16 sm:-bottom-20 -left-16 sm:-left-20 w-[300px] sm:w-[420px] md:w-[460px] h-[300px] sm:h-[420px] md:h-[460px] rounded-full bg-[#F1F7FF] pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div
        className="absolute -top-16 sm:-top-20 -right-16 sm:-right-20 w-[340px] sm:w-[460px] md:w-[500px] h-[340px] sm:h-[460px] md:h-[500px] rounded-full bg-[#F1F7FF] pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Category Pill Tag */}
        <span className="inline-block text-xs sm:text-sm font-bold tracking-[0.2em] text-secondary uppercase mb-3.5">
          CLEAR, FLEXIBLE PRICING
        </span>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-slate-900 tracking-tight leading-[1.18] text-center">
          Simple Pricing.
          <br />
          Choose what works for you
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto text-center leading-relaxed font-normal">
          Pay only for the documents you need, or get unlimited access with a monthly subscription.
        </p>
      </div>
    </section>
  );
};

export default PricingHeroSection;
