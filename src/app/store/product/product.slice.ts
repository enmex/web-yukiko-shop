import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductState } from "./product.types";

export const initialState: ProductState = {
    id: ""
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },
        removeProduct: (state) => {
            state = initialState
        }
    }
});

export const { setProduct, removeProduct } = productSlice.actions;
export const productReducer = productSlice.reducer;