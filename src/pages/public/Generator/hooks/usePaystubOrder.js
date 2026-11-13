import packagesConfig from "../../data/generator/paystubPackages.json";
import { useSessionStorageState } from "../../../../hooks/useSessionStorageState";
import { useHasActiveSubscription } from "./useActiveSubscription";

const DEFAULT_PACKAGE = "3paystubs"; // '1paystub' | '3paystubs' | 'unlimited'
const ADDITIONAL_PAYSTUB_PRICE = 7.99;

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
  const additionalCost = billableAdditional * ADDITIONAL_PAYSTUB_PRICE;
  const grandTotal = packagePrice + additionalCost;
  // What the server prices; the displayed totals above are estimates only.
  const items = [
    { productCode: currentPkg.productCode, quantity: 1 },
    ...(billableAdditional > 0
      ? [{ productCode: "paystub_additional", quantity: billableAdditional }]
      : []),
  ];
  const summaryLines = [
    includedInPlan
      ? { key: currentPkg.productCode, label: `${currentPkg.name} (included in your plan)`, amount: 0 }
      : { key: currentPkg.productCode, label: currentPkg.name, amount: currentPkg.price, suffix: currentPkg.period },
    ...(billableAdditional > 0
      ? [{ key: "paystub_additional", label: `Additional paystubs × ${billableAdditional}`, amount: additionalCost }]
      : []),
  ];

  return {
    items,
    summaryLines,
    selectedPackage,
    setSelectedPackage,
    additionalCount,
    setAdditionalCount,
    checkoutEmail,
    setCheckoutEmail,
    currentPkg,
    additionalCost,
    grandTotal,
  };
}
