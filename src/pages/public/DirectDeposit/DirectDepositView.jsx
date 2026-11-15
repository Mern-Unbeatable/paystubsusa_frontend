import React from "react";
import { Navigate } from "react-router-dom";
import { PATHS } from "../../../config/paths";

/** `/direct-deposit` → `/direct-deposit/create?step=1`. */
const DirectDepositView = () => (
  <Navigate to={PATHS.PUBLIC.directDepositCreateStep1} replace />
);

export default DirectDepositView;
