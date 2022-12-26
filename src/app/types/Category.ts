import { Product } from "./Product";

export type Category = {
    id: string;
    name: string;
    photoUrl: string;
    parent: string | null;
    children: Category[];
    products: Product[];
}