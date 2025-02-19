"use client";

import React, { useState } from "react";
import { useGift, deleteGift } from "@/hooks/gift/useGift";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { ChevronRight, CreditCard, Gift, HandCoins, Package, SquarePen, Trash } from "lucide-react";
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


function StaffGiftListPage() {
    const { gifts, loading, error } = useGift();
    //Get current day/month/year hour:minute
    const date = new Date();
    const currentDay = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    const currentHour = date.getHours();
    const currentMinute = date.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    const currentDate = `${currentDay}/${currentMonth}/${currentYear}, thời gian hiện tại: ${currentHour}:${currentMinute}`;


    //Pagination
    //For Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = gifts.slice(indexOfFirstItem, indexOfLastItem);

    const pages = [];
    for (let i = 1; i <= Math.ceil(gifts.length / itemsPerPage); i++) {
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
            <div className="flex justify-between items-end mb-4">
                <span>
                    <h1 className="text-[36px] font-semibold mb-2">Danh sách các phần quà của cửa hàng</h1>
                    <p className="text-[16px] font-medium my-2">Cập nhật đến: {currentDate}</p>
                </span>
                <Link href='/staff/gifts/create'>
                    <Button variant="default" className="bg-green-500 text-white hover:bg-green-600 rounded-[4px] flex gap-4 items-center">
                        Thêm phần quà
                        <Gift size={24} />
                    </Button>
                </Link>
            </div>
            <section className="flex flex-col gap-4">
                <Table className="w-full">
                    <TableHeader className="border-[1px]">
                        <TableRow>
                            <TableHead className="text-[14px]">STT</TableHead>
                            <TableHead>Tên quà</TableHead>
                            <TableHead>Số lượng</TableHead>
                            <TableHead>Số điểm cần</TableHead>
                            <TableHead colSpan={3} className="text-[14px]">Hành động</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="border-[1px]">
                        {
                            currentItems.map((product, index) => (
                                <TableRow key={index} className={`${index % 2 != 0 ? 'bg-gray-200 hover:bg-gray-300/60': 'bg-white hover:bg-gray-100'}`}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>{product.point} điểm</TableCell>
                                    <TableCell className="flex gap-4">
                                        <Link href={`/staff/gifts/${product.giftId}`}>
                                            <Button variant="default" className="bg-blue-500 text-white hover:bg-blue-600 rounded-[4px] flex gap-4 items-center">
                                                Chi tiết
                                                <ChevronRight size={24} />
                                            </Button>
                                        </Link>
                                        <Link href={`/staff/gifts/${product.giftId}/edit`}>
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
                                      <DialogTitle>Xác nhận xóa phần quà</DialogTitle>
                                    </DialogHeader>
                                    <DialogDescription>
                                      Bạn có chắc chắn muốn xóa phần quà này không?
                                    </DialogDescription>
                                    <div className='flex gap-4'>
                                      <Button
                                        onClick={() =>{
                                          deleteGift(product?.giftId || 0);
                                          window.location.href = '/staff/gifts';
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

export default StaffGiftListPage;