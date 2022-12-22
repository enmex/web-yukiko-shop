import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CreateCategoryPayload, GetCategoryPayload, GetCategoryResponse } from "./category.types";
import { Auth } from "../../types/User";

export const categoryApi = createApi({
    reducerPath: 'api/category',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/categories',
        prepareHeaders: (headers) => {
            const cache = localStorage.getItem('token');
            if (cache) {
                const auth = JSON.parse(cache) as Auth;
                headers.set('Authorization', 'Bearer ' + auth.access.token);
            }
        }
    }),
    endpoints: build => ({
        getCategories: build.query<string[], GetCategoryPayload>({
            query: (payload) => ({
                url: payload.main ? `?main=${payload.main}` : payload.leaf ? `?leaf=${payload.leaf}` : ''
            })
        }),
        getSubCategories: build.query<string[], string>({
            query: (categoryName: string) => ({
                url: `/children/${categoryName}`
            })
        }),
        getCategory: build.query<GetCategoryResponse, string>({
            query: (categoryName: string) => ({
                url: `/${categoryName}`
            })
        }),
        createCategory: build.mutation<void, CreateCategoryPayload>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body
            })
        })
    })
});

export const {
    useGetCategoriesQuery, 
    useGetSubCategoriesQuery, 
    useGetCategoryQuery,
    useCreateCategoryMutation
} = categoryApi;

export const {
    getCategories: getMainCategories,
    getSubCategories,
    getCategory
} = categoryApi.endpoints;