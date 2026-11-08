import React, { useEffect, useRef } from 'react';
import heroImg from '../../../../../assets/herosection.png';
import gsap from 'gsap';

const HeroSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-heading',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, delay: 0.1 }
      )
        .fromTo(
          '.hero-subtitle',
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          '.hero-btn',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.6, clearProps: 'transform' },
          '-=0.4'
        )
        .fromTo(
          '.hero-image-wrap',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', clearProps: 'transform' },
          '-=0.7'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-primary overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div 
        className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-secondary/15 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[90px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-end min-h-[560px] lg:min-h-[620px] xl:min-h-[680px]">
          
          {/* Left Column: Heading, Subtitle & Action CTAs */}
          <div className="lg:col-span-5 xl:col-span-5 pt-12 pb-10 sm:pt-16 lg:pt-20 lg:pb-28 flex flex-col justify-center z-10">
            <h1 className="hero-heading text-4xl sm:text-5xl lg:text-[50px] xl:text-[56px] font-bold text-white tracking-tight leading-[1.12]">
              Create Professional <br className="hidden sm:inline" />
              Paystubs for Your <br className="hidden sm:inline" />
              Business
            </h1>

            <p className="hero-subtitle mt-5 sm:mt-6 text-base sm:text-lg lg:text-[17px] text-[#cbd9f5] leading-relaxed max-w-xl font-normal">
              Generate professional paystubs and essential employment documents with a simple, secure, and convenient online experience.
            </p>

            {/* CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="hero-btn bg-secondary hover:bg-[#008be0] active:scale-[0.98] text-white font-semibold text-[15px] px-6 py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer text-center min-w-[155px]"
              >
                Create Paystub
              </button>
              
              <button
                type="button"
                className="hero-btn border border-white/40 hover:border-white hover:bg-white/10 active:scale-[0.98] text-white font-semibold text-[15px] px-6 py-3.5 rounded-lg bg-white/5 transition-all duration-200 cursor-pointer text-center min-w-[165px]"
              >
                Explore Document
              </button>
            </div>
          </div>

          {/* Right Column: Hero Image with 4 Professionals */}
          <div className="hero-image-wrap lg:col-span-7 xl:col-span-7 flex items-end justify-center lg:justify-end w-full self-end pt-6 lg:pt-0 overflow-visible">
            <div className="relative w-full flex items-end justify-center lg:justify-end">
              <img
                src={heroImg}
                alt="Business professionals holding up paystub documents"
                className="w-full sm:w-[96%] lg:w-[108%] xl:w-[114%] 2xl:w-[118%] max-w-none h-auto object-contain max-h-[520px] sm:max-h-[600px] lg:max-h-[660px] xl:max-h-[730px] select-none pointer-events-none drop-shadow-2xl align-bottom block lg:translate-x-3 xl:translate-x-6"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
