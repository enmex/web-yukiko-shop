import { Category } from "../../types/Category";

export type GetCategoriesResponse = {
    id: string;
    name: string;
    photoUrl: string;
}[];

export type GetCategoryResponse = Category;

export type CreateCategoryPayload = {
    id: string;
    name: string;
    parent: string | null
}

export enum CategoryEnum {
    ROOT = "root",
    LEAF = "leaf"
}

export type GetCategoryPayload = {
    type?: CategoryEnum
}

