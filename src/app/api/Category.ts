import axios, { AxiosResponse } from "axios"
import { Host, Port } from "../../config";

export type CreateCategoryPayload = {
    name: string;
};

export type GetMainCategoriesResponse =  {
    categories: string[];
};

export type CategoryService = {
    createCategory: (
        payload: CreateCategoryPayload
    ) => Promise<void>
    getMainCategories: () => Promise<AxiosResponse<any, any>>
}

export const categoryService: CategoryService = {
    createCategory: async (
        payload: CreateCategoryPayload,
    ) => {
        const url = "http://" + Host + ":" + Port + "/categories";
        await axios.post(url, payload).catch((error) => {
            throw new Error(error.response.data.message);
        });
    },
    getMainCategories: async () => {
        const url = "http://" + Host + ":" + Port + "/categories?main=true";
        return axios.get(url).catch((error) => {
            throw new Error(error.response.data.message);
        })
    }
}