import { useSessionStorageState } from "../../../../hooks/useSessionStorageState";

/** Fixed W-2 product; server still re-prices from catalog (`w2_single`). */
export const W2_PRODUCT = {
  productCode: "w2_single",
  name: "W-2 Form",
  price: 14.99,
};

/** Checkout email + fixed line items shared by W-2 checkout and success. */
export function useW2Order() {
  const [checkoutEmail, setCheckoutEmail] = useSessionStorageState(
    "w2Generator.checkoutEmail",
    "",
  );

  const items = [{ productCode: W2_PRODUCT.productCode, quantity: 1 }];
  const summaryLines = [
    {
      key: W2_PRODUCT.productCode,
      label: W2_PRODUCT.name,
      amount: W2_PRODUCT.price,
    },
  ];

  return {
    items,
    summaryLines,
    checkoutEmail,
    setCheckoutEmail,
    grandTotal: W2_PRODUCT.price,
    product: W2_PRODUCT,
  };
}
