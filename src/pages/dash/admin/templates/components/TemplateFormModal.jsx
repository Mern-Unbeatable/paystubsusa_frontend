import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { ImagePlus, LayoutTemplate, Lock, Pencil, Trash2 } from "lucide-react";
import ProfileModal from "../../../../../Components/modal/ProfileModal";
import { describeRequestError } from "../../../customer/Profile/utils/profileFormat";
import { useTemplates } from "../hooks/useTemplates";
import {
  DEFAULT_VARIANT,
  DOCUMENT_TYPE_LABELS,
  PREVIEW_MAX_BYTES,
  PREVIEW_TYPES,
  RENDERERS_BY_TYPE,
  RENDERER_LABELS,
  TEMPLATE_CODE_PATTERN,
  VARIANTLESS_RENDERERS,
  VARIANT_FIELDS,
  previewImageSrc,
  suggestTemplateCode,
} from "../utils/templateFormat";
import { TemplatePreview } from "./TemplateCells";

const inputClass =
  "mt-1.5 h-10 w-full rounded-xl border px-3 text-sm text-slate-800 transition focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500";
const inputState = (hasError) =>
  hasError
    ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
    : "border-slate-200 focus:border-secondary focus:ring-secondary/20";

const Field = ({ id, label, hint, error, children }) => (
  <div>
    <label htmlFor={id} className="text-sm font-semibold text-slate-700">
      {label}
    </label>
    {children}
    {error ? (
      <p id={`${id}-error`} className="mt-1 text-xs font-medium text-rose-600">
        {error}
      </p>
    ) : (
      hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>
    )}
  </div>
);

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

/** Create (no `template`) or edit. Code, document type and layout are fixed after creation. */
const TemplateFormModal = ({ template, onClose, onSaved }) => {
  const { createTemplate, updateTemplate, uploadTemplatePreview, removeTemplatePreview } = useTemplates();
  const isCreate = !template;
  const [values, setValues] = useState(() => initialValues(template));
  const [codeTouched, setCodeTouched] = useState(!isCreate);
  // { file, url } for a picked image that is uploaded on save.
  const [image, setImage] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const inFlightRef = useRef(false);
  const fileInputRef = useRef(null);
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

  const buildBody = () => {
    const body = {
      title: values.title.trim(),
      subtitle: values.subtitle.trim() || null,
      sortOrder: Number(values.sortOrder),
      isActive: values.isActive,
    };
    if (isCreate) {
      return {
        ...body,
        code: values.code,
        documentType: values.documentType,
        renderer: values.renderer,
        variant: variantless ? null : values.variant,
      };
    }
    // Send only what changed so the audit log records the real edit.
    const changes = Object.fromEntries(
      Object.entries(body).filter(([key, value]) => value !== (template[key] ?? null)),
    );
    if (!layoutLocked && !variantless && !sameVariant(values.variant, template.variant)) {
      changes.variant = values.variant;
    }
    return changes;
  };

  const applyServerErrors = (err) => {
    const serverErrors = Object.fromEntries(
      Object.entries(err?.fieldErrors || {}).map(([key, messages]) => [key, [].concat(messages)[0]]),
    );
    if (err?.code === "TEMPLATE_CODE_TAKEN") serverErrors.code = err.message;
    if (err?.code === "TEMPLATE_LAYOUT_LOCKED") serverErrors.variant = err.message;
    if (Object.keys(serverErrors).length > 0) setErrors(serverErrors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inFlightRef.current) return;
    const found = validate(values, isCreate);
    setErrors(found);
    setFormError(null);
    if (Object.keys(found).length > 0) return;

    const body = buildBody();
    const imageChange = Boolean(imageFile) || removeImage;
    if (!isCreate && Object.keys(body).length === 0 && !imageChange) {
      onClose();
      return;
    }

    inFlightRef.current = true;
    setSubmitting(true);
    let saved = template;
    try {
      if (isCreate) ({ template: saved } = await createTemplate(body));
      else if (Object.keys(body).length > 0) ({ template: saved } = await updateTemplate({ id: template.id, changes: body }));
    } catch (err) {
      applyServerErrors(err);
      setFormError(describeRequestError(err, "Couldn't save this template. Please try again."));
      inFlightRef.current = false;
      setSubmitting(false);
      return;
    }

    try {
      if (imageFile) await uploadTemplatePreview({ id: saved.id, file: imageFile });
      else if (removeImage) await removeTemplatePreview(saved.id);
      toast.success(isCreate ? `${saved.title} was created.` : `${saved.title} was updated.`);
    } catch (err) {
      // The template itself was saved; only the image step failed.
      toast.error(describeRequestError(err, `${saved.title} was saved, but the preview image couldn't be updated.`));
    } finally {
      inFlightRef.current = false;
      setSubmitting(false);
    }
    onSaved(saved);
    onClose();
  };

  const a11y = (key, id) => ({
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `${id}-error` : undefined,
  });

  const livePreview = {
    code: values.code,
    title: values.title || "Untitled template",
    subtitle: values.subtitle,
    renderer: values.renderer,
    variant: variantless ? null : values.variant,
  };

  return (
    <ProfileModal
      open
      onClose={onClose}
      dismissible={!submitting}
      size="lg"
      icon={isCreate ? LayoutTemplate : Pencil}
      title={isCreate ? "New template" : "Edit template"}
      description={
        isCreate
          ? "Pick a layout the document generator supports, then style it. New templates can be used once active."
          : "Changes apply to new documents. The layout of a template that has issued documents stays fixed."
      }
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="template-form"
            disabled={submitting}
            className="h-10 rounded-xl bg-secondary px-4 text-sm font-semibold text-white transition hover:bg-secondary/90 disabled:opacity-60 cursor-pointer"
          >
            {submitting ? "Saving…" : isCreate ? "Create template" : "Save changes"}
          </button>
        </div>
      }
    >
      <form id="template-form" onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="template-title" label="Name" error={errors.title}>
            <input
              id="template-title"
              data-autofocus
              value={values.title}
              onChange={set("title")}
              maxLength={100}
              disabled={submitting}
              {...a11y("title", "template-title")}
              className={`${inputClass} ${inputState(errors.title)}`}
            />
          </Field>

          <Field
            id="template-code"
            label="Code"
            error={errors.code}
            hint={isCreate ? "Unique per document type; can't be changed later." : "Codes can't be changed."}
          >
            <input
              id="template-code"
              value={values.code}
              onChange={(e) => {
                setCodeTouched(true);
                set("code")(e);
              }}
              maxLength={32}
              disabled={!isCreate || submitting}
              {...a11y("code", "template-code")}
              className={`${inputClass} font-mono ${inputState(errors.code)}`}
            />
          </Field>

          <div className="sm:col-span-2">
            <Field id="template-subtitle" label="Subtitle" error={errors.subtitle} hint="Optional, e.g. “Modern layout”.">
              <input
                id="template-subtitle"
                value={values.subtitle}
                onChange={set("subtitle")}
                maxLength={200}
                disabled={submitting}
                {...a11y("subtitle", "template-subtitle")}
                className={`${inputClass} ${inputState(errors.subtitle)}`}
              />
            </Field>
          </div>

          <Field id="template-document-type" label="Document type" hint={isCreate ? undefined : "Fixed after creation."}>
            <select
              id="template-document-type"
              value={values.documentType}
              onChange={set("documentType")}
              disabled={!isCreate || submitting}
              className={`${inputClass} ${inputState(false)} cursor-pointer`}
            >
              {Object.entries(DOCUMENT_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>

          <Field
            id="template-renderer"
            label="Layout"
            error={errors.renderer}
            hint={isCreate ? undefined : "Fixed after creation."}
          >
            <select
              id="template-renderer"
              value={values.renderer}
              onChange={set("renderer")}
              disabled={!isCreate || submitting}
              {...a11y("renderer", "template-renderer")}
              className={`${inputClass} ${inputState(errors.renderer)} cursor-pointer`}
            >
              {RENDERERS_BY_TYPE[values.documentType].map((renderer) => (
                <option key={renderer} value={renderer}>
                  {RENDERER_LABELS[renderer]}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <section className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 md:grid-cols-[minmax(0,1fr)_200px]">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-slate-800">Style</h3>
              {layoutLocked && !variantless && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                  <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                  {template.isSystem ? "Built-in layout" : "Used by issued documents"}
                </span>
              )}
            </div>
            {variantless ? (
              <p className="text-sm text-slate-500">This full-page layout has no style options.</p>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
                {VARIANT_FIELDS.map(({ key, label, options }) => (
                  <Field key={key} id={`template-${key}`} label={label}>
                    <select
                      id={`template-${key}`}
                      value={values.variant[key]}
                      onChange={setVariant(key)}
                      disabled={layoutLocked || submitting}
                      className={`${inputClass} ${inputState(errors.variant)} cursor-pointer bg-white`}
                    >
                      {options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                ))}
              </div>
            )}
            {errors.variant && <p className="text-xs font-medium text-rose-600">{errors.variant}</p>}
          </div>
          <div>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">Layout preview</p>
            <TemplatePreview template={livePreview} imageSrc={null} className="shadow-sm" />
          </div>
        </section>

        <section className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-slate-800">Preview image</h3>
            <span className="text-xs text-slate-400">Optional · JPG, PNG or WebP · up to 4 MB</span>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-slate-200 p-3 sm:flex-row sm:items-center">
            <div className="flex h-28 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
              {previewSrc ? (
                <img src={previewSrc} alt="Template preview" className="h-full w-full object-cover object-top" />
              ) : (
                <ImagePlus className="h-6 w-6 text-slate-300" aria-hidden="true" />
              )}
            </div>
            <div className="min-w-0 flex-1 space-y-2">
              <p className="text-sm text-slate-500">
                {previewSrc
                  ? "Shown on template cards instead of the rendered layout."
                  : "Without an image, cards show the layout rendered with sample data."}
              </p>
              <div className="flex flex-wrap gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={PREVIEW_TYPES.join(",")}
                  onChange={pickImage}
                  className="hidden"
                  aria-label="Choose a preview image"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={submitting}
                  className="inline-flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
                >
                  <ImagePlus className="h-4 w-4" />
                  {previewSrc ? "Replace image" : "Upload image"}
                </button>
                {previewSrc && (
                  <button
                    type="button"
                    onClick={clearImage}
                    disabled={submitting}
                    className="inline-flex h-9 items-center gap-2 rounded-xl border border-rose-100 bg-white px-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 disabled:opacity-50 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                )}
              </div>
              {errors.image && <p className="text-xs font-medium text-rose-600">{errors.image}</p>}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="template-sort" label="Sort order" error={errors.sortOrder} hint="Lower numbers appear first.">
            <input
              id="template-sort"
              inputMode="numeric"
              value={values.sortOrder}
              onChange={set("sortOrder")}
              disabled={submitting}
              {...a11y("sortOrder", "template-sort")}
              className={`${inputClass} ${inputState(errors.sortOrder)}`}
            />
          </Field>

          <div className="flex items-end">
            <label className="flex h-10 w-full cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={values.isActive}
                onChange={set("isActive")}
                disabled={submitting || Boolean(template?.isDefault)}
                className="h-4 w-4 accent-secondary"
              />
              Active (available to customers)
            </label>
          </div>
        </div>

        {formError && (
          <p role="alert" className="rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
            {formError}
          </p>
        )}
      </form>
    </ProfileModal>
  );
};

export default TemplateFormModal;
