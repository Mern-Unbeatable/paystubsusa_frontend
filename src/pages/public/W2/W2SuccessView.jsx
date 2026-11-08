import React from "react";
import DocumentSuccessPage from "../shared/documentFlow/DocumentSuccessPage";
import { useW2FormData } from "./hooks/useW2FormData";
import { W2_FLOW } from "./utils/w2Flow";

const W2SuccessView = () => {
  const { formData } = useW2FormData();

  return <DocumentSuccessPage flow={W2_FLOW} formData={formData} />;
};

export default W2SuccessView;
