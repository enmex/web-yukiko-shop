import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { UploadImageResponse } from "./photo.types";
import { RootState } from "..";

export const photoApi = createApi({
    reducerPath: 'api/image',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/images',
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', 'Bearer ' + (getState() as RootState).persistedReducer.auth.access.token);
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