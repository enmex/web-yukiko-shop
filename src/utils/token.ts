export const isTokenExpired = (token: {
    access: {
        token: string,
        expiresAt: number | null,
    },
    refresh: {
        token: string,
        expiresAt: number | null,
    },
}) => {
    return !token.access.expiresAt || new Date().getTime() > token.access.expiresAt;
}