import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-hot-toast";
import { AlertTriangle, ArrowLeft, FileQuestion, Lock } from "lucide-react";
import { DashboardHeader } from "../../../../Components/Dashboard";
import { PATHS } from "../../../../config/paths";
import { describeRequestError } from "../../customer/Profile/utils/profileFormat";
import TemplateBuilderForm from "./components/TemplateBuilderForm";
import { DocumentTypeLabel, TemplateStatus } from "./components/TemplateCells";
import { useTemplateForm } from "./hooks/useTemplateForm";
import { useTemplates } from "./hooks/useTemplates";
import { builderCard, formatShortDate, primaryButton, secondaryButton } from "./utils/templateFormat";

const StateCard = ({ icon: Icon, tone, title, message, children }) => (
  <div className={`${builderCard} flex flex-col items-center px-6 py-14 text-center`}>
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
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_400px] xl:grid-cols-[minmax(0,1fr)_440px]" aria-busy="true" aria-label="Loading template">
    <div className="aspect-[210/297] max-h-[70vh] animate-pulse rounded-2xl bg-slate-100" />
    <div className="space-y-3">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-16 animate-pulse rounded-2xl bg-slate-100" />
      ))}
    </div>
  </div>
);

/** Mounted once the template is loaded, so the form starts from the server's current values. */
const TemplateEditForm = ({ template, onDone }) => {
  const { updateTemplate, uploadTemplatePreview, removeTemplatePreview } = useTemplates();
  const form = useTemplateForm(template);

  const save = async () => {
    const changes = form.buildChanges();
    const hasChanges = Object.keys(changes).length > 0;
    if (!hasChanges && !form.imageFile && !form.removeImage) {
      onDone();
      return;
    }

    try {
      if (hasChanges) await updateTemplate({ id: template.id, changes });
    } catch (err) {
      const message = describeRequestError(err, "Couldn't save this template. Please try again.");
      form.applyServerErrors(err, message);
      toast.error(message);
      return;
    }

    try {
      if (form.imageFile) await uploadTemplatePreview({ id: template.id, file: form.imageFile });
      else if (form.removeImage) await removeTemplatePreview(template.id);
    } catch (err) {
      // The fields were saved; stay here so the image step can be retried.
      toast.error(describeRequestError(err, "Your changes were saved, but the preview image couldn't be updated."));
      return;
    }

    toast.success(`${form.values.title.trim()} was updated.`);
    onDone();
  };

  return (
    <TemplateBuilderForm
      form={form}
      onSave={save}
      onCancel={onDone}
      submitLabel="Save changes"
      submittingLabel="Saving…"
      idleNote="All changes saved. Changes apply to new documents only."
      requireChanges
    />
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
