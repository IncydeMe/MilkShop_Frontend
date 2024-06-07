"use client";
import React from 'react'
import { useSingleBlog } from '@/hooks/blog/useBlog';

function BlogDetailsPage({params}: {params: {id: string}}) {
    const { blog, loading, error } = useSingleBlog(Number(params.id));

    console.log(blog?.createDate);

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>

    return (
        <section className='p-10'>
            <h1 className='text-[36px] uppercase font-bold'>{blog?.title}</h1>
            <p>Đăng vào: {blog?.createDate?.toTimeString()}</p>
            <img src={blog?.imageSrc} alt={blog?.title} className='w-full h-[400px] object-cover'/>
            <p>{blog?.body}</p>
        </section>
    )
}

export default BlogDetailsPage
