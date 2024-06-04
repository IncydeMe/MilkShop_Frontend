"use client";

import { Product } from '@/types/product'
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
import { useProduct } from '@/hooks/product/useProduct'

interface ProductCardProps {
    product: Product,
    type: 'normal' | 'discount' | 'special',
}

const RtoS = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(<i className='fas fa-star text-yellow-400'></i>);
    }
    return stars;

}

const ProductCard : React.FC<ProductCardProps> = ({
    product,
}) => {
    const { loading } = useProduct();
    return (
        <>
        {loading ? <SkeletonCard /> : (
            <Card key={product.id}>
                <CardHeader>
                    <img src={product.imageUrl} alt={product.name} />
                </CardHeader>
                <CardContent>
                    <CardDescription>{product.name}</CardDescription>
                </CardContent>
                <CardFooter>
                    <div className='flex items-center gap-4'>
                        {/* Rating Points */}
                        <div className='flex gap-1'>
                            {RtoS(product.productRating)}
                        </div>
                    </div>
                    {/* Price */}
                    <p>{product.price.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}</p>
                </CardFooter>
            </Card>
        )}
        </>
    )
}

export default ProductCard
