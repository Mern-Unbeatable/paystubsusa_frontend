import React from "react";
import DocumentStepper from "../../../../shared/documentFlow/components/DocumentStepper";
import { NEC1099_FLOW } from "../../../utils/nec1099Flow";

const Nec1099Stepper = ({ currentStep, onStepClick }) => (
  <DocumentStepper
    steps={NEC1099_FLOW.steps}
    currentStep={currentStep}
    onStepClick={onStepClick}
  />
);

export default Nec1099Stepper;
