"use client";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

import * as zod from 'zod';

//for form
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import React from 'react'
import { useSingleAccountByEmail } from '@/hooks/account/useAccount';
import { profile } from 'console';
import { ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Shell } from '@/components/file-upload/shell';
import { BasicUploaderDemo } from '@/app/_components/uploader';

const profileSchema = zod.object({
    email: zod.string().email({ message: "Email không hợp lệ" }),
    password: zod
      .string()
      .min(6, { message: "Mật khẩu phải chứa ít nhất 6 ký tự" }),
    name: zod.string().min(2, { message: "Tên phải chứa ít nhất 2 ký tự" }),
    phone: zod.string().min(10, { message: "Số điện thoại phải chứa ít nhất 10 ký tự" }),
    address: zod.string().min(10, { message: "Địa chỉ phải chứa ít nhất 10 ký tự" }),
    profileImage: zod.instanceof(File).optional(),
});

function EditProfilePage() {
    let user = JSON.parse(sessionStorage.getItem('user') || '{}');

    const { account, loading, error } = useSingleAccountByEmail(user.email);

    // async function convertUrlToFile(url: string, filename: string, mimeType: string = "image/jpeg") {
    //     const response = await fetch(url);
    //     const blob = await response.blob();
    //     return new File([blob], filename, { type: mimeType });
    // }

    const editProfileForm = useForm<zod.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            email: account?.email,
            name: account?.fullName,
            phone: account?.phone,
            address: account?.address,
            profileImage: undefined,
        }
    });

    const router = useRouter();

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error.message}</p>
    }

    return (
        <div>
            <span className='flex items-center gap-4'>
                <ChevronLeft size={36} onClick={() => router.back()} className='cursor-pointer'/>
                <h1 className='text-[36px] font-bold'>Cập nhật hồ sơ</h1>
            </span>

            <Form {...editProfileForm}>
                <form className='grid grid-cols-2 gap-4 '>
                    <div className='flex flex-col gap-4 w-full'>
                        <FormField
                            control={editProfileForm.control}
                            name='email'
                            render={({ field }) => {
                            return (
                                <FormItem>
                                <FormLabel className='text-[16px] font-semibold'>Email</FormLabel>
                                <FormControl>
                                    <Input
                                    placeholder='Email'
                                    type='text'
                                    className='rounded-[4px]'
                                    defaultValue={account?.email}
                                    {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            ) 
                            }}
                        />
                        <FormField
                            control={editProfileForm.control}
                            name='name'
                            render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel className='text-[16px] font-semibold'>Mật khẩu</FormLabel>
                                    <FormControl>
                                        <Input
                                        placeholder='Mật khẩu'
                                        type='password'
                                        className='rounded-[4px]'
                                        defaultValue={account?.password}
                                        {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            ) 
                            }}
                        />
                        <FormField
                            control={editProfileForm.control}
                            name='phone'
                            render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel className='text-[16px] font-semibold'>Số điện thoại</FormLabel>
                                    <FormControl>
                                        <Input
                                        placeholder='Số điện thoại'
                                        type='text'
                                        className='rounded-[4px]'
                                        defaultValue={account?.phone}
                                        {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            ) 
                            }}
                        />
                        <FormField
                            control={editProfileForm.control}
                            name='address'
                            render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel className='text-[16px] font-semibold'>Địa chỉ</FormLabel>
                                    <FormControl>
                                        <Input
                                        placeholder='Địa chỉ'
                                        type='text'
                                        className='rounded-[4px]'
                                        defaultValue={account?.address}
                                        {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            ) 
                        }}
                        />
                        <div className='flex justify-start items-center gap-4'>
                            <Button type='submit' variant={'default'} className='mt-8 bg-pink-500 hover:bg-pink-600 text-white rounded-[4px]'>Cập nhật</Button>
                            <Button onClick={() => router.back()} type='button' variant={'default'} className='mt-8 bg-gray-500 hover:bg-gray-600 text-white rounded-[4px]'>
                                Hủy
                            </Button>
                        </div>
                    </div>
                    <div className='w-full'>
                        <FormField
                            control={editProfileForm.control}
                            name='profileImage'
                            render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel className='text-[16px] font-semibold'>Ảnh đại diện</FormLabel>
                                    <FormControl>
                                        <Shell>
                                            <BasicUploaderDemo />
                                        </Shell>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            ) 
                            }}
                        />
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default EditProfilePage
