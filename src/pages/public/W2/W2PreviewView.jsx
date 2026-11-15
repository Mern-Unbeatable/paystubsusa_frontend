import React from "react";
import { Navigate } from "react-router-dom";
import { PATHS } from "../../../config/paths";
import { W2_FORM_STEPS } from "./utils/w2Flow";
import { buildW2CreatePath } from "./hooks/useW2FormStep";

/** Legacy `/w-2/create/preview` → `/w-2/create?step=4`. */
const W2PreviewView = () => (
  <Navigate
    to={buildW2CreatePath(PATHS.PUBLIC.w2Create, W2_FORM_STEPS.REVIEW)}
    replace
  />
);

export default W2PreviewView;
