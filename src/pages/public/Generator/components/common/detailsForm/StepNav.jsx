import DocumentStepNav from "../../../../shared/documentFlow/components/DocumentStepNav";

/** Paystub form Back / Continue — sticky on mobile, in-flow on desktop. */
const StepNav = ({
  onBack,
  onNext,
  nextLabel = "Continue",
  variant = "default",
  className = "sm:pt-5",
  ...rest
}) => (
  <DocumentStepNav
    onBack={onBack}
    onNext={onNext}
    nextLabel={nextLabel}
    variant={variant}
    className={className}
    {...rest}
  />
);

export default StepNav;
