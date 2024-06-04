export type Account = {
    id: number;
    name: string;
    email: string;
    password: string;
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
    SELLER = "SELLER",
    GUEST = "GUEST"
}

export type Address = {
    street: string;
    city: string;
    state?: string;
    country: string;
    zipCode?: string;
}