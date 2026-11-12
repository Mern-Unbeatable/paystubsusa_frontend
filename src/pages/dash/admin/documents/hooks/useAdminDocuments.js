import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  selectAdminDocumentDetails,
  selectAdminDocuments,
  selectAdminDocumentsError,
  selectAdminDocumentsLoading,
  selectAdminDocumentsMeta,
} from "../../../../../features/dash/admin/document/documentSelectors";
import {
  downloadDocument as downloadDocumentThunk,
  fetchDocumentDetails,
  fetchDocuments,
  regenerateDocument as regenerateDocumentThunk,
} from "../../../../../features/dash/admin/document/documentThunks";
import { describeRequestError } from "../../../customer/Profile/utils/profileFormat";

export function useAdminDocuments() {
  const dispatch = useDispatch();
  const documents = useSelector(selectAdminDocuments);
  const meta = useSelector(selectAdminDocumentsMeta);
  const loading = useSelector(selectAdminDocumentsLoading);
  const error = useSelector(selectAdminDocumentsError);
  const details = useSelector(selectAdminDocumentDetails);

  // Returns the thunk promise (not unwrapped) so callers can `.abort()` superseded requests.
  const loadDocuments = useCallback((filters) => dispatch(fetchDocuments(filters)), [dispatch]);
  const loadDocumentDetails = useCallback((id) => dispatch(fetchDocumentDetails(id)), [dispatch]);

  /** The signed URL serves the PDF as an attachment, so the page stays where it is. */
  const downloadDocument = useCallback(
    async (doc) => {
      try {
        const { url } = await dispatch(downloadDocumentThunk(doc.id)).unwrap();
        if (url) window.location.assign(url);
      } catch (err) {
        toast.error(describeRequestError(err, "Couldn't download this document."));
      }
    },
    [dispatch],
  );

  const regenerateDocument = useCallback(
    async (doc) => {
      try {
        await dispatch(regenerateDocumentThunk(doc.id)).unwrap();
        toast.success(`${doc.documentNumber} is being regenerated.`);
        return true;
      } catch (err) {
        toast.error(describeRequestError(err, "Couldn't regenerate this document."));
        return false;
      }
    },
    [dispatch],
  );

  return {
    documents,
    meta,
    loading,
    error,
    details,
    loadDocuments,
    loadDocumentDetails,
    downloadDocument,
    regenerateDocument,
  };
}
