import React, { Suspense, lazy } from 'react';
import HeroSection from '../../../Components/Home/HeroSection';
import FeaturesSection from '../../../Components/Home/FeaturesSection';

const DocumentsSection = lazy(() => import('../../../Components/Home/DocumentsSection'));
const HowItWorksSection = lazy(() => import('../../../Components/Home/HowItWorksSection'));
const SpecialOfferSection = lazy(() => import('../../../Components/Home/SpecialOfferSection'));
const PricingSection = lazy(() => import('../../../Components/Home/PricingSection'));
const WhyUsSection = lazy(() => import('../../../Components/Home/WhyUsSection'));
const TestimonialsSection = lazy(() => import('../../../Components/Home/TestimonialsSection'));

const sectionFallback = (
  <div className="py-12 flex items-center justify-center text-sm text-slate-500">
    Loading section…
  </div>
);

const HomeView = () => {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Features Section */}
      <FeaturesSection />

      {/* 3. Documents Section (#EBF1F8 background) */}
      <Suspense fallback={sectionFallback}>
        <DocumentsSection />
      </Suspense>

      {/* 4. How It Works Section */}
      <Suspense fallback={sectionFallback}>
        <HowItWorksSection />
      </Suspense>

      {/* 5. Special Offer Section (#EBF1F8 background) */}
      <Suspense fallback={sectionFallback}>
        <SpecialOfferSection />
      </Suspense>

      {/* 6. Simple Pricing Section */}
      <Suspense fallback={sectionFallback}>
        <PricingSection />
      </Suspense>

      {/* 7. Why Us Section (#EBF1F8 background) */}
      <Suspense fallback={sectionFallback}>
        <WhyUsSection />
      </Suspense>

      {/* 8. What Our Clients Say Section */}
      <Suspense fallback={sectionFallback}>
        <TestimonialsSection />
      </Suspense>
    </div>
  );
};

export default HomeView;