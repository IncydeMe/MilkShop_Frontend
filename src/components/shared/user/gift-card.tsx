"use client";
import React from 'react'
import { Gift } from '@/types/gift';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from 'next/link';

interface GiftCardProps {
    gift: Gift;
}

const GiftCard:React.FC<GiftCardProps> = ({
    gift
}) => {
  return (
    <Link href={'/user/special/gift/'+gift.giftId}>
        <Card className='w-full h-full'>
            <CardHeader>
                <img src={gift.imageUrl} alt={gift.name} className='w-full h-[180px] object-cover'/>
            </CardHeader>
            <CardContent>
                <CardTitle className='text-[14px] font-semibold'>{gift.name}</CardTitle>
            </CardContent>
            <CardFooter className='flex justify-end'>
                <p>{gift.point} điểm</p>
            </CardFooter>
        </Card>
    </Link>
  )
}

export default GiftCard
