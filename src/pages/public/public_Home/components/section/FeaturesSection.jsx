import React, { useEffect, useRef } from 'react';
import { Pencil, Layers, Download, ShieldCheck, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {
  const sectionRef = useRef(null);

  const features = [
    {
      icon: Pencil,
      title: 'Easy Document Creation',
      description: 'Fill in a guided form and watch your document take shape in real time.',
    },
    {
      icon: Layers,
      title: 'Multiple Document Types',
      description: 'Paystubs, W-2s, 1099s and direct deposit slips — all in one place.',
    },
    {
      icon: Download,
      title: 'Convenient PDF Downloads',
      description: 'Download clean, print-ready PDFs right after checkout.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Checkout Experience',
      description: 'Payments are processed through an encrypted, secure checkout.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.features-left',
        { y: 35, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          clearProps: 'transform',
        }
      );

      gsap.fromTo(
        '.feature-card-item',
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.75,
          ease: 'power3.out',
          clearProps: 'transform',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 sm:py-20 lg:py-24 border-b border-slate-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Heading, Subtitle & CTA Button */}
          <div className="features-left lg:col-span-5 flex flex-col items-start">
            {/* Features Label */}
            <div className="flex items-center gap-2 text-secondary font-semibold text-[14px] tracking-wider uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span>
              <span>FEATURES</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-bold text-slate-900 tracking-tight leading-[1.16] mb-5">
              Everything You Need <br className="hidden sm:inline" />
              in One Platform
            </h2>

            {/* Description Paragraph */}
            <p className="text-slate-600 text-base sm:text-[17px] leading-relaxed max-w-md mb-8 font-normal">
              Create essential employment and income documents with a straightforward online experience.
            </p>

            {/* Action CTA Button */}
            <a
              href="#documents"
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-[#008be0] active:scale-[0.98] text-white font-semibold text-[15px] px-6 py-3.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <span>View All Documents</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Right Column: 2x2 Feature Cards Grid */}
          <div className="lg:col-span-7 pt-4 lg:pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-10 lg:gap-y-12">
              {features.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <div key={feature.title} className="feature-card-item flex flex-col items-start text-left">
                    {/* Icon */}
                    <div className="text-secondary mb-4 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 stroke-[2]" />
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-lg sm:text-[19px] text-slate-900 tracking-tight mb-2">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-500 text-sm sm:text-[15px] leading-relaxed font-normal">
                      {feature.description}
                    </p>
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
