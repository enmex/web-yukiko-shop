import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductState } from "./product.types";

export const initialState: ProductState = {
    id: ""
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProductId: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        }
    }
});

export const { setProductId } = productSlice.actions;
export const productReducer = productSlice.reducer;