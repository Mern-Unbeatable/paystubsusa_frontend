import React from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { PATHS } from "../../../config/paths";

const DirectDepositSuccessView = () => {
  const [searchParams] = useSearchParams();
  const next = new URLSearchParams(searchParams);
  next.set("step", "5");
  next.set("checkout", "success");
  return (
    <Navigate
      to={`${PATHS.PUBLIC.directDepositCreate}?${next.toString()}`}
      replace
    />
  );
};

export default DirectDepositSuccessView;
