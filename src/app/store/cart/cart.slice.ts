import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductCardState } from "./cart.types";

export const initialState = {
    products: [] as ProductCardState[],
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: "category",
    initialState: initialState,
    reducers: {
        addCartProduct: (state, action: PayloadAction<ProductCardState>) => {
            state.products.push(action.payload);
            state.totalPrice += action.payload.price;
        },
        removeCartProduct: (state, action: PayloadAction<string>) => {
            const price = state.products.find(product => product.productID === action.payload)?.price;
            state.products = state.products.filter(product => product.productID !== action.payload);
            if (price) {
                state.totalPrice -= price;
            }
        },
        removeAllCartProducts: (state) => {
            state = initialState;
            return state;
        },
        updateCartProductQuantity: (state, action: PayloadAction<ProductCardState>) => {
            const newQuantity = action.payload.quantity;
            if (newQuantity !== 0) {
                let lastQuantity = 0;
                state.products = state.products.map((product) => {
                    if (product.productID === action.payload.productID) {
                        lastQuantity = product.quantity;
                        return {
                            ...product,
                            quantity: newQuantity,
                        }
                    }   
                    return product;
                });
                state.totalPrice += (newQuantity - lastQuantity) * action.payload.price;
            }
        }
    }
});

export const { addCartProduct, removeCartProduct, removeAllCartProducts, updateCartProductQuantity } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;