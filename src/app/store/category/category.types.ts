import { Category } from "../../types/Category";

export type GetCategoriesResponse = {
    name: string;
    photoUrl: string;
}[];

export type GetCategoryResponse = Category;

export type CreateCategoryPayload = {
    name: string;
    parent: string | null
}

export type GetCategoryPayload = {
    main: boolean | null;
    leaf: boolean | null;
}

