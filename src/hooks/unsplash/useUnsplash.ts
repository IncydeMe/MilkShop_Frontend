"use client"

import { unsplash } from "@/lib/unsplash"
import { set } from "date-fns";

import { useState, useEffect } from "react";
import { Random } from "unsplash-js/dist/methods/photos/types";

//Get random image from unsplash
export const useRandomUnsplash = () => {
    const [image, setImage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchRandomImage = async () => {
        try {
            unsplash.photos.getRandom({count: 1, topicIds: ["milk"]})
                .then((result) => {
                    setImage(result.originalResponse.url);
                }).catch((error) => {
                    setError(error);
                });
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRandomImage();
    }, []);

    return { image, loading, error };
}