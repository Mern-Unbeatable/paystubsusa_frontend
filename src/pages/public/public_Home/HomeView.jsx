import React from "react";
import HeroSection from "../../../Components/Home/HeroSection";
import FeaturesSection from "../../../Components/Home/FeaturesSection";
import DocumentsSection from "../../../Components/Home/DocumentsSection";
import HowItWorksSection from "../../../Components/Home/HowItWorksSection";
import SpecialOfferSection from "../../../Components/Home/SpecialOfferSection";
import PricingSection from "../../../Components/Home/PricingSection";
import WhyUsSection from "../../../Components/Home/WhyUsSection";
import TestimonialsSection from "../../../Components/Home/TestimonialsSection";

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
