import React from "react";
import DocumentStepper from "../../../../shared/documentFlow/components/DocumentStepper";
import { DIRECT_DEPOSIT_FLOW } from "../../../utils/directDepositFlow";

const DirectDepositStepper = ({ currentStep, onStepClick }) => (
  <DocumentStepper
    steps={DIRECT_DEPOSIT_FLOW.steps}
    currentStep={currentStep}
    onStepClick={onStepClick}
  />
);

export default DirectDepositStepper;
