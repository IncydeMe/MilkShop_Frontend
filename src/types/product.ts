export type Product = {
    id: number;
    name: string;
    price: number;
    productCategory: ProductCategory[];
    description: string;
    imageUrl: string | string[];
}

export type ProductCategory = {
    id: number;
    name: string;
}