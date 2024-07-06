import { Blog } from "./blog";
import { Gift } from "./gift";
import { Order } from "./order";
import { Voucher } from "./voucher";
/**
 * Account, used to store the details of an account
 */
export type Account = {
    /** Account id of the account */
    accountId: string;
    /** Full name of the account */
    fullName?: string;
    /** Email of the account */
    email: string;
    /** Password of the account */
    password: string;
    /** Phone number of the account */
    phone: string;
    /** Role of the account */
    role: Role;
    /** Avatar url of the account */
    avatarUrl?: string;
    /** Created date of the account */
    createdAt: Date;
    /** Updated date of the account */
    updatedAt: Date;
    /** Date of birth of the account */
    dateOfBirth?: Date;
    /** Status of the account */
    status: boolean;
    /** Address of the account */
    address: string;
    /** Point of the account */
    point?: number;
    /** Orders of the account */
    orders?: Order[];
    /** Vouchers of the account */
    vouchers?: Voucher[];
    /** Gifts of the account */
    gifts?: Gift[];
    /** Blogs written by the account */
    blogs?: Blog[];
}

/**
 * Role, used to store the role of an account
 * @param ADMIN: string, the admin role
 * @param USER: string, the user role
 * @param STAFF: string, the staff role
 */
export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    STAFF = "STAFF"
}