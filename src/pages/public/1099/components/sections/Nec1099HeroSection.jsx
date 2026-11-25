import React, { useEffect, useRef } from 'react';
import { Check, Shield, FileText } from 'lucide-react';
import gsap from 'gsap';
import featureItems from '../../../data/tax1099/heroFeatures.json';

const Nec1099HeroSection = () => {
  const heroRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.6, clearProps: 'transform' }
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, clearProps: 'transform' },
          '-=0.35'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, clearProps: 'transform' },
          '-=0.4'
        )
        .fromTo(
          featuresRef.current?.children || [],
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            clearProps: 'transform',
          },
          '-=0.35'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const ICON_MAP = { Check, FileText, Shield };

  return (
    <section
      ref={heroRef}
      className="relative w-full bg-white pt-10 sm:pt-16 lg:pt-20 pb-10 sm:pb-16 lg:pb-24 overflow-hidden select-none"
    >
      <div
        className="absolute -bottom-16 sm:-bottom-20 -left-16 sm:-left-20 w-[240px] sm:w-[420px] md:w-[460px] h-[240px] sm:h-[420px] md:h-[460px] rounded-full bg-[#F1F7FF] pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div
        className="absolute -top-16 sm:-top-20 -right-16 sm:-right-20 w-[260px] sm:w-[460px] md:w-[500px] h-[260px] sm:h-[460px] md:h-[500px] rounded-full bg-[#F1F7FF] pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p
          ref={eyebrowRef}
          className="text-secondary font-bold text-[11px] sm:text-[14px] uppercase tracking-[0.14em] mb-2.5 sm:mb-4"
        >
          1099-NEC
        </p>

        <h1
          ref={headingRef}
          className="text-[1.65rem] leading-[1.2] sm:text-4xl md:text-[46px] lg:text-[48px] font-bold text-[#092258] tracking-tight sm:leading-[1.18] max-w-4xl mx-auto mb-3 sm:mb-5 px-1"
        >
          Create Your 1099-NEC FORM
        </h1>

        <p
          ref={subtitleRef}
          className="text-slate-500 text-[14px] sm:text-[16px] md:text-[17px] leading-relaxed font-normal max-w-2xl mx-auto mb-6 sm:mb-10 px-1"
        >
          Prepare your 1099-NEC Document by entering payer and recipient information
        </p>

        <div
          ref={featuresRef}
          className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 max-w-sm sm:max-w-none mx-auto"
        >
          {featureItems.map((item, idx) => {
            const IconComponent = ICON_MAP[item.iconKey];
            const iconClassName =
              item.iconKey === 'Check'
                ? 'w-4 h-4 text-secondary stroke-[2.5] shrink-0'
                : 'w-4 h-4 text-secondary stroke-[2] shrink-0';

            return (
              <div
                key={idx}
                className="inline-flex items-center justify-center sm:justify-start gap-2 sm:gap-2.5 px-3.5 sm:px-5 py-2.5 rounded-full bg-white border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-sm hover:border-secondary/40 transition-all duration-200 w-full sm:w-auto"
              >
                <IconComponent className={iconClassName} />
                <span className="text-[13.5px] sm:text-[14.5px] font-medium text-slate-700 text-left sm:whitespace-nowrap">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Nec1099HeroSection;
