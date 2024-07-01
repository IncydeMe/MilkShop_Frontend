"use client"
import TransitionLink from '@/components/transition-link'
import { Button } from '@/components/ui/button'
import React from 'react'



function SetupSignup() {
  return (
    <section className='text-center flex flex-col justify-center items-center gap-2 h-screen'>
        <h1 className='font-bold text-[32px]'>Chào mừng bạn, lần đầu đến đúng không</h1>
        <p className='font-semibold text-[20px]'>Hoàn thiện thêm một số bước nữa là bạn có thể ghé qua cửa hàng như là thành viên rồi đó</p>
        <TransitionLink
            href='/signup/preferences/step-1'
            className="text-[14px] bg-gradient-to-br from-pink-500 to-purple-600 text-white hover:bg-gradient-to-bl hover:from-pink-600 hover:to-purple-600 rounded-[4px] transition-all ease-in-out duration-700">
            Bắt đầu thiết lập bổ sung
        </TransitionLink>
    </section>
  )
}

export default SetupSignup
