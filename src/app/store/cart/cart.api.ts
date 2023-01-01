import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "..";
import { AddProductToCartPayload, GetCartResponse, UpdateCartProductQuantityPayload } from "./cart.types";

export const cartApi = createApi({
    reducerPath: 'api/cart',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/cart',
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', 'Bearer ' + (getState() as RootState).persistedReducer.auth.access.token);
        }
    }),
    endpoints: build => ({
        getCart: build.query<GetCartResponse, void>({
            query: () => ({
                url: ''
            }),
        }),
        addProductToCart: build.mutation<void, AddProductToCartPayload>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body
            })
        }),
        clearCart: build.mutation<void, void>({
            query: (body) => ({
                url: '',
                method: 'DELETE',
                body
            })
        }),
        updateCartProductQuantity: build.mutation<void, UpdateCartProductQuantityPayload>({
            query: (body) => ({
                url: `/${body.productID}`,
                method: 'PATCH',
                body: {
                    quantity: body.quantity
                }
            })
        }),
        deleteProductFromCart: build.mutation<void, string>({
            query: (body) => ({
                url: `/${body}`,
                method: 'DELETE',
            })
        })
    })
});

export const {
    useGetCartQuery,
    useAddProductToCartMutation,
    useClearCartMutation,
    useUpdateCartProductQuantityMutation,
    useDeleteProductFromCartMutation
} = cartApi;

export const {
   getCart,
   addProductToCart,
   clearCart,
   updateCartProductQuantity,
   deleteProductFromCart
} = cartApi.endpoints;