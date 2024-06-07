"use client";

import React, { useState } from 'react'
import { useProduct } from '@/hooks/product/useProduct';
import ProductCard from '@/components/shared/user/product-card';

import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { useProductCategory } from '@/hooks/product/useProductCategory';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

function ProductsPage() {
    const { products, error, loading } = useProduct();
    const { categories } = useProductCategory();

    const [value, setValue] = useState([0, 9000000]);

    //For Pagination
    const [currentPage, setCurrentPage] = useState(1);//Default Page
    const [itemsPerPage, setItemsPerPage] = useState(12);//Default Items per Page

    const indexOfLastItem = currentPage * itemsPerPage;//Index of Last Item
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;//Index of First Item
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);//Current Items

    const pages = [];//Array of Pages
    //Loop through the number of pages
    for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
        pages.push(i);//Push Pages
    }

    const handlePagination = (page: number) => {
        if (page < 1) page = 1;
        if (page > pages.length) page = pages.length;
        setCurrentPage(page);
    }


    return (
        <main className='flex justify-between p-10'>
            {/* Filter Section */}
            <section className='flex flex-col justify-start gap-4'>
                <h1 className='text-3xl font-bold'>Tất cả sản phẩm</h1>
                {/* Filter Section */}
                <section className='flex flex-col gap-4'>
                    <section className="col-span-1 mr-8">
                        {/* Filter section */}
                        <div className="w-fit">
                            <div className="flex justify-between items-center gap-10 mb-4">
                                <h2 className="text-2xl w-full uppercase font-semibold">
                                    Bộ lọc
                                </h2>
                            </div>
                            <div>
                                <div className="flex justify-start items-center gap-10 mb-4">
                                    <h3 className="text-[16px] w-full uppercase underline underline-offset-4 font-semibold">
                                        Danh mục
                                    </h3>
                                </div>
                                <ul className="grid grid-cols-2 gap-2">
                                    {categories.map((category) => (
                                        <li key={category.categoryId} className='flex items-center gap-2'>
                                            <Checkbox className="w-[12px] h-[12px]" />
                                            <p className='text-black text-[14px]'>{category.categoryName}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="my-2">
                                <h3 className="text-lg font-semibold my-2 underline underline-offset-2 uppercase">
                                    Giá tiền
                                </h3>
                                <Slider
                                    value={value}
                                    max={9000000}
                                    step={1000}
                                    className="max-w-[360px] bg-black rounded-[12px] my-4"
                                    onValueChange={setValue}
                                />

                                <div className="flex justify-between items-center gap-4 my-2">
                                    <div className="flex gap-2 items-center">
                                        <p>Từ</p>
                                        <span className="border-[1px] border-gray-300 rounded-[4px] px-2 py-1">
                                            {value[0].toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <p>Đến</p>
                                        <span className="border-[1px] border-gray-300 rounded-[4px] px-2 py-1">
                                            {value[1].toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </section>
                </section>
            </section>

            <section className='flex flex-col'>
                {/* Handling Loading */}
                {loading && <p>Loading...</p>}
                {/* Handling Error */}
                {error && <p>Error: {error.message}</p>}
                {/* Product List */}
                <ul className='grid grid-cols-3 gap-6 p-4 w-full'>
                    {currentItems.map((product,index) => (
                        <ProductCard key={index} product={product} type='normal'/>
                    ))}
                </ul>
                {/* Pagination */}
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious className='cursor-pointer' onClick={() => handlePagination(currentPage - 1)}/>
                        </PaginationItem>
                        {pages.map((number) => (
                            <PaginationItem key={number}>
                                <PaginationLink onClick={() =>handlePagination(number)} isActive={currentPage === number} id={number.toString()} className='cursor-pointer'>{number}</PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext className='cursor-pointer' onClick={() => handlePagination(currentPage + 1)}/>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </section>
        </main>
    )
}

export default ProductsPage
