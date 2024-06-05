import { useState, useEffect } from "react";
import axios from '@/lib/axios';
import type { Blog } from "../../types/blog";

//CRUD operations for blogs

//Fetch all blogs
export function useBlogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get<Blog[]>("/blogs");
            setBlogs(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return { blogs, loading, error };
};

//Fetch a single blog
export const useSingleBlog = (id: number) => {
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchBlog = async (id: number) => {
        try {
            const response = await axios.get<Blog>(`/blogs/${id}`);
            setBlog(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlog(id);
    }, [id]);

    return { blog, loading, error };
};

//Create a new blog
export const createBlog = async (blog: Blog) => {
    try {
        await axios.post("/blogs", blog);
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Update an existing blog
export const updateBlog = async (blog: Blog) => {
    try {
        await axios.put(`/blogs/${blog.id}`, blog);
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Delete an existing blog
export const deleteBlog = async (id: number) => {
    try {
        await axios.delete(`/blogs/${id}`);
    } catch (error : any) {
        throw new Error(error.message);
    }
};
