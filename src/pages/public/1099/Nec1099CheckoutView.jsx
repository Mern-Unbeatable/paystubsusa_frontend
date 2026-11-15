import React from "react";
import { Navigate } from "react-router-dom";
import { PATHS } from "../../../config/paths";

const Nec1099CheckoutView = () => (
  <Navigate to={PATHS.PUBLIC.nec1099CheckoutVerifying} replace />
);

export default Nec1099CheckoutView;
