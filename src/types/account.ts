export type Account = {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
    imageUrl: string ;
    createdAt: Date;
    updatedAt: Date;
    disabled: boolean;
    address: Address;
}

export type Role = {
    id: number;
    name: string;
}

export type Address = {
    id: number;
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
}