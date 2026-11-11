export const selectTemplateState = (state) => state.template;

export const selectTemplates = (state) => selectTemplateState(state).templates;
export const selectTemplatesMeta = (state) => selectTemplateState(state).meta;
export const selectTemplateFilters = (state) => selectTemplateState(state).filters;
export const selectTemplateStatus = (state) => selectTemplateState(state).status;
export const selectTemplateError = (state) => selectTemplateState(state).error;
// "idle" counts as loading so the first render shows skeletons, not "No templates yet".
export const selectTemplatesLoading = (state) =>
  selectTemplateState(state).loading || selectTemplateStatus(state) === "idle";
export const selectTemplateDetails = (state) => selectTemplateState(state).details;
