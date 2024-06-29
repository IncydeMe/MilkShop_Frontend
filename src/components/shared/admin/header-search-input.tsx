"use client"

import React from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

const HeaderSearchInput: React.FC = () => {
    const [search, setSearch] = React.useState('');
    const [onMouseEnter, setOnMouseEnter] = React.useState(false);

    const handleMouseEnter = () => {
        setOnMouseEnter(!onMouseEnter);
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }
    return (
        <section className='w-6/12'>
            <div className='flex items-center justify-between px-10'>
                <div className='flex items-center w-full gap-4'>
                    <Input placeholder='Tìm kiếm...' className='rounded-[4px]'/>
                    <Button variant={'ghost'} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseEnter}
                        className='flex gap-x-2 items-center hover:bg-pink-500 hover:text-white transition-all ease-in-out duration-500 rounded-[60px]'>
                        <Search size='24' />
                        {onMouseEnter == true && <span>Tìm kiếm</span>}
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default HeaderSearchInput;