import React, { useEffect, useRef } from "react";
import { UserPlus, Zap, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import badgeItems from "../../../data/generator/heroBadges.json";

const GeneratorHeroSection = () => {
  const heroRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.6, clearProps: "transform" },
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, clearProps: "transform" },
          "-=0.35",
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, clearProps: "transform" },
          "-=0.4",
        )
        .fromTo(
          badgesRef.current?.children || [],
          { opacity: 0, y: 16, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            clearProps: "transform",
          },
          "-=0.35",
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const ICON_MAP = { ShieldCheck, UserPlus, Zap };

  return (
    <section
      ref={heroRef}
      className="relative w-full bg-white pt-10 xs:pt-12 sm:pt-16 md:pt-20 pb-12 xs:pb-14 sm:pb-20 md:pb-24 overflow-hidden select-none"
    >
      {/* Decorative Background Shapes matching Figma */}
      {/* Left soft circle - anchored to bottom-left */}
      <div
        className="absolute -bottom-12 xs:-bottom-16 sm:-bottom-20 -left-12 xs:-left-16 sm:-left-20 w-[200px] xs:w-[260px] sm:w-[360px] md:w-[420px] lg:w-[460px] h-[200px] xs:h-[260px] sm:h-[360px] md:h-[420px] lg:h-[460px] rounded-full bg-[#F1F7FF] pointer-events-none -z-0"
        aria-hidden="true"
      />

      {/* Right soft circle - anchored to top-right */}
      <div
        className="absolute -top-12 xs:-top-16 sm:-top-20 -right-12 xs:-right-16 sm:-right-20 w-[220px] xs:w-[280px] sm:w-[380px] md:w-[440px] lg:w-[500px] h-[220px] xs:h-[280px] sm:h-[380px] md:h-[440px] lg:h-[500px] rounded-full bg-[#F1F7FF] pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-6 xl:px-8 text-center">
        {/* Eyebrow Tag */}
        <p
          ref={eyebrowRef}
          className="text-secondary font-bold text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] uppercase tracking-[0.12em] sm:tracking-[0.14em] mb-3 sm:mb-4"
        >
          PAYSTUB GENERATOR
        </p>

        {/* Main Headline */}
        <h1
          ref={headingRef}
          className="text-[22px] xs:text-[26px] sm:text-[32px] md:text-[40px] lg:text-[46px] xl:text-[50px] font-bold text-[#092258] tracking-tight leading-[1.2] sm:leading-[1.18] max-w-4xl mx-auto mb-3.5 sm:mb-5 px-1 sm:px-0"
        >
          Create Your Professional Paystub
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-slate-500 text-[13.5px] xs:text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] leading-relaxed font-normal max-w-2xl mx-auto mb-6 xs:mb-7 sm:mb-9 md:mb-10 px-1 sm:px-0"
        >
          Choose a template and enter your information to generate a
          professional paystub in a few simple steps.
        </p>

        {/* 3 Badges / Pills */}
        <div
          ref={badgesRef}
          className="flex flex-wrap items-center justify-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-4"
        >
          {badgeItems.map((badge, idx) => {
            const IconComponent = ICON_MAP[badge.iconKey];
            const iconClassName =
              badge.iconKey === "Zap"
                ? "w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary stroke-[2.2] fill-secondary/20 shrink-0"
                : "w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary stroke-[2.2] shrink-0";

            return (
              <div
                key={idx}
                className="inline-flex items-center gap-2 sm:gap-2.5 px-3 xs:px-3.5 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full bg-white border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-sm hover:border-secondary/40 transition-all duration-200"
              >
                <IconComponent className={iconClassName} />
                <span className="text-[12.5px] xs:text-[13px] sm:text-[14px] md:text-[14.5px] font-medium text-slate-700 whitespace-nowrap">
                  {badge.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GeneratorHeroSection;
