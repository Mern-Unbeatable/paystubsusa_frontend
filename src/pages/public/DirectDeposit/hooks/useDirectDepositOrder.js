import { useSessionStorageState } from "../../../../hooks/useSessionStorageState";

export const DIRECT_DEPOSIT_PRODUCT = {
  productCode: "direct_deposit_single",
  name: "Direct Deposit Slip",
  price: 14.99,
};

export function useDirectDepositOrder() {
  const [checkoutEmail, setCheckoutEmail] = useSessionStorageState(
    "directDepositGenerator.checkoutEmail",
    "",
  );

  const items = [
    { productCode: DIRECT_DEPOSIT_PRODUCT.productCode, quantity: 1 },
  ];
  const summaryLines = [
    {
      key: DIRECT_DEPOSIT_PRODUCT.productCode,
      label: DIRECT_DEPOSIT_PRODUCT.name,
      amount: DIRECT_DEPOSIT_PRODUCT.price,
    },
  ];

  return {
    items,
    summaryLines,
    checkoutEmail,
    setCheckoutEmail,
    grandTotal: DIRECT_DEPOSIT_PRODUCT.price,
    product: DIRECT_DEPOSIT_PRODUCT,
  };
}
