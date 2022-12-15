import axios from "axios";
import { Host, Port } from "../../config";
import { User } from "../types/User";

export type AuthorizationResponse = User;

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

export type AuthorizationService = {
    sendVerifyCode: (
        payload: SendVerifyCodePayload
    ) => void;
    signIn: (
        payload: SignInPayload
    ) => Promise<AuthorizationResponse>;
    signUp: (
        payload: SignUpPayload
    ) => Promise<AuthorizationResponse>;
}

export const authService: AuthorizationService ={
    sendVerifyCode: async (
        payload: SendVerifyCodePayload
    ) => {
        const url = "http://" + Host + ":" + Port + "/auth/sendVerifyCode";
        await axios.post(url, payload);
    },

    signIn: async (
        payload: SignInPayload
    ): Promise<AuthorizationResponse> => {
        const url = "http://" + Host + ":" + Port + "/auth/signIn";
        const user = await axios.post<AuthorizationResponse>(url, payload);
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + user.data.auth.access.token;
        return user.data;
    },

    signUp: async (
        payload: SignUpPayload
    ): Promise<AuthorizationResponse> => {
        const url = "http://" + Host + ":" + Port + "/auth/signUp";
        const user = await axios.post<AuthorizationResponse>(url, payload);
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + user.data.auth.access.token;
        return user.data;
    }
}