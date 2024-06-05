import { useState, useEffect } from "react";
import axios from '@/lib/axios';
import type { ProductCategory } from "../../types/productCategory";

//CRUD operations for product categories

//Fetch all product categories
export function useProductCategories() {
    const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchProductCategories = async () => {
        try {
            const response = await axios.get<ProductCategory[]>("/categories");
            setProductCategories(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductCategories();
    }, []);

    return { productCategories, loading, error };
};

//Fetch a single product category
export const useSingleProductCategory = (id: number) => {
    const [productCategory, setProductCategory] = useState<ProductCategory | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchProductCategory = async (id: number) => {
        try {
            const response = await axios.get<ProductCategory>(`/categories/${id}`);
            setProductCategory(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductCategory(id);
    }, [id]);

    return { productCategory, loading, error };
};

//Create a new product category
export const createProductCategory = async (productCategory: ProductCategory) => {
    try {
        await axios.post("/categories", productCategory);
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Update an existing product category
export const updateProductCategory = async (productCategory: ProductCategory) => {
    try {
        await axios.put(`/categories/${productCategory.id}`, productCategory);
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Delete an existing product category
export const deleteProductCategory = async (id: number) => {
    try {
        await axios.delete(`/categories/${id}`);
    } catch (error : any) {
        throw new Error(error.message);
    }
};
