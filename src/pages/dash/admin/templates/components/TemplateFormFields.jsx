import React, { useRef } from "react";
import { ImagePlus, Lock, Trash2 } from "lucide-react";
import {
  DOCUMENT_TYPE_LABELS,
  PREVIEW_TYPES,
  RENDERERS_BY_TYPE,
  RENDERER_LABELS,
  VARIANT_FIELDS,
  inputClass,
  inputState,
  livePreviewTemplate,
} from "../utils/templateFormat";
import { TemplatePreview } from "./TemplateCells";

export const Field = ({ id, label, hint, error, children }) => (
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

const a11y = (errors, key, id) => ({
  "aria-invalid": Boolean(errors[key]),
  "aria-describedby": errors[key] ? `${id}-error` : undefined,
});

/** Name, code, description, category and layout. */
export const TemplateDetailsFields = ({ form, compact = false }) => {
  const { isCreate, values, errors, submitting, set } = form;
  return (
    <div className={`grid grid-cols-1 gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
      <Field id="template-title" label="Name" error={errors.title}>
        <input
          id="template-title"
          data-autofocus
          value={values.title}
          onChange={set("title")}
          maxLength={100}
          disabled={submitting}
          {...a11y(errors, "title", "template-title")}
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
          onChange={set("code")}
          maxLength={32}
          disabled={!isCreate || submitting}
          {...a11y(errors, "code", "template-code")}
          className={`${inputClass} font-mono ${inputState(errors.code)}`}
        />
      </Field>

      <div className={compact ? "" : "sm:col-span-2"}>
        <Field id="template-subtitle" label="Description" error={errors.subtitle} hint="Shown under the name, e.g. “Modern layout”.">
          <input
            id="template-subtitle"
            value={values.subtitle}
            onChange={set("subtitle")}
            maxLength={200}
            disabled={submitting}
            {...a11y(errors, "subtitle", "template-subtitle")}
            className={`${inputClass} ${inputState(errors.subtitle)}`}
          />
        </Field>
      </div>

      <Field id="template-document-type" label="Category" hint={isCreate ? undefined : "Fixed after creation."}>
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

      <Field id="template-renderer" label="Layout" error={errors.renderer} hint={isCreate ? undefined : "Fixed after creation."}>
        <select
          id="template-renderer"
          value={values.renderer}
          onChange={set("renderer")}
          disabled={!isCreate || submitting}
          {...a11y(errors, "renderer", "template-renderer")}
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
  );
};

/** Why style edits are disabled, or null when they're allowed. */
export const LayoutLockNote = ({ form }) =>
  form.layoutLocked && !form.variantless ? (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
      <Lock className="h-3.5 w-3.5" aria-hidden="true" />
      {form.template.isSystem ? "Built-in layout" : "Used by issued documents"}
    </span>
  ) : null;

/** Header, net pay and table style selects. */
export const TemplateVariantFields = ({ form, columns = "sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3" }) => {
  const { values, errors, submitting, variantless, layoutLocked, setVariant } = form;
  if (variantless) return <p className="text-sm text-slate-500">This full-page layout has no style options.</p>;
  return (
    <div className={`grid grid-cols-1 gap-3 ${columns}`}>
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
  );
};

export const TemplateImageField = ({ form }) => {
  const { errors, submitting, previewSrc, pickImage, clearImage } = form;
  const fileInputRef = useRef(null);
  return (
    <div className="space-y-2">
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
          <p className="text-xs text-slate-400">Optional · JPG, PNG or WebP · up to 4 MB</p>
          {errors.image && <p className="text-xs font-medium text-rose-600">{errors.image}</p>}
        </div>
      </div>
    </div>
  );
};

/** Sort order and availability. */
export const TemplatePublishFields = ({ form, compact = false }) => {
  const { template, values, errors, submitting, set } = form;
  return (
    <div className={`grid grid-cols-1 gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
      <Field id="template-sort" label="Sort order" error={errors.sortOrder} hint="Lower numbers appear first.">
        <input
          id="template-sort"
          inputMode="numeric"
          value={values.sortOrder}
          onChange={set("sortOrder")}
          disabled={submitting}
          {...a11y(errors, "sortOrder", "template-sort")}
          className={`${inputClass} ${inputState(errors.sortOrder)}`}
        />
      </Field>

      <div className="flex flex-col justify-end">
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
        {template?.isDefault && <p className="mt-1 text-xs text-slate-400">The default template can't be deactivated.</p>}
      </div>
    </div>
  );
};

export const FormErrorAlert = ({ message }) =>
  message ? (
    <p role="alert" className="rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
      {message}
    </p>
  ) : null;

/** All fields for `useTemplateForm`; the caller owns submit and the action buttons (`form={formId}`). */
const TemplateFormFields = ({ form, formId, onSubmit }) => (
  <form id={formId} onSubmit={onSubmit} className="space-y-5" noValidate>
    <TemplateDetailsFields form={form} />

    <section className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 md:grid-cols-[minmax(0,1fr)_200px]">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-slate-800">Style</h3>
          <LayoutLockNote form={form} />
        </div>
        <TemplateVariantFields form={form} />
        {form.errors.variant && <p className="text-xs font-medium text-rose-600">{form.errors.variant}</p>}
      </div>
      <div>
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">Layout preview</p>
        <TemplatePreview template={livePreviewTemplate(form)} imageSrc={null} className="shadow-sm" />
      </div>
    </section>

    <section className="space-y-2">
      <h3 className="text-sm font-semibold text-slate-800">Preview image</h3>
      <TemplateImageField form={form} />
    </section>

    <TemplatePublishFields form={form} />

    <FormErrorAlert message={form.formError} />
  </form>
);

export default TemplateFormFields;
