import React from "react";
import Nec1099HeroSection from "./components/sections/Nec1099HeroSection";
import Nec1099GeneratorForm from "./components/sections/Nec1099GeneratorForm";

const Tax1099View = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* 1099-NEC Hero Section */}
      <Nec1099HeroSection />

      {/* 5-Step 1099-NEC Form Generator with Live Preview */}
      <Nec1099GeneratorForm />
    </div>
  );
};

export default Tax1099View;
