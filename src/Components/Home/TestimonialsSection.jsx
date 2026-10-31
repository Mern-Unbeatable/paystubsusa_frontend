import React, { useState } from 'react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const testimonials = [
    {
      id: 1,
      name: 'Sabo Masties',
      role: 'Founder @ Rolex',
      quote:
        'Creating professional paystubs has never been this easy. The process was simple, fast, and the final document looked clean and professional. Highly recommended!',
    },
    {
      id: 2,
      name: 'Sam',
      role: 'Founder @ Migelko',
      quote:
        'I needed a paystub quickly and Paystubs USA made the entire process straightforward. I could enter my information, review the document, and download it without creating.',
    },
    {
      id: 3,
      name: 'Mansur',
      role: 'Founder @ Google',
      quote:
        'The templates are easy to understand and the document creation process is very convenient. I especially like being able to choose a template that fits my needs.',
    },
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-900 tracking-wider uppercase">
            WHAT OUR CLIENTS SAY
          </h2>
          <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed font-normal max-w-xl mx-auto">
            Community development is often linked with community work or community planning, and may involve stakeholders, foundations,
          </p>
        </div>

        {/* Testimonials Shelf Container */}
        <div className="max-w-6xl mx-auto relative">
          
          {/* Subtle Backdrop Panel behind cards matching design */}
          <div 
            className="absolute inset-x-8 top-16 bottom-8 bg-slate-100/60 rounded-3xl -z-10" 
            aria-hidden="true" 
          />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-6 pb-8">
            {testimonials.map((item, idx) => {
              const isCenter = idx === 1;
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 flex flex-col justify-between transition-all duration-300 ${
                    isCenter
                      ? 'shadow-xl md:-translate-y-2 ring-1 ring-slate-900/5'
                      : 'shadow-md hover:shadow-lg'
                  }`}
                >
                  <div>
                    {/* 5 Stars */}
                    <div className="flex items-center gap-1 mb-4 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    {/* Review Quote */}
                    <p className="text-slate-600 text-sm sm:text-[14px] leading-relaxed font-normal">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Author info */}
                  <div className="mt-6 pt-4 border-t border-slate-50">
                    <h4 className="font-bold text-slate-900 text-sm">
                      {item.name}
                    </h4>
                    <p className="text-slate-400 text-xs mt-0.5 font-normal">
                      {item.role}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls (Bottom Center) */}
          <div className="flex items-center justify-center mt-6">
            <div className="inline-flex rounded-lg shadow-xs overflow-hidden border border-slate-200">
              <button
                type="button"
                onClick={handlePrev}
                className="bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 transition-colors cursor-pointer border-r border-slate-200 active:bg-slate-100"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 transition-colors cursor-pointer active:bg-slate-950"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
