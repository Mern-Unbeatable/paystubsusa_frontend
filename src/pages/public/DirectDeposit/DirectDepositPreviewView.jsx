import React from "react";
import { Navigate } from "react-router-dom";
import { PATHS } from "../../../config/paths";
import { DD_FORM_STEPS } from "./utils/directDepositFlow";
import { buildDirectDepositCreatePath } from "./hooks/useDirectDepositFormStep";

const DirectDepositPreviewView = () => (
  <Navigate
    to={buildDirectDepositCreatePath(
      PATHS.PUBLIC.directDepositCreate,
      DD_FORM_STEPS.REVIEW,
    )}
    replace
  />
);

export default DirectDepositPreviewView;
