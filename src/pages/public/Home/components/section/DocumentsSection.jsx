import React, { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mockPreviewRows from "../../../data/home/mockPreviewRows.json";

gsap.registerPlugin(ScrollTrigger);

const DocumentsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".docs-header",
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          clearProps: "transform",
        },
      );

      gsap.fromTo(
        ".docs-featured-card",
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          clearProps: "transform",
        },
      );

      gsap.fromTo(
        ".docs-subcard",
        { y: 35, opacity: 0 },
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
          clearProps: "transform",
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#EBF1F8] py-16 sm:py-20 lg:py-28"
    >
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="docs-header mx-auto mb-14 max-w-2xl text-center sm:mb-18">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-white px-3.5 py-1.5 text-secondary shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
              Documents
            </span>
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[44px]">
            Solutions for{" "}
            <span className="bg-gradient-to-r from-secondary to-blue-400 bg-clip-text text-transparent">
              Every Need
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base font-normal leading-relaxed text-slate-600 sm:text-[17px]">
            Choose the document you need and get started in just a few simple
            steps.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          {/* ── Left: Featured Paystub Card ── */}
          <div className="docs-featured-card group relative flex flex-col justify-between overflow-hidden rounded-[30px] border border-primary/20 bg-gradient-to-b from-primary to-[#0b2a5c] p-6 text-white shadow-[0_24px_60px_-30px_rgba(2,20,50,0.6)] sm:p-7 lg:col-span-5">
            {/* Decorative top-right glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-secondary/30 blur-3xl"
            />

            <div className="relative">
              {/* Badges */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/20 px-3 py-1 text-[12px] font-semibold text-secondary ring-1 ring-secondary/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                  Most Popular
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[12px] font-medium text-blue-100 ring-1 ring-white/15">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Instantly Downloadable
                </span>
              </div>

              {/* Title & Price */}
              <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Paystub Generator
              </h3>
              <p className="mt-1 mb-5 text-[14px] font-medium text-blue-100">
                Starting at{" "}
                <span className="font-semibold text-white">$12.99</span>
              </p>

              {/* Mock Paystub Preview */}
              <div className="rounded-2xl border border-white/60 bg-white p-5 text-slate-800 shadow-xl ring-1 ring-black/5 sm:p-6">
                {/* Statement Header */}
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-secondary">
                      Earnings Statement
                    </span>
                    <h4 className="mt-0.5 text-sm font-bold text-slate-900">
                      Acme Logistics LLC
                    </h4>
                    <p className="text-[12.5px] text-slate-500">
                      1200 Market St, Austin, TX 78701
                    </p>
                  </div>
                  <div className="space-y-0.5 text-right text-[12px] text-slate-500">
                    <p className="text-[11px] uppercase tracking-wide text-slate-400">
                      Pay Period
                    </p>
                    <p className="font-medium text-slate-700">
                      09/01/2026 – 09/15/2026
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Pay Date:{" "}
                      <span className="font-medium text-slate-600">
                        09/16/2026
                      </span>
                    </p>
                  </div>
                </div>

                {/* Employee / Employer */}
                <div className="grid grid-cols-2 gap-4 border-b border-slate-100 py-3 text-[12.5px]">
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Employee
                    </span>
                    <p className="mt-0.5 font-semibold text-slate-800">
                      Jordan Smith
                    </p>
                    <p className="text-[12px] text-slate-500">
                      SSN: XXX-XX-4821
                    </p>
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Employer
                    </span>
                    <p className="mt-0.5 text-[12px] text-slate-600">
                      EIN: 74-XXXX392
                    </p>
                    <p className="text-[12px] text-slate-500">
                      Employee ID: 00418
                    </p>
                  </div>
                </div>

                {/* Gross / Deductions */}
                <div className="grid grid-cols-2 gap-4 border-b border-slate-100 py-3 text-[12.5px]">
                  <div>
                    <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Gross Earnings
                    </span>
                    <div className="flex justify-between py-0.5 text-slate-600">
                      <span>Regular (80 hrs)</span>
                      <span className="font-medium text-slate-800">
                        $2,400.00
                      </span>
                    </div>
                    <div className="flex justify-between py-0.5 text-slate-600">
                      <span>Overtime (4 hrs)</span>
                      <span className="font-medium text-slate-800">
                        $270.00
                      </span>
                    </div>
                    <div className="mt-1 flex justify-between border-t border-slate-100 pt-1.5 font-bold text-slate-900">
                      <span>Total Gross</span>
                      <span>$2,670.00</span>
                    </div>
                  </div>
                  <div>
                    <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Tax Deductions
                    </span>
                    {[
                      ["Federal Tax", "$293.70"],
                      ["Social Security", "$165.54"],
                      ["Medicare", "$38.72"],
                      ["State Tax", "$0.00"],
                    ].map(([label, val]) => (
                      <div
                        key={label}
                        className="flex justify-between py-0.5 text-slate-600"
                      >
                        <span>{label}</span>
                        <span className="font-medium text-slate-800">
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Net Pay */}
                <div className="mt-3.5 flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-50 to-[#eff6ff] px-4 py-3 ring-1 ring-blue-100">
                  <span className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-700">
                    <Check className="h-4 w-4 text-secondary" />
                    Net Pay
                  </span>
                  <span className="text-lg font-bold text-secondary sm:text-xl">
                    $2,172.04
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="relative mt-6">
              <button
                type="button"
                className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-[14px] font-semibold text-[#1d63ff] shadow-lg shadow-black/10 transition-all duration-200 hover:bg-slate-50 hover:shadow-black/20 sm:w-auto"
              >
                <span>Create Paystub</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </button>
              <p className="mt-3 text-[12px] text-blue-100/70">
                No sign-up required · Ready in minutes
              </p>
            </div>
          </div>

          {/* ── Right: Sub Cards ── */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            {/* Top Row: W-2 & 1099 */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                {
                  key: "w2",
                  title: "W-2 Generator",
                  price: "$14.99",
                  tag: "Wage & Tax",
                  form: "W-2",
                  cta: "Create W-2",
                  href: "#w2",
                },
                {
                  key: "1099",
                  title: "1099 Generator",
                  price: "$14.99",
                  tag: "Nonemployee",
                  form: "1099-NEC",
                  cta: "Create 1099",
                  href: "#1099",
                },
              ].map((card) => (
                <div
                  key={card.key}
                  className="docs-subcard group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-100/80 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-secondary/20 hover:shadow-[0_24px_50px_-24px_rgba(15,23,42,0.18)]"
                >
                  <div>
                    {/* Mock Preview */}
                    <div className="mb-5 rounded-2xl border border-slate-100 bg-[#fafcff] p-4">
                      <div className="mb-3 flex items-center justify-between text-[10px] font-bold">
                        <span className="uppercase tracking-wider text-secondary">
                          {card.tag}
                        </span>
                        <span className="rounded bg-white px-1.5 py-0.5 text-slate-800 ring-1 ring-slate-200">
                          {card.form}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2.5">
                        {mockPreviewRows.map((i) => (
                          <div
                            key={`${card.key}-l-${i}`}
                            className="flex h-9 flex-col justify-center rounded-lg border border-slate-100 bg-white p-2"
                          >
                            <div className="mb-1 h-1.5 w-12 rounded-full bg-blue-100" />
                            <div className="h-1.5 w-8 rounded-full bg-slate-100" />
                          </div>
                        ))}
                        {mockPreviewRows.map((i) => (
                          <div
                            key={`${card.key}-r-${i}`}
                            className="flex h-9 flex-col justify-center rounded-lg border border-slate-100 bg-white p-2"
                          >
                            <div className="mb-1 h-1.5 w-14 rounded-full bg-blue-100" />
                            <div className="h-1.5 w-6 rounded-full bg-slate-100" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900">
                      {card.title}
                    </h4>
                    <p className="mt-0.5 text-[14px] text-slate-500">
                      {card.price}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <a
                      href={card.href}
                      className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-secondary hover:underline"
                    >
                      <span>{card.cta}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>

                  {/* Hover accent */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-secondary/70 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                  />
                </div>
              ))}
            </div>

            {/* Bottom Row: Direct Deposit (Wide) */}
            <div className="docs-subcard group relative flex flex-col overflow-hidden rounded-3xl border border-slate-100/80 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-secondary/20 hover:shadow-[0_24px_50px_-24px_rgba(15,23,42,0.18)]">
              {/* Mock Preview */}
              <div className="mb-5 rounded-2xl border border-slate-100 bg-[#fafcff] p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                    Direct Deposit
                  </span>
                  <span className="rounded bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-800 ring-1 ring-slate-200">
                    Authorization
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    ["Bank", "First National"],
                    ["Routing", "•••• 0210"],
                    ["Account", "•••• 8841"],
                  ].map(([label, val]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-slate-100 bg-white p-3"
                    >
                      <span className="block text-[12px] text-slate-400">
                        {label}
                      </span>
                      <span className="mt-0.5 block text-[14px] font-semibold text-slate-800 sm:text-base">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-1">
                <h4 className="text-lg font-bold text-slate-900">
                  Direct Deposit Slip
                </h4>
                <a
                  href="#direct-deposit"
                  className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-secondary hover:underline"
                >
                  <span>Create Slip</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              {/* Hover accent */}
              <span
                aria-hidden="true"
                className="absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-secondary/70 to-transparent transition-transform duration-500 group-hover:scale-x-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentsSection;
