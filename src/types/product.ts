import { Feedback } from "./feedback";

/**
 * Product, used to store the details of a product
 */
export type Product = {
    productId?: number;
    name: string;
    price: number;
    productSpecialty?: ProductSpecialty;
    productCategoryId: number;
    description: string;
    imageUrl: string;
    totalRating?: number;
    quantityInStock: number;
    productStatus?: string;
    feedbacks?: Feedback[];
}

/**
 * Product Images, used to store the images of a product
 */
export type ProductImages = {
    /** Image Id of the Image */
    imageId: string;
    /** Image url of the Image */
    url: string;
}

/**
 * Product Specialty, used to store the specialty of a product
 */
export enum ProductSpecialty {
    NEW = "NEW",
    DISCOUNT = "DISCOUNT",
    SPECIAL = "SPECIAL",
    NORMAL = "NORMAL"
}