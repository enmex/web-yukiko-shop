import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AccessType, AuthState, AuthorizationResponse } from "./auth.types";

export const initialState: AuthState = {
    isAuthorized: false,
    token: "",
    expiresAt: 0,
    email: "",
    accessType: AccessType.CUSTOMER,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        removeToken: (state) => {
            state = initialState;
        },
        setToken : (state, action: PayloadAction<AuthorizationResponse>) => {
            state.isAuthorized = true;
            state.token = action.payload.access.token;
            state.expiresAt = action.payload.access.expiresAt;
            state.accessType = action.payload.accessType;
        }
    }
});

export const { setEmail, setToken, removeToken } = authSlice.actions;
export const authReducer = authSlice.reducer;