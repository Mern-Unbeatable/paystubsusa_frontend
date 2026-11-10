import React from "react";
import DocumentSuccessPage from "../shared/documentFlow/DocumentSuccessPage";
import { useNec1099FormData } from "./hooks/useNec1099FormData";
import { NEC1099_FLOW } from "./utils/nec1099Flow";

const Nec1099SuccessView = () => {
  const { formData } = useNec1099FormData();

  return <DocumentSuccessPage flow={NEC1099_FLOW} formData={formData} />;
};

export default Nec1099SuccessView;
