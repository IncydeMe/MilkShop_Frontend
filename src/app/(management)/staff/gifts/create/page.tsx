"use client";

import React from 'react'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Toaster, toast } from 'sonner';

//for form
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, Minus, Paperclip, Plus } from 'lucide-react';
import { type Product } from '@/types/product';
import { Shell } from '@/components/file-upload/shell';
import { BasicUploaderDemo } from '@/app/_components/uploader';
import { useRouter } from 'next/navigation';
import { ReactHookFormDemo } from '@/app/_components/react-hook-form';

import { createGift } from '@/hooks/gift/useGift';
import { Gift } from '@/types/gift';

const formSchema = zod.object({
    name: zod.string().min(3, {message: "Tên món quà không được nhỏ hơn 3 ký tự"}).max(50, {message: "Tên món quà không được vượt quá 50 ký tự"}),
    description: zod.string().min(3, {message: "Tên món quà không được nhỏ hơn 3 ký tự"}).max(250, {message: "Tên món quà không được vượt quá 250 ký tự"}),
    price: zod.string().min(1, {message: "Giá điểm quy đổi không được nhỏ hơn 1"}),
    quantity: zod.string().min(1, {message: "Số lượng phần quà không được nhỏ hơn 1"}),
    image: zod.instanceof(File).optional(),
});

function CreateGiftPage() {
    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "0",
            image: undefined,
            quantity: "1",
        }
    });

    const handleSubmit = () => {

        const {
            name,
            description,
            price,
            quantity,
        } = form.getValues();

        const newGift: Gift = {
            name: name,
            description: description,
            point: Number(price),
            imageUrl: sessionStorage.getItem('uploadedFileURL') || "",
            quantity: Number(quantity),
        }

        try {
            createGift(newGift);
            toast.success("Tạo món quà thành công");
            sessionStorage.removeItem('uploadedFileURL');
            router.push("/management/staff/gifts");
        } catch (error) {
            toast.error("Tạo món quà thất bại");
            router.refresh();
        }
    }
    const router = useRouter();

    return (
        <div>
            <span className='flex items-center gap-4'>
                <ChevronLeft size={36} onClick={() => router.back()} className='cursor-pointer'/>
                <h1 className='text-[36px] font-bold'>Thêm phần quà mới</h1>
            </span>
            <Toaster position='top-center'/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full flex gap-6'>
                    <div className='flex w-[420px] flex-col gap-6'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel className='text-[16px] font-semibold'>Tên phần quà</FormLabel>
                                <FormControl>
                                    <Input
                                    placeholder='Tên phần quà'
                                    type='text'
                                    className='rounded-[4px]'
                                    {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        ) 
                        }}
                    />
                    <FormField
                        control={form.control}
                        name='price'
                        render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel className='text-[16px] font-semibold'>Giá điểm quy đổi</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Giá điểm cần để quy đổi'
                                        type='number'
                                        className='rounded-[4px]'
                                    {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        ) 
                        }}
                    />
                    <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel className='text-[16px] font-semibold'>Mô tả phần quà</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder='Mô tả'
                                        className='rounded-[4px]'
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        ) 
                        }}
                    />
                    <FormField
                        control={form.control}
                        name='quantity'
                        render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel className='text-[16px] font-semibold'>Số lượng phần quà</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Số lượng phần quà'
                                        type='number'
                                        className='rounded-[4px]'
                                    {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        ) 
                        }}
                    />
                    <Button
                        variant={'default'}
                        type='submit'
                        className='bg-pink-500 hover:bg-pink-600 text-white rounded-[4px] flex gap-4 items-center w-full'
                    >
                        Thêm sản phẩm
                    </Button>
                    </div>
                    <div className='flex flex-col gap-6'>
                    <FormField
                        control={form.control}
                        name='image'
                        render={({ field }) => {
                            return (
                            <FormItem>
                                <FormLabel className='text-[16px] font-semibold'>Hình ảnh phần quà</FormLabel>
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

export default CreateGiftPage
