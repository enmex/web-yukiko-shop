import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category } from "../../types/Category";

export const initialState: Category = {
    name: "",
    parent: null,
    products: [],
    children: [],
};

const categorySlice = createSlice({
    name: "category",
    initialState: initialState,
    reducers: {
        setCategoryName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        }
    }
});

export const { setCategoryName } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;