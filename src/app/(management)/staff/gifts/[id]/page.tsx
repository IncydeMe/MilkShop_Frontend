"use client";
import React from "react";
import { deleteGift, useSingleGift } from "@/hooks/gift/useGift";
import { ChevronLeft, SquarePen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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

function GiftDetailsPage({ params }: { params: { id: number } }) {
  const { gift, loading, error } = useSingleGift(params.id);

  const router = useRouter();
  return (
    <section>
      <section className="flex items-center gap-4">
        <ChevronLeft
          size={36}
          onClick={() => router.back()}
          className="cursor-pointer"
        />
        <h1 className="text-[36px] font-semibold">Chi tiết phần quà</h1>
      </section>
      <section className="mt-4">
        <section className="flex gap-4">
          <img
            src={gift?.imageUrl}
            alt={gift?.name}
            className="w-[240px] h-[240px] object-conver rounded-[300px]"
          />
          <section className="flex flex-col gap-4">
            <span className="flex gap-x-2">
              <p className="font-semibold underline underline-offset-2">
                Tên phần quà:
              </p>
              {gift?.name}
            </span>
            <span className="flex gap-x-2">
              <p className="font-semibold underline underline-offset-2">
                Số lượng điểm cần quy đổi:
              </p>
              {gift?.point} điểm
            </span>

            <span>
              <p className="font-semibold underline underline-offset-2">
                Lưu ý của phần quà:
              </p>
              <ol className="list-decimal pl-8 flex flex-col gap-4 mt-2">
                <li>
                  Phần quà này chỉ dành cho thành viên của cửa hàng để quy đổi
                </li>
                <li>
                  Không thể quy đổi phần quà này về tiền mặt có giá trị tương
                  đương hoặc thấp hơn
                </li>
                <li>Phần quà này không thể quy trả lại</li>
              </ol>
            </span>
          </section>
        </section>
      </section>
      <div className="flex gap-4 items-center justify-end">
        <Link href={`/staff/gifts/${gift?.giftId}/edit`}>
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
              <Trash2 size={24} />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Xác nhận xóa phần quà</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa phần quà này không?
            </DialogDescription>
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  deleteGift(gift?.giftId || 0);
                  window.location.href = "/staff/gifts";
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
    </section>
  );
}

export default GiftDetailsPage;
