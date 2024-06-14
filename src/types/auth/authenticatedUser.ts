import { Role } from "../account";

// This type is used to represent an authenticated user.
export type AuthenticatedUser = {
    id?: number;
    email: string;
    password: string;
    role: Role;
}