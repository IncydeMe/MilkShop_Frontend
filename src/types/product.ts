export type Product = {
    id: number;
    name: string;
    price: number;
    productCategory: ProductCategory[];
    description: string;
    imageUrl: string;
    productRating: ProductRating;
}

export type ProductCategory = {
    id: number;
    name: string;
}

export type ProductRating = {
    id: number;
    rating: number;
    reviewCount: number;
}