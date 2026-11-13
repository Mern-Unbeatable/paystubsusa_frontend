import React from "react";
import TemplatePagePreview from "../../../../public/Generator/components/common/preview/TemplatePagePreview";
import { toThumbnailTemplate } from "../utils/templateFormat";

/** Renders unsaved form values on the same A4 document page customers see. */
const TemplateBuilderPreview = ({ template }) => (
  <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
    <div className="border-b border-slate-100 px-4 py-3">
      <p className="text-sm font-semibold text-slate-800">Live preview</p>
    </div>
    <div className="flex justify-center bg-slate-100/70 p-4 sm:p-6">
      <TemplatePagePreview template={toThumbnailTemplate(template)} className="max-w-[680px] shadow-sm" />
    </div>
  </div>
);

export default TemplateBuilderPreview;
