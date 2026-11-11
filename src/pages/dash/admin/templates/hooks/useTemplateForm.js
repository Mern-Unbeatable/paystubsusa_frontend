import { useEffect, useRef, useState } from "react";
import {
  DEFAULT_VARIANT,
  PREVIEW_MAX_BYTES,
  PREVIEW_TYPES,
  RENDERERS_BY_TYPE,
  TEMPLATE_CODE_PATTERN,
  VARIANTLESS_RENDERERS,
  VARIANT_FIELDS,
  previewImageSrc,
  suggestTemplateCode,
} from "../utils/templateFormat";

const initialValues = (template) =>
  template
    ? {
        title: template.title,
        subtitle: template.subtitle || "",
        code: template.code,
        documentType: template.documentType,
        renderer: template.renderer,
        variant: template.variant || DEFAULT_VARIANT,
        sortOrder: String(template.sortOrder),
        isActive: template.isActive,
      }
    : {
        title: "",
        subtitle: "",
        code: "",
        documentType: "paystub",
        renderer: "variant",
        variant: DEFAULT_VARIANT,
        sortOrder: "0",
        isActive: true,
      };

const isIntInRange = (value, min, max) => /^\d+$/.test(value) && Number(value) >= min && Number(value) <= max;

function validate(values, isCreate) {
  const errors = {};
  const title = values.title.trim();
  if (!title) errors.title = "Enter a template name.";
  else if (title.length > 100) errors.title = "Use 100 characters or fewer.";
  if (values.subtitle.trim().length > 200) errors.subtitle = "Use 200 characters or fewer.";
  if (isCreate && !TEMPLATE_CODE_PATTERN.test(values.code)) {
    errors.code = "Use 2–32 lowercase letters, digits or hyphens, starting with a letter or digit.";
  }
  if (!isIntInRange(values.sortOrder, 0, 10_000)) errors.sortOrder = "Enter a whole number from 0 to 10000.";
  return errors;
}

const checkImage = (file) => {
  if (!PREVIEW_TYPES.includes(file.type)) return "Use a JPG, PNG or WebP image.";
  if (file.size > PREVIEW_MAX_BYTES) return "Image must be 4 MB or smaller.";
  return null;
};

const sameVariant = (a, b) => VARIANT_FIELDS.every(({ key }) => a?.[key] === b?.[key]);

/**
 * Form state shared by the create modal and the edit page (no `template` = create).
 * Code, document type and layout are fixed after creation; submitting is up to the caller.
 */
export function useTemplateForm(template) {
  const isCreate = !template;
  const [values, setValues] = useState(() => initialValues(template));
  const [codeTouched, setCodeTouched] = useState(!isCreate);
  // { file, url } for a picked image that is uploaded on save.
  const [image, setImage] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const objectUrlRef = useRef(null);

  useEffect(() => () => objectUrlRef.current && URL.revokeObjectURL(objectUrlRef.current), []);

  const replaceImage = (next) => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = next?.url ?? null;
    setImage(next);
  };

  const variantless = VARIANTLESS_RENDERERS.has(values.renderer);
  const layoutLocked = !isCreate && !template.canEditLayout;
  const imageFile = image?.file ?? null;
  const previewSrc = image?.url || (removeImage ? null : previewImageSrc(template));

  const set = (key) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && isCreate && !codeTouched) next.code = suggestTemplateCode(value);
      if (key === "documentType") next.renderer = RENDERERS_BY_TYPE[value][0];
      return next;
    });
    if (key === "code") setCodeTouched(true);
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const setVariant = (key) => (event) => {
    const { value } = event.target;
    setValues((prev) => ({ ...prev, variant: { ...prev.variant, [key]: value } }));
    setErrors((prev) => ({ ...prev, variant: undefined }));
  };

  const pickImage = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const problem = checkImage(file);
    setErrors((prev) => ({ ...prev, image: problem || undefined }));
    if (problem) return;
    replaceImage({ file, url: URL.createObjectURL(file) });
    setRemoveImage(false);
  };

  const clearImage = () => {
    replaceImage(null);
    setRemoveImage(Boolean(template?.previewImageUrl));
    setErrors((prev) => ({ ...prev, image: undefined }));
  };

  /** Runs client validation; false (with errors shown) when the form can't be submitted. */
  const validateForm = () => {
    const found = validate(values, isCreate);
    setErrors(found);
    setFormError(null);
    return Object.keys(found).length === 0;
  };

  const common = () => ({
    title: values.title.trim(),
    subtitle: values.subtitle.trim() || null,
    sortOrder: Number(values.sortOrder),
    isActive: values.isActive,
  });

  const buildCreateBody = () => ({
    ...common(),
    code: values.code,
    documentType: values.documentType,
    renderer: values.renderer,
    variant: variantless ? null : values.variant,
  });

  /** Only what changed, so untouched fields are preserved and the audit log records the real edit. */
  const buildChanges = () => {
    const changes = Object.fromEntries(
      Object.entries(common()).filter(([key, value]) => value !== (template[key] ?? null)),
    );
    if (!layoutLocked && !variantless && !sameVariant(values.variant, template.variant)) {
      changes.variant = values.variant;
    }
    return changes;
  };

  const applyServerErrors = (err, fallback) => {
    const serverErrors = Object.fromEntries(
      Object.entries(err?.fieldErrors || {}).map(([key, messages]) => [key, [].concat(messages)[0]]),
    );
    if (err?.code === "TEMPLATE_CODE_TAKEN") serverErrors.code = err.message;
    if (err?.code === "TEMPLATE_LAYOUT_LOCKED") serverErrors.variant = err.message;
    if (Object.keys(serverErrors).length > 0) setErrors(serverErrors);
    setFormError(fallback);
  };

  return {
    template,
    isCreate,
    values,
    errors,
    formError,
    submitting,
    setSubmitting,
    variantless,
    layoutLocked,
    imageFile,
    removeImage,
    previewSrc,
    set,
    setVariant,
    pickImage,
    clearImage,
    validateForm,
    buildCreateBody,
    buildChanges,
    applyServerErrors,
  };
}
