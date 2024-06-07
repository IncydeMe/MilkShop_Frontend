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
import { Button } from '@/components/ui/button';
import { Eye, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/cart/useCart';
import Link from 'next/link';

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
    type
}) => {
    const { loading } = useProduct();
    const { cart, addProduct } = useCart();
    const [hoverState, setHoverState] = React.useState(false);

    //Handle Add to Cart
    const handleAddToCart = () => {
        addProduct(product);
        console.log('Product added to cart');
        console.log(JSON.stringify(cart));
    }

    const handleHoverState = () => {
        setHoverState(!hoverState);
    }

    return (
        <>
        {loading ? <SkeletonCard /> : (
            <Card key={product.productId}>
                <CardHeader className='relative' onMouseEnter={handleHoverState} onMouseLeave={handleHoverState}>
                    <div className='relative'>
                        <img src={product.imageUrl} alt={product.name} className='w-full h-[360px] rounded-[8px] object-cover'/>
                        {hoverState && (
                            <div className='absolute top-0 left-0 w-full h-full rounded-[8px] bg-black bg-opacity-50 flex justify-center items-center'>
                                <div className='flex flex-col items-center gap-4'>
                                    <Button
                                        onClick={handleAddToCart} 
                                        className='bg-pink-500 text-white rounded-[4px] hover:bg-pink-600 transition-all ease-linear duration-300'>
                                        <span className='flex items-center gap-4'>
                                            <ShoppingCart size={20}/>
                                            <p>Add to cart</p>
                                        </span>
                                    </Button>
                                    <Link href={'/products/'+product.productId}>
                                        <Button className='bg-purple-400 text-white rounded-[4px] hover:bg-purple-500 transition-all ease-linear duration-300'>
                                            <span className='flex items-center gap-4'>
                                                <Eye size={20}/>
                                                <p>View Details</p>
                                            </span>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='absolute top-4 right-4'>
                        {type === 'discount' && <span className='bg-red-500 text-white px-2 py-1 rounded-[4px]'>-%</span>}
                        {type === 'special' && <span className='bg-blue-500 text-white px-2 py-1 rounded-[4px]'>Special</span>}
                    </div>
                </CardHeader>
                <CardContent>
                    <CardDescription>{product.name}</CardDescription>
                </CardContent>
                <CardFooter>
                    <div className='flex items-center gap-4'>
                        {/* Rating Points */}
                        <div className='flex gap-1'>
                            {RtoS(product.totalRating)}
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
