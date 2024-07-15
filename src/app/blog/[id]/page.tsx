"use client";
import React from 'react'
import { useSingleBlog } from '@/hooks/blog/useBlog';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

function BlogDetailsPage({params}: {params: {id: string}}) {
    const { blog, loading, error } = useSingleBlog(Number(params.id));

    console.log(blog);

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>

    return (
        <section className='p-10'>
            <div className='flex items-center gap-x-2'>
                <Link href={'/blog'}>
                    <ChevronLeft size={42} className='cursor-pointer' />
                </Link>
                <h1 className='text-[36px] uppercase font-bold'>{blog?.title}</h1>
            </div>
           
            <p>Đăng vào: {blog?.createAt?.toLocaleDateString()}</p>
            <img src={blog?.imageUrl} alt={blog?.title} className='w-full h-[400px] object-cover'/>
            
        </section>
    )
}

export default BlogDetailsPage
