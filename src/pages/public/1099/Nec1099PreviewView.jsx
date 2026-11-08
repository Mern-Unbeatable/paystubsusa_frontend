import React from "react";
import DocumentPreviewPage from "../shared/documentFlow/DocumentPreviewPage";
import Nec1099ReviewSection from "./components/sections/Nec1099ReviewSection";
import { useNec1099FormData } from "./hooks/useNec1099FormData";
import { NEC1099_FLOW } from "./utils/nec1099Flow";

const Nec1099PreviewView = () => {
  const { formData } = useNec1099FormData();

  return (
    <DocumentPreviewPage
      flow={NEC1099_FLOW}
      formData={formData}
      ReviewSection={Nec1099ReviewSection}
    />
  );
};

export default Nec1099PreviewView;
