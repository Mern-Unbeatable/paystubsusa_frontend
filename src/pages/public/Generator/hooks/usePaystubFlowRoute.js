import { useLocation, useParams } from "react-router-dom";
import { fromTemplateSlug } from "../../../../config/paths";
import { getTemplateById, usePaystubTemplates } from "../utils/templateUtils";
import { getFlowPathBuilder } from "../utils/paystubFlow";

/**
 * Resolves the template for the current flow page from the `:templateSlug` param.
 * `redirectTo` is set when a bare id ("02") should be normalised to "02-template".
 * `loading` is true while an id that isn't bundled may still arrive from the API.
 */
export function usePaystubFlowRoute() {
  const { templateSlug } = useParams();
  const { pathname } = useLocation();
  const { templates, ready } = usePaystubTemplates();

  const template = getTemplateById(fromTemplateSlug(templateSlug), templates);
  const bareIdTemplate = template ? null : getTemplateById(templateSlug, templates);
  const redirectTo = bareIdTemplate
    ? getFlowPathBuilder(pathname)(bareIdTemplate.id)
    : null;

  return {
    templateSlug,
    template,
    redirectTo,
    loading: !template && !bareIdTemplate && !ready,
  };
}
