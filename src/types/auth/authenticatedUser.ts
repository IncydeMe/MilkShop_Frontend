import { Role } from "../account";

// This type is used to represent an authenticated user.
export type AuthenticatedUser = {
    email: string;
    password: string;
    token?: string;//This is optional because it is not returned by the server when logging in
}