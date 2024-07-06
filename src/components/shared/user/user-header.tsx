// UserHeader.tsx
"use client";
import {
  BookUser,
  ShoppingCartIcon,
  TicketPercent,
  UserCircle2,
  ReceiptText,
  Gift,
  LogOut,
  Plus,
  Minus,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import SearchInput from "@/components/search";

import { CartProduct } from "@/types/cart";
import TransitionLink from "@/components/transition-link";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";

import { useCartStore } from "@/hooks/cart/useCartStore";
import { Product } from "@/types/product";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import EmptyCartImage from "../../../../public/Empty.png";

const generalNav = [
  { name: "Trang chủ", path: "/" },
  { name: "Sản phẩm", path: "/products" },
  { name: "Blogs", path: "/blog" },
];

const ShoppingCart = () => {
  const cart = useCartStore((state) => state.cart);
  if(cart.length === 0) {
    return(
      <ShoppingCartIcon size={24} />
    )
  }
  else {
    return(
      <div className="flex items-center justify-center relative">
        <ShoppingCartIcon size={24} />
        <span className="absolute -top-5 -right-4 bg-red-500 w-[22px] h-[22px] text-white text-xs rounded-[100px] p-1 flex justify-center">
          <p className="my-auto">{cart.length}</p>
        </span>
      </div>
    )
  }
}

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
      {
        name: "Đăng xuất",
        icon: <LogOut size={24} />,
        path: "/",
      },
    ],
  },
  {
    icon: <ShoppingCart />,
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
  const cart = useCartStore((state) => state.cart);

  const handlePlus = (product: Product) => {
    useCartStore.getState().addToCart(product);
  };

  const handleMinus = (product: Product) => {
    useCartStore.getState().decreaseQuantity(product.productId);
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col justify-center gap-2">
        <Image src={EmptyCartImage} alt="Empty Cart" className="w-[160px] h-[160px] object-cover mx-auto"/>
        <p className="text-sm text-center">Giỏ hàng của bạn đang trống</p>
      </div>
    );
  }

  return (
    <>
    <p>Giỏ hàng hiện tại (Số lượng: {cart.length} )</p>
      {cart.map((product: Product, index: number) => (
        <li key={index} className="flex max-w-[520px] items-center justify-between gap-4">
          <div className="flex justify-start items-center gap-6">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-[60px] h-[60px] object-cover rounded-[4px]"
            />
            <div className="flex flex-col gap-2">
              <p className="text-sm">{product.name}</p>
              <p className="text-sm">
                {product.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-x-2">
            <div className="flex">
              <Button variant={"outline"} size={"icon"} onClick={() => handleMinus(product)} className="bg-black text-white">
                <Minus size={16} />
              </Button>
              <Input
                type="number"
                value={product.quantity}
                readOnly
                className="w-[60px] text-center"
              />
              <Button variant={"outline"} size={"icon"} onClick={() => handlePlus(product)} className="bg-black text-white">
                <Plus size={16} />
              </Button>
            </div>
          </div>
        </li>
      ))}
      <Button>
        <Link href="/user/cart">
          Xem giỏ hàng
        </Link>
      </Button>
    </>
  );
};

const UserHeader: React.FC = () => {
  const [openPopup, setOpenPopup] = useState<number | null>(null);
  const router = useRouter();

  const totalItems = useCartStore((state) => state.totalItems);

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
          <h3 className="uppercase font-bold text-[16px]">Cửa hàng sữa</h3>
        </section>
        <nav>
          <ul className="flex gap-[60px] items-center">
            {generalNav.map((nav, index) => (
              <li key={index}>
                <Link href={nav.path}>
                  <TransitionLink
                    href={nav.path}
                    className="bg-white rounded-[4px] text-black hover:bg-pink-400 hover:text-white transition-all ease-in-out duration-500"
                  >
                    {nav.name}
                  </TransitionLink>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav>
          {Cookies.get("token") != null && Cookies.get("token")?.match("") ? (
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
                                <Link
                                  href={item.path}
                                  title={item.name}
                                  onClick={() => {
                                    if (item.name === "Đăng xuất") {
                                      Cookies.remove("token");
                                      router.push("/");
                                    }
                                  }}
                                >
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
          ) : (
            <ul className="flex gap-x-4 w-full">
              <li>
                <TransitionLink
                  href="/login"
                  className="bg-white rounded-[4px] text-black hover:bg-pink-400 hover:text-white transition-all ease-in-out duration-500"
                >
                  Đăng nhập
                </TransitionLink>
              </li>
              <li>
                <TransitionLink
                  href="/signup"
                  className="bg-white rounded-[4px] text-black hover:bg-pink-400 hover:text-white transition-all ease-in-out duration-500"
                >
                  Đăng ký
                </TransitionLink>
              </li>
            </ul>
          )}
        </nav>
      </section>
      <SearchInput />
    </header>
  );
};

export default UserHeader;
