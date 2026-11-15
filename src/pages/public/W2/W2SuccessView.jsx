import React from "react";
import { Navigate } from "react-router-dom";
import DocumentFlowLayout from "../shared/documentFlow/components/DocumentFlowLayout";
import DocumentPaymentSuccess from "../shared/documentFlow/components/DocumentPaymentSuccess";
import PrintableDocument from "../shared/documentFlow/components/PrintableDocument";
import { printDocument } from "../shared/documentFlow/utils/documentFlow";
import { useW2FormData } from "./hooks/useW2FormData";
import { useW2FlowNavigation } from "./hooks/useW2FlowNavigation";
import { W2_FLOW, W2_PAGE_STEPS } from "./utils/w2Flow";

const W2SuccessContent = ({ formData }) => {
  const { onStartOver } = useW2FlowNavigation();
  const { Document } = W2_FLOW;

  return (
    <DocumentFlowLayout
      steps={W2_FLOW.steps}
      currentStep={W2_PAGE_STEPS.CHECKOUT}
    >
      <DocumentPaymentSuccess
        documentLabel={W2_FLOW.documentLabel}
        recipientName={W2_FLOW.getRecipientName(formData)}
        email={formData.email}
        onDownload={() => printDocument(W2_FLOW.getPdfFileNameParts(formData))}
        onStartOver={onStartOver}
      />
      <PrintableDocument>
        <Document formData={formData} />
      </PrintableDocument>
    </DocumentFlowLayout>
  );
};

const W2SuccessView = () => {
  const { formData } = useW2FormData();

  if (!W2_FLOW.paidFlag.isPaid()) {
    return <Navigate to={W2_FLOW.paths.checkout} replace />;
  }

  return <W2SuccessContent formData={formData} />;
};

export default W2SuccessView;
