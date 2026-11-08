import React, { useMemo } from "react";
import PreviewWatermark from "./PreviewWatermark";
import ScaledDocument from "./ScaledDocument";
import { PaystubThumbnail } from "./PaystubThumbnail";
import {
  DOCUMENT_PAGE,
  VARIANT_TEMPLATE_WIDTH,
  TemplateDocument,
  buildPaystubDocument,
  buildThumbnailData,
  hasTemplateDocument,
} from "../../templates";

/** Live preview of the user's data in the selected template's design. */
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
      <PreviewWatermark />
      {hasDocument ? (
        <ScaledDocument width={DOCUMENT_PAGE.width} height={DOCUMENT_PAGE.height}>
          <TemplateDocument template={template} data={data} />
        </ScaledDocument>
      ) : (
        <ScaledDocument width={VARIANT_TEMPLATE_WIDTH}>
          <PaystubThumbnail template={template} data={data} />
        </ScaledDocument>
      )}
    </div>
  );
};

export default TemplateDocumentPreview;
