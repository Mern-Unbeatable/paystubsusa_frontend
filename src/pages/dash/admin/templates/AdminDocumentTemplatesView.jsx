import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { Plus, Power, PowerOff, Star, Trash2 } from "lucide-react";
import { DashboardHeader } from "../../../../Components/Dashboard";
import ConfirmModal from "../../../../Components/modal/ConfirmModal";
import { PATHS, buildAdminTemplateEditPath } from "../../../../config/paths";
import { describeRequestError } from "../../customer/Profile/utils/profileFormat";
import { useTemplates } from "./hooks/useTemplates";
import TemplateDetailsModal from "./components/TemplateDetailsModal";
import { AdminTemplateCard, TemplateCardSkeleton } from "./components/TemplateCells";
import { DOCUMENT_TYPE_LABELS } from "./utils/templateFormat";

// The server's page-size cap; the library holds a few dozen templates at most.
const ALL_TEMPLATES = { page: 1, pageSize: 100 };

const AdminDocumentTemplatesView = () => {
  const {
    templates,
    loading,
    error,
    loadTemplates,
    updateTemplate,
    setDefaultTemplate,
    deleteTemplate: removeTemplate,
  } = useTemplates();
  const [reloadKey, setReloadKey] = useState(0);
  const navigate = useNavigate();
  // { type: "view" | "default" | "toggle" | "delete", template }
  const [dialog, setDialog] = useState(null);
  const open = (type) => (template) => setDialog({ type, template });
  const closeDialog = () => setDialog(null);
  const editTemplate = (template) => navigate(buildAdminTemplateEditPath(template.id));

  useEffect(() => {
    const request = loadTemplates(ALL_TEMPLATES);
    return () => request.abort();
  }, [reloadKey, loadTemplates]);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  const toggleActive = async () => {
    const { template } = dialog;
    await updateTemplate({ id: template.id, changes: { isActive: !template.isActive } });
    toast.success(`${template.title} was ${template.isActive ? "deactivated" : "activated"}.`);
  };

  const makeDefault = async () => {
    const { template } = dialog;
    await setDefaultTemplate(template.id);
    toast.success(`${template.title} is now the default ${DOCUMENT_TYPE_LABELS[template.documentType]} template.`);
  };

  const deleteTemplate = async () => {
    const { template } = dialog;
    await removeTemplate(template.id);
    toast.success(`${template.title} was deleted.`);
  };

  const groups = Object.entries(DOCUMENT_TYPE_LABELS)
    .map(([type, label]) => ({ type, label, items: templates.filter((t) => t.documentType === type) }))
    .filter((group) => group.items.length > 0);
  const showSkeleton = loading && templates.length === 0;
  const target = dialog?.template;

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Document Templates"
        description="Manage the document templates available to customers."
        action={
          <button
            type="button"
            onClick={() => navigate(PATHS.ADMIN.templateNew)}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-secondary px-4 text-sm font-semibold text-white transition hover:bg-secondary/90 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            New template
          </button>
        }
      />

      {error && (
        <div
          role="alert"
          className="flex flex-col gap-2 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>{describeRequestError(error, "Couldn't load templates.")}</span>
          <button type="button" onClick={reload} className="font-semibold underline cursor-pointer">
            Try again
          </button>
        </div>
      )}

      {showSkeleton && (
        <section className="space-y-4" aria-busy="true" aria-label="Loading templates">
          <div className="h-6 w-44 animate-pulse rounded bg-slate-100" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <TemplateCardSkeleton key={i} />
            ))}
          </div>
        </section>
      )}

      {!showSkeleton && !error && groups.length === 0 && (
        <p className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500">
          No templates yet.
        </p>
      )}

      {groups.map(({ type, label, items }) => (
        <section key={type} className="space-y-4" aria-labelledby={`templates-${type}`}>
          <h2 id={`templates-${type}`} className="text-lg font-bold text-slate-900">
            {label} Template
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((template) => (
              <AdminTemplateCard
                key={template.id}
                template={template}
                onPreview={open("view")}
                onEdit={editTemplate}
                onSetDefault={open("default")}
                onToggle={open("toggle")}
                onDelete={open("delete")}
              />
            ))}
          </div>
        </section>
      ))}

      {dialog?.type === "view" && (
        <TemplateDetailsModal
          key={target.id}
          template={target}
          onClose={closeDialog}
          onEdit={editTemplate}
          onSetDefault={open("default")}
        />
      )}

      <ConfirmModal
        key={`default-${target?.id}`}
        open={dialog?.type === "default"}
        onClose={closeDialog}
        onConfirm={makeDefault}
        icon={Star}
        tone="primary"
        title="Make default template"
        confirmLabel="Make default"
        pendingLabel="Saving…"
        errorFallback="Couldn't change the default template. Please try again."
      >
        <p className="text-sm leading-relaxed text-slate-600">
          <span className="font-semibold text-slate-800">{target?.title}</span> will be preselected for new{" "}
          {target ? DOCUMENT_TYPE_LABELS[target.documentType] : ""} documents. The current default stays available.
        </p>
      </ConfirmModal>

      <ConfirmModal
        key={`toggle-${target?.id}`}
        open={dialog?.type === "toggle"}
        onClose={closeDialog}
        onConfirm={toggleActive}
        icon={target?.isActive ? PowerOff : Power}
        tone={target?.isActive ? "danger" : "success"}
        title={target?.isActive ? "Deactivate template" : "Activate template"}
        confirmLabel={target?.isActive ? "Deactivate" : "Activate"}
        pendingLabel="Saving…"
        errorFallback="Couldn't update this template. Please try again."
      >
        <p className="text-sm leading-relaxed text-slate-600">
          {target?.isActive
            ? `Customers won't be able to choose ${target?.title} for new documents. Documents already issued with it are not affected.`
            : `${target?.title} will be available to customers again.`}
        </p>
      </ConfirmModal>

      <ConfirmModal
        key={`delete-${target?.id}`}
        open={dialog?.type === "delete"}
        onClose={closeDialog}
        onConfirm={deleteTemplate}
        icon={Trash2}
        tone="danger"
        title="Delete template"
        confirmLabel="Delete permanently"
        pendingLabel="Deleting…"
        errorFallback="Couldn't delete this template. Please try again."
      >
        <p className="text-sm leading-relaxed text-slate-600">
          <span className="font-semibold text-slate-800">{target?.title}</span> has never been used for a document
          and will be removed permanently, together with its preview image. This can't be undone.
        </p>
      </ConfirmModal>
    </div>
  );
};

export default AdminDocumentTemplatesView;
