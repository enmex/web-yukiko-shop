import axios from "axios";
import { Host, Port } from "../../config";
import { User } from "../types/User";

export type AuthorizationResponse = User;
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
        await axios.post(url, payload).catch((error) => {
            throw new Error(error.response.data.message);
        });
    },

    signIn: async (
        payload: SignInPayload
    ): Promise<AuthorizationResponse> => {
        const url = "http://" + Host + ":" + Port + "/auth/signIn";
        const response = await axios.post<AuthorizationResponse>(url, payload).catch((error) => {
            throw new Error(error.response.data.message);
        });;

        axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.auth.access.token;
    
        return response.data;
    },

    signUp: async (
        payload: SignUpPayload
    ): Promise<AuthorizationResponse> => {
        const url = "http://" + Host + ":" + Port + "/auth/signUp";
        const response = await axios.post<AuthorizationResponse>(url, payload).catch((error) => {
            throw new Error(error.response.data.message);
        });

        axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.auth.access.token;

        return response.data;
    }
}