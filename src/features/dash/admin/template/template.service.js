import {
  createTemplateApi,
  deleteTemplateApi,
  getTemplateApi,
  listTemplatesApi,
  removeTemplatePreviewApi,
  setDefaultTemplateApi,
  updateTemplateApi,
  uploadTemplatePreviewApi,
} from "./templateApi";

export const templateService = {
  list: listTemplatesApi,
  getDetails: getTemplateApi,
  create: createTemplateApi,
  update: updateTemplateApi,
  setDefault: setDefaultTemplateApi,
  remove: deleteTemplateApi,
  uploadPreview: uploadTemplatePreviewApi,
  removePreview: removeTemplatePreviewApi,
};
