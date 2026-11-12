const EMPTY = { templates: [], status: "idle", error: null };

export const selectPublicTemplatesByType = (state, documentType) =>
  state.publicTemplate.byType[documentType] ?? EMPTY;
