"use client";
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'

type AccountProfileProps = {
    email: string;
}

function AccountProfile() {
    const [account, setAccount] = useState<AccountProfileProps | null>(null);
    const router = useRouter();
    useEffect(() => {
        const userString = sessionStorage.getItem('user');
        if (userString) {
            const userObject = JSON.parse(userString);
            setAccount({
                email: userObject.email,
            });
        }
    }, []);

    function handleLogout() {
        sessionStorage.removeItem('user');
        Cookies.remove('token');
        router.push('/');
    }

    return (
        <section>
            <p className='text-[36px] font-semibold'>Hồ sơ tài khoản</p>
            <p>
                {account?.email}
            </p>
            <div className='flex justify-start items-center gap-4'>
                <Button 
                    className='bg-orange-400 hover:bg-orange-600 text-white rounded-[4px]'
                    onClick={handleLogout}
                    >
                        Đăng xuất
                </Button>
                <Button className='bg-pink-500 hover:bg-pink-700 text-white rounded-[4px]'>Đổi mật khẩu</Button>
            </div>
        </section>
    )
}

export default AccountProfile
