export type Auth = {
    access: {
        token: string;
        expiresAt: number;
    };
    refresh: {
        token: string;
        expiresAt: number;
    };
    accessType: string;
}

export type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}