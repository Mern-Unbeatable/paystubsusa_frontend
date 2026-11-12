import { downloadMyDocumentApi, listMyDocumentsApi } from "./documentApi";

export const customerDocumentService = {
  list: listMyDocumentsApi,
  download: downloadMyDocumentApi,
};
