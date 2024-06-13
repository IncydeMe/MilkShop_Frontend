"use client";

import React, { useState, useEffect } from 'react';
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
} from "@/components/ui/pagination";
import { Product } from '@/types/product';

function ProductsPage() {
    const { products, error, loading } = useProduct();
    const { categories } = useProductCategory();

    const [value, setValue] = useState([0, 9000000]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    useEffect(() => {
        setFilteredProducts(products.filter(product =>
            (selectedCategories.length === 0 || selectedCategories.includes(product.productCategoryId)) &&
            product.price >= value[0] && product.price <= value[1]
        ));
    }, [products, selectedCategories, value]);

    //For Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const pages = [];
    for (let i = 1; i <= Math.ceil(filteredProducts.length / itemsPerPage); i++) {
        pages.push(i);
    }

    const handlePagination = (page: number) => {
        if (page < 1) page = 1;
        if (page > pages.length) page = pages.length;
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <main className='flex justify-between p-10'>
            {/* Filter Section */}
            <section className='flex flex-col justify-start gap-4'>
                <h1 className='text-3xl font-bold'>Tất cả sản phẩm</h1>
                <section className='flex flex-col gap-4 fixed top-[300px] left-10'>
                    <section className="col-span-1 mr-8">
                        <div className="w-[240px]">
                            <div className="flex justify-between items-center gap-10 mb-4">
                                <h2 className="text-2xl w-full uppercase font-bold underline underline-offset-1">
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
                                        <li key={category.productCategoryId} className='flex items-center gap-2'>
                                            <Checkbox
                                                value={category.productCategoryId}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setSelectedCategories([...selectedCategories, category.productCategoryId]);
                                                    } else {
                                                        setSelectedCategories(selectedCategories.filter((id) => id !== category.productCategoryId));
                                                    }
                                                }}
                                            />
                                            <p className='text-black text-[14px]'>{category.categoryName}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* <div className="my-2">
                                <h3 className="text-lg font-semibold my-2 underline underline-offset-2 uppercase">
                                    Giá tiền
                                </h3>
                                <Slider
                                    value={value}
                                    max={9000000}
                                    step={1000}
                                    className="w-[240px] bg-black rounded-[12px] my-4"
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
                            </div> */}
                        </div>
                    </section>
                </section>
            </section>

            <section className='flex flex-col'>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                <ul className='grid grid-cols-3 gap-6 p-4 w-full'>
                    {currentItems.map(product => (
                        <ProductCard key={product.productId} product={product} type='normal' />
                    ))}
                </ul>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious className='cursor-pointer' onClick={() => handlePagination(currentPage - 1)} />
                        </PaginationItem>
                        {pages.map((number) => (
                            <PaginationItem key={number}>
                                <PaginationLink onClick={() => handlePagination(number)} isActive={currentPage === number} id={number.toString()} className='cursor-pointer'>{number}</PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext className='cursor-pointer' onClick={() => handlePagination(currentPage + 1)} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </section>
        </main>
    );
}

export default ProductsPage;
