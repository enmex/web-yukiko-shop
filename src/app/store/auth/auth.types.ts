import { Auth } from "../../types/User";

export enum AccessType {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    CUSTOMER  = "CUSTOMER"
}

export type AuthState = {
    isAuthorized: boolean;
    token: string;
    expiresAt: number;
    email: string;
}

export type AuthorizationResponse = Auth;

export type ErrorResponse = {
    message: string;
}

export type SignInPayload = {
    email: string;
    password: string;
};

export type SignUpPayload = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    code: number;
};

export type SendVerifyCodePayload = {
    email: string;
}