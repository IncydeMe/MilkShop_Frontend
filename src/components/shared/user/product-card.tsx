"use client";

import { Product } from '@/types/product'
import React from 'react'

import { SkeletonCard } from './skeleton-card'
import { motion } from 'framer-motion';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
  } from "@/components/ui/card"
import { useProduct } from '@/hooks/product/useProduct';
import { useSingleCategory } from '@/hooks/product/useProductCategory';
import { Button } from '@/components/ui/button';
import { Eye, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/hooks/cart/useCart';
import Link from 'next/link';

interface ProductCardProps {
    product: Product,
    type: 'normal' | 'discount' | 'special',
}

const RtoS = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(<Star key={i} size={24} color='yellow'/>);
    }
    return stars;

}

const ProductCard : React.FC<ProductCardProps> = ({
    product,
    type
}) => {
    const { loading } = useProduct();
    const { addProduct } = useCart();
    const { category } = useSingleCategory(product.categoryId);
    const { cart } = useCart();
    const [hoverState, setHoverState] = React.useState(false);

    //Handle Add to Cart
    const handleAddToCart = () => {
        addProduct(product);
        console.log(JSON.stringify(cart));
    }

    const handleHoverState = () => {
        setHoverState(!hoverState);
    }

    return (
        <>
        {loading ? <SkeletonCard /> : (
            <Card key={product.productId} className='border-r-[1px] border-b-[1px] border-gray-500/20'>
                <CardHeader className='relative' onMouseEnter={handleHoverState} onMouseLeave={handleHoverState}>
                    <div className='relative'>
                        <motion.div
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <img src={product.imageUrl} alt={product.name} className='w-full h-[360px] rounded-[8px] object-cover'/>
                        </motion.div>
                        {hoverState && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className='absolute top-0 left-0 w-full h-full rounded-[8px] bg-black bg-opacity-50 flex justify-center items-center'>
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
                            </motion.div>
                        )}
                    </div>
                    <div className='absolute top-4 right-4'>
                        {type === 'discount' && <span className='bg-red-500 text-white px-2 py-1 rounded-[4px]'>-%</span>}
                        {type === 'special' && <span className='bg-blue-500 text-white px-2 py-1 rounded-[4px]'>Special</span>}
                        {type === 'normal' && <span className='bg-gray-500 text-white px-2 py-1 rounded-[4px]'>{category?.categoryName}</span>}
                    </div>
                </CardHeader>
                <CardContent className='w-full'>
                    <CardDescription>{product.name}</CardDescription>
                </CardContent>
                <CardFooter className='flex justify-between items-center'>
                    <p>{product.price.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}</p>
                    <div className='flex items-center gap-4'>
                        {/* Rating Points */}
                        <div className='flex gap-1'>
                            {RtoS(product.totalRating)}
                        </div>
                        <p className='text-[12px]'>{'(' + product.totalRating + ')'}</p>
                    </div>
                </CardFooter>
            </Card>
        )}
        </>
    )
}

export default ProductCard;
