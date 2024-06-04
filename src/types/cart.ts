import type { Product } from './product';

//A Cart is a collection of products and their quantities
export type Cart = {
    id: number;
    products: CartProduct[];
}

//A CartProduct is a product and its quantity
export type CartProduct = {
    product: Product;
    quantity: number;
}