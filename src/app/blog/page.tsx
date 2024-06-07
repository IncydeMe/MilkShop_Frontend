"use client";

import React from 'react'
import { useBlogs } from '@/hooks/blog/useBlog';
import BlogCard from '@/components/shared/user/blog-card';

function BlogPage() {
    const { blogs, loading, error } = useBlogs();

    return (
        <section className='py-4 px-10'>
            <h1 className='uppercase text-[36px] font-semibold'>Blogs</h1>
            <h3 className='text-[16px] font-semibold'>Mỗi ngày một thông tin mới và bổ ích cho tất cả mọi người~~</h3>
            <section className='grid grid-cols-4 gap-4'>
                {loading && <p>Loading...</p>}
                {error && <p>{error.message}</p>}
                {blogs.map(blog => (
                    <BlogCard key={blog.blogId} blog={blog}/>
                ))}
            </section>
        </section>
    )
}

export default BlogPage
