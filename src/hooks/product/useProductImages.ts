"use client"

import { useState, useEffect } from "react";
import axios from '@/lib/axios';
import type { ProductImages } from "@/types/product";

/**
 * Use the thumbnail image of the product
 * @param productId The id of the product
 * @returns The url of the thumbnail
 */
export const useProductImageThumbnail = (productId : number) => {
    const [productImage, setProductImage] = useState<ProductImages>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchProductImages = async () => {
        try {
            const response = await axios.get<ProductImages>(`/product-images/product/${productId}`);
            setProductImage(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductImages();
    }, []);

    return { productImage, loading, error };
}

//Get all images for a product
export const useAllProductImages = (productId: number) => {
    const [productImages, setProductImages] = useState<ProductImages[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchAllProductImages = async () => {
        try {
            const response = await axios.get<ProductImages[]>(`/products-images?productId=${productId}`);
            setProductImages(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllProductImages();
    }, []);

    return { productImages, loading, error };
}

//Add image to a product
export const useAddProductImage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const addProductImage = async (ProductImage : ProductImages) => {
        try {
            setLoading(true);
            await axios.post("/products-images", ProductImage);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { addProductImage, loading, error };
}

