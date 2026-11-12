import { downloadDocumentApi, getDocumentApi, listDocumentsApi, regenerateDocumentApi } from "./documentApi";

export const documentService = {
  list: listDocumentsApi,
  getDetails: getDocumentApi,
  download: downloadDocumentApi,
  regenerate: regenerateDocumentApi,
};
