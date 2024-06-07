import React from "react";
import Image from "next/image";

import SampleAvatarImage from '../../../../public/SampleImageAvatar.jpg';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Gift, TicketPercent } from "lucide-react";
import Link from "next/link";

function UserProfilePage() {
    const testValue = 9000000;

    return ( 
        <section className="px-10 py-4 flex flex-col gap-6">
            <h1 className="uppercase text-[28px] font-semibold underline underline-offset-4">Thông tin người dùng</h1>
            <section className="flex justify-start gap-4">
                <div className="w-[360px] h-[360px]">
                    <Image src={SampleAvatarImage} alt="Nguyễn Lê Nhật Trường" className="w-[360px] h-[360px] object-cover rounded-full p-4"/>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-[32px] font-semibold uppercase">Nguyễn Lê Nhật Trường</h2>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="flex flex-col gap-4 mr-4">
                            <span className="flex justify-between text-[16px] font-regular"><h3 className="underline underline-offset-2">Email:</h3>
                                <span className="text-black font-semibold ml-4 text-right">
                                    test@gmail.com
                                </span>
                            </span>
                            <span className="flex justify-between text-[16px] font-regular"><h3 className="underline underline-offset-2">Số điện thoại:</h3>
                                <span className="text-black font-semibold ml-4 text-right">
                                    0123456789
                                </span>
                            </span>
                            <span className="flex justify-between text-[16px] font-regular"><h3 className="underline underline-offset-2 w-full">Địa chỉ:</h3>
                                <span className="text-black font-semibold w-full ml-4 text-right">
                                    123 Đường ABC, Phường XYZ, Quận 1, TP.HCM
                                </span>
                            </span>
                            <span className="flex justify-between text-[16px] font-regular"><h3 className="underline underline-offset-2">Ngày sinh:</h3>
                                <span className="text-black font-semibold ml-4 text-right">
                                    01/01/2000
                                </span>
                            </span>
                            <span className="flex justify-between text-[16px] font-regular"><h3 className="underline underline-offset-2">Giới tính:</h3>
                                <span className="text-black font-semibold ml-4 text-right">
                                    Nam
                                </span>
                            </span>
                        </div>
                        <div className="flex flex-col gap-10">
                            <span className="flex justify-between text-[24px] font-semibold">
                                <h3 className="underline underline-offset-2">Số đơn hàng đã mua:</h3> <span className="ml-4">10</span></span>
                            <span className="flex justify-between text-[24px] font-semibold">
                                <h3 className="underline underline-offset-2">Tổng tiền đã mua: </h3>
                                <span className="ml-4 ">{testValue.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}</span>
                            </span>
                            <span className="flex justify-between text-[24px] font-semibold">
                                <h3 className="underline underline-offset-2">Số điểm thành viên: </h3>
                                <span className="ml-4 ">1.000.000 pts</span>
                            </span>
                            <div className="flex justify-end">
                                <Button className="bg-blue-500 text-white rounded-[4px] py-2 hover:bg-blue-600 transition-all ease-in-out duration-500">Chỉnh sửa thông tin</Button>
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
                        <h3 className="text-[24px] font-semibold">Phiếu giảm giá (5)</h3>
                    </span>
                    <Link href={'/user/special/vouchers'} className="text-gray-400 hover:text-black transition-all ease-in-out duration-500">
                        <span className="flex items-center gap-4">
                            <p className="hover:underline hover:underline-offset-2">Xem thêm phiếu giảm giá hiện có</p>
                            <ChevronRight size={24}/>
                        </span>
                    </Link>
                </div>
                <div className="grid grid-cols-5 justify-items-center mt-4 gap-4">
                    <div className="flex flex-col relative gap-4 w-fit">
                        <Badge className="absolute top-1 right-1 bg-red-500 text-white hover:bg-red-600">Mới</Badge>
                        <Image src={SampleAvatarImage} alt="Voucher" className="w-[180px] h-[180px] object-cover rounded-[4px]"/>
                        <p className="text-center">Giảm giá 40%</p>
                    </div>
                    <div className="flex flex-col relative gap-4 w-fit">
                        <Badge className="absolute top-1 right-1 bg-blue-500 text-white hover:bg-blue-600">Sử dụng được</Badge>
                        <Image src={SampleAvatarImage} alt="Voucher" className="w-[180px] h-[180px] object-cover rounded-[4px]"/>
                        <p className="text-center">Mua 1 tặng 2</p>
                    </div>
                    <div className="flex flex-col relative gap-4 w-fit">
                        <Badge className="absolute top-1 right-1 bg-red-500 text-white hover:bg-red-600">New</Badge>
                        <Image src={SampleAvatarImage} alt="Voucher" className="w-[180px] h-[180px] object-cover rounded-[4px]"/>
                        <p className="text-center">Giảm giá 20%</p>
                    </div>
                    <div className="flex flex-col relative gap-4 w-fit">
                        <Badge className="absolute top-1 right-1 bg-red-500 text-white hover:bg-red-600">New</Badge>
                        <Image src={SampleAvatarImage} alt="Voucher" className="w-[180px] h-[180px] object-cover rounded-[4px]"/>
                        <p className="text-center">Giảm giá 40%</p>
                    </div>
                    <div className="flex flex-col relative gap-4 w-fit">
                        <Badge className="absolute top-1 right-1 bg-gray-500 text-white hover:bg-gray-600">Sắp hết hạn</Badge>
                        <Image src={SampleAvatarImage} alt="Voucher" className="w-[180px] h-[180px] object-cover rounded-[4px]"/>
                        <p className="text-center">Giảm giá 10% Cộng dần</p>
                    </div>
                </div>
                <div className="flex justify-between items-center my-4">
                    <span className="flex gap-4 my-4 items-center">
                        <Gift size={36}/>
                        <h3 className="text-[24px] font-semibold">Phần quà hiện có (5)</h3>
                    </span>
                    <Link href={'/user/special/gifts'} className="text-gray-400 hover:text-black transition-all ease-in-out duration-500">
                        <span className="flex items-center gap-4">
                            <p className="hover:underline hover:underline-offset-2">Xem thêm phần quà hiện có</p>
                            <ChevronRight size={24}/>
                        </span>
                    </Link>
                </div>
                <div className="grid grid-cols-5 justify-items-center mt-4 gap-4">
                    <div className="flex flex-col relative gap-4 w-fit">
                        <Badge className="absolute top-1 right-1 bg-red-500 text-white hover:bg-red-600">Mới</Badge>
                        <Image src={SampleAvatarImage} alt="Voucher" className="w-[180px] h-[180px] object-cover rounded-[4px]"/>
                        <p className="text-center">Giảm giá 40%</p>
                    </div>
                    <div className="flex flex-col relative gap-4 w-fit">
                        <Badge className="absolute top-1 right-1 bg-blue-500 text-white hover:bg-blue-600">Sử dụng được</Badge>
                        <Image src={SampleAvatarImage} alt="Voucher" className="w-[180px] h-[180px] object-cover rounded-[4px]"/>
                        <p className="text-center">Mua 1 tặng 2</p>
                    </div>
                    <div className="flex flex-col relative gap-4 w-fit">
                        <Badge className="absolute top-1 right-1 bg-red-500 text-white hover:bg-red-600">New</Badge>
                        <Image src={SampleAvatarImage} alt="Voucher" className="w-[180px] h-[180px] object-cover rounded-[4px]"/>
                        <p className="text-center">Giảm giá 20%</p>
                    </div>
                    <div className="flex flex-col relative gap-4 w-fit">
                        <Badge className="absolute top-1 right-1 bg-red-500 text-white hover:bg-red-600">New</Badge>
                        <Image src={SampleAvatarImage} alt="Voucher" className="w-[180px] h-[180px] object-cover rounded-[4px]"/>
                        <p className="text-center">Giảm giá 40%</p>
                    </div>
                    <div className="flex flex-col relative gap-4 w-fit">
                        <Badge className="absolute top-1 right-1 bg-gray-500 text-white hover:bg-gray-600">Sắp hết hạn</Badge>
                        <Image src={SampleAvatarImage} alt="Voucher" className="w-[180px] h-[180px] object-cover rounded-[4px]"/>
                        <p className="text-center">Giảm giá 10% Cộng dần</p>
                    </div>
                </div>
            </section>
        </section>
     );
}

export default UserProfilePage;