import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PaystubFlowPage from "./components/common/PaystubFlowPage";
import TemplateSelectionModal from "./components/common/TemplateSelectionModal";
import PaystubDetailsForm from "./components/sections/PaystubDetailsForm";
import { usePaystubFormData } from "./hooks/usePaystubFormData";
import { usePaystubFlowNavigation } from "./hooks/usePaystubFlowNavigation";
import { PAYSTUB_FORM_STEPS } from "./utils/paystubFlow";

const PaystubCreateContent = ({ template }) => {
  const location = useLocation();
  const form = usePaystubFormData();
  const { onBackToTemplates, onSwitchTemplate, onContinueToPackage } =
    usePaystubFlowNavigation(template.id);
  // Form step to return to after switching templates; null = modal closed.
  const [templateModalStep, setTemplateModalStep] = useState(null);

  return (
    <>
      <PaystubDetailsForm
        key={location.key}
        template={template}
        form={form}
        initialStep={location.state?.step ?? PAYSTUB_FORM_STEPS.EMPLOYER}
        onBackToTemplates={onBackToTemplates}
        onChangeTemplate={setTemplateModalStep}
        onContinueToPackage={onContinueToPackage}
      />
      <TemplateSelectionModal
        open={templateModalStep !== null}
        selectedTemplateId={template.id}
        onClose={() => setTemplateModalStep(null)}
        onConfirm={(nextId) => {
          onSwitchTemplate(nextId, { step: templateModalStep });
          setTemplateModalStep(null);
        }}
      />
    </>
  );
};

const PaystubCreateView = () => (
  <PaystubFlowPage>
    {(template) => <PaystubCreateContent template={template} />}
  </PaystubFlowPage>
);

export default PaystubCreateView;
