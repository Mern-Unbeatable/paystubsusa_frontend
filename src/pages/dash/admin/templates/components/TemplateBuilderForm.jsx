import React, { useEffect, useId, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import {
  AlertTriangle,
  ChevronDown,
  FileText,
  Image as ImageIcon,
  LayoutTemplate,
  Lock,
  Palette,
  RotateCcw,
  Ruler,
  Type,
} from "lucide-react";
import ConfirmModal from "../../../../../Components/modal/ConfirmModal";
import {
  FormErrorAlert,
  LayoutLockNote,
  TemplateDetailsFields,
  TemplateImageField,
  TemplatePublishFields,
  TemplateVariantFields,
} from "./TemplateFormFields";
import TemplateBuilderPreview from "./TemplateBuilderPreview";
import { ColorControls, SpacingControls, TypographyControls } from "./ThemeControls";
import {
  RENDERER_LABELS,
  builderCard,
  livePreviewTemplate,
  primaryButton,
  secondaryButton,
} from "../utils/templateFormat";

/** `hasError` keeps the section open so validation messages stay visible. */
const BuilderSection = ({ title, icon, aside, defaultOpen = false, hasError = false, children }) => {
  const [expanded, setOpen] = useState(defaultOpen);
  const open = expanded || hasError;
  const Icon = icon;
  const contentId = useId();
  return (
    <section className={builderCard}>
      <div className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={contentId}
          className="flex min-w-0 flex-1 items-center gap-2.5 text-left cursor-pointer"
        >
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="flex-1 truncate text-sm font-bold text-slate-800">{title}</span>
          <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
        {aside}
      </div>
      <div id={contentId} hidden={!open} className="border-t border-slate-100 px-4 py-4 sm:px-5">
        {children}
      </div>
    </section>
  );
};

/**
 * Two-panel builder (live preview + collapsible controls) for `useTemplateForm`, shared by
 * the create and edit pages. `onSave` runs after client validation and owns the API calls,
 * error handling and navigation; `requireChanges` disables saving until something changed.
 */
const TemplateBuilderForm = ({ form, onSave, onCancel, submitLabel, submittingLabel, idleNote, requireChanges = false }) => {
  const inFlightRef = useRef(false);
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const { dirty, submitting, errors } = form;

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (event) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const handleCancel = () => (dirty ? setConfirmDiscard(true) : onCancel());

  const handleReset = () => {
    form.reset();
    toast("Changes discarded.");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inFlightRef.current) return;
    if (!form.validateForm()) {
      toast.error("Fix the highlighted fields before saving.");
      return;
    }
    inFlightRef.current = true;
    form.setSubmitting(true);
    try {
      await onSave();
    } finally {
      inFlightRef.current = false;
      form.setSubmitting(false);
    }
  };

  const styleLocked = form.layoutLocked && !form.variantless;
  const themeAside = form.themeable && styleLocked ? <LayoutLockNote form={form} /> : null;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_400px] xl:grid-cols-[minmax(0,1fr)_440px]"
    >
      <div className="lg:sticky lg:top-6 lg:self-start">
        <TemplateBuilderPreview template={livePreviewTemplate(form)} />
      </div>

      <div className="space-y-3">
        <BuilderSection
          title="Content & details"
          icon={FileText}
          defaultOpen
          hasError={Boolean(errors.title || errors.subtitle || errors.code || errors.renderer || errors.sortOrder)}
        >
          <div className="space-y-4">
            <TemplateDetailsFields form={form} compact />
            <TemplatePublishFields form={form} compact />
          </div>
        </BuilderSection>

        <BuilderSection
          title="Layout style"
          icon={LayoutTemplate}
          aside={<LayoutLockNote form={form} />}
          defaultOpen
          hasError={Boolean(errors.variant)}
        >
          <TemplateVariantFields form={form} columns="" />
          {errors.variant && <p className="mt-3 text-xs font-medium text-rose-600">{errors.variant}</p>}
        </BuilderSection>

        {form.themeable ? (
          <>
            {styleLocked && (
              <p className="flex gap-2 rounded-xl bg-amber-50 px-3.5 py-2.5 text-xs leading-relaxed text-amber-800">
                <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Documents were issued with this template, so its style is frozen. Create a new template to restyle it.
              </p>
            )}
            <BuilderSection
              title="Colours"
              icon={Palette}
              aside={
                themeAside ??
                (form.theme && (
                  <button
                    type="button"
                    onClick={form.clearTheme}
                    disabled={submitting}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 transition hover:text-secondary cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    Default style
                  </button>
                ))
              }
            >
              <ColorControls form={form} />
            </BuilderSection>
            <BuilderSection title="Typography" icon={Type} aside={themeAside}>
              <TypographyControls form={form} />
            </BuilderSection>
            <BuilderSection title="Layout & spacing" icon={Ruler} aside={themeAside}>
              <SpacingControls form={form} />
            </BuilderSection>
          </>
        ) : (
          <p className="rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-xs leading-relaxed text-slate-500">
            Colours, typography and spacing can be customised on the “{RENDERER_LABELS.variant}” layout only.
          </p>
        )}

        <BuilderSection title="Images" icon={ImageIcon} hasError={Boolean(errors.image)}>
          <TemplateImageField form={form} />
        </BuilderSection>

        <FormErrorAlert message={form.formError} />
      </div>

      <div className="sticky bottom-0 z-10 -mx-1 flex flex-col-reverse gap-3 rounded-2xl border border-slate-200/80 bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgba(15,23,42,0.06)] backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-5 lg:col-span-2">
        <p className="flex items-center gap-2 text-xs font-medium" aria-live="polite">
          {dirty ? (
            <>
              <span className="h-2 w-2 rounded-full bg-amber-500" aria-hidden="true" />
              <span className="text-amber-700">Unsaved changes</span>
            </>
          ) : (
            <span className="text-slate-400">{idleNote}</span>
          )}
        </p>
        <div className="flex flex-col-reverse gap-2 sm:flex-row">
          <button type="button" onClick={handleReset} disabled={!dirty || submitting} className={secondaryButton}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Reset
          </button>
          <button type="button" onClick={handleCancel} disabled={submitting} className={secondaryButton}>
            Cancel
          </button>
          <button type="submit" disabled={(requireChanges && !dirty) || submitting} className={primaryButton}>
            {submitting ? submittingLabel : submitLabel}
          </button>
        </div>
      </div>

      <ConfirmModal
        open={confirmDiscard}
        onClose={() => setConfirmDiscard(false)}
        onConfirm={async () => onCancel()}
        icon={AlertTriangle}
        tone="danger"
        title="Discard unsaved changes?"
        confirmLabel="Discard changes"
      >
        <p className="text-sm leading-relaxed text-slate-600">Your edits haven't been saved and will be lost.</p>
      </ConfirmModal>
    </form>
  );
};

export default TemplateBuilderForm;
