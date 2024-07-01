"use client";
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'

import { useSingleAccountByEmail } from '@/hooks/account/useAccount';

import { Skeleton } from '@/components/ui/skeleton';


function AccountProfile() {
    const router = useRouter();
    //Comment: Lesson learned, get the data directly from the session storage directly
    let user = JSON.parse(sessionStorage.getItem('user') || '{}');
    
    const { account, loading, error } = useSingleAccountByEmail(user.email);

    function handleLogout() {
        sessionStorage.removeItem('user');
        Cookies.remove('token');
        router.push("/");
    }

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error.message}</p>
    }

    return (
        <section>
            <section className="flex gap-4 mb-4">
                <div className="w-[200px] h-[200px]">
                    {
                        account?.imageUrl ? (
                            <img src={account.imageUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                        ) : (
                            <Skeleton className="w-full h-full rounded-full bg-gray-600" />
                        )
                    }
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-[32px] font-semibold uppercase text-right">{account?.fullName}</h2>
                    <div className='w-full'>
                        <div className="flex flex-col gap-4">
                            <span className="flex justify-between text-[16px] font-regular">
                                <h3 className="underline underline-offset-2">Email:</h3>
                                <span className="text-black font-semibold ml-4 text-right">
                                    {account?.email}
                                </span>
                            </span>
                            <span className="flex justify-between text-[16px] font-regular">
                                <h3 className="underline underline-offset-2">Số điện thoại:</h3>
                                <span className="text-black font-semibold ml-4 text-right">
                                    {account?.phone || 'Chưa cập nhật'}
                                </span>
                            </span>
                            <span className="flex justify-between text-[16px] font-regular">
                                <h3 className="underline underline-offset-2 w-full">Địa chỉ:</h3>
                                <span className="text-black font-semibold w-full ml-4 text-right">
                                    {account?.address || 'Chưa cập nhật'}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            <div className='flex justify-end items-center gap-4'>
                <Button 
                    className='bg-orange-400 hover:bg-orange-600 text-white rounded-[4px]'
                    onClick={handleLogout}
                    >
                        Đăng xuất
                </Button>
                <Button 
                    className='bg-pink-500 hover:bg-pink-700 text-white rounded-[4px]'
                    >
                    Đổi mật khẩu
                </Button>
                <Button 
                    className='bg-blue-500 hover:bg-blue-700 text-white rounded-[4px]'
                    onClick={() => router.push('/staff/account/edit')}
                    >
                    Cập nhật thông tin
                </Button>
            </div>
        </section>
    )
}

export default AccountProfile
