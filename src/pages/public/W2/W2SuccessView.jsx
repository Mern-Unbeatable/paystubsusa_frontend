import React from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { PATHS } from "../../../config/paths";

/**
 * Legacy `/w-2/create/checkout/success` → create success query URL.
 * Preserves Stripe redirect query params (`payment_intent_client_secret`, etc.).
 */
const W2SuccessView = () => {
  const [searchParams] = useSearchParams();
  const next = new URLSearchParams(searchParams);
  // Ensure canonical create success params win.
  next.set("step", "5");
  next.set("checkout", "success");
  return (
    <Navigate
      to={`${PATHS.PUBLIC.w2Create}?${next.toString()}`}
      replace
    />
  );
};

export default W2SuccessView;
