import { Feedback } from "./feedback";

export type Product = {
    productId: number;
    name: string;
    price: number;
    productSpecialty: ProductSpecialty;
    productCategory: ProductCategory[];
    description: string;
    imageUrl: string;
    totalRating: number;
    quantity: number;
    feedbacks: Feedback[];
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