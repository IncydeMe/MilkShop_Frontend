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
import { Eye } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

function UserOrderHistoryPage() {
    const [eye, setEye] = React.useState(false);

    const handleEye = () => {
        setEye(!eye);
    }

    const orderStatusBadge = (status: string) => {
        return (
            <>
                {
                    status === 'Đã giao' ? <Badge className="bg-green-400 hover:bg-green-500">{status}</Badge> : ''
                }
                {
                    status === 'Đang giao' ? <Badge className="bg-yellow-400 hover:bg-yellow-500">{status}</Badge> : ''
                }
                {
                    status === 'Đã hủy' ? <Badge className="bg-red-400 hover:bg-red-500">{status}</Badge> : ''
                }
            </>
        )
    }

    return ( 
        <main className="flex flex-col px-10 py-4">
            <h1 className="text-[36px] font-bold">Lịch sử mua hàng</h1>

            {/* Order History */}
            <Table className="border-[1px] border-black">
                <TableHeader>
                    <TableRow className="border-[1px] border-gray-800">
                        <TableHead className="w-[100px]">STT</TableHead>
                        <TableHead className="w-[480px]">Ngày đặt hàng</TableHead>
                        <TableHead>Tổng tiền</TableHead>
                        <TableHead>Thể trạng</TableHead>
                        <TableHead>Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="border-[1px] border-gray-800">
                        <TableCell className="font-medium">1</TableCell>
                        <TableCell>12/09/2023</TableCell>
                        <TableCell>
                            $250.00
                        </TableCell>
                        <TableCell>
                            {orderStatusBadge('Đang giao')}
                        </TableCell>
                        <TableCell>
                            <Button
                                onMouseEnter={handleEye}
                                onMouseLeave={handleEye} 
                                variant={'ghost'} 
                                className="px-4 py-2 hover:underline">
                                <Link href={'/user/orders/' + 1}>
                                    <span className="flex items-center gap-4">
                                        {
                                            eye ? <Eye size={24} color='blue'/> : ''
                                        }
                                        <p>Xem chi tiết</p>
                                    </span>
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow className="border-[1px] border-gray-800">
                        <TableCell className="font-medium">2</TableCell>
                        <TableCell>12/09/2023</TableCell>
                        <TableCell>
                            $250.00
                        </TableCell>
                        <TableCell>
                            {orderStatusBadge('Đã giao')}
                        </TableCell>
                        <TableCell>
                            <Button
                                onMouseEnter={handleEye}
                                onMouseLeave={handleEye} 
                                variant={'ghost'} 
                                className="px-4 py-2 hover:underline">
                                <Link href={'/user/orders/' + 2}>
                                    <span className="flex items-center gap-4">
                                        {
                                            eye ? <Eye size={24} color='blue'/> : ''
                                        }
                                        <p>Xem chi tiết</p>
                                    </span>
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow className="border-[1px] border-gray-800">
                        <TableCell className="font-medium">3</TableCell>
                        <TableCell>12/09/2023</TableCell>
                        <TableCell>
                            $250.00
                        </TableCell>
                        <TableCell>
                            {orderStatusBadge('Đã hủy')}
                        </TableCell>
                        <TableCell>
                            <Button
                                onMouseEnter={handleEye}
                                onMouseLeave={handleEye} 
                                variant={'ghost'} 
                                className="px-4 py-2 hover:underline">
                                <Link href={'/user/orders/' + 3}>
                                    <span className="flex items-center gap-4">
                                        {
                                            eye ? <Eye size={24} color='blue'/> : ''
                                        }
                                        <p>Xem chi tiết</p>
                                    </span>
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow className="border-[1px] border-gray-800">
                        <TableCell className="font-medium">4</TableCell>
                        <TableCell>12/09/2023</TableCell>
                        <TableCell>
                            $250.00
                        </TableCell>
                        <TableCell>
                            {orderStatusBadge('Đã hủy')}
                        </TableCell>
                        <TableCell>
                            <Button
                                onMouseEnter={handleEye}
                                onMouseLeave={handleEye} 
                                variant={'ghost'} 
                                className="px-4 py-2 hover:underline">
                                <Link href={'/user/orders/' + 4}>
                                    <span className="flex items-center gap-4">
                                        {
                                            eye ? <Eye size={24} color='blue'/> : ''
                                        }
                                        <p>Xem chi tiết</p>
                                    </span>
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow className="border-[1px] border-gray-800">
                        <TableCell className="font-medium">5</TableCell>
                        <TableCell>12/09/2023</TableCell>
                        <TableCell>
                            $250.00
                        </TableCell>
                        <TableCell>
                            {orderStatusBadge('Đang giao')}
                        </TableCell>
                        <TableCell>
                            <Button
                                onMouseEnter={handleEye}
                                onMouseLeave={handleEye} 
                                variant={'ghost'} 
                                className="px-4 py-2 hover:underline">
                                <Link href={'/user/orders/' + 5}>
                                    <span className="flex items-center gap-4">
                                        {
                                            eye ? <Eye size={24} color='blue'/> : ''
                                        }
                                        <p>Xem chi tiết</p>
                                    </span>
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow className="border-[1px] border-gray-800">
                        <TableCell className="font-medium">6</TableCell>
                        <TableCell>12/09/2023</TableCell>
                        <TableCell>
                            $250.00
                        </TableCell>
                        <TableCell>
                            {orderStatusBadge('Đã hủy')}
                        </TableCell>
                        <TableCell>
                            <Button
                                onMouseEnter={handleEye}
                                onMouseLeave={handleEye} 
                                variant={'ghost'} 
                                className="px-4 py-2 hover:underline">
                                <Link href={'/user/orders/' + 6}>
                                    <span className="flex items-center gap-4">
                                        {
                                            eye ? <Eye size={24} color='blue'/> : ''
                                        }
                                        <p>Xem chi tiết</p>
                                    </span>
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </main>
     );
}

export default UserOrderHistoryPage;