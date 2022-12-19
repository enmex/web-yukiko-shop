import axios from "axios";
import { Host, Port } from "../../config";
import { Product } from "../types/Product"

export type CreateProductPayload = Product;
export type GetProductPayload = Product;
export type GetProductsPayload = {
    products: Product[],
};

export type ProductService = {
    createProduct: (
        payload: CreateProductPayload
    ) => Promise<void>
    deleteProduct: (
        productId: string
    ) => Promise<void>
    getProduct: (
        productId: string
    ) => Promise<GetProductPayload>
    getProducts: () => Promise<GetProductsPayload>
};

export const productService: ProductService = {
    createProduct: async (
        payload: CreateProductPayload
    ) => {
        const url = "http://" + Host + ":" + Port + "/products";
        console.log(payload);
        await axios.post(url, payload).catch((error) => {
            throw new Error(error.response.data.message);
        });
    },
    deleteProduct: async (
        productId: string
    ) => {
        const url = "http://" + Host + ":" + Port + "/products/" + productId;
        await axios.delete(url).catch((error) => {
            throw new Error(error.response.data.message);
        });
    },
    getProduct: async (
        productId: string
    ) => {
        const url = "http://" + Host + ":" + Port + "/products/" + productId;
        const product = await axios.get(url).catch((error) => {
            throw new Error(error.response.data.message);
        });

        return product.data;
    },
    getProducts: async () => {
        const url = "http://" + Host + ":" + Port + "/products";
        const products = await axios.get(url).catch((error) => {
            throw new Error(error.response.data.message);
        });

        return products.data;
    }
}