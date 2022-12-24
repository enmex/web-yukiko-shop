export type ProductState = {
    id: string;
}

export type CreateProductPayload = {
    id: string;
    name: string;
    description: string;
    photoUrl: string | null;
    price: number;
    categoryName: string;
}