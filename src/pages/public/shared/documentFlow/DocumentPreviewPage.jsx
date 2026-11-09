import React from "react";
import DocumentFlowLayout from "./components/DocumentFlowLayout";
import DocumentLivePreview from "./components/DocumentLivePreview";
import DocumentOrderSummary from "./components/DocumentOrderSummary";
import { useDocumentFlowNavigation } from "./hooks/useDocumentFlowNavigation";
import { DOCUMENT_STEPS } from "./utils/documentFlow";

/** Preview step: the form's review panel, with the order summary above the live preview. */
const DocumentPreviewPage = (props) => {
  const { flow, formData, ReviewSection } = props;
  const { goToStep, onBackToForm, onContinueToCheckout } =
    useDocumentFlowNavigation(flow);
  const { Document } = flow;

  return (
    <DocumentFlowLayout
      steps={flow.steps}
      currentStep={DOCUMENT_STEPS.PREVIEW}
      onStepClick={goToStep}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 sm:p-8 md:p-10">
            <ReviewSection
              formData={formData}
              onEdit={goToStep}
              onBack={onBackToForm}
              onNext={onContinueToCheckout}
            />
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-4 sticky top-28 flex flex-col gap-6">
          <DocumentOrderSummary
            title={flow.orderTitle}
            subtitle={flow.getOrderSubtitle(formData)}
            priceLabel={flow.priceLabel}
          />
          <DocumentLivePreview>
            <Document formData={formData} />
          </DocumentLivePreview>
        </div>
      </div>
    </DocumentFlowLayout>
  );
};

export default DocumentPreviewPage;
