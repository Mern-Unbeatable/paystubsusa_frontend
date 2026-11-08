import { useLocation, useParams } from "react-router-dom";
import { fromTemplateSlug } from "../../../../config/paths";
import { getTemplateById } from "../utils/templateUtils";
import { getFlowPathBuilder } from "../utils/paystubFlow";

/**
 * Resolves the template for the current flow page from the `:templateSlug` param.
 * `redirectTo` is set when a bare id ("02") should be normalised to "02-template".
 */
export function usePaystubFlowRoute() {
  const { templateSlug } = useParams();
  const { pathname } = useLocation();

  const template = getTemplateById(fromTemplateSlug(templateSlug));
  const bareIdTemplate = template ? null : getTemplateById(templateSlug);
  const redirectTo = bareIdTemplate
    ? getFlowPathBuilder(pathname)(bareIdTemplate.id)
    : null;

  return { templateSlug, template, redirectTo };
}
