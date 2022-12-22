import { Auth } from "../../types/User";

export type AuthState = {
    isAuthorized: boolean;
    token: string;
    expiresAt: number;
    email: string;
    accessType: string;
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