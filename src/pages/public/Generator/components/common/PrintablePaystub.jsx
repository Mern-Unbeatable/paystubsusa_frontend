import React, { useMemo } from "react";
import { createPortal } from "react-dom";
import PaystubDocumentPreview from "./PaystubDocumentPreview";
import { TemplateDocument, buildPaystubDocument, hasTemplateDocument } from "../../templates";

/**
 * Print-only copy of the paystub (hidden on screen, see `.paystub-print-root`
 * in index.css). Portaled to <body> so print CSS can hide the rest of the app.
 */
const PrintablePaystub = ({ template, formData, calculations }) => {
  const hasDocument = hasTemplateDocument(template);
  const documentData = useMemo(
    () => (hasDocument ? buildPaystubDocument(formData, calculations) : null),
    [hasDocument, formData, calculations],
  );

  return createPortal(
    <div className="paystub-print-root" aria-hidden="true">
      {hasDocument ? (
        <TemplateDocument template={template} data={documentData} />
      ) : (
        <div style={{ width: 380, zoom: 1.9, padding: "16px 10px" }}>
          <PaystubDocumentPreview formData={formData} calculations={calculations} />
        </div>
      )}
    </div>,
    document.body,
  );
};

export default PrintablePaystub;
