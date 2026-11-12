import React, { useEffect, useId, useRef, useState } from "react";
import { Eye, MoreVertical, Pencil, Power, PowerOff, Star, Trash2 } from "lucide-react";
import { DashboardStatusBadge } from "../../../../../layouts";
import { PaystubThumbnail } from "../../../../public/Generator/components/common/PaystubThumbnail";
import {
  DOCUMENT_TYPE_LABELS,
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

export const DocumentTypeLabel = ({ template }) =>
  DOCUMENT_TYPE_LABELS[template.documentType] || template.documentType;

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

/** Secondary actions for a template card: default, availability and delete. */
const TemplateCardMenu = ({ template, onSetDefault, onToggle, onDelete }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return undefined;
    const closeOutside = (event) => !menuRef.current?.contains(event.target) && setOpen(false);
    const closeOnEscape = (event) => event.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  // The server refuses to deactivate the default; say so instead of failing after confirm.
  const toggleBlocked = template.isActive && template.isDefault;
  const items = [
    {
      label: "Make default",
      icon: Star,
      onClick: onSetDefault,
      disabled: template.isDefault || !template.isActive,
      hint: defaultHint(template),
      tone: "text-slate-700",
    },
    {
      label: template.isActive ? "Deactivate" : "Activate",
      icon: template.isActive ? PowerOff : Power,
      onClick: onToggle,
      disabled: toggleBlocked,
      hint: toggleBlocked ? "Set another default before deactivating" : undefined,
      tone: "text-slate-700",
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: onDelete,
      disabled: !template.canDelete,
      hint: deleteHint(template),
      tone: "text-rose-600",
    },
  ];

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={`More actions for ${template.title}`}
        className="inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
      >
        <MoreVertical className="h-4 w-4" />
      </button>
      {open && (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-full z-20 mt-1 w-48 rounded-xl border border-slate-200 bg-white p-1 shadow-lg"
        >
          {items.map(({ label, icon, onClick, disabled, hint, tone }) => {
            const Icon = icon;
            return (
              <button
                key={label}
                type="button"
                role="menuitem"
                disabled={disabled}
                title={disabled ? hint : undefined}
                onClick={() => {
                  setOpen(false);
                  onClick(template);
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer ${tone}`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

/** Admin template card: status ribbon, actions menu, thumbnail, name/category, Edit and Preview. */
export const AdminTemplateCard = ({ template, onPreview, onEdit, onSetDefault, onToggle, onDelete }) => (
  <div className="relative flex flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs transition hover:border-slate-300 hover:shadow-md">
    <span
      className={`pointer-events-none absolute -left-9 top-4 z-10 w-32 -rotate-45 py-0.5 text-center text-[11px] font-semibold uppercase tracking-wide shadow-sm ${
        template.isActive ? "bg-emerald-500 text-white" : "bg-slate-400 text-white"
      }`}
    >
      {template.isActive ? "Active" : "Inactive"}
    </span>

    <div className="mb-2 flex h-7 justify-end">
      <TemplateCardMenu template={template} onSetDefault={onSetDefault} onToggle={onToggle} onDelete={onDelete} />
    </div>

    <div className={`mb-3.5 overflow-hidden ${template.isActive ? "" : "opacity-60"}`}>
      {previewImageSrc(template) ? (
        <TemplatePreview template={template} />
      ) : (
        <PaystubThumbnail template={toThumbnailTemplate(template)} />
      )}
    </div>

    <div className="mt-auto">
      <h3 className="flex items-center gap-1.5 text-[15px] font-bold leading-tight text-[#111827]">
        <span className="truncate">{template.title}</span>
        {template.isDefault && <DefaultBadge />}
      </h3>
      <p className="mt-0.5 truncate text-[13px] text-slate-500">
        <DocumentTypeLabel template={template} />
      </p>

      <div className="mt-3.5 flex gap-2">
        <button
          type="button"
          onClick={() => onEdit(template)}
          className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-slate-100 text-[14px] font-semibold text-slate-700 transition hover:bg-slate-200 cursor-pointer"
        >
          <Pencil className="h-4 w-4" aria-hidden="true" />
          Edit
        </button>
        <button
          type="button"
          onClick={() => onPreview(template)}
          aria-label={`Preview ${template.title}`}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-secondary px-3.5 text-[14px] font-semibold text-secondary transition hover:bg-secondary/5 cursor-pointer"
        >
          <Eye className="h-4 w-4" aria-hidden="true" />
          Preview
        </button>
      </div>
    </div>
  </div>
);

export const TemplateCardSkeleton = () => (
  <div className="rounded-xl border border-slate-200/90 bg-white p-4" aria-hidden="true">
    <div className="aspect-[4/5] animate-pulse rounded-lg bg-slate-100" />
    <div className="mt-4 h-4 w-28 animate-pulse rounded bg-slate-100" />
    <div className="mt-2 h-3 w-20 animate-pulse rounded bg-slate-100" />
    <div className="mt-4 h-10 animate-pulse rounded-lg bg-slate-100" />
  </div>
);
