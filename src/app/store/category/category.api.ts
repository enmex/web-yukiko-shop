import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CreateCategoryPayload, GetCategoriesResponse, GetCategoryPayload, GetCategoryResponse } from "./category.types";
import { RootState } from "..";


export const categoryApi = createApi({
    reducerPath: 'api/category',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/categories',
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', 'Bearer ' + (getState() as RootState).auth.token);
        }
    }),
    endpoints: build => ({
        getCategories: build.query<GetCategoriesResponse, GetCategoryPayload>({
            query: (payload) => ({
                url: payload.type ? `?type=${payload.type}` : ''
            }),
        }),
        getSubCategories: build.query<GetCategoriesResponse, string>({
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
    getCategories,
    getSubCategories,
    getCategory
} = categoryApi.endpoints;