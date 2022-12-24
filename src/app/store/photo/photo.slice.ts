import { createSlice } from "@reduxjs/toolkit";

export const initialState: string = "";

const photoSlice = createSlice({
    name: "photo",
    initialState: initialState,
    reducers: {
    }
});

export const photoReducer = photoSlice.reducer;