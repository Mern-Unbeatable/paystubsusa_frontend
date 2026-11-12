import React from "react";
import { createPortal } from "react-dom";
import PaystubPrintDocument from "./PaystubPrintDocument";

/**
 * Print-only copy of the paystub (hidden on screen, see `.paystub-print-root`
 * in index.css). Portaled to <body> so print CSS can hide the rest of the app.
 */
const PrintablePaystub = (props) =>
  createPortal(
    <div className="paystub-print-root" aria-hidden="true">
      <PaystubPrintDocument {...props} />
    </div>,
    document.body,
  );

export default PrintablePaystub;
