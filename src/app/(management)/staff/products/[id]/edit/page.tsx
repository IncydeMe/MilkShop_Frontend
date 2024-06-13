"use client";
import React, { useEffect } from 'react'
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
import { ChevronLeft, Paperclip } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import { type Product } from '@/types/product';
import { useSingleProduct, updateProduct } from '@/hooks/product/useProduct';
import { useRouter } from 'next/navigation';

const formSchema = zod.object({
  //Object for form validation
  productName: zod.string().min(1, { message: "Tên sản phẩm không được để trống" }).max(255, { message: "Tên sản phẩm không được quá 255 ký tự" }),
  productPrice: zod.string().min(0, { message: "Giá sản phẩm không được nhỏ hơn 0" }),
  productCategoryId: zod.number().min(1, { message: "Danh mục sản phẩm không được để trống" }),
  productDescription: zod.string().min(1, { message: "Mô tả sản phẩm không được để trống" }),
  productImageSrc: zod.string().min(1, { message: "Hình ảnh sản phẩm không được để trống" }),
  productQuantity: zod.string().min(0, { message: "Số lượng sản phẩm trong kho không được nhỏ hơn 0" }),
})

function UpdateProductPage({params} : {params: {id: number}}) {
  const { categories } = useProductCategory();
  const { product, loading, error } = useSingleProduct(params.id);

  const router = useRouter();
  
  // Update form values when product data is loaded
  useEffect(() => {
    if (product) {
      form.reset({
        productName: product.name,
        productPrice: product.price.toString(),
        productCategoryId: product.productCategoryId,
        productDescription: product.description,
        productImageSrc: product.imageUrl,
        productQuantity: product.quantity.toString()
      });
    }
  }, [product]);

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: product?.name || '',
      productPrice: product?.price.toString() || '100000',
      productCategoryId: product?.productCategoryId || 1 ,
      productDescription: product?.description || '',
      productImageSrc: product?.imageUrl || '',
      productQuantity: product?.quantity.toString() || '0'
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
      updateProduct(newProduct);
      toast.success("Cập nhật sản phẩm thành công");
    }
    catch(error){
      toast.error("Cập nhật sản phẩm thất bại");
    }
  }

  return (
    <div>
      <div className='flex gap-x-4 items-center'>
        <ChevronLeft size={36} onClick={() => router.back()} className='cursor-pointer'/>
        <h1 className='text-[36px] font-bold'>Cập nhật sản phẩm</h1>
      </div>
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
                              <SelectItem key={category.productCategoryId} value={category.categoryName} className='bg-white focus:bg-gray-400'>
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
              Cập nhật sản phẩm
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default UpdateProductPage
