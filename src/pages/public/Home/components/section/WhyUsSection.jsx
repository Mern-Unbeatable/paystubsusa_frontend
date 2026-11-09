import React, { useEffect, useRef } from "react";
import { User, Sparkles, Layers, Folder } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import points from "../../../data/home/whyUsPoints.json";

gsap.registerPlugin(ScrollTrigger);

const WhyUsSection = () => {
  const sectionRef = useRef(null);

  const ICON_MAP = { Folder, Layers, Sparkles, User };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".why-header", {
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
        ".why-point-item",
        { y: 28, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
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
      className="relative w-full overflow-hidden bg-primary py-16 sm:py-20 lg:py-28"
    >
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="why-header mx-auto mb-14 max-w-2xl text-center sm:mb-18">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-secondary backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 stroke-[2.5]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
              Why Us
            </span>
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[44px]">
            Why Choose Paystubs USA
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base font-normal leading-relaxed text-blue-100/75 sm:text-[17px]">
            We're not just a tool—we're your trusted partner in payroll
            compliance. Our platform is designed to make generating accurate pay
            stubs easy, so you can focus on what matters most: growing your
            business.
          </p>
        </div>

        {/* Points Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {points.map((pt) => {
            const IconComponent = ICON_MAP[pt.iconKey];
            return (
              <div key={pt.title} className="why-point-item h-full">
                <div className="group relative flex h-full flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:bg-white/[0.07] hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.55)]">
                  {/* Top accent line on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-secondary/70 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                  />

                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-gradient-to-br from-white/15 to-white/[0.03] text-secondary shadow-inner transition-transform duration-300 group-hover:scale-105">
                    <IconComponent className="h-5 w-5 stroke-[2]" />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-white sm:text-base">
                      {pt.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-blue-100/65 sm:text-sm">
                      {pt.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
