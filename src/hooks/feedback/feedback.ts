"use client"

import { useState, useEffect } from "react";
import axios from '@/lib/axios';
import type { Feedback } from "../../types/feedback";

//CRUD operations for feedback

//Fetch all feedbacks
export function useFeedbacks() {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get<Feedback[]>("/feedbacks");
            setFeedbacks(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    return { feedbacks, loading, error };
};

//Fetch a single feedback
export const useSingleFeedback = (id: number) => {
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchFeedback = async (id: number) => {
        try {
            const response = await axios.get<Feedback>(`/feedbacks/${id}`);
            setFeedback(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedback(id);
    }, [id]);

    return { feedback, loading, error };
};

//Create a new feedback
export const createFeedback = async (feedback: Feedback) => {
    try {
        await axios.post("/feedbacks", feedback);
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Update an existing feedback
export const updateFeedback = async (feedback: Feedback) => {
    try {
        await axios.put(`/feedbacks/${feedback.id}`, feedback);
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Delete an existing feedback
export const deleteFeedback = async (id: number) => {
    try {
        await axios.delete(`/feedbacks/${id}`);
    } catch (error : any) {
        throw new Error(error.message);
    }
};
