import { Product } from "./Product";

export type Category = {
    name: string;
    parent: string | null;
    children: Category[];
    products: Product[];
}