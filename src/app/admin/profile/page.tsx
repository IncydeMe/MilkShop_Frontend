"use client";

import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import SampleAvatarImage from "../../../../public/SampleImageAvatar.jpg";
import Link from "next/link";
import { Edit } from "lucide-react";

function AdminProfilePage() {
  return (
    <section>
      <h1 className="uppercase text-4xl font-bold underline underline-offset-4 m-4">
        Thông tin cá nhân
      </h1>
      <section className="flex justify-around">
        <div className="w-1/2 w-[420px] h-[420px]">
          <Image
            src={SampleAvatarImage}
            alt="Nguyễn Lê Nhật Trường"
            className="w-[420px] h-[420px] object-cover rounded-full p-4"
          />
        </div>
        <div className="w-1/2 flex flex-col">
          <div className="flex items-start gap-2">
            <h2 className="text-3xl font-semibold uppercase">
              Nguyễn Lê Nhật Trường
            </h2>
            <span className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
              Admin
            </span>
          </div>
          <div className="h-full flex flex-col justify-around">
            <span className="flex justify-between text-xl">
              <h3 className="underline underline-offset-2">Email:</h3>
              <span className="text-black font-semibold ml-4 text-right">
                test@gmail.com
              </span>
            </span>
            <span className="flex justify-between text-xl">
              <h3 className="underline underline-offset-2">Số điện thoại:</h3>
              <span className="text-black font-semibold ml-4 text-right">
                0123456789
              </span>
            </span>
            <span className="flex justify-between text-xl">
              <h3 className="underline underline-offset-2">Địa chỉ:</h3>
              <span className="text-black font-semibold ml-4 text-right">
                123 Đ. Công Nghệ Cao, P. Công Thời, Q. 1, Tp. Thủ Đức, Hồ Chí
                Minh
              </span>
            </span>
            <span className="flex justify-between text-xl">
              <h3 className="underline underline-offset-2">Ngày sinh:</h3>
              <span className="text-black font-semibold ml-4 text-right">
                10/01/2000
              </span>
            </span>
            <span className="flex justify-between text-xl">
              <h3 className="underline underline-offset-2">Giới tính:</h3>
              <span className="text-black font-semibold ml-4 text-right">
                Nam
              </span>
            </span>
          </div>
        </div>
      </section>
      <div className="flex flex-col items-center mt-[30px]">
        <Link href="/admin/profile/edit" className="w-2/5">
          <Button
            variant={"default"}
            type="button"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white text-base rounded-[4px] flex gap-4 items-center"
          >
            Chỉnh sửa <Edit size={24} />
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default AdminProfilePage;
