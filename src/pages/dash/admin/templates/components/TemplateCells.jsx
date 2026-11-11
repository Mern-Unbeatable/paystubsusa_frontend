import React from "react";
import { Eye, Lock, Pencil, Power, PowerOff, Star, Trash2 } from "lucide-react";
import { DashboardStatusBadge } from "../../../../../layouts";
import { PaystubThumbnail } from "../../../../public/Generator/components/common/PaystubThumbnail";
import {
  DOCUMENT_TYPE_LABELS,
  RENDERER_LABELS,
  previewImageSrc,
  toThumbnailTemplate,
} from "../utils/templateFormat";

// Width the generator thumbnail is laid out at before it is scaled into a small cell.
const THUMBNAIL_BASE_WIDTH = 320;

/**
 * The uploaded preview image when there is one, otherwise the layout rendered with sample data.
 * `imageSrc` overrides the stored image (e.g. a file picked but not uploaded yet).
 */
export const TemplatePreview = ({ template, imageSrc, width, className = "" }) => {
  const src = imageSrc === undefined ? previewImageSrc(template) : imageSrc;
  const alt = `${template.title || "Template"} preview`;

  if (!width) {
    return (
      <div className={`overflow-hidden rounded-xl border border-slate-200 bg-white ${className}`}>
        {src ? (
          <img src={src} alt={alt} className="block w-full object-contain" />
        ) : (
          <PaystubThumbnail template={toThumbnailTemplate(template)} full framed={false} />
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-md border border-slate-200 bg-white ${className}`}
      style={{ width, height: Math.round(width * 1.3) }}
    >
      {src ? (
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover object-top" />
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 origin-top-left"
          style={{ width: THUMBNAIL_BASE_WIDTH, transform: `scale(${width / THUMBNAIL_BASE_WIDTH})` }}
        >
          <PaystubThumbnail template={toThumbnailTemplate(template)} framed={false} />
        </div>
      )}
    </div>
  );
};

export const TemplateIdentity = ({ template }) => (
  <div className="flex min-w-0 items-center gap-3">
    <TemplatePreview template={template} width={44} />
    <div className="min-w-0">
      <p className="flex items-center gap-1.5 truncate font-semibold text-slate-900">
        <span className="truncate">{template.title}</span>
        {template.isSystem && (
          <Lock className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-label="Built-in template" />
        )}
      </p>
      <p className="truncate text-xs text-slate-500">{template.subtitle || "—"}</p>
      <p className="truncate font-mono text-[11px] text-slate-400">{template.code}</p>
    </div>
  </div>
);

export const DocumentTypeLabel = ({ template }) =>
  DOCUMENT_TYPE_LABELS[template.documentType] || template.documentType;

export const LayoutLabel = ({ template }) => RENDERER_LABELS[template.renderer] || template.renderer;

export const DefaultBadge = () => (
  <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
    <Star className="h-3 w-3 fill-current" aria-hidden="true" />
    Default
  </span>
);

export const TemplateStatus = ({ template }) => (
  <div className="flex flex-wrap items-center gap-1.5">
    <DashboardStatusBadge status={template.isActive ? "Active" : "Inactive"} />
    {template.isDefault && <DefaultBadge />}
  </div>
);

const actionButton =
  "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-transparent transition focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer";

const deleteHint = (template) => {
  if (template.canDelete) return "Delete template";
  if (template.isSystem) return "Built-in templates can't be deleted";
  if (template.isDefault) return "Set another default first";
  return "Used by issued documents; deactivate instead";
};

const defaultHint = (template) => {
  if (template.isDefault) return "Already the default";
  if (!template.isActive) return "Activate it first";
  return "Make default";
};

export const TemplateRowActions = ({ template, onView, onEdit, onSetDefault, onToggle, onDelete }) => {
  const ToggleIcon = template.isActive ? PowerOff : Power;
  const toggleLabel = template.isActive ? "Deactivate" : "Activate";
  // The server refuses to deactivate the default; say so instead of failing after confirm.
  const toggleBlocked = template.isActive && template.isDefault;

  return (
    <div className="inline-flex items-center gap-1">
      <button
        type="button"
        onClick={() => onView(template)}
        title="View details"
        aria-label={`View ${template.title}`}
        className={`${actionButton} text-slate-500 hover:border-slate-200 hover:bg-slate-50 hover:text-secondary`}
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onEdit(template)}
        title="Edit template"
        aria-label={`Edit ${template.title}`}
        className={`${actionButton} text-slate-500 hover:border-slate-200 hover:bg-slate-50 hover:text-secondary`}
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onSetDefault(template)}
        disabled={template.isDefault || !template.isActive}
        title={defaultHint(template)}
        aria-label={`Make ${template.title} the default`}
        className={`${actionButton} text-amber-500 hover:border-amber-100 hover:bg-amber-50`}
      >
        <Star className={`h-4 w-4 ${template.isDefault ? "fill-current" : ""}`} />
      </button>
      <button
        type="button"
        onClick={() => onToggle(template)}
        disabled={toggleBlocked}
        title={toggleBlocked ? "Set another default before deactivating" : `${toggleLabel} template`}
        aria-label={`${toggleLabel} ${template.title}`}
        className={`${actionButton} ${
          template.isActive
            ? "text-amber-600 hover:border-amber-100 hover:bg-amber-50"
            : "text-emerald-600 hover:border-emerald-100 hover:bg-emerald-50"
        }`}
      >
        <ToggleIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onDelete(template)}
        disabled={!template.canDelete}
        title={deleteHint(template)}
        aria-label={`Delete ${template.title}`}
        className={`${actionButton} text-rose-500 hover:border-rose-100 hover:bg-rose-50`}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};
