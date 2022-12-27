import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CreateProductPayload } from "./product.types";
import { Product } from "../../types/Product";
import { RootState } from "..";

export const productApi = createApi({
    reducerPath: 'api/product',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/products',
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', 'Bearer ' + (getState() as RootState).persistedReducer.auth.token);
        }
    }),
    endpoints: build => ({
        getProduct: build.query<Product, string>({
            query: (id: string) => ({
                url: `/${id}`
            })
        }),
        createProduct: build.mutation<void, CreateProductPayload>({
            query: (body) => ({
                url: ``,
                method: 'POST',
                body,
            })
        })
    })
});

export const {
    useGetProductQuery, 
    useCreateProductMutation, 
} = productApi;

export const {
    getProduct,
    createProduct
} = productApi.endpoints;