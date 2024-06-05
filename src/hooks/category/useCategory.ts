"use client"

import { useState, useEffect } from "react";
import axios from '@/lib/axios';
import type { ProductCategory } from "../../types/product";

//CRUD operations for product categories

//Fetch all product categories
export function useCategory() {
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchCategories = async () => {
        try {
            const response = await axios.get<ProductCategory[]>("/categories");
            setCategories(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return { categories, loading, error };
};

//Fetch a single product category
export const useSingleCategory = (id: number) => {
    const [category, setCategory] = useState<ProductCategory | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchCategory = async () => {
        try {
            const response = await axios.get<ProductCategory>(`/categories/${id}`);
            setCategory(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, [id]);

    return { category, loading, error };
};

//Create a new product category
export const createCategory = async (category: ProductCategory) => {
    try {
        await axios.post("/categories", category);
    } catch (error : any) {
        console.error(error.message);
    }
};

//Update a product category
export const updateCategory = async (category: ProductCategory) => {
    try {
        await axios.put(`/categories/${category.categoryId}`, category);
    } catch (error : any) {
        console.error(error.message);
    }
};

//Delete a product category
export const deleteCategory = async (id: number) => {
    try {
        await axios.delete(`/categories/${id}`);
    } catch (error : any) {
        console.error(error.message);
    }
};