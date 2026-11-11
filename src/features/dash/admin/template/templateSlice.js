import { createSlice } from "@reduxjs/toolkit";
import {
  deleteTemplate,
  fetchTemplateDetails,
  fetchTemplates,
  removeTemplatePreview,
  setDefaultTemplate,
  updateTemplate,
  uploadTemplatePreview,
} from "./templateThunks";

export const INITIAL_TEMPLATE_FILTERS = {
  q: "",
  documentType: "",
  status: "",
  page: 1,
  pageSize: 20,
};

const initialState = {
  templates: [],
  meta: { page: 1, pageSize: 20, totalItems: 0, totalPages: 0 },
  filters: INITIAL_TEMPLATE_FILTERS,
  loading: false,
  status: "idle",
  error: null,
  // Only the latest list request may write results; older ones finish late or are aborted.
  requestId: null,
  details: { id: null, template: null, loading: false, error: null, requestId: null },
};

const mergeTemplate = (current, updated) =>
  current && current.id === updated.id ? { ...current, ...updated } : current;

const applyUpdate = (state, action) => {
  const updated = action.payload?.template;
  if (!updated) {
    return;
  }

  state.templates = state.templates.map((template) => mergeTemplate(template, updated));
  state.details.template = mergeTemplate(state.details.template, updated);
};

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    /** Any filter change except paging returns to the first page. */
    setTemplateFilter(state, action) {
      const { key, value } = action.payload;
      state.filters[key] = value;
      if (key !== "page") {
        state.filters.page = 1;
      }
    },
    resetTemplateFilters(state) {
      state.filters = INITIAL_TEMPLATE_FILTERS;
    },
    clearTemplateError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplates.pending, (state, action) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
        state.requestId = action.meta.requestId;
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return;
        }

        const { templates, meta } = action.payload;
        state.templates = templates;
        state.meta = meta;
        state.loading = false;
        state.status = "succeeded";
        // The total can shrink (e.g. after a delete or under a status filter); stay on a real page.
        if (meta.totalPages > 0 && state.filters.page > meta.totalPages) {
          state.filters.page = meta.totalPages;
        }
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return;
        }

        state.loading = false;
        state.status = action.meta.aborted ? "idle" : "failed";
        state.error = action.meta.aborted ? null : action.payload || null;
      })
      .addCase(fetchTemplateDetails.pending, (state, action) => {
        const keep = state.details.id === action.meta.arg;
        state.details = {
          id: action.meta.arg,
          template: keep ? state.details.template : null,
          loading: true,
          error: null,
          requestId: action.meta.requestId,
        };
      })
      .addCase(fetchTemplateDetails.fulfilled, (state, action) => {
        if (state.details.requestId !== action.meta.requestId) {
          return;
        }

        state.details.template = action.payload.template;
        state.details.loading = false;
      })
      .addCase(fetchTemplateDetails.rejected, (state, action) => {
        if (state.details.requestId !== action.meta.requestId) {
          return;
        }

        state.details.loading = false;
        state.details.error = action.meta.aborted ? null : action.payload || null;
      })
      .addCase(updateTemplate.fulfilled, applyUpdate)
      .addCase(uploadTemplatePreview.fulfilled, applyUpdate)
      .addCase(removeTemplatePreview.fulfilled, applyUpdate)
      .addCase(setDefaultTemplate.fulfilled, (state, action) => {
        const updated = action.payload?.template;
        if (!updated) {
          return;
        }

        // Only one default per document type: the server cleared the previous one.
        const clearPrevious = (template) =>
          template && template.documentType === updated.documentType && template.id !== updated.id
            ? { ...template, isDefault: false }
            : template;
        state.templates = state.templates.map((template) => mergeTemplate(clearPrevious(template), updated));
        state.details.template = mergeTemplate(clearPrevious(state.details.template), updated);
      })
      .addCase(deleteTemplate.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.templates = state.templates.filter((template) => template.id !== id);
        if (state.details.id === id) {
          state.details = initialState.details;
        }
      });
  },
});

export const { clearTemplateError, resetTemplateFilters, setTemplateFilter } =
  templateSlice.actions;
export const templateReducer = templateSlice.reducer;
