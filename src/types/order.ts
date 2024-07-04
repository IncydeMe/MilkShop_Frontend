import { Account } from "./account";
import { Cart, CartProduct } from "./cart";
import { Product } from "./product";

export type Order = {
    orderId?: number;
    accountId: number;
    voucherCode: number;
    totalPrice: number;
    status: string;
}

export type OrderDetail = {
    orderId: number;
    orderDetailId: number;
    cart: CartProduct[];
}

export type OrderStatus = {
    id: number;
    name: string;//pending, processing, completed, cancelled
}

export type OrderItem = {
    id: number;
    quantity: number;
    product: Product;
}