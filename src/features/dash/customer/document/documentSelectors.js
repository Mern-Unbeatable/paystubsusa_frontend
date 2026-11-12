export const selectCustomerDocumentState = (state) => state.customerDocument;

export const selectMyDocuments = (state) => selectCustomerDocumentState(state).documents;
export const selectMyDocumentsMeta = (state) => selectCustomerDocumentState(state).meta;
export const selectMyDocumentsError = (state) => selectCustomerDocumentState(state).error;
// "idle" counts as loading so the first render shows skeletons, not "No documents yet".
export const selectMyDocumentsLoading = (state) =>
  selectCustomerDocumentState(state).loading || selectCustomerDocumentState(state).status === "idle";
