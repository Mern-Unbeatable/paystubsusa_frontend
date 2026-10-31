import React from 'react';
import HeroSection from '../../../Components/Home/HeroSection';
import FeaturesSection from '../../../Components/Home/FeaturesSection';
import DocumentsSection from '../../../Components/Home/DocumentsSection';
import HowItWorksSection from '../../../Components/Home/HowItWorksSection';

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
    </div>
  );
};

export default HomeView;