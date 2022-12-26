import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthorizationResponse, SendVerifyCodePayload, SignInPayload, SignUpPayload } from './auth.types';
import { RootState } from '..';

export const authApi = createApi({
    reducerPath: 'api/auth',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/auth/',
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', 'Bearer ' + (getState() as RootState).auth.token);
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
    })
});

export const {useSendVerifyCodeMutation, useSignUpMutation, useSignInMutation} = authApi;

export const {
    sendVerifyCode,
    signIn,
    signUp
} = authApi.endpoints;