"use client";

import React, { useState } from "react";
import {
  BarChart,
  Barcode,
  List,
  LogOut,
  PersonStanding,
  SidebarClose,
  UserCircle2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import HeaderSearchInput from "./header-search-input";
import hugeiconsMilkBottle from "../../../../public/hugeicons--milk-bottle.svg";

const adminNav = {
  icon: <UserCircle2 size={32} />,
  name: "Hồ sơ",
  path: "/admin/profile",
  isPopup: true,
  popupItems: [
    { name: "Hồ sơ", path: "/admin/profile" },
    { name: "Đơn hàng", path: "/admin/orders" },
  ],
};

function AdminHeader({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="w-full flex justify-between items-center px-10 py-6 border-b-[1px] border-gray-500/20 shadow-lg">
        <section className="flex items-center justify-between border border-pink-700 rounded">
          {/* Logo Brand */}
          <div className="pr-4">
            <button
              className="bg-pink-700 hover:bg-pink-800 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <SidebarClose /> : <List />}
            </button>
          </div>
          <h3 className="pr-4 uppercase font-semibold text-[26px] text-pink-700">
            Cửa hàng sữa
          </h3>
        </section>
        <HeaderSearchInput />
        <nav>
          <ul className="flex gap-x-10 w-full">
            <li className="w-full">
              {adminNav.isPopup ? (
                <Popover>
                  <PopoverTrigger title={adminNav.name}>
                    <div className="cursor-pointer">{adminNav.icon}</div>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-full bg-white">
                    <ul className="flex flex-col gap-4">
                      {adminNav.popupItems?.map((popup, index) => (
                        <li key={index} className="w-full">
                          <Link
                            href={popup.path}
                            className="block w-full rounded-[4px] hover:bg-pink-400 hover:text-white hover:font-semibold transition-all duration-300 p-2"
                          >
                            <p className="pl-1">{popup.name}</p>
                          </Link>
                        </li>
                      ))}
                      <hr className="w-full" />
                      <li className="w-full">
                        <Link 
                          href="/"
                          onClick={() => Cookies.remove('token') } 
                          className="flex items-center w-full rounded-[4px] hover:bg-pink-500 hover:text-white hover:font-semibold transition-all duration-300 p-2">
                          <LogOut size={20} />
                          <span className="pl-2">Đăng xuất</span>
                        </Link>
                      </li>
                    </ul>
                  </PopoverContent>
                </Popover>
              ) : (
                <Link href={adminNav.path} title={adminNav.name}>
                  <div className="cursor-pointer">{adminNav.icon}</div>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <div className="flex">
        <div
          className={`flex flex-col shrink-0 bg-pink-50 h-screen transition-all duration-300 z-10 ${
            isOpen ? "w-72 md:w-96" : "w-0 overflow-hidden"
          }`}
        >
          <Link
            href="/admin"
            className="flex flex-col items-center justify-center m-5 no-underline"
          >
            <Image
              src={hugeiconsMilkBottle}
              width={110}
              height={110}
              alt="Logo"
            />
            <h3 className="mt-3 text-2xl font-bold">ADMIN</h3>
          </Link>
          <hr />
          <ul className="flex flex-col items-start px-4">
            <li className="w-full my-4 hover:bg-pink-300 hover:font-semibold rounded">
              <Link href="/admin" className="flex p-3">
                <BarChart />
                <span className="ml-4 text-xl flex">Thống kê</span>
              </Link>
            </li>
            <li className="w-full my-4 hover:bg-pink-300 hover:font-semibold rounded">
              <Link href="/admin/account-management" className="flex p-3">
                <Barcode />
                <span className="ml-4 text-xl flex">Quản lý tài khoản</span>
              </Link>
            </li>
            <li className="w-full my-4 hover:bg-pink-300 hover:font-semibold rounded">
              <Link href="/admin/profile" className="flex p-3 items-center">
                <PersonStanding />
                <span className="ml-4 text-xl flex">Nguyễn Lê Nhật Trường</span>
              </Link>
            </li>
            <hr className="w-full" />
            <li className="w-full my-4 bg-pink-700 hover:bg-pink-800 hover:font-semibold rounded">
              <Link href="/" className="flex p-3 text-white">
                <LogOut />
                <span className="flex ml-4 text-xl text-white">Đăng xuất</span>
              </Link>
            </li>
          </ul>
        </div>
        {children}
      </div>
    </>
  );
}

export default AdminHeader;
