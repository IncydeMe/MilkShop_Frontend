import { Account, Address } from "./account";
import { Product } from "./product";

export type Order = {
    id: number;
    orderDate: Date;
    orderStatus: OrderStatus;
    orderItem: OrderItem[];
    payment: Payment;
    account: Account;
    address: Address;
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
    paymentDate: Date;
    paymentMethod: PaymentMethod;//credit card, debit card, paypal, etc.
    paymentStatus: PaymentStatus;//pending, completed, cancelled
}

export type PaymentMethod = {
    id: number;
    name: string;
}

export type PaymentStatus = {
    id: number;
    name: string;
}