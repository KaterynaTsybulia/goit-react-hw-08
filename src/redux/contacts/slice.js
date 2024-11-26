import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact, editContact } from "./operations";
import { logoutUser } from "../auth/operations";

function handlePending (state) {
    state.loading = true;
    state.error = null;
}

function handleRejected (state, action) {
    state.loading = false;
    state.error = action.payload;
}

const contactsSlice = createSlice({
    name: "contacts",
    initialState: {
        items: [], 
        loading: false,
        error: null,
        isModalOpen: false, 
        selectedContact: null, 
    },
    reducers: {
    openModal(state, action) {
        state.isModalOpen = true;
        state.selectedContact = action.payload;
    },
    closeModal(state) {
        state.isModalOpen = false;
        state.selectedContact = null;
    },
  },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, handlePending)
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchContacts.rejected, handleRejected)

            .addCase(addContact.pending, handlePending)
            .addCase(addContact.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.loading = false;
            })
            .addCase(addContact.rejected, handleRejected)

            // .addCase(deleteContact.pending, handlePending)
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload.id);
                // state.loading = false;
            })
            .addCase(deleteContact.rejected, handleRejected)

            .addCase(editContact.pending, handlePending)
            .addCase(editContact.fulfilled, (state, action) => {
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload; 
                }
                state.loading = false;
            })
            .addCase(editContact.rejected, handleRejected)

            .addCase(logoutUser.fulfilled, (state) => {
                state.items = [];
                state.loading = false;
                state.error = null;
                state.isModalOpen = false;
                state.selectedContact = null;
            });
    },
});

export const { openModal, closeModal } = contactsSlice.actions;
export default contactsSlice.reducer;