import React from "react";
import { Navigate } from "react-router-dom";
import DocumentFlowLayout from "./components/DocumentFlowLayout";
import DocumentPaymentSuccess from "./components/DocumentPaymentSuccess";
import PrintableDocument from "./components/PrintableDocument";
import { useDocumentFlowNavigation } from "./hooks/useDocumentFlowNavigation";
import { DOCUMENT_STEPS, printDocument } from "./utils/documentFlow";

const DocumentSuccessContent = ({ flow, formData }) => {
  const { onStartOver } = useDocumentFlowNavigation(flow);
  const { Document } = flow;

  return (
    <DocumentFlowLayout
      steps={flow.steps}
      currentStep={DOCUMENT_STEPS.CHECKOUT}
    >
      <DocumentPaymentSuccess
        documentLabel={flow.documentLabel}
        recipientName={flow.getRecipientName(formData)}
        email={formData.email}
        onDownload={() => printDocument(flow.getPdfFileNameParts(formData))}
        onStartOver={onStartOver}
      />
      <PrintableDocument>
        <Document formData={formData} />
      </PrintableDocument>
    </DocumentFlowLayout>
  );
};

/** Success step; only reachable after checkout marks the flow as paid. */
const DocumentSuccessPage = ({ flow, formData }) =>
  flow.paidFlag.isPaid() ? (
    <DocumentSuccessContent flow={flow} formData={formData} />
  ) : (
    <Navigate to={flow.paths.checkout} replace />
  );

export default DocumentSuccessPage;
