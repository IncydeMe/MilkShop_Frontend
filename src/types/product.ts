import { Feedback } from "./feedback";
/**
 * Product, used to store the details of a product
 */
export type Product = {
    /** Product Id */
    productId?: number;
    /** Account Id of the product creator */
    accountId: string;
    /** Product Category Name */
    categoryName: string;
    /** Name of the product */
    name: string;
    /** Price of the Product */
    price: number;
    /** Product Quantity in Stock */
    quantityInStock: number;
    /** Specialty of the Product */
    productSpecialty?: ProductSpecialty;
    /** Product Description */
    description: string;
    /** Product Images */
    productImages?: ProductImages[];
    /** Product Rating */
    totalRating?: number;
    /** Product Status */
    productStatus?: string;
    /** Product Feedback */
    feedbacks?: Feedback[];
    /** Created Date of the product */
    createdAt?: Date;
    /** Updated Date of the product */
    updatedAt?: Date;
}

/**
 * Product Images, used to store the images of a product
 */
export type ProductImages = {
    /** Image Id of the Image */
    imageId: string;
    /** Image url of the Image */
    url: string;
    /** Product Id that the image will represent */
    productId: number;
    /** 
     * Is Thumbnail of the Image 
     * 
     * Each product will have only one thumbnail image, and the rest will be normal images
    */
    isThumbnail: boolean;
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