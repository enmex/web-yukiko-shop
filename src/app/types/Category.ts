export type Category = {
    name: string;
    parent: Category | null;
    children: Category[];
}