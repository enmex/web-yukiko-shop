import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Auth } from "../../types/User";
import { UploadImageResponse } from "./photo.types";

export const photoApi = createApi({
    reducerPath: 'api/image',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/images',
        prepareHeaders: (headers) => {
            const cache = localStorage.getItem('token');
            if (cache) {
                const auth = JSON.parse(cache) as Auth;
                headers.set('Authorization', 'Bearer ' + auth.access.token);
            }
        }
    }),
    endpoints: build => ({
        uploadPhoto: build.mutation<UploadImageResponse, FormData>({
            query: (body) => ({
                url: ``,
                method: 'POST',
                body,
            })
        })
    })
});

export const {
    useUploadPhotoMutation,
} = photoApi;

export const {
    uploadPhoto
} = photoApi.endpoints;