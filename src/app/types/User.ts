export type User = {
    auth: {
        access: {
            token: string;
            expiresAt: number | null;
        };
        refresh: {
            token: string;
            expiresAt: number | null;
        };
    };
    profile: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }
}