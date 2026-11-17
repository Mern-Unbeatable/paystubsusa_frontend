import packagesConfig from "../../data/generator/paystubPackages.json";
import { useSessionStorageState } from "../../../../hooks/useSessionStorageState";
import { useHasActiveSubscription } from "./useActiveSubscription";

const DEFAULT_PACKAGE = "3paystubs"; // '1paystub' | '3paystubs' | 'unlimited'
const ADDITIONAL_PAYSTUB_PRICE = 7.99;
export const PAYSTUB_DD_SLIP_PRODUCT_CODE = "paystub_dd_slip";
export const PAYSTUB_DD_SLIP_PRICE = 1.99;

/** Package choice, add-ons and delivery email shared by package, checkout and success. */
export function usePaystubOrder() {
  const [selectedPackage, setSelectedPackage] = useSessionStorageState(
    "paystubGenerator.selectedPackage",
    DEFAULT_PACKAGE,
  );
  const [additionalCount, setAdditionalCount] = useSessionStorageState(
    "paystubGenerator.additionalCount",
    0,
  );
  const [includeDdSlip, setIncludeDdSlip] = useSessionStorageState(
    "paystubGenerator.includeDdSlip",
    false,
  );
  const [checkoutEmail, setCheckoutEmail] = useSessionStorageState(
    "paystubGenerator.checkoutEmail",
    "",
  );
  const hasActiveSubscription = useHasActiveSubscription();

  const currentPkg =
    packagesConfig[selectedPackage] || packagesConfig[DEFAULT_PACKAGE];
  const isUnlimited = currentPkg.productCode === "unlimited_monthly";
  // Active subscribers create Unlimited documents for $0 (the server prices them the same way).
  const includedInPlan = isUnlimited && hasActiveSubscription;
  const packagePrice = includedInPlan ? 0 : currentPkg.price;
  // Unlimited already covers extra paystubs, so add-ons are neither sent nor shown for it.
  const billableAdditional = isUnlimited ? 0 : additionalCount;
  // DD slip is a one-time paid add-on only — never auto-selected from saved bank details.
  const billableDdSlip = !isUnlimited && Boolean(includeDdSlip);
  const additionalCost = billableAdditional * ADDITIONAL_PAYSTUB_PRICE;
  const ddSlipCost = billableDdSlip ? PAYSTUB_DD_SLIP_PRICE : 0;
  const grandTotal = packagePrice + additionalCost + ddSlipCost;
  // What the server prices; the displayed totals above are estimates only.
  const items = [
    { productCode: currentPkg.productCode, quantity: 1 },
    ...(billableAdditional > 0
      ? [{ productCode: "paystub_additional", quantity: billableAdditional }]
      : []),
    ...(billableDdSlip
      ? [{ productCode: PAYSTUB_DD_SLIP_PRODUCT_CODE, quantity: 1 }]
      : []),
  ];
  const summaryLines = [
    includedInPlan
      ? { key: currentPkg.productCode, label: `${currentPkg.name} (included in your plan)`, amount: 0 }
      : { key: currentPkg.productCode, label: currentPkg.name, amount: currentPkg.price, suffix: currentPkg.period },
    ...(billableAdditional > 0
      ? [{ key: "paystub_additional", label: `Additional paystubs × ${billableAdditional}`, amount: additionalCost }]
      : []),
    ...(billableDdSlip
      ? [{ key: PAYSTUB_DD_SLIP_PRODUCT_CODE, label: "Direct Deposit Slip", amount: PAYSTUB_DD_SLIP_PRICE }]
      : []),
  ];

  const selectPackage = (next) => {
    setSelectedPackage(next);
    if (next === "unlimited") setIncludeDdSlip(false);
  };

  return {
    items,
    summaryLines,
    selectedPackage,
    setSelectedPackage: selectPackage,
    additionalCount,
    setAdditionalCount,
    includeDdSlip: billableDdSlip,
    setIncludeDdSlip,
    checkoutEmail,
    setCheckoutEmail,
    currentPkg,
    additionalCost,
    ddSlipCost,
    grandTotal,
    isUnlimited,
  };
}
