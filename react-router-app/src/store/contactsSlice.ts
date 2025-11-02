import { Contact } from "../types";

interface ContactsState {
    contact: Contact[];
    openedContact: Contact | null;
    apiCallInProgress: boolean;
}