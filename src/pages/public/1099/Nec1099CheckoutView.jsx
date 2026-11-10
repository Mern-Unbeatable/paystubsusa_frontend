import React from "react";
import DocumentCheckoutPage from "../shared/documentFlow/DocumentCheckoutPage";
import { useNec1099FormData } from "./hooks/useNec1099FormData";
import { NEC1099_FLOW } from "./utils/nec1099Flow";

const Nec1099CheckoutView = () => {
  const { formData, updateField } = useNec1099FormData();

  return (
    <DocumentCheckoutPage
      flow={NEC1099_FLOW}
      email={formData.email}
      onEmailChange={(email) => updateField("email", email)}
    />
  );
};

export default Nec1099CheckoutView;
