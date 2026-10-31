import React from 'react';
import { PenTool, Eye, Download } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      stepNumber: 'STEP 01',
      icon: PenTool,
      title: 'Enter Your Information',
      description: 'Provide the required details using our easy-to-follow form.',
    },
    {
      stepNumber: 'STEP 02',
      icon: Eye,
      title: 'Review Your Document',
      description: 'Preview your document and check the information before checkout.',
    },
    {
      stepNumber: 'STEP 03',
      icon: Download,
      title: 'Download Your Document',
      description: 'Complete your payment and download your generated document.',
    },
  ];

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-secondary font-semibold text-xs sm:text-[13px] tracking-widest uppercase mb-3">
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
              const IconComp = item.icon;
              return (
                <div
                  key={item.stepNumber}
                  className="bg-white rounded-[26px] p-8 sm:p-10 flex flex-col items-center text-center border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow duration-300"
                >
                  {/* Icon Container */}
                  <div className="w-16 h-16 rounded-2xl bg-[#e0edff] text-secondary flex items-center justify-center mb-6 shadow-xs">
                    <IconComp className="w-7 h-7 stroke-[2]" />
                  </div>

                  {/* Step Label */}
                  <span className="text-secondary font-bold text-xs sm:text-[13px] tracking-wider uppercase mb-2">
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
