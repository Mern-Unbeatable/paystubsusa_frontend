import React, { useEffect, useRef } from 'react';
import { PenTool, Eye, Download } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import steps from '../../../data/home/howItWorksSteps.json';

gsap.registerPlugin(ScrollTrigger);

const HowItWorksSection = () => {
  const sectionRef = useRef(null);

  const ICON_MAP = { Download, Eye, PenTool };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.how-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
      });

      gsap.from('.how-step-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
        
        {/* Section Header */}
        <div className="how-header text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-secondary font-semibold text-[14px] tracking-widest uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span>
            <span>PROCESS</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 tracking-tight leading-tight">
            How It Works
          </h2>
          
          <p className="mt-3 text-slate-600 text-base sm:text-[17px] font-normal leading-relaxed">
            Create your documents through a simple three-step process.
          </p>
        </div>

        {/* Steps Grid with Connecting Dashed Line */}
        <div className="relative">
          {/* Subtle connecting dashed line between cards on desktop */}
          <div 
            className="hidden md:block absolute top-[52%] left-24 right-24 h-0.5 border-t-2 border-dashed border-blue-200/80 -translate-y-1/2 z-0"
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((item) => {
              const IconComp = ICON_MAP[item.iconKey];
              return (
                <div
                  key={item.stepNumber}
                  className="how-step-card bg-white rounded-[26px] p-8 sm:p-10 flex flex-col items-center text-center border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow duration-300"
                >
                  {/* Icon Container */}
                  <div className="w-16 h-16 rounded-2xl bg-[#e0edff] text-secondary flex items-center justify-center mb-6 shadow-xs">
                    <IconComp className="w-7 h-7 stroke-[2]" />
                  </div>

                  {/* Step Label */}
                  <span className="text-secondary font-bold text-[14px] tracking-wider uppercase mb-2">
                    {item.stepNumber}
                  </span>

                  {/* Title */}
                  <h3 className="font-bold text-lg sm:text-xl text-slate-900 tracking-tight mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-500 text-sm sm:text-[15px] leading-relaxed max-w-xs font-normal">
                    {item.description}
                  </p>
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
