import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const authInstance = axios.create({
    baseURL: "https://connections-api.goit.global",
  });

export const setToken = (token) => {
    authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const clearToken = () => {
  authInstance.defaults.headers.common.Authorization = '';
}


export const register = createAsyncThunk(
    'auth/registerUser',
    async (newUser, thunkAPI) => {
        try {
            const {data} = await authInstance.post("/users/signup", newUser);
            setToken(data.token);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (formData, thunkAPI) => {
        try {
            const {data} = await authInstance.post("/users/login", formData);
            setToken(data.token);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const refreshUser  = createAsyncThunk(
    'auth/refreshUser',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const token = state.auth.token;

        if (!token) return thunkAPI.rejectWithValue("No token provided to refresh user data");

        try {
            setToken(token);
            const {data} = await authInstance.get("/users/current");
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, thunkAPI) => {
        try {
            const {data} = await authInstance.post("/users/logout");
            clearToken();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

