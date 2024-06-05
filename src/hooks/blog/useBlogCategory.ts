import { useState, useEffect } from "react";
import axios from '@/lib/axios';
import type { BlogCategory } from "../../types/blogCategory";

//CRUD operations for blog categories

//Fetch all blog categories
export function useBlogCategories() {
    const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchBlogCategories = async () => {
        try {
            const response = await axios.get<BlogCategory[]>("/blog-categories");
            setBlogCategories(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogCategories();
    }, []);

    return { blogCategories, loading, error };
};

//Fetch a single blog category
export const useSingleblogCategory = (id: number) => {
    const [blogCategory, setBlogCategory] = useState<BlogCategory | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchBlogCategory = async (id: number) => {
        try {
            const response = await axios.get<BlogCategory>(`/blog-categories/${id}`);
            setBlogCategory(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogCategory(id);
    }, [id]);

    return { blogCategory, loading, error };
};

//Create a new blog category
export const createblogCategory = async (blogCategory: BlogCategory) => {
    try {
        await axios.post("/blog-categories", blogCategory);
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Update an existing blog category
export const updateblogCategory = async (blogCategory: BlogCategory) => {
    try {
        await axios.put(`/blog-categories/${blogCategory.id}`, blogCategory);
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Delete an existing blog category
export const deleteblogCategory = async (id: number) => {
    try {
        await axios.delete(`/blog-categories/${id}`);
    } catch (error : any) {
        throw new Error(error.message);
    }
};
