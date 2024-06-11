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

import { useCart } from "@/hooks/cart/useCart";
import { Button } from "@/components/ui/button";

const numberCounter = (n: number) => {
    //This component will have a number input the middle
    //and two buttons on the side to increase or decrease the number
    const [number, setNumber] = React.useState(n);

    return (
        <div className='flex items-center'>
            <button className='px-2 py-1 bg-gray-200' onClick={() => number <= 1? number : setNumber(number -1)}>-</button>
            <input type='number' title="counter" value={number} readOnly className='w-12 text-center'/>
            <button className='px-2 py-1 bg-gray-200' onClick={() => setNumber(number + 1)}>+</button>
        </div>
    )
}

function UserCartPage() {
    const { cart } = useCart();

    return ( 
        <main className="flex flex-col px-10 py-4">
            <h1 className="text-[36px] font-bold uppercase">Giỏ hàng của người dùng</h1>
            <hr className="my-4 border-black border-t-[2px]"/>

            {/* Cart Items */}
            <Table className="border-[1px] border-black">
                <TableHeader>
                    <TableRow className="border-[1px] border-gray-800">
                        <TableHead className="w-[100px]">STT</TableHead>
                        <TableHead className="w-[480px]">Tên sản phẩm</TableHead>
                        <TableHead>Hình ảnh</TableHead>
                        <TableHead>Số lượng</TableHead>
                        <TableHead className="text-right">Giá</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="border-[1px] border-gray-800">
                        <TableCell className="font-medium">1</TableCell>
                        <TableCell>Sample Product</TableCell>
                        <TableCell>
                            <img src="https://via.placeholder.com/150" alt="Sample Product" className="w-[100px] h-[100px] object-cover"/>
                        </TableCell>
                        <TableCell>
                            {numberCounter(1)}
                        </TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                    <TableRow className="border-[1px] border-gray-800">
                        <TableCell className="font-medium">2</TableCell>
                        <TableCell>Sample Product</TableCell>
                        <TableCell>
                            <img src="https://via.placeholder.com/150" alt="Sample Product" className="w-[100px] h-[100px] object-cover"/>
                        </TableCell>
                        <TableCell>
                            {numberCounter(1)}
                        </TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            {/* Cart Summary */}
            <div className="mt-4 text-right">
                <h2 className="text-[24px] font-bold">Tổng cộng: $500.00</h2>
            </div>

            {/* Checkout Button */}
            <div className="mt-4 text-right flex justify-end items-center gap-6">
                <Button variant={'outline'} className="px-4 py-2 border-purple-500 hover:bg-purple-600 transition-all ease-in-out duration-500 text-purple-500 hover:text-white rounded-[4px]">Tiếp tục mua sắm</Button>
                <Button className="px-4 py-2 bg-pink-500 hover:bg-pink-600 transition-all ease-in-out duration-500 text-white rounded-[4px]">Thanh toán</Button>
            </div>
        </main>
     );
}

export default UserCartPage;