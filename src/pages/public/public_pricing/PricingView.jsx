import React from 'react';
import PricingHeroSection from '../../../Components/Pricing/PricingHeroSection';
import PricingCardsSection from '../../../Components/Pricing/PricingCardsSection';

const PricingView = () => {
  return (
    <div className="w-full bg-white flex flex-col min-h-screen">
      <PricingHeroSection />
      <PricingCardsSection />
    </div>
  );
};

export default PricingView;
