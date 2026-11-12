import React, { useMemo } from "react";
import PreviewWatermark from "./PreviewWatermark";
import TemplatePagePreview from "./TemplatePagePreview";
import { buildPaystubDocument, buildThumbnailData, hasTemplateDocument } from "../../templates";

const WATERMARK_LINES = [
  { offset: -0.28, scale: 1 },
  { offset: 0, scale: 1 },
  { offset: 0.28, scale: 1 },
];
const HANDWRITTEN_FONT = '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

/** Live preview of the user's data in the selected template's design, on an A4 page. */
const TemplateDocumentPreview = ({ template, formData, calculations }) => {
  const hasDocument = hasTemplateDocument(template);
  const data = useMemo(
    () =>
      hasDocument
        ? buildPaystubDocument(formData, calculations)
        : buildThumbnailData(formData, calculations),
    [hasDocument, formData, calculations],
  );

  return (
    <div className="relative bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <PreviewWatermark
        text="Preview Only"
        fontFamily={HANDWRITTEN_FONT}
        fill="rgba(15, 23, 42, 0.4)"
        scale={0.75}
        lines={WATERMARK_LINES}
        anchorY={0.32}
        angle={35}
      />
      <TemplatePagePreview template={template} data={data} framed={false} />
    </div>
  );
};

export default TemplateDocumentPreview;
