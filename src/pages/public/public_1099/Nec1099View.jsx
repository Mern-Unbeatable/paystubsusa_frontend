import React from 'react';
import Nec1099HeroSection from '../../../Components/Nec1099/Nec1099HeroSection';
import Nec1099GeneratorForm from '../../../Components/Nec1099/Nec1099GeneratorForm';

const Nec1099View = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* 1099-NEC Hero Section */}
      <Nec1099HeroSection />

      {/* 5-Step 1099-NEC Form Generator with Live Preview */}
      <Nec1099GeneratorForm />
    </div>
  );
};

export default Nec1099View;
