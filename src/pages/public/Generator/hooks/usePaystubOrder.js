import packagesConfig from "../../data/generator/paystubPackages.json";
import { useSessionStorageState } from "../../../../hooks/useSessionStorageState";

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

  const currentPkg =
    packagesConfig[selectedPackage] || packagesConfig[DEFAULT_PACKAGE];
  // Unlimited already covers extra paystubs, so add-ons are neither sent nor shown for it.
  const billableAdditional =
    currentPkg.productCode === "unlimited_monthly" ? 0 : additionalCount;
  const additionalCost = billableAdditional * ADDITIONAL_PAYSTUB_PRICE;
  const grandTotal = currentPkg.price + additionalCost;
  // What the server prices; the displayed totals above are estimates only.
  const items = [
    { productCode: currentPkg.productCode, quantity: 1 },
    ...(billableAdditional > 0
      ? [{ productCode: "paystub_additional", quantity: billableAdditional }]
      : []),
  ];
  const summaryLines = [
    { key: currentPkg.productCode, label: currentPkg.name, amount: currentPkg.price, suffix: currentPkg.period },
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
