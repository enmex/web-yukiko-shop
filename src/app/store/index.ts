import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth/auth.api";
import { categoryApi } from "./category/category.api";
import { authReducer } from "./auth/auth.slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { categoryReducer } from "./category/category.slice";
import { productApi } from "./product/product.api";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,

        category: categoryReducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware).concat(categoryApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;