import React from "react";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { fromTemplateSlug } from "../../../config/paths";
import {
  PAYSTUB_CHECKOUT_PHASE,
  buildPaystubCreateQueryPath,
} from "./hooks/usePaystubFormStep";
import { PAYSTUB_PAGE_STEPS } from "./utils/paystubFlow";

/** Legacy `/…/create/package/checkout/success` → create query URL. */
const PaystubSuccessView = () => {
  const { templateSlug } = useParams();
  const [searchParams] = useSearchParams();
  const templateId = fromTemplateSlug(templateSlug) ?? templateSlug;
  const next = buildPaystubCreateQueryPath(
    templateId,
    PAYSTUB_PAGE_STEPS.CHECKOUT,
    PAYSTUB_CHECKOUT_PHASE.SUCCESS,
  );
  const extra = searchParams.toString();
  const sep = next.includes("?") ? "&" : "?";
  return (
    <Navigate
      to={extra ? `${next}${sep}${extra}` : next}
      replace
    />
  );
};

export default PaystubSuccessView;
