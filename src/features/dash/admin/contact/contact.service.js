import {
  deleteContactMessageApi,
  listContactMessagesApi,
  replyContactMessageApi,
  updateContactMessageApi,
} from "./contactApi";

export const contactService = {
  list: listContactMessagesApi,
  update: updateContactMessageApi,
  reply: replyContactMessageApi,
  remove: deleteContactMessageApi,
};
