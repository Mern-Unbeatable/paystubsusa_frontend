import React, { useEffect, useRef } from 'react';
import { Check, Shield, FileText } from 'lucide-react';
import gsap from 'gsap';

const DirectDepositHeroSection = () => {
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

  const featureItems = [
    {
      icon: <Check className="w-4 h-4 text-secondary stroke-[2.5]" />,
      text: 'Simple Form Process',
    },
    {
      icon: <Shield className="w-4 h-4 text-secondary stroke-[2]" />,
      text: 'Secure Checkout',
    },
    {
      icon: <FileText className="w-4 h-4 text-secondary stroke-[2]" />,
      text: 'PDF Document',
    },
  ];

  return (
    <section
      ref={heroRef}
      className="relative w-full bg-white pt-14 sm:pt-20 pb-16 sm:pb-24 overflow-hidden select-none"
    >
      {/* Decorative Background Shapes matching Figma */}
      {/* Left soft circle - anchored to bottom-left */}
      <div
        className="absolute -bottom-16 sm:-bottom-20 -left-16 sm:-left-20 w-[300px] sm:w-[420px] md:w-[460px] h-[300px] sm:h-[420px] md:h-[460px] rounded-full bg-[#F1F7FF] pointer-events-none -z-0"
        aria-hidden="true"
      />

      {/* Right soft circle - anchored to top-right */}
      <div
        className="absolute -top-16 sm:-top-20 -right-16 sm:-right-20 w-[340px] sm:w-[460px] md:w-[500px] h-[340px] sm:h-[460px] md:h-[500px] rounded-full bg-[#F1F7FF] pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow Tag */}
        <p
          ref={eyebrowRef}
          className="text-secondary font-bold text-[13px] sm:text-[14px] uppercase tracking-[0.14em] mb-3.5 sm:mb-4"
        >
          DIRECT DEPOSIT
        </p>

        {/* Main Headline matching Figma */}
        <h1
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-[46px] lg:text-[48px] font-bold text-[#092258] tracking-tight leading-[1.18] max-w-4xl mx-auto mb-4 sm:mb-5"
        >
          Create Your Direct Deposit Slip
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-slate-500 text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed font-normal max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          Generate a professional direct deposit slip using your payment and deposit information.
        </p>

        {/* 3 Features Row matching Figma */}
        <div
          ref={featuresRef}
          className="flex flex-wrap items-center justify-center gap-7 sm:gap-9"
        >
          {featureItems.map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 text-[14px] font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DirectDepositHeroSection;
