import React from "react";
import DocumentPreviewPage from "../shared/documentFlow/DocumentPreviewPage";
import DirectDepositReviewSection from "./components/sections/DirectDepositReviewSection";
import { useDirectDepositFormData } from "./hooks/useDirectDepositFormData";
import { DIRECT_DEPOSIT_FLOW } from "./utils/directDepositFlow";

const DirectDepositPreviewView = () => {
  const { formData } = useDirectDepositFormData();

  return (
    <DocumentPreviewPage
      flow={DIRECT_DEPOSIT_FLOW}
      formData={formData}
      ReviewSection={DirectDepositReviewSection}
    />
  );
};

export default DirectDepositPreviewView;
