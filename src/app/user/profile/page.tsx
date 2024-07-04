"use client";

import React, { useEffect } from "react";
import Image from "next/image";

import SampleAvatarImage from '../../../../public/SampleImageAvatar.jpg';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Gift, TicketPercent } from "lucide-react";
import Link from "next/link";
import { useSingleAccountByEmail } from "@/hooks/account/useAccount";
import UserAvatar from "@/components/shared/user/user-avatar";

import Cookies from "js-cookie";

function UserProfilePage() {
    let user = JSON.parse(sessionStorage.getItem('user') || '{}');

    useEffect(() => {
        if (!user) {
            window.location.href = '/login';
        }
    }, []);
    
    const { account, loading, error } = useSingleAccountByEmail(user.email);

    const dateOfBirth = new Date(account?.dateOfBirth || '');

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error.message}</p>
    }

    return ( 
        <section className="px-10 py-4 flex flex-col gap-6">
            <h1 className="uppercase text-[28px] font-semibold underline underline-offset-4">Thông tin người dùng</h1>
            <section className="flex justify-start gap-4">
                <div className="w-[360px] h-[360px]">
                    <UserAvatar accountId={account?.accountId || 0} className="w-[200px] h-[200px] text-[42px]"/>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-[32px] font-semibold uppercase">{account?.fullName}</h2>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="flex flex-col gap-4 mr-4">
                            <span className="flex justify-between text-[16px] font-regular"><h3 className="underline underline-offset-2">Email:</h3>
                                <span className="text-black font-semibold ml-4 text-right">
                                    {account?.email}
                                </span>
                            </span>
                            <span className="flex justify-between text-[16px] font-regular"><h3 className="underline underline-offset-2">Số điện thoại:</h3>
                                <span className="text-black font-semibold ml-4 text-right">
                                    {account?.phone || 'Chưa cập nhật'}
                                </span>
                            </span>
                            <span className="flex justify-between text-[16px] font-regular"><h3 className="underline underline-offset-2 w-full">Địa chỉ:</h3>
                                <span className="text-black font-semibold w-full ml-4 text-right">
                                    {account?.address || 'Chưa cập nhật'}
                                </span>
                            </span>
                            {/* <span className="flex justify-between text-[16px] font-regular"><h3 className="underline underline-offset-2">Ngày sinh:</h3>
                                <span className="text-black font-semibold ml-4 text-right">
                                    {dateOfBirth.toString() || 'Chưa cập nhật'}
                                </span>
                            </span> */}
                            {/* <span className="flex justify-between text-[16px] font-regular"><h3 className="underline underline-offset-2">Giới tính:</h3>
                                <span className="text-black font-semibold ml-4 text-right">
                                    Nam
                                </span>
                            </span> */}
                        </div>
                        <div className="flex flex-col gap-10">
                            <span className="flex justify-between text-[24px] font-semibold">
                                <h3 className="underline underline-offset-2">Số đơn hàng đã mua:</h3> <span className="ml-4">10</span></span>
                            <span className="flex justify-between text-[24px] font-semibold">
                                <h3 className="underline underline-offset-2">Tổng tiền đã mua: </h3>
                                <span className="ml-4 ">{}</span>
                            </span>
                            <span className="flex justify-between text-[24px] font-semibold">
                                <h3 className="underline underline-offset-2">Số điểm thành viên: </h3>
                                <span className="ml-4 ">{account?.point} điểm</span>
                            </span>
                            <div className="flex justify-end gap-4">
                                <Button className="bg-blue-500 text-white rounded-[4px] py-2 hover:bg-blue-600 transition-all ease-in-out duration-500">Chỉnh sửa thông tin</Button>
                                <Button className="bg-pink-500 text-white rounded-[4px] py-2 hover:bg-pink-600 transition-all ease-in-out duration-500">Đổi mật khẩu</Button>
                                <Button
                                    onClick={() => {
                                        sessionStorage.removeItem('user');
                                        Cookies.remove('token');
                                        window.location.href = '/';
                                    }}
                                    className="bg-red-500 text-white rounded-[4px] py-2 hover:bg-red-600 transition-all ease-in-out duration-500">
                                        Đăng xuất
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <h1 className="uppercase text-[28px] font-semibold underline underline-offset-4">Túi đồ người dùng</h1>
                {/* "Inventory for Vouchers and Gifts" */}
                <div className="flex justify-between items-center">
                    <span className="flex gap-4 my-4 items-center">
                        <TicketPercent size={36}/>
                        <h3 className="text-[24px] font-semibold">Phiếu giảm giá ({account?.vouchers?.length ?? 0})</h3>
                    </span>
                    {
                        account?.vouchers?.length > 0 && 
                        <Link href={'/user/special/vouchers'} className="text-gray-400 hover:text-black transition-all ease-in-out duration-500">
                            <span className="flex items-center gap-4">
                                <p className="hover:underline hover:underline-offset-2">Xem thêm phiếu giảm giá hiện có</p>
                                <ChevronRight size={24}/>
                            </span>
                        </Link>
                    }
                </div>
                {
                    account?.vouchers?.length > 0 ? (
                        <div className="grid grid-cols-5 justify-items-center mt-4 gap-4">
                            {account?.vouchers?.map((voucher, index) => (
                                <div key={index} className="flex flex-col relative gap-4 w-fit">
                                    <Badge className="absolute top-1 right-1 bg-red-500 text-white hover:bg-red-600">Mới</Badge>
                                    <Image src={SampleAvatarImage} alt="Voucher" className="w-[180px] h-[180px] object-cover rounded-[4px]"/>
                                    <p className="text-center">{voucher.value}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Không có phiếu giảm giá nào</p>
                    )
                }
                       
                <div className="flex justify-between items-center my-4">
                    <span className="flex gap-4 my-4 items-center">
                        <Gift size={36}/>
                        <h3 className="text-[24px] font-semibold">Phần quà hiện có ({account?.gifts?.length || 0})</h3>
                    </span>
                    {
                        account?.gifts?.length > 0 && 
                        <Link href={'/user/special/vouchers'} className="text-gray-400 hover:text-black transition-all ease-in-out duration-500">
                            <span className="flex items-center gap-4">
                                <p className="hover:underline hover:underline-offset-2">Xem thêm phiếu giảm giá hiện có</p>
                                <ChevronRight size={24}/>
                            </span>
                        </Link>
                    }
                </div>
                {
                    account?.gifts?.length > 0 ? (
                        <div className="grid grid-cols-5 justify-items-center mt-4 gap-4">
                            {account?.gifts?.map((gift, index) => (
                                <div key={index} className="flex flex-col relative gap-4 w-fit">
                                    <Badge className="absolute top-1 right-1 bg-red-500 text-white hover:bg-red-600">Mới</Badge>
                                    <Image src={SampleAvatarImage} alt="Gift" className="w-[180px] h-[180px] object-cover rounded-[4px]"/>
                                    <p className="text-center">{gift.name}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Không có phần quà nào</p>
                    )
                }
            </section>
        </section>
     );
}

export default UserProfilePage;