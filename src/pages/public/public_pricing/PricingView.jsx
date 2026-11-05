import React from "react";
import PricingHeroSection from "./components/sections/PricingHeroSection";
import PricingCardsSection from "./components/sections/PricingCardsSection";

const PricingView = () => {
  return (
    <div className="w-full bg-white flex flex-col min-h-screen">
      <PricingHeroSection />
      <PricingCardsSection />
    </div>
  );
};

export default PricingView;
