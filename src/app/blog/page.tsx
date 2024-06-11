"use client";

import React from 'react'
import { useBlogs } from '@/hooks/blog/useBlog';
import BlogCard from '@/components/shared/user/blog-card';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function BlogPage() {
    const { blogs, loading, error } = useBlogs();

    return (
        <section className='py-4 px-10'>
            <div className='flex items-center'>
                <h1 className='uppercase text-[36px] font-semibold'>Blogs</h1>
            </div>
            <h3 className='text-[16px] font-semibold'>Mỗi ngày một thông tin mới và bổ ích cho tất cả mọi người~~</h3>
            <section className='grid grid-cols-4 gap-4 mt-4'>
                {loading && 
                    (
                        <div className='grid grid-cols-subgrid col-span-4 gap-2'>
                            <Skeleton className='w-[240px] h-[300px] bg-gray-500' />
                            <Skeleton className='w-[240px] h-[300px] bg-gray-500' />
                            <Skeleton className='w-[240px] h-[300px] bg-gray-500' />
                            <Skeleton className='w-[240px] h-[300px] bg-gray-500' />
                            <Skeleton className='w-[240px] h-[300px] bg-gray-500' />
                            <Skeleton className='w-[240px] h-[300px] bg-gray-500' />
                            <Skeleton className='w-[240px] h-[300px] bg-gray-500' />
                            <Skeleton className='w-[240px] h-[300px] bg-gray-500' />
                            <Skeleton className='w-[240px] h-[300px] bg-gray-500' />
                            <Skeleton className='w-[240px] h-[300px] bg-gray-500' />
                            <Skeleton className='w-[240px] h-[300px] bg-gray-500' />
                            <Skeleton className='w-[240px] h-[300px] bg-gray-500' />
                        </div>
                    ) 
                }
                {error && <p>{error.message}</p>}
                {blogs.map(blog => (
                    <BlogCard key={blog.blogId} blog={blog}/>
                ))}
            </section>
        </section>
    )
}

export default BlogPage
