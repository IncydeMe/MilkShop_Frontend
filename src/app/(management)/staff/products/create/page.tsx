"use client";
import React from 'react'
import { createProduct, useProduct } from '@/hooks/product/useProduct';
import { useProductCategory } from '@/hooks/product/useProductCategory';
import { Button, buttonVariants } from '@/components/ui/button';
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
import {
  FileUploader,
  FileInput,
  FileUploaderContent,
  FileUploaderItem
} from "@/components/custom-file-input"
import { Toaster, toast } from 'sonner';
import { cn } from "@/lib/utils";

//for form
import { FormProvider, useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DropzoneOptions } from 'react-dropzone';
import { Paperclip } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import { type Product } from '@/types/product';

const formSchema = zod.object({
  //Object for form validation
  productName: zod.string().min(1, { message: "Tên sản phẩm không được để trống" }).max(255, { message: "Tên sản phẩm không được quá 255 ký tự" }),
  productPrice: zod.string().min(0, { message: "Giá sản phẩm không được nhỏ hơn 0" }),
  productCategoryId: zod.number().min(1, { message: "Danh mục sản phẩm không được để trống" }),
  productDescription: zod.string().min(1, { message: "Mô tả sản phẩm không được để trống" }),
  productImageSrc: zod.string().min(1, { message: "Hình ảnh sản phẩm không được để trống" }),
  productQuantity: zod.string().min(0, { message: "Số lượng sản phẩm trong kho không được nhỏ hơn 0" }),
})

function CreateProductPage() {
  const { categories } = useProductCategory();
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      productPrice: '100000',
      productCategoryId: 1,
      productDescription: '',
      productImageSrc: '',
      productQuantity: '0'
    }
  });


  const handleSubmit = () => {
    
    const { 
      productName, 
      productPrice, 
      productCategoryId, 
      productDescription, 
      productImageSrc, 
      productQuantity 
    } = form.getValues();

    const newProduct: Product = {
      name: productName,
      price: Number(productPrice),
      productCategoryId: productCategoryId,
      description: productDescription,
      imageUrl: productImageSrc,
      quantity: Number(productQuantity)
    }

    try{
      createProduct(newProduct);
      toast.success("Thêm sản phẩm thành công");
    }
    catch(error){
      toast.error("Thêm sản phẩm thất bại");
    }
  }

  return (
    <div>
      <h1 className='text-[36px] font-bold'>Thêm sản phẩm mới</h1>
      <Toaster position='top-center'/>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full grid grid-cols-2 gap-6'>
          <div className='flex flex-col gap-6'>
            <FormField
              control={form.control}
              name='productName'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-[20px] font-medium'>Tên sản phẩm</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Tên sản phẩm'
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
              name='productPrice'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-[20px] font-medium'>Giá sản phẩm</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Giá sản phẩm'
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
              name='productCategoryId'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-[20px] font-medium'>Danh mục sản phẩm</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn danh mục sản phẩm" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {categories.map((category) => (
                              <SelectItem key={category.categoryId} value={category.categoryName} className='bg-white focus:bg-gray-400'>
                                {category.categoryName}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </div>
          <div className='flex flex-col gap-6 w-full'>
            <FormField
              control={form.control}
              name='productDescription'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-[20px] font-medium'>Mô tả sản phẩm</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Mô tả sản phẩm'
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
              name='productQuantity'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-[20px] font-medium'>Số lượng sản phẩm trong kho</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Số lượng sản phẩm trong kho'
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
              name='productImageSrc'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-[20px] font-medium'>Số lượng sản phẩm trong kho</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Hình ảnh sản phẩm'
                        type='file'
                        className='rounded-[4px]'
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </div>
          <div className='grid grid-cols-subgrid col-start-1 col-end-3'>
            <Button
              variant={'default'}
              type='submit'
              className='bg-pink-500 hover:bg-pink-600 text-white rounded-[4px] flex gap-4 items-center w-full'
            >
              Thêm sản phẩm
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CreateProductPage
