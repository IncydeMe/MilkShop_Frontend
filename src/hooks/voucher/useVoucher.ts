import { useState, useEffect } from "react";
import axios from "axios";
import type { Voucher } from "../../types/voucher";

//CRUD operations for vouchers

//Fetch all vouchers
export const useVoucher = () => {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchVouchers = async () => {
        try {
            const response = await axios.get<Voucher[]>("/api/vouchers");
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
export const useSingleVoucher = (id: number) => {
    const [voucher, setVoucher] = useState<Voucher | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchVoucher = async () => {
        try {
            const response = await axios.get<Voucher>(`/api/vouchers/${id}`);
            setVoucher(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVoucher();
    }, [id]);

    return { voucher, loading, error };
};

//Create a new voucher
export const createVoucher = async (voucher: Voucher) => {
    try {
        await axios.post("/api/vouchers", voucher);
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Update a voucher
export const updateVoucher = async (voucher: Voucher) => {
    try {
        await axios.put(`/api/vouchers/${voucher.id}`, voucher);
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Delete a voucher
export const deleteVoucher = async (id: number) => {
    try {
        await axios.delete(`/api/vouchers/${id}`);
    } catch (error : any) {
        throw new Error(error.message);
    }
};