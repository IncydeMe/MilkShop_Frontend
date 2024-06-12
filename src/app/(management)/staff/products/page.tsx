"use client";

import React, { useState } from "react";
import { useProduct, deleteProduct } from "@/hooks/product/useProduct";
import { useProductCategory, useSingleCategory } from "@/hooks/product/useProductCategory";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { ChevronRight, CreditCard, HandCoins, Package, SquarePen, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Toaster, toast } from "sonner";


function StaffProductListPage() {
    const { categories } = useProductCategory();
    const { products, loading, error } = useProduct();



    //Get current day/month/year hour:minute
    const date = new Date();
    const currentDay = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    const currentHour = date.getHours();
    const currentMinute = date.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    const currentDate = `${currentDay}/${currentMonth}/${currentYear}, thời gian hiện tại: ${currentHour}:${currentMinute}`;

    const categoryBadge = (categoryId: number) => {
        const category = categories.find(category => category.categoryId === categoryId);
        let badgeColor = '';
        switch (category?.categoryId) {
            case 1:
                badgeColor = 'blue';
                break;
            case 2:
                badgeColor = 'green';
                break;
            case 3:
                badgeColor = 'red';
                break;
            case 4:
                badgeColor = 'pink';
                break;
            case 5:
                badgeColor = 'purple';
                break;
            case 6: 
                badgeColor = 'purple';
                break;
            default:
                badgeColor = 'red';
                break;
        }
        return (
            <>
                {
                    category && <Badge className={`text-white bg-${badgeColor}-500 hover:bg-${badgeColor}-700`}>{category.categoryName}</Badge>
                }
            </>
        )
    }

    //Pagination
    //For Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

    const pages = [];
    for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
        pages.push(i);
    }
 
    const handlePagination = (page: number) => {
        if (page < 1) page = 1;
        if (page > pages.length) page = pages.length;
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    return (
        <section className="flex flex-col">
            <Toaster position="top-center"/>
            <div className="flex justify-between items-end mb-4">
                <span>
                    <h1 className="text-[36px] font-semibold mb-2">Danh sách các sản phẩm trong kho</h1>
                    <p className="text-[16px] font-medium my-2">Cập nhật đến: {currentDate}</p>
                </span>
                <Link href='/staff/products/create'>
                    <Button variant="default" className="bg-green-500 text-white hover:bg-green-600 rounded-[4px] flex gap-4 items-center">
                        Thêm sản phẩm
                        <Package size={24} />
                    </Button>
                </Link>
            </div>
            <section className="flex flex-col gap-4">
                <Table className="w-full">
                    <TableHeader className="border-[1px]">
                        <TableRow>
                            <TableHead className="text-[14px]">STT</TableHead>
                            <TableHead>Tên sản phẩm</TableHead>
                            <TableHead className="text-[14px]">Loại sản phẩm</TableHead>
                            <TableHead className="text-[14px]">Số lượng</TableHead>
                            <TableHead className="text-[14px]">Giá bán</TableHead>
                            <TableHead colSpan={3} className="text-[14px]">Hành động</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="border-[1px]">
                        {
                            currentItems.map((product, index) => (
                                <TableRow key={index} className={`${index % 2 != 0 ? 'bg-gray-200 hover:bg-gray-300/60': 'bg-white hover:bg-gray-100'}`}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{categoryBadge(product.productCategoryId)}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</TableCell>
                                    <TableCell className="flex gap-4">
                                        <Link href={`/staff/products/${product.productId}`}>
                                            <Button variant="default" className="bg-blue-500 text-white hover:bg-blue-600 rounded-[4px] flex gap-4 items-center">
                                                Chi tiết
                                                <ChevronRight size={24} />
                                            </Button>
                                        </Link>
                                        <Link href={`/staff/products/${product.productId}/edit`}>
                                            <Button variant="default" className="bg-purple-500 text-white hover:bg-purple-600 rounded-[4px] flex gap-4 items-center">
                                                Cập nhật
                                                <SquarePen size={24} />
                                            </Button>
                                        </Link>
                                        <Dialog>
                                  <DialogTrigger>
                                    <Button variant="default" className="bg-red-500 text-white hover:bg-red-600 rounded-[4px] flex gap-4 items-center">
                                        Xóa
                                        <Trash size={24} />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className='bg-white'>
                                    <DialogHeader>
                                      <DialogTitle>Xác nhận xóa sản phẩm</DialogTitle>
                                    </DialogHeader>
                                    <DialogDescription>
                                      Bạn có chắc chắn muốn xóa sản phẩm này không?
                                    </DialogDescription>
                                    <div className='flex gap-4'>
                                      <Button
                                        onClick={() =>{
                                            deleteProduct(product?.productId || 0);
                                            toast.success('Xóa sản phẩm thành công!');
                                            window.location.href ='/staff/products';
                                        }}
                                        variant="default" 
                                        className="bg-red-500 text-white hover:bg-red-600 rounded-[4px] flex gap-4 items-center">
                                          Xác nhận
                                      </Button>
                                      <DialogClose asChild>
                                        <Button variant="default" className="bg-gray-500 text-white hover:bg-gray-600 rounded-[4px] flex gap-4 items-center">
                                            Hủy
                                        </Button>
                                      </DialogClose>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
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
        </section>
    );
}

export default StaffProductListPage;