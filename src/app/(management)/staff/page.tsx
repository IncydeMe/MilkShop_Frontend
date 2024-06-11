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
import { CreditCard, HandCoins, Package } from 'lucide-react'
import BarChart from '@/components/shared/management/chart/bar'
import LineChart from '@/components/shared/management/chart/line'
import PieChart from '@/components/shared/management/chart/pie'
import BubbleChart from '@/components/shared/management/chart/bubble'
import PolarAreaChart from '@/components/shared/management/chart/polar-area'
import DoughnutChart from '@/components/shared/management/chart/dougnut'
import RadarChart from '@/components/shared/management/chart/radar'
import AreaChart from '@/components/shared/management/chart/area'

export default function StaffHomePage() {
  const statistics = [
      {
          title: 'Doanh thu',
          icon: <HandCoins size={36}/>,
          value: 1000000
      },
      {
          title: 'Số lượng đơn hàng',
          icon: <CreditCard size={36}/>,
          value: 100
      },
      {
          title: 'Số lượng sản phẩm',
          icon: <Package size={36}/>,
          value: 100
      }
  ]


  return (
    <section>
        <section className='flex flex-col gap-4 pb-4'>
            <h1 className='text-[32px] font-bold'>Chào mừng quay trở lại</h1>
        </section>
        <section className='text-[24px] font-semibold'>
            <h3>Theo dõi thông số của tháng này</h3>
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
            <section><BarChart /></section>
            <section><LineChart /></section>
            <section><PieChart /></section>
            <section><BubbleChart/></section>
            <section><PolarAreaChart/></section>
            <section><DoughnutChart/></section>
            <section><RadarChart /></section>
            <section>
              <AreaChart />
            </section>
        </section>
    </section>
  )
}
