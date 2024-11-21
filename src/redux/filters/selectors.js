import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "../contacts/selectors";

export const selectNameFilter = (state) => state.filters.name;


export const selectFilteredContacts = createSelector(
    [selectContacts, selectNameFilter],
    (contacts, nameFilter) => {
        if (contacts.length > 0) {
        return contacts.filter((contact) =>
            contact.name.toLowerCase().includes(nameFilter.toLowerCase().trim()) ||
            contact.number.includes(nameFilter.trim())
        );
        }
        return [];
    }
);

