import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { fromTemplateSlug } from "../../../config/paths";
import {
  PAYSTUB_CHECKOUT_PHASE,
  buildPaystubCreateQueryPath,
} from "./hooks/usePaystubFormStep";
import { PAYSTUB_PAGE_STEPS } from "./utils/paystubFlow";

/** Legacy `/…/create/package/checkout` → create query URL. */
const PaystubCheckoutView = () => {
  const { templateSlug } = useParams();
  const templateId = fromTemplateSlug(templateSlug) ?? templateSlug;
  return (
    <Navigate
      to={buildPaystubCreateQueryPath(
        templateId,
        PAYSTUB_PAGE_STEPS.CHECKOUT,
        PAYSTUB_CHECKOUT_PHASE.VERIFYING,
      )}
      replace
    />
  );
};

export default PaystubCheckoutView;
