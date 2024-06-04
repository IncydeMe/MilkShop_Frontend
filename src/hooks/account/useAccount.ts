import { useState, useEffect } from "react";
import axios from "axios";
import type { Account } from "../../types/account";

//CRUD operations for accounts

//Fetch all accounts
export const useAccount = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    //Fetch all accounts
    const fetchAccounts = async () => {
        try {
            const response = await axios.get<Account[]>("/api/accounts");
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

//Fetch a single account
export const useSingleAccount = (id: number) => {
    const [account, setAccount] = useState<Account | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    //Fetch a single account
    const fetchAccount = async () => {
        try {
            const response = await axios.get<Account>(`/api/accounts/${id}`);
            setAccount(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAccount();
    }, [id]);

    return { account, loading, error };
};

//Create a new account
export const createAccount = async (account: Account) => {
    try {
        await axios.post("/api/accounts", account);
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Update an existing account
export const updateAccount = async (account: Account) => {
    try {
        await axios.put(`/api/accounts/${account.id}`, account);
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Delete an existing account
export const disableAccount = async (id: number) => {
    try {
        await axios.delete(`/api/accounts/${id}`);
    } catch (error : any) {
        throw new Error(error.message);
    }
};