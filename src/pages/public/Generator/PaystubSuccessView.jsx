import React from "react";
import { Navigate } from "react-router-dom";
import PaystubFlowPage from "./components/common/PaystubFlowPage";
import PrintablePaystub from "./components/common/PrintablePaystub";
import PaymentSuccessSection from "./components/sections/PaymentSuccessSection";
import { usePaystubFormData } from "./hooks/usePaystubFormData";
import { usePaystubOrder } from "./hooks/usePaystubOrder";
import { usePaystubFlowNavigation } from "./hooks/usePaystubFlowNavigation";
import { buildPaystubCheckoutPath } from "../../../config/paths";
import { isTemplatePaid } from "./utils/generatorStorage";
import { downloadPaystubPdf } from "./utils/downloadPaystubPdf";

const PaystubSuccessContent = ({ template }) => {
  const { formData, calculations } = usePaystubFormData();
  const order = usePaystubOrder();
  const { onStartOver } = usePaystubFlowNavigation(template.id);

  if (!isTemplatePaid(template.id)) {
    return <Navigate to={buildPaystubCheckoutPath(template.id)} replace />;
  }

  return (
    <>
      <PaymentSuccessSection
        formData={formData}
        order={order}
        onDownload={() => downloadPaystubPdf(formData)}
        onStartOver={onStartOver}
      />
      <PrintablePaystub template={template} formData={formData} calculations={calculations} />
    </>
  );
};

const PaystubSuccessView = () => (
  <PaystubFlowPage>
    {(template) => <PaystubSuccessContent template={template} />}
  </PaystubFlowPage>
);

export default PaystubSuccessView;
