export type ProductState = {
    id: string;
}

export type CreateProductPayload = {
    name: string;
    description: string;
    path: string;
    price: number;
    categoryName: string;
}