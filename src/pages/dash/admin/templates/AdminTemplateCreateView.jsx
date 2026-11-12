import React, { useCallback } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { DashboardHeader } from "../../../../Components/Dashboard";
import { PATHS, buildAdminTemplateEditPath } from "../../../../config/paths";
import { describeRequestError } from "../../customer/Profile/utils/profileFormat";
import TemplateBuilderForm from "./components/TemplateBuilderForm";
import { useTemplateForm } from "./hooks/useTemplateForm";
import { useTemplates } from "./hooks/useTemplates";

const AdminTemplateCreateView = () => {
  const navigate = useNavigate();
  const { createTemplate, uploadTemplatePreview } = useTemplates();
  const form = useTemplateForm(null);

  const backToList = useCallback(() => navigate(PATHS.ADMIN.templates), [navigate]);

  const save = async () => {
    let created;
    try {
      ({ template: created } = await createTemplate(form.buildCreateBody()));
    } catch (err) {
      const message = describeRequestError(err, "Couldn't create this template. Please try again.");
      form.applyServerErrors(err, message);
      toast.error(message);
      return;
    }

    if (form.imageFile) {
      try {
        await uploadTemplatePreview({ id: created.id, file: form.imageFile });
      } catch (err) {
        // The template exists now; continue on its edit page so the image can be retried there.
        toast.error(describeRequestError(err, `${created.title} was created, but the preview image couldn't be uploaded.`));
        navigate(buildAdminTemplateEditPath(created.id), { replace: true });
        return;
      }
    }

    toast.success(`${created.title} was created.`);
    backToList();
  };

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
        title="New template"
        description="Pick a layout the document generator supports, then style it. New templates can be used once active."
      />

      <TemplateBuilderForm
        form={form}
        onSave={save}
        onCancel={backToList}
        submitLabel="Create template"
        submittingLabel="Creating…"
        idleNote="Fill in the details, then create the template."
      />
    </div>
  );
};

export default AdminTemplateCreateView;
