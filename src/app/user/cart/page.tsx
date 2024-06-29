"use client";

import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "@/components/ui/button";

import { useCartStore } from "@/hooks/cart/useCartStore";
import { Product } from "@/types/product";
import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";

import Image from "next/image";
import EmptyCartImage from "../../../../public/Empty.png";
import TransitionLink from "@/components/transition-link";

function UserCartPage() {
    const cart = useCartStore((state) => state.cart);

    const router = useRouter();

    const handlePlus = (product: Product) => {
        useCartStore.getState().addToCart(product);
    };

    const handleMinus = (product: Product) => {
        useCartStore.getState().decreaseQuantity(product.productId);
    };

    const handleTotalPrice = () => {
        let total = 0;
        cart.forEach((product) => {
            total += product.price * product.quantity;
        });
        return total;
    };

    if(cart.length === 0) {
        return(
            <section className="flex flex-col items-center justify-center">
                <Image src={EmptyCartImage} alt="Empty cart" className="w-[300px] h-[300px] object-cover"/>
                <h1 className="text-[36px] font-bold uppercase mt-4">Chưa có sản phẩm nào trong giỏ hàng</h1>
                <p className="text-[18px] text-center mt-4">Hãy chọn sản phẩm để thêm vào giỏ hàng</p>
                <Button 
                    className="px-4 py-2 bg-pink-500 hover:bg-pink-600 transition-all ease-in-out duration-500 text-white rounded-[4px] mt-4"
                    onClick={() => router.back()}
                    >
                    Tiếp tục mua sắm
                </Button>
            </section>
        )
    }

    return ( 
        <section className="flex flex-col px-10 py-4">
            <h1 className="text-[36px] font-bold uppercase">Giỏ hàng của bạn</h1>

            {/* Cart Items */}
            <Table className="border-[1px] border-black mt-4">
                <TableHeader>
                    <TableRow className="border-[1px] border-gray-800">
                        <TableHead className="w-[100px] text-[18px] text-left font-bold">STT</TableHead>
                        <TableHead className="w-[480px] text-[18px] font-bold">Tên sản phẩm</TableHead>
                        <TableHead className="text-[18px] font-bold">Hình ảnh</TableHead>
                        <TableHead className="text-[18px] font-bold">Số lượng</TableHead>
                        <TableHead className="text-[18px] text-center font-bold">Đơn giá</TableHead>
                        <TableHead className="text-[18px] w-[160px] text-right font-bold">Thành giá</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cart.map((product, index) => (
                        <TableRow key={index} className="border-[1px] border-gray-800">
                            <TableCell className="text-[18px] text-left">{index + 1}</TableCell>
                            <TableCell className="text-[18px]">{product.name}</TableCell>
                            <TableCell>
                                <img src={product.imageUrl} alt={product.name} className="w-[100px] h-[100px] object-cover"/>
                            </TableCell>
                            <TableCell>
                            <div className="flex justify-between gap-x-2">
                                <div className="flex">
                                    <Button variant={"outline"} size={"icon"} onClick={() => handleMinus(product)} className="bg-black text-white">
                                        <Minus size={16} />
                                    </Button>
                                    <Input
                                        type="number"
                                        value={product.quantity}
                                        readOnly
                                        className="w-[60px] text-center text-[18px]"
                                    />
                                    <Button variant={"outline"} size={"icon"} onClick={() => handlePlus(product)} className="bg-black text-white">
                                        <Plus size={16} />
                                    </Button>
                                </div>
                            </div>
                            </TableCell>
                            <TableCell className="text-center text-[18px] font-medium">
                            {product.price.toLocaleString(
                                "vi-VN",
                                {
                                    style: "currency",
                                    currency: "VND",
                                }
                            )}</TableCell>
                            <TableCell className="text-right text-[18px] font-medium">
                            {(product.price * product.quantity).toLocaleString(
                                "vi-VN",
                                {
                                    style: "currency",
                                    currency: "VND",
                                }
                            )}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Cart Summary */}
            <div className="mt-4 text-right">
                <span className="flex items-center justify-end gap-8">
                    <h2 className="text-[20px] font-semibold">Tổng cộng: </h2>
                    <p className="text-[24px] font-extrabold"> {handleTotalPrice().toLocaleString(
                        "vi-VN",
                        {
                            style: "currency",
                            currency: "VND",
                        }
                    )} </p>
                </span>
            </div>

            {/* Checkout Button */}
            <div className="mt-4 text-right flex justify-end items-center gap-6">
                <TransitionLink 
                    variant={'outline'} 
                    className="px-4 py-2 border-purple-500 hover:bg-purple-600 transition-all ease-in-out duration-500 text-purple-500 hover:text-white rounded-[4px]"
                    href="/products"
                    >
                    Tiếp tục mua sắm
                </TransitionLink>
                <TransitionLink 
                    className="px-4 py-2 bg-pink-500 hover:bg-pink-600 transition-all ease-in-out duration-500 text-white rounded-[4px]"
                    href='/user/checkout'
                >
                    Thanh toán
                </TransitionLink>
            </div>
        </section>
     );
}

export default UserCartPage;