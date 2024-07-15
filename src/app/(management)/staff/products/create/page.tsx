"use client";
import React, { useState } from 'react'
import { createProduct } from '@/hooks/product/useProduct';
import { useProductCategory } from '@/hooks/product/useProductCategory';
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
import { ProductImages, type Product } from '@/types/product';
import { Shell } from '@/components/file-upload/shell';
import { BasicUploaderDemo } from '@/app/_components/uploader';
import { useRouter } from 'next/navigation';
import { ReactHookFormDemo } from '@/app/_components/react-hook-form';

const formSchema = zod.object({
  //Object for form validation
  productName: zod.string().min(1, { message: "Tên sản phẩm không được để trống" }).max(255, { message: "Tên sản phẩm không được quá 255 ký tự" }),
  productPrice: zod.number().min(0, { message: "Giá sản phẩm không được nhỏ hơn 0" }),
  productCategoryId: zod.number().min(1, { message: "Danh mục sản phẩm không được để trống" }),
  productDescription: zod.string().min(1, { message: "Mô tả sản phẩm không được để trống" }),
  productImageSrc: zod.instanceof(File).optional(),
  productQuantity: zod.number().min(0, { message: "Số lượng sản phẩm trong kho không được nhỏ hơn 0" }),
})

function CreateProductPage() {
  const { categories } = useProductCategory();
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      productPrice: 10000,
      productCategoryId: 1,
      productDescription: '',
      productImageSrc: undefined,
      productQuantity: 1
    }
  });

  const router = useRouter();

  const ProductPriceInput = () => {
    const { ref, ...field } = form.register('productPrice');

    const handleIncrement = () => {
      form.setValue('productPrice', Number(form.getValues().productPrice) + 10000);
    }

    const handleDecrement = () => {
      form.setValue('productPrice', Number(form.getValues().productPrice) - 10000);
    }
    return(
      <FormField
          control={form.control}
          name='productPrice'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className='text-[16px] font-semibold'>Giá sản phẩm</FormLabel>
                <FormControl>
                  <section className='flex justify-start items-center gap-x-4'>
                    <div>
                      <Minus
                        size={24}
                        className='text-black bg-white shadow-md rounded-[4px] hover:scale-110 cursor-pointer transition-all duration-500'
                        onClick={handleDecrement}
                      />
                    </div>
                    <Input
                      placeholder='Giá sản phẩm'
                      type='number'
                      disabled
                      className='rounded-[4px] border-black text-black w-fit'
                      {...field}
                    />
                    <div>
                      <Plus
                        size={24}
                        className='text-black bg-white shadow-md rounded-[4px] hover:scale-110 cursor-pointer transition-all duration-500'
                        onClick={handleIncrement}
                      />
                    </div>
                  </section>
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
    )
  }

  const ProductStockInput = () => {
    const { ref, ...field } = form.register('productQuantity');

    const handleIncrement = () => {
      form.setValue('productQuantity', Number(form.getValues().productQuantity) + 1);
    }

    const handleDecrement = () => {
      form.setValue('productQuantity', Number(form.getValues().productQuantity) - 1);
    }
    return (
      <FormField
        control={form.control}
        name="productQuantity"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel className="text-[16px] font-semibold">
                Số lượng sản phẩm trong kho
              </FormLabel>
              <FormControl>
                <section className='w-full relative flex justify-start items-center gap-x-4'>
                  <div>
                    <Minus
                      size={24}
                      className='text-black bg-white shadow-md rounded-[4px] hover:scale-110 cursor-pointer transition-all duration-500'
                      onClick={handleDecrement}
                    />
                  </div>
                    
                  <Input
                    placeholder="Số lượng sản phẩm"
                    type="number"
                    disabled
                    className="rounded-[4px] w-fit border-black"
                    {...field}
                  />
                  <div>
                      <Plus
                        size={24}
                        className='text-black bg-white shadow-md rounded-[4px] hover:scale-110 cursor-pointer transition-all duration-500'
                        onClick={handleIncrement}
                      />
                  </div>
                </section>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    );
  }

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
      categoryName: categories.find(category => category.categoryId === productCategoryId)?.name || '',
      description: productDescription,
      productImages: sessionStorage.getItem('productImages'),
      quantity: Number(productQuantity)
    }

    try{
      createProduct(newProduct);
      toast.success("Thêm sản phẩm thành công");
      sessionStorage.removeItem('uploadedFileURL');
      window.location.href = '/staff/products';
    }
    catch(error){
      toast.error("Thêm sản phẩm thất bại");
    }
  }

  return (
    <div>
      <span className='flex items-center gap-4'>
        <ChevronLeft size={36} onClick={() => router.back()} className='cursor-pointer'/>
        <h1 className='text-[36px] font-bold'>Thêm sản phẩm mới</h1>
      </span>
      <Toaster position='top-center'/>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full flex gap-6'>
            <div className='flex flex-col gap-6'>
              {/* Product Name Field */}
              <FormField
                control={form.control}
                name='productName'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className='text-[16px] font-semibold'>Tên sản phẩm</FormLabel>
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
              {/* Product Price and Product Stock Field */}
              <div className='flex justify-start items-center gap-x-10'>
                <ProductPriceInput />
                <ProductStockInput />
              </div>
              {/* Product Description Field */}
              <FormField
                control={form.control}
                name='productDescription'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className='text-[16px] font-semibold'>Mô tả sản phẩm</FormLabel>
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
              {/* Submit Button */}
              <Button
              variant={'default'}
              type='submit'
              className='bg-pink-500 hover:bg-pink-600 text-white rounded-[4px] flex gap-4 items-center w-full'
            >
              Thêm sản phẩm
            </Button>
            </div>
            <div className='flex flex-col gap-6'>
              {/* Category Field */}
              <FormField
                control={form.control}
                name='productCategoryId'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className='text-[16px] font-semibold'>Danh mục sản phẩm</FormLabel>
                      <FormControl>
                        <Select>
                          <SelectTrigger className="w-full rounded-[4px]">
                            <SelectValue placeholder="Chọn danh mục sản phẩm" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {categories.map((category) => (
                                <SelectItem key={category.categoryId} value={category.name} className='bg-white focus:bg-gray-400'>
                                  {category.name}
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
            <FormField
              control={form.control}
              name='productImageSrc'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-[16px] font-semibold'>Hình ảnh sản phẩm</FormLabel>
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

export default CreateProductPage
