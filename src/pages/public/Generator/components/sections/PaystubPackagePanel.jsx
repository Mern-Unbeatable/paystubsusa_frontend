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
  findIncompleteDirectDepositFields,
  usePaystubFormData,
} from "../../hooks/usePaystubFormData";
import { usePaystubOrder } from "../../hooks/usePaystubOrder";
import { usePaystubFlowNavigation } from "../../hooks/usePaystubFlowNavigation";
import { useActiveSubscription } from "../../hooks/useActiveSubscription";
import { PAYSTUB_CHECKOUT_PHASE } from "../../hooks/usePaystubFormStep";
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
  const { formData, calculations, toApiFormData, updateDirectDeposit } =
    usePaystubFormData();
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
  const [ddFieldErrors, setDdFieldErrors] = useState({});
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
          fieldErrors={ddFieldErrors}
          onUpdateDirectDeposit={(patch) => {
            setDdFieldErrors((prev) => {
              const next = { ...prev };
              Object.keys(patch).forEach((key) => {
                delete next[key];
              });
              return next;
            });
            updateDirectDeposit(patch);
          }}
          onBackToReview={onBackToReview}
          onChangeTemplate={() => setTemplateModalOpen(true)}
          onContinueToCheckout={() => {
            if (order.includeDdSlip) {
              if (!formData.directDeposit?.enabled) {
                updateDirectDeposit({ enabled: true });
              }
              const bankMissing = findIncompleteDirectDepositFields(formData);
              if (bankMissing.length > 0) {
                setDdFieldErrors(
                  Object.fromEntries(
                    bankMissing.map((f) => [f.key, f.label]),
                  ),
                );
                toast.error(
                  "Complete the Direct Deposit bank details before continuing.",
                );
                requestAnimationFrame(() => {
                  document
                    .getElementById(`paystub-field-${bankMissing[0].key}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "center" });
                });
                return;
              }
            }
            setDdFieldErrors({});
            // Temporary: inspect package → checkout payload in the browser console.
            console.log("[paystub package continue]", {
              items: order.items,
              includeDdSlip: order.includeDdSlip,
              formData: toApiFormData(),
              summaryLines: order.summaryLines,
              grandTotal: order.grandTotal,
            });
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
