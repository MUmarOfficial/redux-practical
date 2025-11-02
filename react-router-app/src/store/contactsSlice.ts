import { createSlice } from "@reduxjs/toolkit";
import { Contact } from "../types";

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

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
});

const contactsReducers = contactsSlice.reducer;

export default contactsReducers;
