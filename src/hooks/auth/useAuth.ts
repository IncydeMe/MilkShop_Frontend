"use client"

import { useState, useEffect } from "react";
import axios from '@/lib/axios';
import { AuthenticatedUser } from "@/types/auth/authenticatedUser";
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
            if (response.status === 200) {
                setUser(response.data);
                //Save token to local storage
                localStorage.setItem("token", user?.token || "");
                //Header for axios
                axios.defaults.headers.common["Authorization"] = `${user?.token}`;

                //Redirect to home page
                router.push("/");
            } else {
                throw new Error("Login failed");
            }
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, error, login };
};