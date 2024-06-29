"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { disableAccount, useAccount } from "@/hooks/account/useAccount";
import { ChevronRight, SquarePen, Trash, User } from "lucide-react";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

function AccountManagementPage() {
  const { accounts, loading, error } = useAccount();

  // Get current day/month/year hour:minute
  const date = new Date();
  const currentDay = date.getDate();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();
  const currentHour = date.getHours();
  const currentMinute = date
    .getMinutes()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
  const currentDate = `${currentDay}/${currentMonth}/${currentYear}, ${currentHour}:${currentMinute}`;

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = accounts.slice(indexOfFirstItem, indexOfLastItem);

  const pages = [];
  for (let i = 1; i <= Math.ceil(accounts.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const handlePagination = (page: number) => {

  }

  return (
    <section className="flex flex-col">
      <Toaster position="top-center" />
      <div className="flex justify-between items-end mb-4">
        <span>
          <h1 className="text-[36px] font-semibold mb-2">
            Danh sách tài khoản
          </h1>
          <p className="text-[16px] font-medium my-2">
            Cập nhật đến: {currentDate}
          </p>
        </span>
        <Link href="/admin/account-management/create">
          <Button
            variant="default"
            className="bg-pink-500 text-white hover:bg-pink-600 rounded-[4px] flex gap-4 items-center"
          >
            Thêm tài khoản <User size={24} />
          </Button>
        </Link>
      </div>
      <section className="flex flex-col gap-4">
        <Table className="w-full">
          <TableHeader className="border-[1px]">
            <TableRow>
              <TableHead className="text-[14px]">STT</TableHead>
              <TableHead>Tên tài khoản</TableHead>
              <TableHead className="text-[14px]">Email</TableHead>
              <TableHead className="text-[14px]">Số điện thoại</TableHead>
              <TableHead className="text-[14px]">Địa chỉ</TableHead>
              <TableHead className="text-[14px]">Vai trò</TableHead>
              <TableHead className="text-[14px]">Trạng thái</TableHead>
              <TableHead className="text-[14px]">Ngày đăng ký</TableHead>
              <TableHead colSpan={3} className="text-[14px]">
                Hành động
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-[1px]">
            {currentItems.map((account, index) => (
              <TableRow
                key={index}
                className={`${
                  index % 2 != 0
                    ? "bg-gray-200 hover:bg-gray-300/60"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>{account.phonenumber}</TableCell>
                <TableCell>{account.address.street} - {account.address.state} - {account.address.city} - {account.address.country}</TableCell>
                <TableCell>{account.role}</TableCell>
                <TableCell>{account.disabled ? 'Đang hoạt động' : 'Cấm'}</TableCell>
                <TableCell>{account.createdAt.toString()}</TableCell>
                <TableCell className="flex gap-4">
                  <Link href={`/admin/account-management/${account.id}`}>
                    <Button
                      variant="default"
                      className="bg-blue-500 text-white hover:bg-blue-600 rounded-[4px] flex gap-4 items-center"
                    >
                      Chi tiết
                      <ChevronRight size={24} />
                    </Button>
                  </Link>
                  <Link href={`/admin/account-management/${account.id}/edit`}>
                    <Button
                      variant="default"
                      className="bg-purple-500 text-white hover:bg-purple-600 rounded-[4px] flex gap-4 items-center"
                    >
                      Cập nhật
                      <SquarePen size={24} />
                    </Button>
                  </Link>
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        variant="default"
                        className="bg-red-500 text-white hover:bg-red-600 rounded-[4px] flex gap-4 items-center"
                      >
                        Cấm
                        <Trash size={24} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <DialogTitle>Xác nhận cấm tài khoản</DialogTitle>
                      </DialogHeader>
                      <DialogDescription>
                        Bạn có chắc chắn muốn cấm thằng này này không?
                      </DialogDescription>
                      <div className="flex gap-4">
                        <Button
                          onClick={() => {
                            disableAccount(account?.id || 0);
                            toast.success("Đã cho ra đảo thành công!");
                            window.location.href = "/admin/account-management";
                          }}
                          variant="default"
                          className="bg-red-500 text-white hover:bg-red-600 rounded-[4px] flex gap-4 items-center"
                        >
                          Xác nhận
                        </Button>
                        <DialogClose asChild>
                          <Button
                            variant="default"
                            className="bg-gray-500 text-white hover:bg-gray-600 rounded-[4px] flex gap-4 items-center"
                          >
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
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer"
                onClick={() => handlePagination(currentPage - 1)}
              />
            </PaginationItem>
            {pages.map((number) => (
              <PaginationItem key={number}>
                <PaginationLink
                  onClick={() => handlePagination(number)}
                  isActive={currentPage === number}
                  id={number.toString()}
                  className="cursor-pointer"
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                className="cursor-pointer"
                onClick={() => handlePagination(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </section>
  );
}

export default AccountManagementPage;
