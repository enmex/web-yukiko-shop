import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AccessType, AuthorizationResponse, SendVerifyCodePayload, SignInPayload, SignUpPayload } from './auth.types';
import { RootState } from '..';

export const authApi = createApi({
    reducerPath: 'api/auth',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/auth/',
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', 'Bearer ' + (getState() as RootState).persistedReducer.auth.access.token);
        }
    }),
    endpoints: build => ({
        sendVerifyCode: build.mutation<void, SendVerifyCodePayload>({
            query: (body) => ({
                url: 'sendVerifyCode',
                method: 'POST',
                body,
            })
        }),
        signIn: build.mutation<AuthorizationResponse, SignInPayload>({
            query: (body) => ({
                url: 'signIn',
                method: 'POST',
                body,
            })
        }),
        signUp: build.mutation<AuthorizationResponse, SignUpPayload>({
            query: (body) => ({
                url: 'signUp',
                method: 'POST',
                body,
            })
        }),
        getAccessType: build.query<AccessType, void>({
            query: () => ({
                url: 'access'
            }),
            transformResponse: (response: {
                accessType: string;
            }) => {
                return response.accessType as AccessType; 
            }
        }),
        refreshToken: build.mutation<AuthorizationResponse, void>({
            query: (body) => ({
                url:'refreshToken',
                method: 'GET',
                body
            })
        })
    })
});

export const {
    useSendVerifyCodeMutation, 
    useSignUpMutation, 
    useSignInMutation, 
    useGetAccessTypeQuery,
    useRefreshTokenMutation
} = authApi;

export const {
    sendVerifyCode,
    signIn,
    signUp,
    getAccessType,
    refreshToken
} = authApi.endpoints;