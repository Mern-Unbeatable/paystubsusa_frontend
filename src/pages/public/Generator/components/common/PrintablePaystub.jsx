import React, { useMemo } from "react";
import { createPortal } from "react-dom";
import { PaystubThumbnail } from "./PaystubThumbnail";
import {
  DOCUMENT_PAGE,
  VARIANT_TEMPLATE_WIDTH,
  TemplateDocument,
  buildPaystubDocument,
  buildThumbnailData,
  hasTemplateDocument,
} from "../../templates";

const PRINT_MARGIN = 32;

/**
 * Print-only copy of the paystub (hidden on screen, see `.paystub-print-root`
 * in index.css). Portaled to <body> so print CSS can hide the rest of the app.
 */
const PrintablePaystub = ({ template, formData, calculations }) => {
  const hasDocument = hasTemplateDocument(template);
  const data = useMemo(
    () =>
      hasDocument
        ? buildPaystubDocument(formData, calculations)
        : buildThumbnailData(formData, calculations),
    [hasDocument, formData, calculations],
  );

  return createPortal(
    <div className="paystub-print-root" aria-hidden="true">
      {hasDocument ? (
        <TemplateDocument template={template} data={data} />
      ) : (
        <div style={{ padding: PRINT_MARGIN }}>
          <div
            style={{
              width: VARIANT_TEMPLATE_WIDTH,
              zoom: (DOCUMENT_PAGE.width - PRINT_MARGIN * 2) / VARIANT_TEMPLATE_WIDTH,
            }}
          >
            <PaystubThumbnail template={template} data={data} framed={false} />
          </div>
        </div>
      )}
    </div>,
    document.body,
  );
};

export default PrintablePaystub;
