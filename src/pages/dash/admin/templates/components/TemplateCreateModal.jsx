import React, { useRef } from "react";
import { toast } from "react-hot-toast";
import { LayoutTemplate } from "lucide-react";
import ProfileModal from "../../../../../Components/modal/ProfileModal";
import { describeRequestError } from "../../../customer/Profile/utils/profileFormat";
import { useTemplateForm } from "../hooks/useTemplateForm";
import { useTemplates } from "../hooks/useTemplates";
import TemplateFormFields from "./TemplateFormFields";

const FORM_ID = "template-create-form";

/** New templates only; editing has its own page. */
const TemplateCreateModal = ({ onClose, onCreated }) => {
  const { createTemplate, uploadTemplatePreview } = useTemplates();
  const form = useTemplateForm(null);
  const inFlightRef = useRef(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inFlightRef.current || !form.validateForm()) return;

    inFlightRef.current = true;
    form.setSubmitting(true);
    let created;
    try {
      ({ template: created } = await createTemplate(form.buildCreateBody()));
    } catch (err) {
      form.applyServerErrors(err, describeRequestError(err, "Couldn't create this template. Please try again."));
      inFlightRef.current = false;
      form.setSubmitting(false);
      return;
    }

    try {
      if (form.imageFile) await uploadTemplatePreview({ id: created.id, file: form.imageFile });
      toast.success(`${created.title} was created.`);
    } catch (err) {
      // The template itself was created; only the image step failed.
      toast.error(describeRequestError(err, `${created.title} was created, but the preview image couldn't be uploaded.`));
    }
    inFlightRef.current = false;
    form.setSubmitting(false);
    onCreated(created);
    onClose();
  };

  return (
    <ProfileModal
      open
      onClose={onClose}
      dismissible={!form.submitting}
      size="lg"
      icon={LayoutTemplate}
      title="New template"
      description="Pick a layout the document generator supports, then style it. New templates can be used once active."
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={form.submitting}
            className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form={FORM_ID}
            disabled={form.submitting}
            className="h-10 rounded-xl bg-secondary px-4 text-sm font-semibold text-white transition hover:bg-secondary/90 disabled:opacity-60 cursor-pointer"
          >
            {form.submitting ? "Creating…" : "Create template"}
          </button>
        </div>
      }
    >
      <TemplateFormFields form={form} formId={FORM_ID} onSubmit={handleSubmit} />
    </ProfileModal>
  );
};

export default TemplateCreateModal;
