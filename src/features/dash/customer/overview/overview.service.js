import { downloadCustomerDocumentApi, getCustomerDashboardApi } from "./overviewApi";

export const customerOverviewService = {
  getDashboard: getCustomerDashboardApi,
  downloadDocument: downloadCustomerDocumentApi,
};
