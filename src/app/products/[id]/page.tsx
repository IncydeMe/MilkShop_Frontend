'use client';

import React from 'react'
import { useProduct, useSingleProduct } from '@/hooks/product/useProduct'
import { Button } from '@/components/ui/button';
import { ChevronLeft, Star } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/shared/user/product-card';

const RatingToStars = ({ rating = 0 }: { rating?: number }) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(<Star size={24} color='yellow'/>);
    }
    return stars;
}


function ProductDetailsPage({params}: {params: {id: number}}) {
    const { product, loading, error } = useSingleProduct(params.id);
    const { products } = useProduct();

    const getRandomProducts = (list: typeof products) => {
        let shuffle = list.sort(() => Math.random() - 0.5);
        return shuffle.slice(0, 4);
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <section className='p-10 flex flex-col gap-10'>
            <section className='flex items-center gap-6'>
                <Link href='/products'><ChevronLeft size={36} /></Link>
                <h1 className='text-[36px] font-bold underline underline-offset-2'>Chi tiết sản phẩm</h1>
            </section>
            <section className='flex gap-10'>
                <div>
                    <img src={product?.imageUrl} alt={product?.name} className='w-[480px] h-full object-cover rounded-[8px] shadow-md'/>
                </div>
                <div className='flex flex-col gap-4'>
                    <h2 className='text-[36px] font-bold'>{product?.name}</h2>
                    <p>{product?.description}</p>
                    <div className='flex items-center gap-4'>
                        <RatingToStars rating={product?.totalRating} />
                        <p>{product?.totalRating.toPrecision(1)}</p>
                    </div>
                    <p className='font-semibold'>
                        {product?.price.toLocaleString(
                            'vi-VN',
                            { style: 'currency', currency: 'VND' }
                        )}
                    </p>

                    <div className='flex justify-start items-center gap-8'>
                        <Button className='bg-purple-500 text-white px-4 py-2 rounded-[8px] hover:bg-purple-600 transition-all ease-linear duration-300'>
                            Buy Now
                        </Button>
                        <Button className='border-[1px] border-pink-500 text-pink-500 px-4 py-2 rounded-[8px] hover:bg-pink-600 hover:text-white transition-all ease-linear duration-300'>
                            Add to cart
                        </Button>
                    </div>
                </div>
            </section>
            <section>
                <h2 className='text-[36px] font-semibold underline undeline-offset-2'>Sản phẩm tương tự</h2>
                <div className='grid grid-cols-4 gap-10'>
                    {getRandomProducts(products).map(product => (
                        <ProductCard key={product.productId} product={product} type='normal'/>
                    ))}
                </div>
            </section>
            <section>
                <h2 className='text-[36px] font-semibold underline undeline-offset-2'>Phản hồi từ người sử dụng</h2>
                
            </section>
        </section>
    )
}

export default ProductDetailsPage
