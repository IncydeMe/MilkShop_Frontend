"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { deleteVoucher, useSingleVoucher } from "@/hooks/voucher/useVoucher";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { ChevronLeft, SquarePen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

function VoucherDetailsPage({ params }: { params: { id: string } }) {
  const { voucher } = useSingleVoucher(params.id);

  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <span className="flex items-center gap-2">
        <ChevronLeft
          size={36}
          onClick={() => router.back()}
          className="cursor-pointer"
        />
        <h1 className="text-[36px] font-semibold">Chi tiết voucher</h1>
      </span>
      <span className="flex items-center gap-2">
        <h3 className="font-semibold underline">Mã voucher: </h3>
        <p>{voucher?.voucherId}</p>
      </span>
      <span className="flex items-center gap-2">
        <h3 className="font-semibold underline">Loại voucher: </h3>
        <Badge
          variant={"default"}
          className={
            voucher?.value
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }
        >
          {voucher?.value ? "Giảm giá" : "Freeship"}
        </Badge>
      </span>
      {voucher?.value && (
        <span className="flex items-center gap-2">
          <h3 className="font-semibold underline">Giá trị: </h3>
          <p>{voucher?.value}%</p>
        </span>
      )}
      {voucher?.value && (
        <span className="flex items-center gap-2">
          <h3 className="font-semibold underline">Hạn sử dụng: </h3>
          <span className="flex items-center gap-1">
            <p>Từ</p>
            <p>
              {voucher?.startDate
                .toString()
                .split("T")[0]
                .split("-")
                .reverse()
                .join("/")}
            </p>
            <p>Đến</p>
            <p>
              {voucher?.endDate
                .toString()
                .split("T")[0]
                .split("-")
                .reverse()
                .join("/")}
            </p>
          </span>
        </span>
      )}
      {!voucher?.value && (
        <span className="flex items-center gap-2">
          <h3 className="font-semibold underline">Hạn sử dụng: </h3>
          <span className="flex items-center gap-1">
            <p>Từ</p>
            <p>
              {voucher?.startDate
                .toString()
                .split("T")[0]
                .split("-")
                .reverse()
                .join("/")}
            </p>
            <p>đến</p>
            <p>
              {voucher?.endDate
                .toString()
                .split("T")[0]
                .split("-")
                .reverse()
                .join("/")}
            </p>
          </span>
        </span>
      )}
      <div className="flex justify-end items-center gap-2">
        <Link href={`/staff/vouchers/${voucher?.voucherId}/edit`}>
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
              Xóa
              <Trash size={24} />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Xác nhận xóa phiếu giảm giá</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa phiếu này không?
            </DialogDescription>
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  deleteVoucher(voucher?.voucherId || "");
                  window.location.href = "/staff/products";
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
      </div>
    </div>
  );
}

export default VoucherDetailsPage;
