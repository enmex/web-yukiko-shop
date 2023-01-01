import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState, AuthorizationResponse } from "./auth.types";

export const initialState: AuthState = {
    isAuthorized: false,
    access: {
        token: "",
        expiresAt: 0,
    },
    refresh: {
        token: "",
        expiresAt: 0,
    },
    email: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        removeToken: (state) => {
            localStorage.removeItem("auth");
            state.isAuthorized = initialState.isAuthorized;
            state.email = initialState.email;
            state.access.token = initialState.access.token;
            state.access.expiresAt = initialState.access.expiresAt;
            state.refresh.token = initialState.refresh.token;
            state.refresh.expiresAt = initialState.refresh.expiresAt;
        },
        setToken : (state, action: PayloadAction<AuthorizationResponse>) => {
            state.isAuthorized = true;
            state.access.token = action.payload.access.token;
            state.access.expiresAt = action.payload.access.expiresAt;
            state.refresh.token = action.payload.refresh.token;
            state.refresh.expiresAt = action.payload.refresh.expiresAt;
        }
    }
});

export const { setEmail, setToken, removeToken } = authSlice.actions;
export const authReducer = authSlice.reducer;