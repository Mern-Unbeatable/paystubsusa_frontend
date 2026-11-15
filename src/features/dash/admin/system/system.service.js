import { getSystemRecordApi, listSystemRecordsApi } from "./systemApi";

export const systemService = {
  list: listSystemRecordsApi,
  get: getSystemRecordApi,
};
