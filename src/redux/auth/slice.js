import { createSlice } from "@reduxjs/toolkit";
import { register, loginUser, refreshUser, logoutUser } from "./operations";


function handlePending(state) {
    state.loading = true;
    state.error = null;
}

function handleRejected (state, action) {
    state.loading = false;
    state.error = action.payload;
}

const INITIAL_STATE = {
    user: { name: null, email: null },
    // loading: false,
    error: null,
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState: INITIAL_STATE,
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, handlePending)
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                // state.loading = false;
                state.isLoggedIn = true;
            })
            .addCase(register.rejected, handleRejected)
            .addCase(loginUser.pending, handlePending)
            .addCase(loginUser.fulfilled, (state, action) => {
                // state.loading = false;
                state.isLoggedIn = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, handleRejected)
            .addCase(refreshUser.pending, (state) => {
                state.isRefreshing = true;
                state.error = null;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.isRefreshing = false;
                state.isLoggedIn = true;
                state.user = action.payload;
            })
            .addCase(refreshUser.rejected, (state, action) => {
                state.isRefreshing = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = { name: null, email: null };
                state.token = null;
                state.isLoggedIn = false;
            })
    }
})    
    
export default authSlice.reducer;