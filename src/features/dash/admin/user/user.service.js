import { getUserApi, listUsersApi, updateUserStatusApi } from "./userApi";

export const userService = {
  list: listUsersApi,
  getDetails: getUserApi,
  updateStatus: updateUserStatusApi,
};
