import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Contact } from "../types";
import { getContacts } from "../api/contactsApi";
import { RootState } from "./store";

interface ContactsState {
  items: Contact[];
  openedContact: Contact | null;
  apiCallInProgress: boolean;
}

const initialState: ContactsState = {
  items: [],
  openedContact: null,
  apiCallInProgress: false,
};

export const getContactsThunk = createAsyncThunk(
  "contacts/getContacts",
  async () => {
    const contacts = await getContacts();
    return contacts;
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContactsThunk.pending, (state) => {
        state.apiCallInProgress = true;
      })
      .addCase(getContactsThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.apiCallInProgress = false;
      })
      .addCase(getContactsThunk.rejected, (state) => {
        state.apiCallInProgress = false;
      });
  },
});

const contactsReducers = contactsSlice.reducer;

export const selectApiCallInProgress = (state: RootState) => {
  return state.contacts.apiCallInProgress;
};

export const selectContactsList = (state: RootState) => {
  return state.contacts.items;
};

export default contactsReducers;
