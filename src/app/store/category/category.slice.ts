import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category } from "../../types/Category";

export const initialState: Category = {
    id: "",
    name: "",
    photoUrl: "",
    parent: null,
    products: [],
    children: [],
};

const categorySlice = createSlice({
    name: "category",
    initialState: initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },
        removeCategory: (state) => {
            state = initialState;
        }
    }
});

export const { setCategory, removeCategory } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;