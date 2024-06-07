"use client";
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import GoogleIcon from '../../../../public/icons8-google-48.png';

import TestImage from '../../../../public/Loading.jpg';
import Image from 'next/image';

function LoginPage() {
  return (
    <section className='flex justify-between items-center gap-4'>
        <section className='w-[50%] pl-10'>
          <section className='flex flex-col gap-4 mb-4'>
            <h1 className='text-3xl font-semibold underline underline-offset-1'>Chào mừng bạn!</h1>
            <p>Hãy đăng nhập để tiếp tục</p>
          </section>
          <form className='flex flex-col gap-4'>
            <section className='flex flex-col gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input type='email' id='email' placeholder='Email của bạn' className='rounded-[4px]'/>
            </section>
            <section className='flex flex-col gap-2'>
              <Label htmlFor='password'>Mật khẩu</Label>
              <Input type='password' id='password' placeholder='Mật khẩu của bạn' className='rounded-[4px]'/>
            </section>
            <section className='flex flex-col gap-6'>
              <Button type='submit' className='bg-pink-500 text-white rounded-[4px] py-2 hover:bg-pink-700 transition-all ease-in-out duration-500'>Đăng nhập</Button>
              <section className='flex justify-center items-center gap-4'>
                <hr  className='border-[1px] border-black w-[120px]'/>
                <p className='text-center'>Hoặc</p>
                <hr  className='border-[1px] border-black w-[120px]'/>
              </section>
              <section className='w-full flex flex-col justify-center mt-2'>
                <Button className='bg-transparent-500 text-black font-semibold rounded-[4px] border-[1px] border-gray-200  hover:shadow-md transition-all ease-in-out duration-500'>
                  <span className='flex items-center gap-4'>
                    <Image src={GoogleIcon} alt='Google Icon' className='w-[24px] h-[24px]'/>
                    <p>Đăng nhập với Google</p>
                  </span>
                </Button>
              </section>
              <section className='flex justify-center gap-4 items-center'>
                <p>Bạn chưa có tài khoản?</p>
                <Button variant={'link'} className=' text-black underline font-semibold rounded-md py-2'>Đăng ký</Button>
              </section>
            </section>
          </form>
        </section>
        <section className='w-[50%]'>
          <Image src={TestImage} alt='Test Image' className='w-full h-screen object-cover'/>
        </section>
    </section>
  )
}

export default LoginPage
