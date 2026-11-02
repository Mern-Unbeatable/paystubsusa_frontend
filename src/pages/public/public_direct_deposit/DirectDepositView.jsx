import React from 'react';
import DirectDepositHeroSection from '../../../Components/DirectDeposit/DirectDepositHeroSection';
import DirectDepositGeneratorForm from '../../../Components/DirectDeposit/DirectDepositGeneratorForm';

const DirectDepositView = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Direct Deposit Hero Section */}
      <DirectDepositHeroSection />

      {/* 5-Step Direct Deposit Form Generator with Live Preview */}
      <DirectDepositGeneratorForm />
    </div>
  );
};

export default DirectDepositView;
