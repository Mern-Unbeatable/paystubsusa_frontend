import React from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { PATHS } from "../../../config/paths";

const Nec1099SuccessLegacyRedirect = () => {
  const [searchParams] = useSearchParams();
  const next = new URLSearchParams(searchParams);
  next.set("step", "5");
  next.set("checkout", "success");
  return (
    <Navigate to={`${PATHS.PUBLIC.nec1099Create}?${next.toString()}`} replace />
  );
};

export default Nec1099SuccessLegacyRedirect;
