import React from "react";
import { Navigate } from "react-router-dom";
import { PATHS } from "../../../config/paths";
import { NEC1099_FORM_STEPS } from "./utils/nec1099Flow";
import { buildNec1099CreatePath } from "./hooks/useNec1099FormStep";

const Nec1099PreviewView = () => (
  <Navigate
    to={buildNec1099CreatePath(
      PATHS.PUBLIC.nec1099Create,
      NEC1099_FORM_STEPS.REVIEW,
    )}
    replace
  />
);

export default Nec1099PreviewView;
