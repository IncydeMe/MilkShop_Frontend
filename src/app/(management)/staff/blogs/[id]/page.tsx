"use client";

import React from "react";

import { useSingleBlog } from "@/hooks/blog/useBlog";

function BlogDetails({ params }: { params: { id: number } }) {
    const { blog, loading, error } = useSingleBlog(params.id);

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error.message}</p>
    }
    return ( 
        <section>
            <h1>Blog Details Page</h1>

            <section>
                <h2>{blog?.title}</h2>
                <p>
                    {blog?.createAt.toLocaleDateString()} - {blog?.createAt.toLocaleTimeString()}
                </p>
                <img src={blog?.imageUrl} alt={blog?.title} />
                <a href={blog?.docUrl}>Read more</a>
            </section>
        </section>
     );
}

export default BlogDetails;