import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import bundledTemplates from "../../data/generator/templates.json";
import { fetchPublicTemplates } from "../../../../features/public/template/publicTemplateThunks";
import { selectPublicTemplatesByType } from "../../../../features/public/template/publicTemplateSelectors";

import { FULL_PAGE_RENDERERS, toGeneratorTemplate } from "./generatorTemplate";

export { toGeneratorTemplate };

const BUNDLED = {
  templates: bundledTemplates,
  defaultTemplateId: bundledTemplates[0]?.id ?? "01",
};

/**
 * `{ templates, defaultTemplateId, ready }` from `GET /catalog/templates?documentType=paystub`.
 * The bundled list stands in while loading and when the API fails or returns nothing usable.
 */
export function usePaystubTemplates() {
  const dispatch = useDispatch();
  const { templates: rows, status } = useSelector((state) =>
    selectPublicTemplatesByType(state, "paystub"),
  );

  useEffect(() => {
    dispatch(fetchPublicTemplates("paystub"));
  }, [dispatch]);

  return useMemo(() => {
    const ready = status === "succeeded" || status === "failed";
    const usable = rows.filter(
      (t) => t.renderer === "variant" || FULL_PAGE_RENDERERS.has(t.renderer),
    );
    if (usable.length === 0) return { ...BUNDLED, ready };
    return {
      templates: usable.map(toGeneratorTemplate),
      defaultTemplateId: (usable.find((t) => t.isDefault) ?? usable[0]).code,
      ready,
    };
  }, [rows, status]);
}

export const getTemplateById = (templateId, templates) =>
  templates.find((template) => template.id === templateId) ?? null;
