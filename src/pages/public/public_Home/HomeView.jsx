import React from "react";
import HeroSection from "./components/section/HeroSection";
import FeaturesSection from "./components/section/FeaturesSection";
import DocumentsSection from "./components/section/DocumentsSection";
import HowItWorksSection from "./components/section/HowItWorksSection";
import SpecialOfferSection from "./components/section/SpecialOfferSection";
import PricingSection from "./components/section/PricingSection";
import WhyUsSection from "./components/section/WhyUsSection";
import TestimonialsSection from "./components/section/TestimonialsSection";

const HomeView = () => {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Features Section */}
      <FeaturesSection />

      {/* 3. Documents Section */}
      <DocumentsSection />

      {/* 4. How It Works Section */}
      <HowItWorksSection />

      {/* 5. Special Offer Section */}
      <SpecialOfferSection />

      {/* 6. Pricing Section */}
      <PricingSection />

      {/* 7. Why Us Section */}
      <WhyUsSection />

      {/* 8. Testimonials Section */}
      <TestimonialsSection />
    </div>
  );
};

export default HomeView;
