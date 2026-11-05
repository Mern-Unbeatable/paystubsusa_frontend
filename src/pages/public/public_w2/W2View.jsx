import React from "react";
import W2HeroSection from "./components/sections/W2HeroSection";
import W2GeneratorForm from "./components/sections/W2GeneratorForm";

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
