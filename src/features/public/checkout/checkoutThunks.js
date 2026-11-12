import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeThunkError } from "../../../api/errorNormalizer";
import { checkoutService } from "./checkout.service";

const withErrors = (type, run) =>
  createAsyncThunk(type, async (arg, api) => {
    try {
      return await run(arg, api);
    } catch (error) {
      return api.rejectWithValue(normalizeThunkError(error));
    }
  });

export const sendCheckoutCode = withErrors("checkout/sendCode", (email) => checkoutService.sendCode(email));

export const verifyCheckoutCode = withErrors("checkout/verifyCode", (code, { getState }) =>
  checkoutService.verifyCode(getState().checkout.challengeId, code),
);

/** `items` and `formData` come from the flow; price and email are decided by the server. */
export const createCheckoutOrder = withErrors(
  "checkout/createOrder",
  ({ templateId, items, formData, idempotencyKey }, { getState }) =>
    checkoutService.createOrder(
      { documentType: "paystub", templateId, items, formData, termsAccepted: true },
      { guestToken: getState().checkout.guestToken, idempotencyKey },
    ),
);

export const refreshCheckoutOrder = withErrors("checkout/refreshOrder", (_, { getState }) => {
  const { order, guestToken } = getState().checkout;
  return checkoutService.getOrder(order.id, guestToken);
});

export const downloadCheckoutDocument = withErrors("checkout/downloadDocument", (documentId, { getState }) =>
  checkoutService.downloadDocument(documentId, getState().checkout.guestToken),
);
