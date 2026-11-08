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
  const additionalCost = additionalCount * ADDITIONAL_PAYSTUB_PRICE;
  const grandTotal = currentPkg.price + additionalCost;

  return {
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
