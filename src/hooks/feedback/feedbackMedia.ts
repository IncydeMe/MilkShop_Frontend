"use client"

import { useState, useEffect } from "react";
import axios from '@/lib/axios';
import type { FeedbackMedia } from "../../types/feedbackMedia";

//CRUD operations for feedback media

//Fetch all feedback media
export function useFeedbackMediaList() {
    const [feedbackMediaList, setFeedbackMediaList] = useState<FeedbackMedia[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchFeedbackMediaList = async () => {
        try {
            const response = await axios.get<FeedbackMedia[]>("/feedback-media");
            setFeedbackMediaList(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedbackMediaList();
    }, []);

    return { feedbackMediaList, loading, error };
};

//Fetch a single feedback media
export const useSingleFeedbackMedia = (id: number) => {
    const [feedbackMedia, setFeedbackMedia] = useState<FeedbackMedia | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchFeedbackMedia = async (id: number) => {
        try {
            const response = await axios.get<FeedbackMedia>(`/feedback-media/${id}`);
            setFeedbackMedia(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedbackMedia(id);
    }, [id]);

    return { feedbackMedia, loading, error };
};

//Create a new feedback media
export const createFeedbackMedia = async (feedbackMedia: FeedbackMedia) => {
    try {
        await axios.post("/feedback-media", feedbackMedia);
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Update an existing feedback media
export const updateFeedbackMedia = async (feedbackMedia: FeedbackMedia) => {
    try {
        await axios.put(`/feedback-media/${feedbackMedia.feedbackMediaId}`, feedbackMedia);
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Delete an existing feedback media
export const deleteFeedbackMedia = async (id: number) => {
    try {
        await axios.delete(`/feedback-media/${id}`);
    } catch (error : any) {
        throw new Error(error.message);
    }
};
