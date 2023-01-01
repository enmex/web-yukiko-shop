import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { categoryApi } from "./category/category.api";
import { authReducer } from "./auth/auth.slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { productApi } from "./product/product.api";
import { photoApi } from "./photo/photo.api";
import { photoReducer } from "./photo/photo.slice";
import AsyncStorage from "redux-persist/lib/storage";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore} from "redux-persist";
import { authApi } from "./auth/auth.api";
import { cartApi } from "./cart/cart.api";
import { cartReducer } from "./cart/cart.slice";

const rootReducer = combineReducers({
    auth: authReducer,
    photo: photoReducer,
    cart: cartReducer
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {
        persistedReducer,
        [authApi.reducerPath]: authApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [photoApi.reducerPath]: photoApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    }).concat(authApi.middleware)
        .concat(categoryApi.middleware)
        .concat(productApi.middleware)
        .concat(photoApi.middleware)
        .concat(cartApi.middleware)
});

export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;