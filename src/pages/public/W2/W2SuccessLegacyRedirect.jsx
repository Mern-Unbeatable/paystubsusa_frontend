import React from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { PATHS } from "../../../config/paths";

/** `/w-2/create/success` → `/w-2/create?step=5&checkout=success`. */
const W2SuccessLegacyRedirect = () => {
  const [searchParams] = useSearchParams();
  const next = new URLSearchParams(searchParams);
  next.set("step", "5");
  next.set("checkout", "success");
  return (
    <Navigate to={`${PATHS.PUBLIC.w2Create}?${next.toString()}`} replace />
  );
};

export default W2SuccessLegacyRedirect;
