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

const RECENT_PAID_ORDERS = 10;
const hasPaystubCredits = (order) =>
  order?.entitlements?.some((e) => e.documentType === "paystub" && e.creditsRemaining > 0);

/** Most recent paid paystub order of the verified buyer that still has credits, or null. Survives a reload. */
export const findOrderWithCredits = withErrors("checkout/findOrderWithCredits", async (_, { getState }) => {
  const { guestToken } = getState().checkout;
  const page = await checkoutService.listOrders({ status: "paid", pageSize: RECENT_PAID_ORDERS }, guestToken);
  for (const summary of page?.data ?? []) {
    if (summary.documentType !== "paystub") continue;
    const order = await checkoutService.getOrder(summary.id, guestToken);
    if (hasPaystubCredits(order)) return order;
  }
  return null;
});

/** Uses the credit chosen on the success page; no payment, the server checks ownership and balance. */
export const redeemPaystubCredit = withErrors("checkout/redeemCredit", ({ templateId, formData }, { getState }) => {
  const { credit, guestToken } = getState().checkout;
  return checkoutService.redeemCredit({ entitlementId: credit.entitlementId, templateId, formData }, guestToken);
});

export const downloadCheckoutDocument = withErrors("checkout/downloadDocument", (documentId, { getState }) =>
  checkoutService.downloadDocument(documentId, getState().checkout.guestToken),
);
