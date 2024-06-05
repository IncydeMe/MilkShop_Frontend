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
    categoryId: number;
    categoryName: string;
}

export enum ProductSpecialty {
    NEW = "NEW",
    DISCOUNT = "DISCOUNT",
    SPECIAL = "SPECIAL",
    NORMAL = "NORMAL"
}