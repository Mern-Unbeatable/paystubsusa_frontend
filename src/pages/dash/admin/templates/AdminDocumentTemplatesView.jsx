import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { Plus, Power, PowerOff, RefreshCw, Star, Trash2 } from "lucide-react";
import {
  DashboardFilterToolbar,
  DashboardHeader,
  DashboardPagination,
  DashboardTable,
} from "../../../../Components/Dashboard";
import ConfirmModal from "../../../../Components/modal/ConfirmModal";
import { PATHS, buildAdminTemplateEditPath } from "../../../../config/paths";
import { describeRequestError } from "../../customer/Profile/utils/profileFormat";
import { useTemplates } from "./hooks/useTemplates";
import TemplateDetailsModal from "./components/TemplateDetailsModal";
import {
  DocumentTypeLabel,
  LayoutLabel,
  TemplateIdentity,
  TemplateRowActions,
  TemplateStatus,
} from "./components/TemplateCells";
import {
  DOCUMENT_TYPE_LABELS,
  DOCUMENT_TYPE_OPTIONS,
  STATUS_OPTIONS,
  formatShortDate,
} from "./utils/templateFormat";

const FILTER_SELECTS = [
  { key: "documentType", label: "Filter by document type", options: DOCUMENT_TYPE_OPTIONS },
  { key: "status", label: "Filter by status", options: STATUS_OPTIONS },
];

const AdminDocumentTemplatesView = () => {
  const {
    templates,
    meta,
    filters,
    loading,
    error,
    loadTemplates,
    setFilter: updateFilter,
    resetFilters: resetTemplateFilters,
    updateTemplate,
    setDefaultTemplate,
    deleteTemplate: removeTemplate,
  } = useTemplates();
  const [search, setSearch] = useState(filters.q);
  const [reloadKey, setReloadKey] = useState(0);
  const navigate = useNavigate();
  // { type: "view" | "default" | "toggle" | "delete", template }
  const [dialog, setDialog] = useState(null);
  const open = (type) => (template) => setDialog({ type, template });
  const closeDialog = () => setDialog(null);
  const editTemplate = (template) => navigate(buildAdminTemplateEditPath(template.id));

  useEffect(() => {
    const trimmed = search.trim();
    if (trimmed === filters.q) return undefined;
    const timer = setTimeout(() => updateFilter("q", trimmed), 300);
    return () => clearTimeout(timer);
  }, [search, filters.q, updateFilter]);

  useEffect(() => {
    const request = loadTemplates(filters);
    return () => request.abort();
  }, [filters, reloadKey, loadTemplates]);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  const resetFilters = () => {
    setSearch("");
    resetTemplateFilters();
  };

  // The store already holds the updated row; under a status filter it may no longer belong here.
  const toggleActive = async () => {
    const { template } = dialog;
    await updateTemplate({ id: template.id, changes: { isActive: !template.isActive } });
    toast.success(`${template.title} was ${template.isActive ? "deactivated" : "activated"}.`);
    if (filters.status) reload();
  };

  const makeDefault = async () => {
    const { template } = dialog;
    await setDefaultTemplate(template.id);
    toast.success(`${template.title} is now the default ${DOCUMENT_TYPE_LABELS[template.documentType]} template.`);
  };

  // Refetch so the page refills from the next one and the total stays accurate.
  const deleteTemplate = async () => {
    const { template } = dialog;
    await removeTemplate(template.id);
    toast.success(`${template.title} was deleted.`);
    reload();
  };

  const actions = (template) => (
    <TemplateRowActions
      template={template}
      onView={open("view")}
      onEdit={editTemplate}
      onSetDefault={open("default")}
      onToggle={open("toggle")}
      onDelete={open("delete")}
    />
  );

  const columns = [
    { header: "Template", render: (t) => <TemplateIdentity template={t} /> },
    {
      header: "Document",
      render: (t) => <DocumentTypeLabel template={t} />,
      cellClassName: "whitespace-nowrap",
    },
    { header: "Layout", render: (t) => <LayoutLabel template={t} />, cellClassName: "text-slate-600" },
    { header: "Status", render: (t) => <TemplateStatus template={t} /> },
    {
      header: "Docs issued",
      align: "right",
      render: (t) => t.usage?.documents ?? 0,
      cellClassName: "tabular-nums",
    },
    {
      header: "Created",
      render: (t) => formatShortDate(t.createdAt),
      cellClassName: "whitespace-nowrap text-slate-500",
    },
    { header: "Actions", align: "right", render: actions },
  ];

  const renderMobileRow = (t) => (
    <div className="space-y-3">
      <TemplateIdentity template={t} />
      <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
        <TemplateStatus template={t} />
        <span>
          <DocumentTypeLabel template={t} /> · <LayoutLabel template={t} />
        </span>
        <span>· Created {formatShortDate(t.createdAt)}</span>
      </div>
      <div className="flex justify-end">{actions(t)}</div>
    </div>
  );

  const hasQuery = Boolean(filters.q || filters.documentType || filters.status);
  const target = dialog?.template;

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Document Templates"
        description="Manage the layouts customers can pick for each document, and the default for each type."
        badge={
          !loading && (
            <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-bold text-secondary">
              {meta.totalItems}
            </span>
          )
        }
        action={
          <div className="flex gap-2">
            <button
              type="button"
              onClick={reload}
              disabled={loading}
              aria-label="Refresh templates"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60 cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              type="button"
              onClick={() => navigate(PATHS.ADMIN.templateNew)}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-secondary px-4 text-sm font-semibold text-white transition hover:bg-secondary/90 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              New template
            </button>
          </div>
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

      <DashboardTable
        title="Template library"
        minWidth="min-w-[960px]"
        toolbar={
          <DashboardFilterToolbar
            search={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search by name, subtitle or code"
            selects={FILTER_SELECTS}
            filters={filters}
            onFilterChange={updateFilter}
            onReset={resetFilters}
          />
        }
        columns={columns}
        data={error ? [] : templates}
        loading={loading}
        renderMobileRow={renderMobileRow}
        rowKey={(t) => t.id}
        emptyMessage={hasQuery ? "No templates match your search or filters." : "No templates yet."}
        footer={
          !error && (
            <DashboardPagination
              page={meta.page}
              pageSize={meta.pageSize}
              totalItems={meta.totalItems}
              totalPages={meta.totalPages}
              onPageChange={(page) => updateFilter("page", page)}
              onPageSizeChange={(size) => updateFilter("pageSize", size)}
              disabled={loading}
            />
          )
        }
      />

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
