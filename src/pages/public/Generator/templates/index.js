export { default as TemplateDocument } from "./TemplateDocument";
export { buildPaystubDocument } from "./buildPaystubDocument";
export { SAMPLE_PAYSTUB_DOCUMENT } from "./samplePaystubDocument";

export const DOCUMENT_PAGE = { width: 816, height: 1056 };

const DOCUMENT_KEYS = new Set(["earnings-statement", "check-statement"]);

/** True for templates rendered as a full-page document (vs. thumbnail-only templates). */
export const hasTemplateDocument = (template) => DOCUMENT_KEYS.has(template?.document);
