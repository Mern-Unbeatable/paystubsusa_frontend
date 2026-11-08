import React from "react";
import { createPortal } from "react-dom";

const PAGE_WIDTH = 816;
const PRINT_MARGIN = 32;
const FORM_WIDTH = 480;

/**
 * Print-only copy of a form (hidden on screen, see `.paystub-print-root`
 * in index.css). Portaled to <body> so print CSS can hide the rest of the app.
 */
const PrintableDocument = ({ children }) =>
  createPortal(
    <div className="paystub-print-root" aria-hidden="true">
      <div style={{ padding: PRINT_MARGIN }}>
        <div
          className="bg-white border border-slate-300"
          style={{
            width: FORM_WIDTH,
            zoom: (PAGE_WIDTH - PRINT_MARGIN * 2) / FORM_WIDTH,
          }}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );

export default PrintableDocument;
