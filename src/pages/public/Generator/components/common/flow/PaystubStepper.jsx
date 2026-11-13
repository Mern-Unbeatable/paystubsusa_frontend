import React from "react";
import stepsList from "../../../../data/generator/paystubSteps.json";
import DocumentStepper from "../../../../shared/documentFlow/components/DocumentStepper";

const PAYSTUB_STEPPER_STEPS = stepsList.map(({ num, label }) => ({ id: num, name: label }));

/** Paystub flow stepper (form steps 1-4, Package, Checkout) shared by the create, package and checkout pages. */
const PaystubStepper = ({ currentStep, onStepClick }) => (
  <DocumentStepper
    steps={PAYSTUB_STEPPER_STEPS}
    currentStep={currentStep}
    onStepClick={onStepClick}
  />
);

export default PaystubStepper;
