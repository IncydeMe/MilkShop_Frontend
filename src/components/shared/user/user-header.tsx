"use client"
import { ShoppingCartIcon, TicketPercent, UserCircle2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/popover";

import { Button } from '@/components/ui/button';
import SearchInput from '@/components/search';

const generalNav = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Sản phẩm', path: '/products'},
    { name: 'Blogs', path: '/blogs' }
]

const userNav = [
    {
        icon: <UserCircle2 size={24} />,
        name: 'Hồ sơ',
        path: '/user/profile',
        isPopup: true,
        popupItems: [
            { name: 'Hồ sơ', path: '/user/profile'},
            { name: 'Đơn hàng', path: '/user/orders'},
        ]
    },
    {
        icon: <ShoppingCartIcon size={24} />,
        name: 'Giỏ hàng',
        path: '/user/cart',
        isPopup: false,
    },
    {
        icon: <TicketPercent size={24} />,
        name: 'Khuyến mãi',
        path: '/user/special',
        isPopup: true,
        popupItems: [
            { name: 'Phần quả', path: '/user/gifts'},
            { name: 'Phiếu giảm giá', path: '/user/vouchers'},
        ]
    }
]

const UserHeader: React.FC = () => {
  return (
    <>
        <header className='flex justify-between items-center px-10 py-6 border-b-[1px] border-gray-500/20 shadow-lg'>
            <section className='flex items-center justify-between gap-10'>
                {/* Logo Brand */}
                <h3 className='uppercase font-bold text-[16px]'>Cửa hàng sữa</h3>
            </section>
            <nav>
                {/* General Navigation */}
                <ul className='flex gap-[60px] items-center'>
                    {generalNav.map((nav, index) => (
                        <li key={index}>
                            <Link href={nav.path}>
                                <Button className='bg-white rounded-[4px] text-black hover:bg-pink-400 hover:text-white transition-all ease-in-out duration-500'>{nav.name}</Button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <nav>
                {/* User Navigation */}
                <ul className='flex gap-x-10 w-full'>
                    {userNav.map((nav, index) => (
                        <li key={index} className='w-full'>
                            {nav.isPopup ? (
                                <Popover placement='bottom-end'>
                                    <PopoverTrigger title={nav.name}>
                                        <Button>
                                            {nav.icon}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className='w-full bg-white'>
                                        <ul className='flex flex-col gap-4'>
                                            {nav.popupItems?.map((popup, index) => (
                                                <li key={index} className='w-full'>
                                                    <Link href={popup.path} className='block w-full rounded-[4px] hover:bg-pink-400 hover:text-white hover:font-semibold transition-all duration-300 p-2'>
                                                        <p className='pl-1'>{popup.name}</p>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </PopoverContent>
                                </Popover>
                            ) : (
                                <Link href={nav.path} title={nav.name}>
                                    <div className='cursor-pointer'>
                                        {nav.icon}
                                    </div>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
        <SearchInput />
    </>
  )
}

export default UserHeader
