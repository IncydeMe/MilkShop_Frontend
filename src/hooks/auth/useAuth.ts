"use client"

import { useState, useEffect } from "react";
import axios from '@/lib/axios';
import { AuthenticatedUser } from "@/types/auth/authenticatedUser";
import { useSingleAccount } from "../account/useAccount";
import { useRouter } from "next/navigation";

//Authentication hooks

//Login
//In backend, login requires email and password
//And will return status (1 or -1) along with a token for Bearer

export const useLogin = () => {
    const [user, setUser] = useState<AuthenticatedUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const router = useRouter();

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post("/login?email="+email+"&password="+password);
            if (response.data.status === 1) {

                //Set token to local storage
                localStorage.setItem("token", response.data.token);

                //Set user to state
                const user = setUser({
                    id: response.data.data.id,
                    email: email,
                    password: password,
                    role: response.data.data.role
                });

                //Header for axios
                axios.defaults.headers.common["Authorization"] = `${response.data.token}`;
                //Based on the user role, redirect to different page
                sessionStorage.setItem("account", JSON.stringify(user));
                switch(response.data.data.role) {
                    case "Admin":
                        router.push("/admin");
                        break;
                    case "Member":
                        router.push("/products");
                        break;
                    case "Staff":
                        router.push("/staff");
                        break;
                    case "Manager":
                        router.push("/manager");
                        break;
                    default:
                        router.push("/login");
                        break;
                }
                
            } else {
                throw new Error("Đăng nhập thất bại");
            }
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, error, login };
};