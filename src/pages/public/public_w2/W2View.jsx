import React from 'react';
import W2HeroSection from '../../../Components/W2/W2HeroSection';
import W2GeneratorForm from '../../../Components/W2/W2GeneratorForm';

const W2View = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* W-2 Hero Section */}
      <W2HeroSection />

      {/* 5-Step W-2 Form Generator with Live Preview */}
      <W2GeneratorForm />
    </div>
  );
};

export default W2View;
