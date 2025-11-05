import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Contact } from "../types";
import {
  createContact,
  deleteContact,
  getContactById,
  getContacts,
} from "../api/contactsApi";
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

type GenericAsyncThunk = AsyncThunk<unknown, unknown, { rejectValue: unknown }>;

type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

export const getContactsThunk = createAsyncThunk(
  "contacts/getContacts",
  async () => {
    const contacts = await getContacts();
    return contacts;
  }
);

export const createContactsThunk = createAsyncThunk(
  "contacts/createContacts",
  async (contact: Partial<Contact>) => {
    const newContact = createContact(contact);
    return newContact;
  }
);

export const deleteContactThunk = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId: string) => {
    const deletedContact = await deleteContact(contactId);
    return deletedContact;
  }
);

export const getContactByIdThunk = createAsyncThunk(
  "contacts/getContactById",
  async (contactId: string) => {
    const contact = await getContactById(contactId);
    return contact;
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContactsThunk.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createContactsThunk.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.login.uuid !== action.payload.login.uuid
        );
      })
      .addCase(getContactByIdThunk.fulfilled, (state, action) => {
        state.openedContact = action.payload;
      })
      .addMatcher(
        (action): action is PendingAction => action.type.endsWith("/pending"),
        (state) => {
          state.apiCallInProgress = true;
        }
      )
      .addMatcher(
        (action): action is FulfilledAction =>
          action.type.endsWith("/fulfilled"),
        (state) => {
          state.apiCallInProgress = false;
        }
      )
      .addMatcher(
        (action): action is RejectedAction => action.type.endsWith("/rejected"),
        (state) => {
          state.apiCallInProgress = false;
        }
      );
  },
});

const contactsReducers = contactsSlice.reducer;

export const selectApiCallInProgress = (state: RootState) => {
  return state.contacts.apiCallInProgress;
};

export const selectContactsList = (state: RootState) => {
  return state.contacts.items;
};

export const selectOpenContact = (state: RootState) => {
  return state.contacts.openedContact;
};

export default contactsReducers;
