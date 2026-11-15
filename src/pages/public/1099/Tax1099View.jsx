import React from "react";
import { Navigate } from "react-router-dom";
import { PATHS } from "../../../config/paths";

/** `/1099-nec` → `/1099-nec/create?step=1`. */
const Tax1099View = () => (
  <Navigate to={PATHS.PUBLIC.nec1099CreateStep1} replace />
);

export default Tax1099View;
