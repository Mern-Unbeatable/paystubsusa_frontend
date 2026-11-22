import React, { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { PATHS } from "../../../config/paths";
import PricingHeroSection from "./components/sections/PricingHeroSection";
import PricingCardsSection from "./components/sections/PricingCardsSection";
import { usePricingCatalog } from "./hooks/usePricingCatalog";

const BILLING_TYPES = ["one-time", "monthly"];

const PricingView = () => {
  const { billing } = useParams();
  const navigate = useNavigate();
  const { unlimited, loading } = usePricingCatalog();
  const billingValid = BILLING_TYPES.includes(billing);

  // Deep link to /pricing/monthly while Unlimited is inactive → one-time.
  useEffect(() => {
    if (!billingValid || loading || unlimited || billing !== "monthly") return;
    navigate(`${PATHS.PUBLIC.pricing}/one-time`, { replace: true, state: { keepScroll: true } });
  }, [billingValid, loading, unlimited, billing, navigate]);

  if (!billingValid) {
    return <Navigate to={`${PATHS.PUBLIC.pricing}/one-time`} replace />;
  }

  const changeBilling = (next) => {
    if (next === "monthly" && !unlimited) return;
    navigate(`${PATHS.PUBLIC.pricing}/${next}`, {
      replace: true,
      state: { keepScroll: true },
    });
  };

  const effectiveBilling = billing === "monthly" && !unlimited && !loading ? "one-time" : billing;

  return (
    <div className="w-full bg-white flex flex-col min-h-screen">
      <PricingHeroSection subscriptionAvailable={Boolean(unlimited) || loading} />
      <PricingCardsSection billingType={effectiveBilling} onBillingChange={changeBilling} />
    </div>
  );
};

export default PricingView;
