"use client"

import { useState, useEffect } from "react";
import axios from '@/lib/axios';
import type { Product } from "@/types/product";
import type { Feedback } from "@/types/feedback";

//CRUD operations for product feedbacks

//Fetch all feedbacks for a product
export const useProductFeedback = (productId: number) => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchProductFeedbacks = async () => {
        try {
            const response = await axios.get<Feedback[]>(`/products/${productId}/feedbacks`);
            setFeedbacks(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductFeedbacks();
    }, [productId]);

    return { feedbacks, loading, error };
};

//Create a new feedback for a product
export const createProductFeedback = async (productId: number, feedback: Feedback) => {
    try {
        await axios.post(`/products/${productId}/feedbacks`, feedback);
    } catch (error : any) {
        throw error;
    }
};

//Update a feedback for a product
export const updateProductFeedback = async (productId: number, feedbackId: number, feedback: Feedback) => {
    try {
        await axios.put(`/products/${productId}/feedbacks/${feedbackId}`, feedback);
    } catch (error : any) {
        throw error;
    }
};

//Delete a feedback for a product
export const deleteProductFeedback = async (productId: number, feedbackId: number) => {
    try {
        await axios.delete(`/products/${productId}/feedbacks/${feedbackId}`);
    } catch (error : any) {
        throw error;
    }
};
