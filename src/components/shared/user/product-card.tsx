import { Product } from '@/types/product'
import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

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
  return (
    <Card id={product.id.toString()}>
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
                    {RtoS(product.productRating.rating)}
                </div>
                {/* Review Count */}
                <p>{product.productRating.reviewCount}</p>
            </div>
            {/* Price */}
            <p>${product.price}</p>
        </CardFooter>
    </Card>
  )
}

export default ProductCard
