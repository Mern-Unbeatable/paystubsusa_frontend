import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMyDocuments,
  selectMyDocumentsError,
  selectMyDocumentsLoading,
  selectMyDocumentsMeta,
} from "../../../../../features/dash/customer/document/documentSelectors";
import { downloadMyDocument, fetchMyDocuments } from "../../../../../features/dash/customer/document/documentThunks";

export function useMyDocuments() {
  const dispatch = useDispatch();
  const documents = useSelector(selectMyDocuments);
  const meta = useSelector(selectMyDocumentsMeta);
  const loading = useSelector(selectMyDocumentsLoading);
  const error = useSelector(selectMyDocumentsError);

  // Returns the thunk promise (not unwrapped) so callers can `.abort()` superseded requests.
  const loadDocuments = useCallback((filters) => dispatch(fetchMyDocuments(filters)), [dispatch]);
  const getDownloadUrl = useCallback(
    async (id) => (await dispatch(downloadMyDocument(id)).unwrap())?.url,
    [dispatch],
  );

  return { documents, meta, loading, error, loadDocuments, getDownloadUrl };
}
