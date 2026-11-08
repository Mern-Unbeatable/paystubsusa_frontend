import { matchPath } from "react-router-dom";
import {
  PATHS,
  buildPaystubCheckoutPath,
  buildPaystubCreatePath,
  buildPaystubPackagePath,
  buildPaystubSuccessPath,
} from "../../../../config/paths";

/** Steps inside the details form on the create page. */
export const PAYSTUB_FORM_STEPS = {
  EMPLOYER: 1,
  REVIEW: 4,
};

const FLOW_ROUTES = [
  { path: PATHS.PUBLIC.paystubSuccess, buildPath: buildPaystubSuccessPath },
  { path: PATHS.PUBLIC.paystubCheckout, buildPath: buildPaystubCheckoutPath },
  { path: PATHS.PUBLIC.paystubPackage, buildPath: buildPaystubPackagePath },
  { path: PATHS.PUBLIC.paystubCreate, buildPath: buildPaystubCreatePath },
];

/** Builds the same flow page for a different template id. */
export const getFlowPathBuilder = (pathname) =>
  FLOW_ROUTES.find(({ path }) => matchPath(path, pathname))?.buildPath ??
  buildPaystubCreatePath;
