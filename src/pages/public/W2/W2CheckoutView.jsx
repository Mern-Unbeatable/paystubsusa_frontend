import React from "react";
import DocumentCheckoutPage from "../shared/documentFlow/DocumentCheckoutPage";
import { useW2FormData } from "./hooks/useW2FormData";
import { W2_FLOW } from "./utils/w2Flow";

const W2CheckoutView = () => {
  const { formData, updateField } = useW2FormData();

  return (
    <DocumentCheckoutPage
      flow={W2_FLOW}
      email={formData.email}
      onEmailChange={(email) => updateField("email", email)}
    />
  );
};

export default W2CheckoutView;
