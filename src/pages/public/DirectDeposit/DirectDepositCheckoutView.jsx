import React from "react";
import { Navigate } from "react-router-dom";
import { PATHS } from "../../../config/paths";

const DirectDepositCheckoutView = () => (
  <Navigate to={PATHS.PUBLIC.directDepositCheckoutVerifying} replace />
);

export default DirectDepositCheckoutView;
