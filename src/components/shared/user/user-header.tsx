"use client";
import {
  BookUser,
  ShoppingCartIcon,
  TicketPercent,
  UserCircle2,
  ReceiptText,
  Gift,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import SearchInput from "@/components/search";

import { useCart } from "@/hooks/cart/useCart";
import { CartProduct } from "@/types/cart";
import TransitionLink from "@/components/transition-link";

const generalNav = [
  { name: "Trang chủ", path: "/" },
  { name: "Sản phẩm", path: "/products" },
  { name: "Blogs", path: "/blog" },
];

const userNav = [
  {
    icon: <UserCircle2 size={24} />,
    name: "Hồ sơ",
    path: "/user/profile",
    isPopup: true,
    popupItems: [
      {
        name: "Hồ sơ",
        icon: <BookUser size={24} />,
        path: "/user/profile",
      },
      {
        name: "Đơn hàng",
        icon: <ReceiptText size={24} />,
        path: "/user/orders",
      },
    ],
  },
  {
    icon: <ShoppingCartIcon size={24} />,
    name: "Giỏ hàng",
    path: "/user/cart",
    isPopup: true,
  },
  {
    icon: <TicketPercent size={24} />,
    name: "Khuyến mãi",
    path: "/user/special",
    isPopup: true,
    popupItems: [
      {
        name: "Phần quả",
        icon: <Gift size={24} />,
        path: "/user/special/gifts",
      },
      {
        name: "Phiếu giảm giá",
        icon: <TicketPercent size={24} />,
        path: "/user/special/vouchers",
      },
    ],
  },
];

const CartItems = () => {
  const { cart, isEmpty } = useCart();

  const CartItem: React.FC<{ item: CartProduct }> = ({ item }) => {
    return (
      <li key={item.product.productId} className="flex items-center justify-between w-full">
        <img
          src={item.product.imageUrl}
          alt={item.product.name}
          className="w-[60px] h-[60px] object-cover rounded-[4px]"
        />
        <div className="flex flex-col gap-2">
          <p>{item.product.name}</p>
          <p>
            {item.quantity} x {item.product.price}đ
          </p>
        </div>
      </li>
    );
  };

  return (
    <li className="flex flex-col items-start rounded-[4px] hover:bg-pink-500 hover:text-white transition-all ease-out duration-100">
      <Link href="/user/cart" title="Giỏ hàng">
        <Button className="w-full">
          <span className="flex items-center gap-4">
            <ShoppingCartIcon size={24} />
            Giỏ hàng
          </span>
        </Button>
      </Link>
      <ul className="flex flex-col gap-4">
        {isEmpty ? (
          <li className="text-center">Không có sản phẩm nào trong giỏ hàng</li>
        ) : (
          cart.products.map((item, index) => (
            <CartItem key={index} item={item} />
          ))
        )}
      </ul>
    </li>
  );
};

const UserHeader: React.FC = () => {
  const [openPopup, setOpenPopup] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setOpenPopup(index);
  };

  const handleMouseLeave = () => {
    setOpenPopup(null);
  };

  return (
    <header className="w-full sticky top-0 z-10">
      <section className="bg-white flex justify-between items-center  px-10 py-6 border-b-[1px] border-gray-500/20 shadow-lg">
        <section className="flex items-center justify-between gap-10">
          {/* Logo Brand */}
          <h3 className="uppercase font-bold text-[16px]">Cửa hàng sữa</h3>
        </section>
        <nav>
          {/* General Navigation */}
          <ul className="flex gap-[60px] items-center">
            {generalNav.map((nav, index) => (
              <li key={index}>
                <Link href={nav.path}>
                  <TransitionLink href={nav.path} className="bg-white rounded-[4px] text-black hover:bg-pink-400 hover:text-white transition-all ease-in-out duration-500" label={nav.name}/>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav>
          {/* User Navigation */}
          <ul className="flex gap-x-10 w-full">
            {userNav.map((nav, index) => (
              <li key={index} className="w-full">
                {nav.isPopup ? (
                  <Popover>
                    <PopoverTrigger title={nav.name}>
                      <div className="cursor-pointer">{nav.icon}</div>
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      className="w-full bg-white rounded-[4px]"
                    >
                      <ul className="flex flex-col gap-4">
                        {nav.name === "Giỏ hàng" ? (
                          <CartItems />
                        ) : (
                          nav.popupItems?.map((item, index) => (
                            <li
                              key={index}
                              className="flex flex-col items-start rounded-[4px] hover:bg-pink-500 hover:text-white transition-all ease-out duration-100"
                            >
                              <Link href={item.path} title={item.name}>
                                <Button className="w-full">
                                  <span className="flex items-center gap-4">
                                    {item.icon}
                                    {item.name}
                                  </span>
                                </Button>
                              </Link>
                            </li>
                          ))
                        )}
                      </ul>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Link href={nav.path} title={nav.name}>
                    <div className="cursor-pointer">{nav.icon}</div>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <SearchInput />
    </header>
  );
};

export default UserHeader;
