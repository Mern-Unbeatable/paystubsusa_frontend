import React from "react";
import DocumentStepper from "../../../../shared/documentFlow/components/DocumentStepper";
import { W2_FLOW } from "../../../utils/w2Flow";

const W2Stepper = ({ currentStep, onStepClick }) => (
  <DocumentStepper
    steps={W2_FLOW.steps}
    currentStep={currentStep}
    onStepClick={onStepClick}
  />
);

export default W2Stepper;
