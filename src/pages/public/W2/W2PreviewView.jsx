import React from "react";
import { Navigate } from "react-router-dom";
import { PATHS } from "../../../config/paths";
import { W2_FORM_STEPS } from "./utils/w2Flow";

/** Legacy `/w-2/create/preview` → landing on the review step. */
const W2PreviewView = () => (
  <Navigate
    to={PATHS.PUBLIC.w2}
    replace
    state={{ step: W2_FORM_STEPS.REVIEW }}
  />
);

export default W2PreviewView;
