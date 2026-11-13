import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import PaystubFlowPage from "./components/common/flow/PaystubFlowPage";
import TemplateSelectionModal from "./components/common/templatePicker/TemplateSelectionModal";
import PackageSelectionSection from "./components/sections/PackageSelectionSection";
import CreditRedeemSection from "./components/sections/CreditRedeemSection";
import PaystubStepper from "./components/common/flow/PaystubStepper";
import { PAYSTUB_PAGE_STEPS } from "./utils/paystubFlow";
import { findIncompleteField, usePaystubFormData } from "./hooks/usePaystubFormData";
import { usePaystubOrder } from "./hooks/usePaystubOrder";
import { usePaystubFlowNavigation } from "./hooks/usePaystubFlowNavigation";
import { useActiveSubscription } from "./hooks/useActiveSubscription";
import { getErrorMessage } from "../../../api/errorNormalizer";
import { cancelCreditRedeem, clearCheckoutOrder } from "../../../features/public/checkout/checkoutSlice";
import { selectCheckout, selectCheckoutCredits } from "../../../features/public/checkout/checkoutSelectors";
import { redeemPaystubCredit, refreshCheckoutOrder } from "../../../features/public/checkout/checkoutThunks";

const PaystubPackageContent = ({ template }) => {
  const dispatch = useDispatch();
  const { formData, calculations } = usePaystubFormData();
  const order = usePaystubOrder();
  const { onBackToReview, onBackToFormStep, onSwitchTemplate, onContinueToCheckout, onPaymentSuccess } =
    usePaystubFlowNavigation(template.id);
  const [isTemplateModalOpen, setTemplateModalOpen] = useState(false);
  const checkout = useSelector(selectCheckout);
  const credits = useSelector(selectCheckoutCredits);
  const usingCredit = Boolean(checkout.credit && credits?.id === checkout.credit.entitlementId);
  const [redeeming, setRedeeming] = useState(false);
  const inFlightRef = useRef(false);
  const { isActive: hasUnlimited } = useActiveSubscription();
  const unlimitedPreselectedRef = useRef(false);

  // Subscribers start on Unlimited (no charge); they can still pick another package.
  useEffect(() => {
    if (!hasUnlimited || unlimitedPreselectedRef.current) return;
    unlimitedPreselectedRef.current = true;
    order.setSelectedPackage("unlimited");
  }, [hasUnlimited]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRedeem = async () => {
    if (inFlightRef.current) return;
    const missing = findIncompleteField(formData);
    if (missing) {
      toast.error(`${missing.label} is required.`);
      onBackToFormStep(missing.step);
      return;
    }
    if (!template.catalogId) {
      toast.error("This template is unavailable right now. Please try again later.");
      return;
    }
    inFlightRef.current = true;
    setRedeeming(true);
    const action = await dispatch(redeemPaystubCredit({ templateId: template.catalogId, formData }));
    if (redeemPaystubCredit.fulfilled.match(action)) {
      onPaymentSuccess();
      dispatch(refreshCheckoutOrder());
    } else {
      toast.error(getErrorMessage(action.payload, "We couldn't create this paystub. Please try again."));
      inFlightRef.current = false;
      setRedeeming(false);
    }
  };

  return (
    <>
      <PaystubStepper currentStep={PAYSTUB_PAGE_STEPS.PACKAGE} onStepClick={onBackToFormStep} />
      {usingCredit ? (
        <CreditRedeemSection
          template={template}
          formData={formData}
          calculations={calculations}
          orderNumber={checkout.order?.orderNumber}
          creditsRemaining={credits.creditsRemaining}
          submitting={redeeming}
          onRedeem={handleRedeem}
          onBackToReview={onBackToReview}
          onCancelCredit={() => {
            // A new purchase needs a fresh order; the paid one would send checkout straight to success.
            dispatch(cancelCreditRedeem());
            dispatch(clearCheckoutOrder());
          }}
          onChangeTemplate={() => setTemplateModalOpen(true)}
        />
      ) : (
        <PackageSelectionSection
          template={template}
          formData={formData}
          calculations={calculations}
          order={order}
          hasUnlimited={hasUnlimited}
          onBackToReview={onBackToReview}
          onChangeTemplate={() => setTemplateModalOpen(true)}
          onContinueToCheckout={onContinueToCheckout}
        />
      )}
      <TemplateSelectionModal
        open={isTemplateModalOpen}
        selectedTemplateId={template.id}
        onClose={() => setTemplateModalOpen(false)}
        onConfirm={(nextId) => {
          onSwitchTemplate(nextId);
          setTemplateModalOpen(false);
        }}
      />
    </>
  );
};

const PaystubPackageView = () => (
  <PaystubFlowPage>
    {(template) => <PaystubPackageContent template={template} />}
  </PaystubFlowPage>
);

export default PaystubPackageView;
