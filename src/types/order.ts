import { Account, Address } from "./account";
import { Product } from "./product";

export type Order = {
    id: number;
    accountId: number;
    voucherCode: string;
    orderStatus: OrderStatus;
    payment: Payment;
    address: Address;
    orderDate: Date;
}

export type OrderDetail = {
    id: number;
    order: Order;
    orderItem: OrderItem[];
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

export type Payment = {
    id: number;
    totalPrice: number;
    paymentDate: Date;
    paymentMethod: PaymentMethod; //credit card, debit card, paypal, etc.
    paymentStatus: PaymentStatus; //pending, completed, cancelled
}

export type PaymentMethod = {
    id: number;
    name: string;
}

export type PaymentStatus = {
    id: number;
    name: string;
}