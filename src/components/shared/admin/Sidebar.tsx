"use client";

import React, { useState } from 'react';
import { List, SidebarClose } from 'lucide-react';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex">
            <div className={`bg-pink-50 fixed h-screen transition-all duration-300 z-10 ${isOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
                <div className='flex flex-col items-start px-4'>
                    <div className='mt-4'>
                        <a href='#' className='text-xl hover:bg-pink-300'>Thống kê</a>
                    </div>
                    <div className='mt-4'>
                        <a href='#' className='hover:text-pink-300'>Account management</a>
                    </div>
                    <div className='mt-4'>
                        <a href='#' className='hover:text-pink-300'>Profile</a>
                    </div>
                </div>
            </div>
            <div className={`flex-1 p-4 ${isOpen ? 'ml-64' : 'ml-0'}`}>
                <div className='ml-auto'>
                    <button className='bg-pink-700 hover:bg-pink-800 text-white font-bold py-2 px-4 rounded' onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? (
                            <SidebarClose />
                        ) : (
                            <List />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;