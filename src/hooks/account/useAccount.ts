"use client"

import { useState, useEffect } from "react";
import axios from '@/lib/axios';
import type { Account } from "../../types/account";

//CRUD operations for accounts

/**
 * Get all accounts from the API
 * @returns all accounts, loading state, and error state
 */
export const useAccount = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    /**
     * Fetch all accounts from the API
     */
    const fetchAccounts = async () => {
        try {
            const response = await axios.get<Account[]>("/accounts");
            setAccounts(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    return { accounts, loading, error };
};

/**
 * Fetch a single account from the API by user id
 * @param user id 
 * @returns account, loading state, and error state
 */
export const useSingleAccount = async (id: number) => {
    const [account, setAccount] = useState<Account | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // Fetch a single account
    const fetchAccount = async (accountId: number) => {
        try {
            const response = await axios.get<Account>(`/accounts/${accountId}`);
            setAccount(response.data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error);
            } else {
                setError(new Error('An unknown error occurred'));
            }
        } finally {
            setLoading(false);
        }
    };

    return { account, loading, error };
};

/**
 * Fetch a single account from the API by user email
 * @param user email
 * @returns account, loading state, and error state
 */
export const useSingleAccountByEmail = (email: string) => {
    const [account, setAccount] = useState<Account | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // Fetch a single account
    const fetchAccount = async (accountEmail: string) => {
        try {
            const response = await axios.get<Account>(`/accounts/${accountEmail}/info`);
            setAccount(response.data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error);
            } else {
                setError(new Error('An unknown error occurred'));
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAccount(email);
    }, [email]);

    return { account, loading, error };
};

//Create a new account
export const createAccount = async (account: Account) => {
    try {
        const result = await axios.post("/accounts", account);
        console.log(result);
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Update an existing account
export const updateAccount = async (account: Account) => {
    try {
        await axios.put(`/accounts/${account.id}`, account);
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Delete an existing account
export const disableAccount = async (id: number) => {
    try {
        await axios.delete(`/accounts/${id}`);
    } catch (error : any) {
        throw new Error(error.message);
    }
};