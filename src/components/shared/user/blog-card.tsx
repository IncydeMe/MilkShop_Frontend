"use client"

import React from 'react'
import { SkeletonCard } from './skeleton-card'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Blog } from '@/types/blog'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BlogCardProps {
    blog: Blog
}

const BlogCard: React.FC<BlogCardProps> = ({
    blog
}) => {
    return (
        <Card>
            <CardHeader>
                <img src={blog.imageSrc} alt={blog.title} className='w-full h-full object-cover'/>
            </CardHeader>
            <CardContent>
                {blog.title}
            </CardContent>
            <CardFooter className='flex justify-end'>
                <Link href={'/blog/'+ blog.blogId} className='text-gray-500 hover:text-black'>
                    <span className='flex gap-4 items-center'>
                        <p>Đọc thêm tại đây</p>
                        <ChevronRight size={24}/>
                    </span>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default BlogCard
