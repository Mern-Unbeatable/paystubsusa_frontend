import { API_ENDPOINTS } from "../../api/endpoints";
import { httpClient } from "../../api/httpClient";

async function listUsers(options = {}) {
  const response = await httpClient.get(API_ENDPOINTS.USERS.LIST, options);
  return response.data;
}

async function getUserById(userId, options = {}) {
  const response = await httpClient.get(API_ENDPOINTS.USERS.DETAILS(userId), options);
  return response.data;
}

export const userService = {
  listUsers,
  getUserById,
};

