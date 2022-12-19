import { atom } from "recoil";
import { Product } from "../types/Product";

export const getDefaultCurrentProduct = (): Product => {
    return {
        name: "",
        description: "",
        path: "",
        categoryName: "",
        price: 0,
    };
};

export const productState = atom<Product>({
    key: "productState",
    default: getDefaultCurrentProduct(),
});