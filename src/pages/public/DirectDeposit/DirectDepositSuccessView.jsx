import React from "react";
import DocumentSuccessPage from "../shared/documentFlow/DocumentSuccessPage";
import { useDirectDepositFormData } from "./hooks/useDirectDepositFormData";
import { DIRECT_DEPOSIT_FLOW } from "./utils/directDepositFlow";

const DirectDepositSuccessView = () => {
  const { formData } = useDirectDepositFormData();

  return <DocumentSuccessPage flow={DIRECT_DEPOSIT_FLOW} formData={formData} />;
};

export default DirectDepositSuccessView;
