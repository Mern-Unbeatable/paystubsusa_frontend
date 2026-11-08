import React, { useMemo } from "react";
import PaystubDocumentPreview from "./PaystubDocumentPreview";
import ScaledDocument from "./ScaledDocument";
import {
  DOCUMENT_PAGE,
  TemplateDocument,
  buildPaystubDocument,
  hasTemplateDocument,
} from "../../templates";

/** Live preview in the selected template's design (falls back to the generic preview). */
const TemplateDocumentPreview = ({ template, formData, calculations }) => {
  const hasDocument = hasTemplateDocument(template);
  const documentData = useMemo(
    () => (hasDocument ? buildPaystubDocument(formData, calculations) : null),
    [hasDocument, formData, calculations],
  );

  if (!hasDocument) {
    return <PaystubDocumentPreview formData={formData} calculations={calculations} />;
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <ScaledDocument width={DOCUMENT_PAGE.width} height={DOCUMENT_PAGE.height}>
        <TemplateDocument template={template} data={documentData} />
      </ScaledDocument>
    </div>
  );
};

export default TemplateDocumentPreview;
