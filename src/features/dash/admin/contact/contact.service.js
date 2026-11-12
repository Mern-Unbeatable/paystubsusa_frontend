import {
  createContactMessageApi,
  deleteContactMessageApi,
  listContactMessagesApi,
  updateContactMessageApi,
} from "./contactApi";

export const contactService = {
  list: listContactMessagesApi,
  create: createContactMessageApi,
  update: updateContactMessageApi,
  remove: deleteContactMessageApi,
};
