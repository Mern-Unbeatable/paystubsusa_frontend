import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import TemplateSelectionModal from "../common/templatePicker/TemplateSelectionModal";
import PackageSelectionSection from "./PackageSelectionSection";
import CreditRedeemSection from "./CreditRedeemSection";
import PaystubStepper from "../common/flow/PaystubStepper";
import { PAYSTUB_PAGE_STEPS } from "../../utils/paystubFlow";
import {
  findIncompleteField,
  findIncompleteFields,
  usePaystubFormData,
} from "../../hooks/usePaystubFormData";
import { usePaystubOrder } from "../../hooks/usePaystubOrder";
import { usePaystubFlowNavigation } from "../../hooks/usePaystubFlowNavigation";
import { useActiveSubscription } from "../../hooks/useActiveSubscription";
import { PAYSTUB_CHECKOUT_PHASE } from "../../hooks/usePaystubFormStep";
import { PAYSTUB_FORM_STEPS } from "../../utils/paystubFlow";
import { getErrorMessage } from "../../../../../api/errorNormalizer";
import {
  cancelCreditRedeem,
  clearCheckoutOrder,
} from "../../../../../features/public/checkout/checkoutSlice";
import {
  selectCheckout,
  selectCheckoutCredits,
} from "../../../../../features/public/checkout/checkoutSelectors";
import {
  redeemPaystubCredit,
  refreshCheckoutOrder,
} from "../../../../../features/public/checkout/checkoutThunks";

/** Step 5: package selection — URL `?step=5&checkout=package`. */
const PaystubPackagePanel = ({ template }) => {
  const dispatch = useDispatch();
  const { formData, calculations, toApiFormData } = usePaystubFormData();
  const order = usePaystubOrder();
  const {
    onBackToReview,
    onBackToFormStep,
    onSwitchTemplate,
    onContinueToCheckout,
    onPaymentSuccess,
    goToStep,
  } = usePaystubFlowNavigation(template.id);
  const [isTemplateModalOpen, setTemplateModalOpen] = useState(false);
  const checkout = useSelector(selectCheckout);
  const credits = useSelector(selectCheckoutCredits);
  const usingCredit = Boolean(
    checkout.credit && credits?.id === checkout.credit.entitlementId,
  );
  const [redeeming, setRedeeming] = useState(false);
  const inFlightRef = useRef(false);
  const { isActive: hasUnlimited } = useActiveSubscription();
  const unlimitedPreselectedRef = useRef(false);

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
      toast.error(
        "This template is unavailable right now. Please try again later.",
      );
      return;
    }
    inFlightRef.current = true;
    setRedeeming(true);
    const action = await dispatch(
      redeemPaystubCredit({ templateId: template.catalogId, formData: toApiFormData() }),
    );
    if (redeemPaystubCredit.fulfilled.match(action)) {
      onPaymentSuccess();
      dispatch(refreshCheckoutOrder());
    } else {
      toast.error(
        getErrorMessage(
          action.payload,
          "We couldn't create this paystub. Please try again.",
        ),
      );
      inFlightRef.current = false;
      setRedeeming(false);
    }
  };

  return (
    <>
      <PaystubStepper
        currentStep={PAYSTUB_PAGE_STEPS.PACKAGE}
        onStepClick={goToStep}
      />
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
          onContinueToCheckout={() => {
            if (order.includeDdSlip) {
              const bankMissing = findIncompleteFields(formData).filter((f) =>
                [
                  "bankName",
                  "accountHolderName",
                  "routingNumber",
                  "accountNumber",
                ].includes(f.key),
              );
              if (!formData.directDeposit?.enabled || bankMissing.length > 0) {
                toast.error(
                  "Add complete bank details in Pay Details before purchasing the Direct Deposit Slip.",
                );
                onBackToFormStep(PAYSTUB_FORM_STEPS.PAY);
                return;
              }
            }
            onContinueToCheckout();
          }}
        />
      )}
      <TemplateSelectionModal
        open={isTemplateModalOpen}
        selectedTemplateId={template.id}
        onClose={() => setTemplateModalOpen(false)}
        onConfirm={(nextId) => {
          onSwitchTemplate(nextId, {
            step: PAYSTUB_PAGE_STEPS.PACKAGE,
            checkoutPhase: PAYSTUB_CHECKOUT_PHASE.PACKAGE,
          });
          setTemplateModalOpen(false);
        }}
      />
    </>
  );
};

export default PaystubPackagePanel;
