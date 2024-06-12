import { Feedback } from "./feedback";

export type Product = {
    productId?: number;
    name: string;
    price: number;
    productSpecialty?: ProductSpecialty;
    productCategoryId: number;
    description: string;
    imageUrl: string;
    totalRating?: number;
    quantity: number;
    feedbacks?: Feedback[];
}


export enum ProductSpecialty {
    NEW = "NEW",
    DISCOUNT = "DISCOUNT",
    SPECIAL = "SPECIAL",
    NORMAL = "NORMAL"
}