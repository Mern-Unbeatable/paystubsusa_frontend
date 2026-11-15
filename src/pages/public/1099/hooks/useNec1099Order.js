import { useSessionStorageState } from "../../../../hooks/useSessionStorageState";

export const NEC1099_PRODUCT = {
  productCode: "nec1099_single",
  name: "1099-NEC Form",
  price: 14.99,
};

export function useNec1099Order() {
  const [checkoutEmail, setCheckoutEmail] = useSessionStorageState(
    "nec1099Generator.checkoutEmail",
    "",
  );

  const items = [{ productCode: NEC1099_PRODUCT.productCode, quantity: 1 }];
  const summaryLines = [
    {
      key: NEC1099_PRODUCT.productCode,
      label: NEC1099_PRODUCT.name,
      amount: NEC1099_PRODUCT.price,
    },
  ];

  return {
    items,
    summaryLines,
    checkoutEmail,
    setCheckoutEmail,
    grandTotal: NEC1099_PRODUCT.price,
    product: NEC1099_PRODUCT,
  };
}
