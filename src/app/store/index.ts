import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth/auth.api";
import { categoryApi } from "./category/category.api";
import { authReducer } from "./auth/auth.slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { categoryReducer } from "./category/category.slice";
import { productApi } from "./product/product.api";
import { productReducer } from "./product/product.slice";
import { photoApi } from "./photo/photo.api";
import { photoReducer } from "./photo/photo.slice";
import storage from "redux-persist/lib/storage";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore} from "redux-persist";
import session from "redux-persist/lib/storage/session";

export const authPersistConfig = {
    key: 'auth',
    storage: session
};

export const productPersistConfig = {
    key: 'product', 
    storage: storage
};

export const categoryPersistConfig = {
    key: 'category',
    storage: storage
} 

const rootReducer = combineReducers({
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,

    category: categoryReducer,
    [categoryApi.reducerPath]: categoryApi.reducer,

    product: productReducer,
    [productApi.reducerPath]: productApi.reducer,

    photo: photoReducer,
    [photoApi.reducerPath]: photoApi.reducer,
});

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          }
    }).concat(authApi.middleware)
        .concat(categoryApi.middleware)
        .concat(productApi.middleware)
        .concat(photoApi.middleware)
});

export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;