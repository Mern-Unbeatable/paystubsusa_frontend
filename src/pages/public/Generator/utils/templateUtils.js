import templates from "../../data/generator/templates.json";

export const DEFAULT_TEMPLATE_ID = templates[0]?.id ?? "01";

export const getTemplateById = (templateId) =>
  templates.find((template) => template.id === templateId) ?? null;
