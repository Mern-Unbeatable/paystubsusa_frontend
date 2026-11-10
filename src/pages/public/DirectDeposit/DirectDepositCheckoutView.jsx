import React from "react";
import DocumentCheckoutPage from "../shared/documentFlow/DocumentCheckoutPage";
import { useDirectDepositFormData } from "./hooks/useDirectDepositFormData";
import { DIRECT_DEPOSIT_FLOW } from "./utils/directDepositFlow";

const DirectDepositCheckoutView = () => {
  const { formData, updateField } = useDirectDepositFormData();

  return (
    <DocumentCheckoutPage
      flow={DIRECT_DEPOSIT_FLOW}
      email={formData.email}
      onEmailChange={(email) => updateField("email", email)}
    />
  );
};

export default DirectDepositCheckoutView;
