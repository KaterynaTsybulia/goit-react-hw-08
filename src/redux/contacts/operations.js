import { createAsyncThunk } from "@reduxjs/toolkit";
import {authInstance} from "../auth/operations"

export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    async (_, thunkAPI) => {
        try {
            const { data } = await authInstance.get("/contacts");
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (newContact, thunkAPI) => {
        try {
            const { data } = await authInstance.post("/contacts", newContact);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteContact  = createAsyncThunk(
    "contacts/deleteContact",
    async (contactId, thunkAPI) => {
        try {
            const { data } = await authInstance.delete(`/contacts/${contactId}`);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const editContact = createAsyncThunk(
  "contacts/editContact",
  async ({ contactId, updatedFields }, thunkAPI) => {
    try {
      const { data } = await authInstance.patch(`/contacts/${contactId}`, updatedFields);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const logOut = createAsyncThunk(
//     "contacts/logOut",
//     async () => {
//         return true;
//     }
// );