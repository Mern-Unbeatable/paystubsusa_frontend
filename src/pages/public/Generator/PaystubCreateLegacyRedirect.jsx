import React from "react";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { fromTemplateSlug } from "../../../config/paths";
import { buildPaystubCreateQueryPath } from "./hooks/usePaystubFormStep";

/** Legacy `/paystub-generator/:slug/create` → `/paystub-generator/create/:slug?step=…`. */
const PaystubCreateLegacyRedirect = () => {
  const { templateSlug } = useParams();
  const [searchParams] = useSearchParams();
  const templateId = fromTemplateSlug(templateSlug) ?? templateSlug;
  const step = Number(searchParams.get("step")) || 1;
  const checkout = searchParams.get("checkout");
  const next = buildPaystubCreateQueryPath(templateId, step, checkout);
  const keep = new URLSearchParams(searchParams);
  keep.delete("step");
  keep.delete("checkout");
  const extra = keep.toString();
  return (
    <Navigate
      to={extra ? `${next}&${extra}` : next}
      replace
    />
  );
};

export default PaystubCreateLegacyRedirect;
