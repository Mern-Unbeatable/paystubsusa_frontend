import React, { useState } from "react";
import PaystubFlowPage from "./components/common/PaystubFlowPage";
import TemplateSelectionModal from "./components/common/TemplateSelectionModal";
import PackageSelectionSection from "./components/sections/PackageSelectionSection";
import { usePaystubFormData } from "./hooks/usePaystubFormData";
import { usePaystubOrder } from "./hooks/usePaystubOrder";
import { usePaystubFlowNavigation } from "./hooks/usePaystubFlowNavigation";

const PaystubPackageContent = ({ template }) => {
  const { formData, calculations } = usePaystubFormData();
  const order = usePaystubOrder();
  const { onBackToReview, onSwitchTemplate, onContinueToCheckout } =
    usePaystubFlowNavigation(template.id);
  const [isTemplateModalOpen, setTemplateModalOpen] = useState(false);

  return (
    <>
      <PackageSelectionSection
        template={template}
        formData={formData}
        calculations={calculations}
        order={order}
        onBackToReview={onBackToReview}
        onChangeTemplate={() => setTemplateModalOpen(true)}
        onContinueToCheckout={onContinueToCheckout}
      />
      <TemplateSelectionModal
        open={isTemplateModalOpen}
        selectedTemplateId={template.id}
        onClose={() => setTemplateModalOpen(false)}
        onConfirm={(nextId) => {
          onSwitchTemplate(nextId);
          setTemplateModalOpen(false);
        }}
      />
    </>
  );
};

const PaystubPackageView = () => (
  <PaystubFlowPage>
    {(template) => <PaystubPackageContent template={template} />}
  </PaystubFlowPage>
);

export default PaystubPackageView;
