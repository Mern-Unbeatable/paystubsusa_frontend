import DocumentStepNav from "../../../../shared/documentFlow/components/DocumentStepNav";

/** Direct Deposit form Back / Continue — sticky on mobile, in-flow on desktop. */
const StepNav = ({
  onBack,
  onNext,
  nextLabel = "Save & Continue",
  showBack = true,
  className = "sm:pt-6",
  ...rest
}) => (
  <DocumentStepNav
    onBack={onBack}
    onNext={onNext}
    nextLabel={nextLabel}
    showBack={showBack}
    variant="secondary"
    className={className}
    {...rest}
  />
);

export default StepNav;
