export type Account = {
    id: number;
    name: string;
    fullName?: string;
    email: string;
    password: string;
    phonenumber: string;
    role: Role;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    disabled: boolean;
    address: Address;
}

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    MANAGER = "MANAGER",
    STAFF = "STAFF"
}

export type Address = {
    street: string;
    city: string;
    state?: string;
    country: string;
    zipCode?: string;
}