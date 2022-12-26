import { AccessType } from "../store/auth/auth.types";

export type Auth = {
    access: {
        token: string;
        expiresAt: number;
    };
    refresh: {
        token: string;
        expiresAt: number;
    };
    accessType: AccessType;
}

export type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}