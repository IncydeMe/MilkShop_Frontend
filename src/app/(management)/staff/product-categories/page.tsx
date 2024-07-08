"use client";

import React, { useState } from 'react'
import { Table, TableHeader, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { useProductCategory, deleteCategory } from '@/hooks/product/useProductCategory';
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
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Toaster, toast } from "sonner";
import { ChevronRight, Package2, SquarePen, Trash } from 'lucide-react';

function ProductCategoriesPage() {
  const { categories } = useProductCategory();

  //Get current day/month/year hour:minute
  const date = new Date();
  const currentDay = date.getDate();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();
  const currentHour = date.getHours();
  const currentMinute = date.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  const currentDate = `${currentDay}/${currentMonth}/${currentYear}, thời gian hiện tại: ${currentHour}:${currentMinute}`;

  //For Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

  const pages = [];
  for (let i = 1; i <= Math.ceil(categories.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const handlePagination = (page: number) => {
    if (page < 1) page = 1;
    if (page > pages.length) page = pages.length;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <section>
      <Toaster position='top-center'/>
      <div className="flex justify-between items-end mb-4">
          <span>
              <h1 className="text-[36px] font-semibold mb-2">Danh sách các danh mục</h1>
              <p className="text-[16px] font-medium my-2">Cập nhật đến: {currentDate}</p>
          </span>
          <Link href='/staff/products/create'>
              <Button variant="default" className="bg-green-500 text-white hover:bg-green-600 rounded-[4px] flex gap-4 items-center">
                  Thêm danh mục
                  <Package2 size={24} />
              </Button>
          </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead>Tên danh mục</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((category, index) => (
            <TableRow key={category.categoryId}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell className="flex gap-4">
                <Link href={`/staff/categories/${category.categoryId}`}>
                  <Button variant="default" className="bg-blue-500 text-white hover:bg-blue-600 rounded-[4px] flex gap-4 items-center">
                    Chi tiết
                    <ChevronRight size={24} />
                  </Button>
                </Link>
                <Link href={`/staff/categories/${category.categoryId}/edit`}>
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
                      <DialogTitle>Xác nhận xóa danh mục</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      Bạn có chắc chắn muốn xóa danh mục này không?
                    </DialogDescription>
                    <div className='flex gap-4'>
                      <Button
                        onClick={() => {
                          deleteCategory(category.categoryId);
                          toast.success('Xóa sản phẩm thành công!');
                          window.location.href = '/staff/products';
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
          ))}
        </TableBody>
      </Table>
    </section>
  )
}

export default ProductCategoriesPage
