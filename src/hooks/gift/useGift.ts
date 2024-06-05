"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import type { Gift } from "../../types/gift";

//CRUD operations for gifts

//Fetch all gifts
export const useGift = () => {
    const [gifts, setGifts] = useState<Gift[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    //Fetch all gifts
    const fetchGifts = async () => {
        try {
            const response = await axios.get<Gift[]>("/gifts");
            setGifts(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGifts();
    }, []);

    return { gifts, loading, error };
};

//Fetch a single gift
export const useSingleGift = (id: number) => {
    const [gift, setGift] = useState<Gift | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    //Fetch a single gift
    const fetchGift = async (id: number) => {
        try {
            const response = await axios.get<Gift>(`/gifts/${id}`);
            setGift(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGift(id);
    }, [id]);

    return { gift, loading, error };
};

//Create a new gift
export const createGift = async (gift: Gift) => {
    try {
        await axios.post("/gifts", gift);
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Update a gift
export const updateGift = async (gift: Gift) => {
    try {
        await axios.put(`/gifts/${gift.id}`, gift);
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Delete a gift
export const deleteGift = async (id: number) => {
    try {
        await axios.delete(`/gifts/${id}`);
    } catch (error : any) {
        throw new Error(error.message);
    }
};