import React from 'react';
import { User, Sparkles, Layers, Folder } from 'lucide-react';

const WhyUsSection = () => {
  const points = [
    {
      icon: User,
      title: 'No Account Required',
      description: 'Create documents without signing up.',
    },
    {
      icon: Sparkles,
      title: 'Simple User Experience',
      description: 'A clear, guided flow from start to finish.',
    },
    {
      icon: Layers,
      title: 'Multiple Document Options',
      description: 'Paystubs, W-2s, 1099s and deposit slips.',
    },
    {
      icon: Folder,
      title: 'Convenient Document Access',
      description: 'Download your PDFs when you need them.',
    },
  ];

  return (
    <section className="w-full bg-[#EBF1F8] py-16 sm:py-20 lg:py-24 border-t border-slate-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-secondary font-semibold text-xs sm:text-[13px] tracking-widest uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span>
            <span>WHY US</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 tracking-tight leading-tight">
            Why Choose Paystubs USA
          </h2>
          
          <p className="mt-3 text-slate-600 text-base sm:text-[17px] font-normal leading-relaxed">
            A focused, dependable way to create the documents your business needs.
          </p>
        </div>

        {/* 4 Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {points.map((pt) => {
            const IconComponent = pt.icon;
            return (
              <div
                key={pt.title}
                className="flex items-start gap-4 p-2 transition-transform duration-200 hover:-translate-y-0.5"
              >
                {/* Icon Box */}
                <div className="w-12 h-12 rounded-2xl bg-white border border-blue-100/80 flex items-center justify-center text-secondary shadow-xs flex-shrink-0">
                  <IconComponent className="w-5 h-5 stroke-[2]" />
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="font-bold text-slate-900 text-[15px] sm:text-base leading-snug">
                    {pt.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">
                    {pt.description}
                  </p>
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
