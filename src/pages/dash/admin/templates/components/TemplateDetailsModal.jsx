import React from "react";
import { Pencil, Star } from "lucide-react";
import TemplatePreviewModal from "../../../../public/Generator/components/common/TemplatePreviewModal";
import { toThumbnailTemplate } from "../utils/templateFormat";

/** The generator's full-page preview, with admin actions in the footer. */
const TemplateDetailsModal = ({ template, onClose, onEdit, onSetDefault }) => (
  <TemplatePreviewModal
    template={toThumbnailTemplate(template)}
    onClose={onClose}
    footer={
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 cursor-pointer"
        >
          Close
        </button>
        {template.isActive && !template.isDefault && (
          <button
            type="button"
            onClick={() => onSetDefault(template)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 text-sm font-semibold text-amber-700 transition hover:bg-amber-100 cursor-pointer"
          >
            <Star className="h-4 w-4" />
            Make default
          </button>
        )}
        <button
          type="button"
          onClick={() => onEdit(template)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-secondary px-4 text-sm font-semibold text-white transition hover:bg-secondary/90 cursor-pointer"
        >
          <Pencil className="h-4 w-4" />
          Edit template
        </button>
      </div>
    }
  />
);

export default TemplateDetailsModal;
