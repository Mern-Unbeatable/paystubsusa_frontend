import { ENV_CONFIG } from "../../../../../config/env";

export {
  DOCUMENT_TYPE_LABELS,
  DOCUMENT_TYPE_OPTIONS,
  STATUS_OPTIONS,
  formatShortDate,
} from "../../pricing/utils/pricingFormat";

/** Must match the server's TEMPLATE_RENDERERS: layouts the document bundle implements. */
export const RENDERERS_BY_TYPE = {
  paystub: ["variant", "earnings-statement", "check-statement"],
  w2: ["w2"],
  nec1099: ["nec1099"],
  direct_deposit: ["direct-deposit"],
};

export const RENDERER_LABELS = {
  variant: "Styled paystub",
  "earnings-statement": "Earnings statement (full page)",
  "check-statement": "Check statement (full page)",
  w2: "W-2 form",
  nec1099: "1099-NEC form",
  "direct-deposit": "Direct deposit form",
};

/** Full-page layouts that take no style options. */
export const VARIANTLESS_RENDERERS = new Set(["earnings-statement", "check-statement"]);

export const VARIANT_FIELDS = [
  {
    key: "headerVariant",
    label: "Header",
    options: [
      { value: "dark-full", label: "Navy banner" },
      { value: "blue-full", label: "Blue banner" },
      { value: "minimal-blue-line", label: "Blue underline" },
      { value: "minimal-dark-line", label: "Dark underline" },
      { value: "boxed", label: "Boxed" },
      { value: "split-dark", label: "Split navy" },
      { value: "split-blue", label: "Split blue" },
    ],
  },
  {
    key: "netPayVariant",
    label: "Net pay",
    options: [
      { value: "dark", label: "Navy" },
      { value: "blue", label: "Blue" },
    ],
  },
  {
    key: "tableVariant",
    label: "Tables",
    options: [
      { value: "light-blue", label: "Light blue" },
      { value: "solid-blue", label: "Solid blue" },
      { value: "solid-dark", label: "Solid navy" },
      { value: "minimal-gray", label: "Minimal gray" },
    ],
  },
];

export const DEFAULT_VARIANT = { headerVariant: "dark-full", netPayVariant: "dark", tableVariant: "light-blue" };

export const variantSummary = (variant) =>
  variant
    ? VARIANT_FIELDS.map(
        ({ key, options }) => options.find((o) => o.value === variant[key])?.label || variant[key],
      ).join(" · ")
    : "—";

/** Must match the server's create rule. */
export const TEMPLATE_CODE_PATTERN = /^[a-z0-9][a-z0-9-]{1,31}$/;

export const suggestTemplateCode = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32);

export const PREVIEW_MAX_BYTES = 4 * 1024 * 1024;
export const PREVIEW_TYPES = ["image/png", "image/jpeg", "image/webp"];

export const previewImageSrc = (template) =>
  template?.previewImageUrl ? `${ENV_CONFIG.apiBaseUrl}${template.previewImageUrl}` : null;

/** Shape the generator's PaystubThumbnail expects. */
export const toThumbnailTemplate = ({ code, title, subtitle, renderer, variant }) => ({
  id: code,
  title,
  subtitle,
  ...(variant || {}),
  ...(VARIANTLESS_RENDERERS.has(renderer) ? { document: renderer } : {}),
});
