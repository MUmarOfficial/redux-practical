import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Contact } from "../types";
import { createContact, deleteContact, getContactById, getContacts } from "../api/contactsApi";
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

// type GenericAsyncThunk = AsyncThunk<unknown, unknown, { rejectValue: unknown }>

// type pendingThunk = ReturnType<GenericAsyncThunk["pending"]>;
// type rejectedThunk = ReturnType<GenericAsyncThunk["rejected"]>;
// type fulfilledThunk = ReturnType<GenericAsyncThunk["fulfilled"]>;

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
      .addCase(getContactsThunk.pending, (state) => {
        state.apiCallInProgress = true;
      })
      .addCase(getContactsThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.apiCallInProgress = false;
      })
      .addCase(getContactsThunk.rejected, (state) => {
        state.apiCallInProgress = false;
      })
      .addCase(createContactsThunk.pending, (state) => {
        state.apiCallInProgress = true;
      })
      .addCase(createContactsThunk.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.apiCallInProgress = false;
      })
      .addCase(createContactsThunk.rejected, (state) => {
        state.apiCallInProgress = false;
      })
      .addCase(deleteContactThunk.pending, (state) => {
        state.apiCallInProgress = true;
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.login.uuid !== action.payload.login.uuid
        );
        state.apiCallInProgress = false;
      })
      .addCase(deleteContactThunk.rejected, (state) => {
        state.apiCallInProgress = false;
      })
      .addCase(getContactByIdThunk.pending, (state) => {
        state.apiCallInProgress = true;
      })
      .addCase(getContactByIdThunk.fulfilled, (state, action) => {
        state.openedContact = action.payload;
        state.apiCallInProgress = false;
      })
      .addCase(getContactByIdThunk.rejected, (state) => {
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

export const selectOpenContact = (state: RootState) => {
  return state.contacts.openedContact;
};

export default contactsReducers;
