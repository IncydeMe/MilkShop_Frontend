"use client"

import { useState, useEffect } from "react";
import axios from '@/lib/axios';
import type { Product } from "../../types/product";

//CRUD operations for products

//Fetch all products
export function useProduct() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchProducts = async () => {
        try {
            const response = await axios.get<Product[]>("/products");
            setProducts(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return { products, loading, error };
};

//Fetch a single product
export const useSingleProduct = (id: number) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchProduct = async (id: number) => {
        try {
            const response = await axios.get<Product>(`/products/${id}`);
            setProduct(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct(id);
    }, [id]);

    return { product, loading, error };
};

//Create a new product
export const createProduct = async (product: Product) => {
    try {
        await axios.post("/products", product);
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Update an existing product
export const updateProduct = async (product: Product) => {
    try {
        await axios.put(`/products/${product.productId}`, product);
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Delete an existing product
export const deleteProduct = async (id: number) => {
    try {
        await axios.delete(`/products/${id}`);
    } catch (error : any) {
        throw new Error(error.message);
    }
};
