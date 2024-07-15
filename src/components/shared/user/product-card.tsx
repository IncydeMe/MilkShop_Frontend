// ProductCard.tsx
"use client";

import { Product } from '@/types/product'
import React from 'react'
import { SkeletonCard } from './skeleton-card'
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
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
import Link from 'next/link';
import { useCartStore } from '@/hooks/cart/useCartStore';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useProductImageThumbnail } from '@/hooks/product/useProductImages';

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
    const [hoverState, setHoverState] = React.useState(false);
    const { toast } = useToast();

    const { productImage } = useProductImageThumbnail(product.productId || 0);

    //Handle Add to Cart
    const handleAddToCart = () => {
        const cartProduct = {
            productId: product.productId,
            accountId: Cookies.get('userId')?.toString() || '' ,
            quantity: 1,
            price: product.price,
            categoryName: product.categoryName,
            description: product.description,
            name: product.name,
            productImages: product.productImages,
            quantityInStock: product.quantityInStock,
        }
        useCartStore.getState().addToCart(cartProduct);
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
                            <img src={productImage?.url} alt={product.name} className='w-full h-[360px] rounded-[8px] object-cover'/>
                        </motion.div>
                        {hoverState && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className='absolute top-0 left-0 w-full h-full rounded-[8px] bg-black bg-opacity-50 flex justify-center items-center'>
                                <div className='flex flex-col items-center gap-4'>
                                    {
                                        Cookies.get('token') != null &&
                                        <Button
                                            onClick={ () => {
                                                handleAddToCart();
                                                toast({
                                                    title: "Thêm vào giỏ hàng thành công",
                                                    description: "Sản phẩm đã được thêm vào giỏ hàng",
                                                    action: (
                                                        <ToastAction
                                                            altText='Xem giỏ hàng'
                                                            className='bg-pink-500 text-white rounded-[4px] hover:bg-pink-700 transition-all ease-linear duration-300'
                                                        >
                                                            <Link href='/user/cart'>
                                                                Xem giỏ hàng
                                                            </Link>
                                                        </ToastAction>
                                                    )
                                                })
                                                }
                                            } 
                                            className='bg-pink-500 w-[160px] text-white rounded-[4px] hover:bg-pink-600 transition-all ease-linear duration-300'>
                                            <span className='flex items-center gap-4'>
                                                <ShoppingCart size={20}/>
                                                <p>Thêm vào giỏ</p>
                                            </span>
                                        </Button>
                                    }
                                    <Link href={'/products/'+product.productId}>
                                        <Button className='bg-purple-400 w-[160px] text-white rounded-[4px] hover:bg-purple-500 transition-all ease-linear duration-300'>
                                            <span className='flex items-center gap-4'>
                                                <Eye size={20}/>
                                                <p>Xem chi tiết</p>
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
                        {type === 'normal' && <span className='bg-gray-500 text-white px-2 py-1 rounded-[4px]'>{product.categoryName}</span>}
                    </div>
                </CardHeader>
                <CardContent className='w-full'>
                    <CardDescription>{product.name}</CardDescription>
                </CardContent>
                <CardFooter className='flex justify-between items-center'>
                    <p>{product.price.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}</p>
                    <div className='flex items-center gap-4'>
                        <div className='flex gap-1'>
                            {RtoS(product.totalRating || 0)}
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
