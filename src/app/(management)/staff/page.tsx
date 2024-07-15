"use client"

import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ChevronRight, CreditCard, HandCoins, Package } from 'lucide-react'
import LineChart from '@/components/shared/management/chart/line'
import PieChart from '@/components/shared/management/chart/pie'
import { useProductCategory } from '@/hooks/product/useProductCategory'
import { useProduct } from '@/hooks/product/useProduct'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function StaffHomePage() {
  const { categories } = useProductCategory();
  const { products } = useProduct();

  console.log(categories, products)

  const statistics = [
    {
      title: 'Doanh thu',
      icon: <HandCoins size={36} />,
      value: 1000000
    },
    {
      title: 'Số lượng đơn hàng',
      icon: <CreditCard size={36} />,
      value: 100
    },
    {
      title: 'Số lượng sản phẩm',
      icon: <Package size={36} />,
      value: 100
    }
  ]

  const revenueDatasets = [{
    datasets: [{
      label: 'Doanh thu',
      data: [1000000, 2000000, 3000000, 4000000, 5000000],// Mock data
      fill: false,
      borderColor: '#1E40AF',
      tension: 0.4
    }],
    labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4', 'Tuần 5']
  }]

  // const categoryDistributionDatasets = [{
  //   datasets: [{
  //       label: 'Category distribution',
  //       data: categories.map(category => products.filter(product => product.categoryId === category.categoryId).length),
  //       backgroundColor: categories.map(category => {
  //         // Random color for each category
  //         let r = Math.floor(Math.random() * 255);
  //         let g = Math.floor(Math.random() * 255);
  //         let b = Math.floor(Math.random() * 255);
  //         return `rgb(${r}, ${g}, ${b})`;
  //       }),
  //       borderColor: categories.map(category => {
  //         // Random color for each category
  //         let r = Math.floor(Math.random() * 255);
  //         let g = Math.floor(Math.random() * 255);
  //         let b = Math.floor(Math.random() * 255);
  //         return `rgb(${r}, ${g}, ${b})`;
  //       }),
  //       borderWidth: 1
  //     }],
  //   labels: categories.map(category => category.categoryName)
  // }]

  const categoryDistributionDatasets = [{
    datasets: [{
      label: 'Category distribution',
      data: [10, 20, 30, 40],// Mock data
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF6384'],
      borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF6384'],
      borderWidth: 1
    }],
    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4']
  }]

  return (
    <section className='overflow-x-hidden'>
      <section className='flex flex-col gap-4 pb-4'>
        <h1 className='text-[32px] font-bold'>Chào mừng quay trở lại</h1>
      </section>
      <section className='text-[24px] font-semibold '>
        <h3 className='underline'>Theo dõi thông số của tháng này</h3>
        <section className='grid grid-cols-3 gap-4'>
          {
            statistics.map((statistic, i) => (
              <Card key={i} className='flex justify-between items-center w-[360px]'>
                <CardHeader className='flex flex-row justify-between gap-4 items-center'>
                  <div>
                    <CardTitle className='pb-2 text-[20px] font-bold'>
                      {statistic.title}
                    </CardTitle>
                    <CardDescription>
                      <p className='text-[16px]'>
                        {
                          statistic.title === 'Doanh thu' ?
                            `${statistic.value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}` :
                            statistic.title === 'Số lượng đơn hàng' ?
                              `${statistic.value} đơn hàng` :
                              `${statistic.value} sản phẩm`
                        }
                      </p>
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardFooter className='py-4'>{statistic.icon}</CardFooter>
              </Card>
            ))
          }
        </section>
        <h3 className='text-[24px] font-semibold underline my-4'>Biểu đồ dữ liệu</h3>
        <section className='flex justify-between items-center gap-6 mt-4'>
          <section className='bg-white border-b-[2px] border-gray-500/15 shadow-lg mx-auto my-auto rounded-[8px]'>
            {/* Line chart for showcasing profit in the month */}
            <h3 className='text-[20px] my-2 mx-4'>Doanh thu cửa hàng</h3>
            <LineChart
              datasets={revenueDatasets[0].datasets}
              labels={revenueDatasets[0].labels}
              className='mt-4 w-[36vw] h-[37vh] p-2'
            />
          </section>
          <section className='bg-white border-b-[1px] border-gray-600/35 shadow-lg mx-auto my-auto rounded-[8px]'>
            <h3 className='text-[20px] my-2 mx-4'>Phân phối danh mục sản phẩm</h3>
            <PieChart
              datasets={categoryDistributionDatasets[0].datasets}
              labels={categoryDistributionDatasets[0].labels}
              className='mt-4 w-[36vw] h-[37vh] p-2'
            />
          </section>
        </section>
        <span className='flex justify-between items-center'>
          <h3 className='text-[24px] font-semibold underline my-4'>Danh sách sản phẩm bán chạy</h3>
          <Link href={'/staff/products'}>
            <Button variant={'ghost'} className='hover:bg-pink-600 hover:text-white rounded-[4px]'>
              <span className='flex justify-end items-center gap-4'>
                Xem tất cả
                <ChevronRight size={24} />
              </span>
            </Button>
          </Link>
        </span>
        <section className='bg-white border-b-[1px] border-gray-600/35 shadow-lg mx-auto my-auto rounded-[8px]'>
          <Table className='w-full'>
            <TableHeader>
              <TableRow>
                <TableHead>STT</TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>Loại sản phẩm</TableHead>
                <TableHead>Số lượng bán ra</TableHead>
                <TableHead>Doanh thu</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                products.slice(0,5).map((product, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.categoryName}</TableCell>
                    <TableCell>{product.quantityInStock}</TableCell>
                    <TableCell>{(product.price * product.quantityInStock).toLocaleString(
                      'vi-VN', { style: 'currency', currency: 'VND' }
                    )}</TableCell>
                    <TableCell>
                      <Link href={'/staff/products/'+ product.productId}>
                        <Button variant={'default'} className='bg-blue-500 text-white hover:bg-blue-600 rounded-[4px]'>
                          Xem chi tiết
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </section>
      </section>
    </section>
  )
}
