import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CreateProductPayload } from "./product.types";
import { Auth } from "../../types/User";
import { Product } from "../../types/Product";

export const productApi = createApi({
    reducerPath: 'api/product',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/products',
        prepareHeaders: (headers) => {
            const cache = localStorage.getItem('token');
            if (cache) {
                const auth = JSON.parse(cache) as Auth;
                headers.set('Authorization', 'Bearer ' + auth.access.token);
            }
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