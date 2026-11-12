import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeThunkError } from "../../../../api/errorNormalizer";
import { contactService } from "./contact.service";

const thunk = (type, call) =>
  createAsyncThunk(type, async (arg, { rejectWithValue, signal }) => {
    try {
      return await call(arg, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  });

export const fetchContactMessages = thunk(
  "adminContact/fetchContactMessages",
  contactService.list,
);
export const updateContactMessage = thunk(
  "adminContact/updateContactMessage",
  contactService.update,
);
export const replyContactMessage = thunk(
  "adminContact/replyContactMessage",
  contactService.reply,
);
export const deleteContactMessage = thunk(
  "adminContact/deleteContactMessage",
  contactService.remove,
);
