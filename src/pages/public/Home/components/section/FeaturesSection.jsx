import React, { useEffect, useRef } from "react";
import {
  Pencil,
  Layers,
  Download,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import features from "../../../data/home/features.json";

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {
  const sectionRef = useRef(null);

  const ICON_MAP = { Download, Layers, Pencil, ShieldCheck };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".features-left",
        { y: 35, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "transform",
        },
      );

      gsap.fromTo(
        ".feature-card-item",
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.75,
          ease: "power3.out",
          clearProps: "transform",
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden border-b border-slate-100 bg-white py-16 sm:py-20 lg:py-28"
    >
      {/* Faint background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 h-[420px] w-[420px] rounded-full bg-secondary/[0.06] blur-3xl"
      />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ── Left Column ── */}
          <div className="features-left flex flex-col items-start lg:col-span-5 lg:sticky lg:top-24">
            {/* Eyebrow */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-3.5 py-1.5 text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                Features
              </span>
            </div>

            {/* Headline */}
            <h2 className="mb-5 text-3xl font-bold leading-[1.14] tracking-tight text-slate-900 sm:text-4xl lg:text-[42px] xl:text-[46px]">
              Everything You Need{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10">in One</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-1 z-0 h-3 rounded-sm bg-secondary/15"
                />
              </span>{" "}
              Platform
            </h2>

            {/* Description */}
            <p className="mb-8 max-w-md text-base font-normal leading-relaxed text-slate-600 sm:text-[17px]">
              Create essential employment and income documents with a
              straightforward online experience.
            </p>

            {/* CTA */}
            <a
              href="#documents"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm shadow-secondary/25 transition-all duration-200 hover:bg-[#008be0] hover:shadow-lg hover:shadow-secondary/30 active:scale-[0.98]"
            >
              <span>View All Documents</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            {/* Trust micro-line */}
            <div className="mt-6 inline-flex items-center gap-2 text-[13px] text-slate-500">
              <Sparkles className="h-3.5 w-3.5 text-secondary" />
              <span>Trusted by thousands of users across the US</span>
            </div>
          </div>

          {/* ── Right Column: 2x2 Cards ── */}
          <div className="pt-2 lg:col-span-7">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
              {features.map((feature) => {
                const IconComponent = ICON_MAP[feature.iconKey];
                return (
                  <div
                    key={feature.title}
                    className="feature-card-item group relative flex flex-col items-start overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 text-left shadow-[0_4px_24px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-secondary/20 hover:shadow-[0_24px_50px_-24px_rgba(15,23,42,0.16)]"
                  >
                    {/* Icon Tile */}
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#e8f1ff] to-[#d6e6ff] text-secondary ring-1 ring-white/60 transition-transform duration-300 group-hover:scale-105">
                      <IconComponent className="h-5.5 w-5.5 stroke-[2]" />
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 text-lg font-bold tracking-tight text-slate-900">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm font-normal leading-relaxed text-slate-500 sm:text-[14.5px]">
                      {feature.description}
                    </p>

                    {/* Hover accent */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-secondary/70 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
