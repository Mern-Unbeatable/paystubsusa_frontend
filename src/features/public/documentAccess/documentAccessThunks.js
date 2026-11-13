import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeThunkError } from "../../../api/errorNormalizer";
import { checkoutService } from "../checkout/checkout.service";
import { guestAuth } from "../checkout/checkoutApi";
import { customerDocumentService } from "../../dash/customer/document/document.service";
import { foundDocumentsKey, isGuestOwner } from "./documentAccessSelectors";
import { rememberEmail } from "./documentAccessStorage";

const withErrors = (type, run, options) =>
  createAsyncThunk(
    type,
    async (arg, api) => {
      try {
        return await run(arg, api);
      } catch (error) {
        return api.rejectWithValue(normalizeThunkError(error));
      }
    },
    options,
  );

/** Emails a document-access code; the server responds the same whether or not the email has orders. */
export const sendDocumentAccessCode = withErrors("documentAccess/sendCode", async (email) => {
  const result = await checkoutService.sendCode(email, "document_access");
  rememberEmail(email);
  return { challengeId: result.challengeId, email };
});

/** Exchanges the code for a 30-minute guest token, validated by the API on every request. */
export const verifyDocumentAccessCode = withErrors("documentAccess/verifyCode", (code, { getState }) =>
  checkoutService.verifyCode(getState().documentAccess.challengeId, code),
);

/**
 * Documents of paid orders for the verified guest (or the signed-in customer); the API scopes them.
 * `condition` drops a request identical to one already in flight (remounts, StrictMode).
 */
export const fetchFoundDocuments = withErrors(
  "documentAccess/fetchDocuments",
  ({ owner, pageSize }, { getState }) => {
    const { session, filters } = getState().documentAccess;
    const guestToken = isGuestOwner(owner) ? session?.guestToken : null;
    return customerDocumentService.list({ ...filters, pageSize }, { headers: guestAuth(guestToken) });
  },
  {
    getPendingMeta: ({ arg }, { getState }) => {
      const { filters } = getState().documentAccess;
      return { key: foundDocumentsKey(arg.owner, filters, arg.pageSize), owner: arg.owner };
    },
    condition: ({ owner, pageSize }, { getState }) => {
      const { list, filters } = getState().documentAccess;
      return !(list.status === "loading" && list.key === foundDocumentsKey(owner, filters, pageSize));
    },
  },
);