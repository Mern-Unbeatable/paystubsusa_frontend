import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTemplateDetails,
  selectTemplateError,
  selectTemplateFilters,
  selectTemplateStatus,
  selectTemplates,
  selectTemplatesLoading,
  selectTemplatesMeta,
} from "../../../../../features/dash/admin/template/templateSelectors";
import {
  resetTemplateFilters,
  setTemplateFilter,
} from "../../../../../features/dash/admin/template/templateSlice";
import {
  createTemplate as createTemplateThunk,
  deleteTemplate as deleteTemplateThunk,
  fetchTemplateDetails,
  fetchTemplates,
  removeTemplatePreview as removeTemplatePreviewThunk,
  setDefaultTemplate as setDefaultTemplateThunk,
  updateTemplate as updateTemplateThunk,
  uploadTemplatePreview as uploadTemplatePreviewThunk,
} from "../../../../../features/dash/admin/template/templateThunks";

export function useTemplates() {
  const dispatch = useDispatch();
  const templates = useSelector(selectTemplates);
  const meta = useSelector(selectTemplatesMeta);
  const filters = useSelector(selectTemplateFilters);
  const loading = useSelector(selectTemplatesLoading);
  const status = useSelector(selectTemplateStatus);
  const error = useSelector(selectTemplateError);
  const details = useSelector(selectTemplateDetails);

  // Returns the thunk promise (not unwrapped) so callers can `.abort()` superseded requests.
  const loadTemplates = useCallback(
    (requestFilters) => dispatch(fetchTemplates(requestFilters)),
    [dispatch],
  );

  const loadTemplateDetails = useCallback(
    (id) => dispatch(fetchTemplateDetails(id)),
    [dispatch],
  );

  const setFilter = useCallback(
    (key, value) => dispatch(setTemplateFilter({ key, value })),
    [dispatch],
  );

  const resetFilters = useCallback(() => dispatch(resetTemplateFilters()), [dispatch]);

  const createTemplate = useCallback(
    (body) => dispatch(createTemplateThunk(body)).unwrap(),
    [dispatch],
  );

  const updateTemplate = useCallback(
    (payload) => dispatch(updateTemplateThunk(payload)).unwrap(),
    [dispatch],
  );

  const setDefaultTemplate = useCallback(
    (id) => dispatch(setDefaultTemplateThunk(id)).unwrap(),
    [dispatch],
  );

  const deleteTemplate = useCallback(
    (id) => dispatch(deleteTemplateThunk(id)).unwrap(),
    [dispatch],
  );

  const uploadTemplatePreview = useCallback(
    (payload) => dispatch(uploadTemplatePreviewThunk(payload)).unwrap(),
    [dispatch],
  );

  const removeTemplatePreview = useCallback(
    (id) => dispatch(removeTemplatePreviewThunk(id)).unwrap(),
    [dispatch],
  );

  return {
    templates,
    meta,
    filters,
    loading,
    status,
    error,
    details,
    loadTemplates,
    loadTemplateDetails,
    setFilter,
    resetFilters,
    createTemplate,
    updateTemplate,
    setDefaultTemplate,
    deleteTemplate,
    uploadTemplatePreview,
    removeTemplatePreview,
  };
}
