import React, { useEffect, useRef } from "react";
import { PenTool, Eye, Download, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import steps from "../../../data/home/howItWorksSteps.json";

gsap.registerPlugin(ScrollTrigger);

const HowItWorksSection = () => {
  const sectionRef = useRef(null);

  const ICON_MAP = { Download, Eye, PenTool };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".how-header", {
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
        ".how-step-card",
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "transform,opacity",
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-28"
    >
      {/* Subtle background pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="how-header mx-auto mb-14 max-w-2xl text-center sm:mb-18">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-3.5 py-1.5 text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
              Process
            </span>
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[44px]">
            How It{" "}
            <span className="relative inline-block">
              Works
              <svg
                className="absolute -bottom-1.5 left-0 w-full text-secondary/30"
                viewBox="0 0 120 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 9C30 3 60 3 118 8"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base font-normal leading-relaxed text-slate-600 sm:text-[17px]">
            Create your documents through a simple three-step process.
          </p>
        </div>

        {/* Steps Grid with Connecting Dashed Line */}
        <div className="relative">
          {/* Connecting line + arrows on desktop */}
          <div
            className="absolute inset-x-0 top-[92px] hidden md:flex items-center px-[16%] lg:px-[17%]"
            aria-hidden="true"
          >
            <div className="flex-1 border-t-2 border-dashed border-blue-200" />
            <ArrowRight className="mx-1 h-4 w-4 shrink-0 text-blue-200" />
            <div className="flex-1 border-t-2 border-dashed border-blue-200" />
            <ArrowRight className="mx-1 h-4 w-4 shrink-0 text-blue-200" />
            <div className="flex-1 border-t-2 border-dashed border-blue-200" />
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {steps.map((item, idx) => {
              const IconComp = ICON_MAP[item.iconKey];
              return (
                <div key={item.stepNumber} className="how-step-card h-full">
                  <div className="group relative flex h-full flex-col items-center rounded-[28px] border border-slate-100 bg-white p-8 text-center shadow-[0_4px_24px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-secondary/20 hover:shadow-[0_24px_50px_-24px_rgba(15,23,42,0.18)] sm:p-10">
                    {/* Step Number Badge */}
                    <div className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-secondary/20 bg-secondary/5 text-[12px] font-bold text-secondary">
                      {String(idx + 1).padStart(2, "0")}
                    </div>

                    {/* Icon Container */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 scale-110 rounded-3xl bg-secondary/10 blur-md transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e8f1ff] to-[#d6e6ff] text-secondary shadow-sm ring-1 ring-white/60 transition-transform duration-300 group-hover:scale-105">
                        <IconComp className="h-7 w-7 stroke-[2]" />
                      </div>
                    </div>

                    {/* Step Label */}
                    <span className="mb-2 text-[12px] font-bold uppercase tracking-[0.16em] text-secondary">
                      Step {idx + 1}
                    </span>

                    {/* Title */}
                    <h3 className="mb-3 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="max-w-xs text-sm font-normal leading-relaxed text-slate-500 sm:text-[15px]">
                      {item.description}
                    </p>

                    {/* Bottom accent on hover */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-8 bottom-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-secondary/50 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
