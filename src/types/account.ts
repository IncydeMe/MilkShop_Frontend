import { Gift } from "./gift";
import { Order } from "./order";
import { Voucher } from "./voucher";

export type Account = {
    accountId: number;
    name: string;
    fullName?: string;
    email: string;
    password: string;
    phone: string;
    role: Role;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    dateOfBirth?: Date;
    disabled: boolean;
    address: string;
    point?: number;
    orders?: Order[];
    vouchers?: Voucher[];
    gifts?: Gift[];
}

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    MANAGER = "MANAGER",
    STAFF = "STAFF"
}