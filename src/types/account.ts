export type Account = {
    id: number;
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
}

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    MANAGER = "MANAGER",
    STAFF = "STAFF"
}