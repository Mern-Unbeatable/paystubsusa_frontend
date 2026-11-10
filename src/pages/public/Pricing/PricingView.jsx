import React from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { PATHS } from "../../../config/paths";
import PricingHeroSection from "./components/sections/PricingHeroSection";
import PricingCardsSection from "./components/sections/PricingCardsSection";

const BILLING_TYPES = ["one-time", "monthly"];

const PricingView = () => {
  const { billing } = useParams();
  const navigate = useNavigate();

  if (!BILLING_TYPES.includes(billing)) {
    return <Navigate to={`${PATHS.PUBLIC.pricing}/one-time`} replace />;
  }

  const changeBilling = (next) =>
    navigate(`${PATHS.PUBLIC.pricing}/${next}`, {
      replace: true,
      state: { keepScroll: true },
    });

  return (
    <div className="w-full bg-white flex flex-col min-h-screen">
      <PricingHeroSection />
      <PricingCardsSection billingType={billing} onBillingChange={changeBilling} />
    </div>
  );
};

export default PricingView;
