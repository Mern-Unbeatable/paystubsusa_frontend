import React from 'react';
import HeroSection from '../../../Components/Home/HeroSection';
import FeaturesSection from '../../../Components/Home/FeaturesSection';
import DocumentsSection from '../../../Components/Home/DocumentsSection';
import HowItWorksSection from '../../../Components/Home/HowItWorksSection';
import SpecialOfferSection from '../../../Components/Home/SpecialOfferSection';
import PricingSection from '../../../Components/Home/PricingSection';

const HomeView = () => {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Features Section */}
      <FeaturesSection />

      {/* 3. Documents Section (#EBF1F8 background) */}
      <DocumentsSection />

      {/* 4. How It Works Section */}
      <HowItWorksSection />

      {/* 5. Special Offer Section (#EBF1F8 background) */}
      <SpecialOfferSection />

      {/* 6. Simple Pricing Section */}
      <PricingSection />
    </div>
  );
};

export default HomeView;