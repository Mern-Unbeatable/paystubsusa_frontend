import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { fromTemplateSlug } from "../../../config/paths";
import { buildPaystubCreateQueryPath } from "./hooks/usePaystubFormStep";
import { PAYSTUB_PAGE_STEPS } from "./utils/paystubFlow";
import { PAYSTUB_CHECKOUT_PHASE } from "./hooks/usePaystubFormStep";

/** Legacy `/…/create/package` → create query URL. */
const PaystubPackageView = () => {
  const { templateSlug } = useParams();
  const templateId = fromTemplateSlug(templateSlug) ?? templateSlug;
  return (
    <Navigate
      to={buildPaystubCreateQueryPath(
        templateId,
        PAYSTUB_PAGE_STEPS.PACKAGE,
        PAYSTUB_CHECKOUT_PHASE.PACKAGE,
      )}
      replace
    />
  );
};

export default PaystubPackageView;
