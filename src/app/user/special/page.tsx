"use client"
import React from 'react'
import { useGift } from '@/hooks/gift/useGift'
import GiftCard from '@/components/shared/user/gift-card';

function GiftsAndVouchersPage() {
  const { gifts, loading, error } = useGift();
  return (
    <main className='flex flex-col px-10 py-4'>
        <h1 className='text-[36px] font-bold'>Chào mừng đến với cửa hàng Thành viên</h1>
        <p className='text-[16px] font-light py-2'>Tích điểm thành viên và trao đổi phần quà hấp dẫn tại đây nhá  </p>

        {/* Gift Section */}
        <section className='flex flex-col gap-4'>
            <h2 className='text-[24px] font-bold'>Quà tặng</h2>
            <ul className='grid grid-cols-4 gap-4'>
                {
                    loading? (
                        Array.from({length: 8}).map((_, index) => (
                            <li key={index} className='bg-gray-500 rounded-[8px] shadow-md w-[200px] h-[300px]'></li>
                        ))
                    ) : (
                        gifts.map((gift, index) => (
                            <li key={gift.giftId + index} >
                                <GiftCard gift={gift}/>
                            </li>
                        ))
                    )
                }
            </ul>
        </section>
    </main>
  )
}

export default GiftsAndVouchersPage
