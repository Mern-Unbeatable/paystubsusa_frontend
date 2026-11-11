import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-hot-toast";
import {
  AlertTriangle,
  ArrowLeft,
  ChevronDown,
  FileQuestion,
  FileText,
  Image as ImageIcon,
  LayoutTemplate,
  Lock,
  Palette,
  RotateCcw,
  Ruler,
  Type,
} from "lucide-react";
import { DashboardHeader } from "../../../../Components/Dashboard";
import ConfirmModal from "../../../../Components/modal/ConfirmModal";
import { PATHS } from "../../../../config/paths";
import { describeRequestError } from "../../customer/Profile/utils/profileFormat";
import {
  FormErrorAlert,
  LayoutLockNote,
  TemplateDetailsFields,
  TemplateImageField,
  TemplatePublishFields,
  TemplateVariantFields,
} from "./components/TemplateFormFields";
import TemplateBuilderPreview from "./components/TemplateBuilderPreview";
import { ColorControls, SpacingControls, TypographyControls } from "./components/ThemeControls";
import { DocumentTypeLabel, TemplateStatus } from "./components/TemplateCells";
import { useTemplateForm } from "./hooks/useTemplateForm";
import { useTemplates } from "./hooks/useTemplates";
import { RENDERER_LABELS, formatShortDate, livePreviewTemplate } from "./utils/templateFormat";

const FORM_ID = "template-edit-form";

const card = "rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]";

const StateCard = ({ icon: Icon, tone, title, message, children }) => (
  <div className={`${card} flex flex-col items-center px-6 py-14 text-center`}>
    {Icon && (
      <span className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${tone}`}>
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
    )}
    <h2 className="text-base font-bold text-slate-900">{title}</h2>
    <p className="mt-1 max-w-md text-sm text-slate-500">{message}</p>
    <div className="mt-5 flex flex-wrap justify-center gap-2">{children}</div>
  </div>
);

const LoadingCard = () => (
  <div className={`${card} space-y-5 p-5 sm:p-6`} aria-busy="true" aria-label="Loading template">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-3.5 w-24 animate-pulse rounded bg-slate-100" />
          <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
        </div>
      ))}
    </div>
    <div className="h-48 animate-pulse rounded-2xl bg-slate-100" />
    <div className="h-28 animate-pulse rounded-2xl bg-slate-100" />
  </div>
);

const secondaryButton =
  "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 cursor-pointer";
const primaryButton =
  "inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-secondary px-4 text-sm font-semibold text-white transition hover:bg-secondary/90 disabled:opacity-60 cursor-pointer";

/** `hasError` keeps the section open so validation messages stay visible. */
const BuilderSection = ({ title, icon, aside, defaultOpen = false, hasError = false, children }) => {
  const [expanded, setOpen] = useState(defaultOpen);
  const open = expanded || hasError;
  const Icon = icon;
  const contentId = useId();
  return (
    <section className={card}>
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

/** Mounted once the template is loaded, so the form starts from the server's current values. */
const TemplateEditForm = ({ template, onDone }) => {
  const { updateTemplate, uploadTemplatePreview, removeTemplatePreview } = useTemplates();
  const form = useTemplateForm(template);
  const inFlightRef = useRef(false);
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const { dirty } = form;

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (event) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const handleCancel = () => (dirty ? setConfirmDiscard(true) : onDone());

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

    const changes = form.buildChanges();
    const hasChanges = Object.keys(changes).length > 0;
    if (!hasChanges && !form.imageFile && !form.removeImage) {
      onDone();
      return;
    }

    inFlightRef.current = true;
    form.setSubmitting(true);
    try {
      if (hasChanges) await updateTemplate({ id: template.id, changes });
    } catch (err) {
      const message = describeRequestError(err, "Couldn't save this template. Please try again.");
      form.applyServerErrors(err, message);
      toast.error(message);
      inFlightRef.current = false;
      form.setSubmitting(false);
      return;
    }

    try {
      if (form.imageFile) await uploadTemplatePreview({ id: template.id, file: form.imageFile });
      else if (form.removeImage) await removeTemplatePreview(template.id);
    } catch (err) {
      // The fields were saved; stay here so the image step can be retried.
      toast.error(describeRequestError(err, "Your changes were saved, but the preview image couldn't be updated."));
      inFlightRef.current = false;
      form.setSubmitting(false);
      return;
    }

    toast.success(`${form.values.title.trim()} was updated.`);
    onDone();
  };

  const styleLocked = form.layoutLocked && !form.variantless;
  const themeAside =
    form.themeable && styleLocked ? (
      <LayoutLockNote form={form} />
    ) : null;

  return (
    <form
      id={FORM_ID}
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
          hasError={Boolean(form.errors.title || form.errors.subtitle || form.errors.sortOrder)}
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
          hasError={Boolean(form.errors.variant)}
        >
          <TemplateVariantFields form={form} columns="" />
          {form.errors.variant && <p className="mt-3 text-xs font-medium text-rose-600">{form.errors.variant}</p>}
        </BuilderSection>

        {form.themeable ? (
          <>
            {styleLocked && (
              <p className="flex gap-2 rounded-xl bg-amber-50 px-3.5 py-2.5 text-xs leading-relaxed text-amber-800">
                <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {template.isSystem
                  ? "Built-in templates can't be restyled. Create a new template to customise colours, typography and spacing."
                  : "Documents were issued with this template, so its style is frozen. Create a new template to restyle it."}
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
                    disabled={form.submitting}
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

        <BuilderSection title="Images" icon={ImageIcon} hasError={Boolean(form.errors.image)}>
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
            <span className="text-slate-400">All changes saved. Changes apply to new documents only.</span>
          )}
        </p>
        <div className="flex flex-col-reverse gap-2 sm:flex-row">
          <button type="button" onClick={handleReset} disabled={!dirty || form.submitting} className={secondaryButton}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Reset
          </button>
          <button type="button" onClick={handleCancel} disabled={form.submitting} className={secondaryButton}>
            Cancel
          </button>
          <button type="submit" disabled={!dirty || form.submitting} className={primaryButton}>
            {form.submitting ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>

      <ConfirmModal
        open={confirmDiscard}
        onClose={() => setConfirmDiscard(false)}
        onConfirm={async () => onDone()}
        icon={AlertTriangle}
        tone="danger"
        title="Discard unsaved changes?"
        confirmLabel="Discard changes"
      >
        <p className="text-sm leading-relaxed text-slate-600">Your edits to this template haven't been saved and will be lost.</p>
      </ConfirmModal>
    </form>
  );
};

const AdminTemplateEditView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { details, loadTemplateDetails } = useTemplates();
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const request = loadTemplateDetails(id);
    return () => request.abort();
  }, [id, reloadKey, loadTemplateDetails]);

  const backToList = useCallback(() => navigate(PATHS.ADMIN.templates), [navigate]);

  const current = details.id === id ? details : null;
  const template = current && !current.loading ? current.template : null;
  const error = current && !current.loading ? current.error : null;
  // A malformed id is rejected with 422 before lookup; both mean there is nothing to edit.
  const missing = error && [404, 422].includes(error.status);

  let content;
  if (missing) {
    content = (
      <StateCard
        icon={FileQuestion}
        tone="bg-slate-100 text-slate-500"
        title="Template not found"
        message="It may have been deleted, or the link is incorrect."
      >
        <button type="button" onClick={backToList} className={primaryButton}>
          Back to templates
        </button>
      </StateCard>
    );
  } else if (error) {
    content = (
      <StateCard
        icon={AlertTriangle}
        tone="bg-rose-50 text-rose-500"
        title="Couldn't load this template"
        message={describeRequestError(error, "Something went wrong. Please try again.")}
      >
        <button type="button" onClick={backToList} className={secondaryButton}>
          Back to templates
        </button>
        <button type="button" onClick={() => setReloadKey((k) => k + 1)} className={primaryButton}>
          Try again
        </button>
      </StateCard>
    );
  } else if (!template) {
    content = <LoadingCard />;
  } else {
    content = <TemplateEditForm key={template.id} template={template} onDone={backToList} />;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <button
        type="button"
        onClick={backToList}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-secondary cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        Templates
      </button>

      <DashboardHeader
        title={template ? `Edit ${template.title}` : "Edit template"}
        description={
          template ? (
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <DocumentTypeLabel template={template} />
              <span aria-hidden="true">·</span>
              <span className="font-mono">{template.code}</span>
              <span aria-hidden="true">·</span>
              <span>
                {template.usage?.documents ?? 0} document{template.usage?.documents === 1 ? "" : "s"} issued
              </span>
              <span aria-hidden="true">·</span>
              <span>Updated {formatShortDate(template.updatedAt)}</span>
            </span>
          ) : (
            "Update the name, description, style, status and preview image."
          )
        }
        badge={
          template && (
            <span className="inline-flex items-center gap-1.5">
              <TemplateStatus template={template} />
              {template.isSystem && (
                <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                  <Lock className="h-3 w-3" aria-hidden="true" />
                  Built-in
                </span>
              )}
            </span>
          )
        }
      />

      {content}
    </div>
  );
};

export default AdminTemplateEditView;
