import React from "react";
import { Navigate } from "react-router-dom";
import W2FlowLayout from "./components/common/W2FlowLayout";
import PrintableW2 from "./components/common/PrintableW2";
import W2PaymentSuccessSection from "./components/sections/W2PaymentSuccessSection";
import { useW2FormData } from "./hooks/useW2FormData";
import { useW2FlowNavigation } from "./hooks/useW2FlowNavigation";
import { PATHS } from "../../../config/paths";
import { W2_STEPS } from "./utils/w2Flow";
import { isW2Paid } from "./utils/w2Storage";
import { downloadW2Pdf } from "./utils/downloadW2Pdf";

const W2SuccessContent = () => {
  const { formData } = useW2FormData();
  const { onStartOver } = useW2FlowNavigation();

  return (
    <W2FlowLayout currentStep={W2_STEPS.CHECKOUT} onStepClick={() => {}}>
      <W2PaymentSuccessSection
        formData={formData}
        onDownload={() => downloadW2Pdf(formData)}
        onStartOver={onStartOver}
      />
      <PrintableW2 formData={formData} />
    </W2FlowLayout>
  );
};

const W2SuccessView = () =>
  isW2Paid() ? <W2SuccessContent /> : <Navigate to={PATHS.PUBLIC.w2Checkout} replace />;

export default W2SuccessView;
