import { CartProduct } from "../../types/CartProduct"

export type GetCartResponse = {
    products: CartProduct[];
    totalPrice: number;
};

export type AddProductToCartPayload = {
    productID: string;
    name: string;
    price: number;
    photoUrl: string;
};

export type ProductCardState = {
    productID: string;
    name: string;
    price: number;
    quantity: number;
    photoUrl: string;
};

export type UpdateCartProductQuantityPayload = {
    productID: string;
    quantity: number;
}