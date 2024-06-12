"use client"

import { useState, useEffect } from "react";
import axios from "@/lib/axios";
import type { Voucher } from "../../types/voucher";

//CRUD operations for vouchers

//Fetch all vouchers
export const useVoucher = () => {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchVouchers = async () => {
        try {
            const response = await axios.get<Voucher[]>("/vouchers");
            setVouchers(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVouchers();
    }, []);

    return { vouchers, loading, error };
};

//Fetch a single voucher
export const useSingleVoucher = (id: string) => {
    const [voucher, setVoucher] = useState<Voucher | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchVoucher = async (id: string) => {
        try {
            const response = await axios.get<Voucher>(`/vouchers/${id}`);
            setVoucher(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVoucher(id);
    }, [id]);

    return { voucher, loading, error };
};

//Create a new voucher
export const createVoucher = async (voucher: Voucher) => {
    try {
        await axios.post("/vouchers", voucher);
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Update a voucher
export const updateVoucher = async (voucher: Voucher) => {
    try {
        await axios.put(`/vouchers/${voucher.voucherId}`, voucher);
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Delete a voucher
export const deleteVoucher = async (id: string) => {
    try {
        await axios.delete(`/vouchers/${id}`);
    } catch (error : any) {
        throw new Error(error.message);
    }
};