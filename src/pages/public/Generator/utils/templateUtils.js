import { useEffect, useSyncExternalStore } from "react";
import bundledTemplates from "../../data/generator/templates.json";
import { API_ENDPOINTS } from "../../../../api/endpoints";
import { httpClient } from "../../../../api/httpClient";

const FULL_PAGE_RENDERERS = new Set(["earnings-statement", "check-statement"]);

/** Catalog/admin template row -> the shape the generator components render. */
export const toGeneratorTemplate = ({
  code,
  title,
  subtitle,
  renderer,
  variant,
}) => ({
  id: code,
  title,
  subtitle,
  ...(variant || {}),
  ...(FULL_PAGE_RENDERERS.has(renderer) ? { document: renderer } : {}),
});

// Admin-managed templates replace the bundled list once loaded; the bundle keeps the
// generator usable while loading and when the API is unreachable.
let state = {
  templates: bundledTemplates,
  defaultTemplateId: bundledTemplates[0]?.id ?? "01",
  ready: false,
};
let request = null;
const listeners = new Set();

const setState = (next) => {
  state = { ...state, ...next, ready: true };
  listeners.forEach((listener) => listener());
};

function loadTemplates() {
  request ??= httpClient
    .get(API_ENDPOINTS.CATALOG.TEMPLATES, {
      params: { documentType: "paystub" },
    })
    .then((response) => {
      const rows = (response.data?.data ?? []).filter(
        (t) => t.renderer === "variant" || FULL_PAGE_RENDERERS.has(t.renderer),
      );
      if (rows.length === 0) return setState({});
      setState({
        templates: rows.map(toGeneratorTemplate),
        defaultTemplateId: (rows.find((t) => t.isDefault) ?? rows[0]).code,
      });
    })
    .catch(() => setState({}));
  return request;
}

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const getSnapshot = () => state;

/** `{ templates, defaultTemplateId, ready }`; re-renders when the API list arrives. */
export function usePaystubTemplates() {
  useEffect(() => {
    loadTemplates();
  }, []);
  return useSyncExternalStore(subscribe, getSnapshot);
}

export const getTemplateById = (templateId, templates = state.templates) =>
  templates.find((template) => template.id === templateId) ?? null;
