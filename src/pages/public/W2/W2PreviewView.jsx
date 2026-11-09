import React from "react";
import DocumentPreviewPage from "../shared/documentFlow/DocumentPreviewPage";
import W2ReviewSection from "./components/sections/W2ReviewSection";
import { useW2FormData } from "./hooks/useW2FormData";
import { W2_FLOW } from "./utils/w2Flow";

const W2PreviewView = () => {
  const { formData } = useW2FormData();

  return (
    <DocumentPreviewPage
      flow={W2_FLOW}
      formData={formData}
      ReviewSection={W2ReviewSection}
    />
  );
};

export default W2PreviewView;
