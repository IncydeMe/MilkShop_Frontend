export type Product = {
    id: number;
    name: string;
    price: number;
    productSpecialty: ProductSpecialty;
    productCategory: ProductCategory[];
    description: string;
    imageUrl: string;
    productRating: number;
}

export type ProductCategory = {
    id: number;
    name: string;
}

export enum ProductSpecialty {
    NEW = "NEW",
    DISCOUNT = "DISCOUNT",
    SPECIAL = "SPECIAL",
    NORMAL = "NORMAL"
}