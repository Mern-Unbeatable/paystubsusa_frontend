import { createSlice } from "@reduxjs/toolkit";
import { fetchFoundDocuments, sendDocumentAccessCode, verifyDocumentAccessCode } from "./documentAccessThunks";
import { forgetRememberedEmail, readRememberedEmail } from "./documentAccessStorage";
import { isGuestOwner } from "./documentAccessSelectors";

const DEFAULT_FILTERS = { type: "", q: "", sort: "-createdAt", page: 1 };
const EMPTY_LIST = {
  key: null,
  // Query whose results are in `documents`; a refetch of the same query keeps showing them.
  loadedKey: null,
  owner: null,
  documents: [],
  meta: { page: 1, pageSize: 0, totalItems: 0, totalPages: 0 },
  status: "idle",
  error: null,
  requestId: null,
};

/**
 * Find Paystubs workflow, kept in the store so it survives navigating away and back.
 * In memory only: the guest token must never reach localStorage/sessionStorage; a refresh drops it.
 * Holding the token proves nothing by itself; the API validates it on every request.
 */
const initialState = () => ({
  email: readRememberedEmail(),
  challengeId: null,
  // { guestToken, email, expiresAt } from POST /verifications/{id}/verify.
  session: null,
  pending: null,
  filters: DEFAULT_FILTERS,
  list: EMPTY_LIST,
  // Owner whose list is known to contain documents; the table stays visible while they filter.
  documentsOwner: null,
});

const documentAccessSlice = createSlice({
  name: "documentAccess",
  initialState,
  reducers: {
    resetDocumentAccess: () => ({ ...initialState(), email: "" }),
    // Back to the code step with the email kept; the session is gone (expired or rejected by the API).
    documentAccessExpired: (state) => {
      state.session = null;
      state.challengeId = null;
      state.list = EMPTY_LIST;
      state.documentsOwner = null;
      state.filters = DEFAULT_FILTERS;
    },
    setFoundDocumentsFilter: (state, action) => {
      const { name, value } = action.payload;
      state.filters[name] = value;
      if (name !== "page") state.filters.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendDocumentAccessCode.pending, (state) => {
        state.pending = "send";
      })
      .addCase(sendDocumentAccessCode.fulfilled, (state, action) => {
        state.pending = null;
        state.email = action.payload.email;
        state.challengeId = action.payload.challengeId;
      })
      .addCase(sendDocumentAccessCode.rejected, (state) => {
        state.pending = null;
      })
      .addCase(verifyDocumentAccessCode.pending, (state) => {
        state.pending = "verify";
      })
      .addCase(verifyDocumentAccessCode.fulfilled, (state, action) => {
        const { guestToken, email, expiresAt } = action.payload;
        state.pending = null;
        state.challengeId = null;
        state.session = { guestToken, email, expiresAt };
        // A newly verified email never sees results or filters from a previous one.
        state.list = EMPTY_LIST;
        state.documentsOwner = null;
        state.filters = DEFAULT_FILTERS;
      })
      .addCase(verifyDocumentAccessCode.rejected, (state) => {
        state.pending = null;
      })
      .addCase(fetchFoundDocuments.pending, (state, action) => {
        const { key, owner } = action.meta;
        // Keep showing the same owner's previous rows while refetching; never another owner's.
        if (state.list.owner !== owner) state.list = { ...EMPTY_LIST, owner };
        state.list.key = key;
        state.list.status = "loading";
        state.list.error = null;
        state.list.requestId = action.meta.requestId;
      })
      .addCase(fetchFoundDocuments.fulfilled, (state, action) => {
        if (state.list.requestId !== action.meta.requestId) return;
        state.list.documents = action.payload.documents;
        state.list.meta = action.payload.meta;
        // `key` was recorded by this same request's pending action (pending meta isn't repeated here).
        state.list.loadedKey = state.list.key;
        state.list.status = "succeeded";
        if (action.payload.meta.totalItems > 0) state.documentsOwner = action.meta.arg.owner;
      })
      .addCase(fetchFoundDocuments.rejected, (state, action) => {
        if (state.list.requestId !== action.meta.requestId) return;
        if (action.payload?.status === 401 && isGuestOwner(action.meta.arg.owner)) {
          documentAccessSlice.caseReducers.documentAccessExpired(state);
          return;
        }
        state.list.status = "failed";
        state.list.error = action.payload ?? null;
      });
  },
});

/** Explicit end of the guest session ("Use a different email"): forget everything, including the email. */
export const endDocumentAccess = () => (dispatch) => {
  forgetRememberedEmail();
  dispatch(documentAccessSlice.actions.resetDocumentAccess());
};

export const { documentAccessExpired, setFoundDocumentsFilter } = documentAccessSlice.actions;
export const documentAccessReducer = documentAccessSlice.reducer;
