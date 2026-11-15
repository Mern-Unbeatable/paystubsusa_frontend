import React from "react";
import { Navigate } from "react-router-dom";
import { PATHS } from "../../../config/paths";

/** Legacy `/w-2/create/checkout` → `/w-2/create?step=5&checkout=verifying`. */
const W2CheckoutView = () => (
  <Navigate to={PATHS.PUBLIC.w2CheckoutVerifying} replace />
);

export default W2CheckoutView;
