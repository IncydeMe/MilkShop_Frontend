"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
//for form
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, Minus, Paperclip, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type AuthenticatedUser } from '@/types/auth/authenticatedUser';
import GoogleButton from '@/components/shared/user/social-button/google';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

import { useLogin } from '@/hooks/auth/useAuth';

//for video background
import BackgroundVideo from '../public/video/BackgroundVideo.mp4';

//for motion
import { motion } from 'framer-motion';
import TransitionLink from '@/components/transition-link';

import Loader from '../../../public/Eclipse@1x-1.0s-200px-200px.gif';

const loginSchema = zod.object({
    email: zod.string().email({ message: 'Email không hợp lệ' }),
    password: zod.string().min(6, { message: 'Mật khẩu phải chứa ít nhất 6 ký tự' }),
});

function LoginPage() {
  const { login, loading, error } = useLogin();

  const loginForm = useForm<zod.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: zod.infer<typeof loginSchema>) => {
    console.log(data);
    login(data.email, data.password);
  };

  const handleSubmit = loginForm.handleSubmit(onSubmit);

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <video autoPlay muted loop className="absolute w-full h-full object-cover" onContextMenu={(e) => e.preventDefault()}>
        <source src={"/videos/BackgroundVideo.mp4"} type="video/mp4" />
      </video>
      <div className="absolute w-full h-full bg-black bg-opacity-50"></div>
      <section className="absolute inset-0 top-[20%] left-[36%]">
        <Form {...loginForm}>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring' , duration: 1 , delay: 1 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-[420px] h-fit z-[10] bg-white shadow-md rounded-[8px] p-10"
          >
            <h1 className="text-[24px] font-bold text-center">Đăng nhập</h1>
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-[16px] font-semibold">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email của bạn"
                        type="email"
                        className="rounded-[4px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-[16px] font-semibold">
                      Mật khẩu
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Mật khẩu của bạn"
                        type="password"
                        className="rounded-[4px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Checkbox />
                <p className="text-[14px]">Ghi nhớ đăng nhập</p>
              </div>
              <Link
                href="/forgot-password"
                className="text-gray-600 underline text-[14px]"
              >
                <p>Quên mật khẩu</p>
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-br from-pink-500 to-purple-600 text-white hover:bg-gradient-to-bl hover:from-pink-600 hover:to-purple-600 rounded-[4px] transition-all ease-in-out duration-700"
            >
              Đăng nhập
            </Button>
            <section className="flex justify-center items-center gap-4 my-2">
              <hr className="border-[2px] border-black w-[80px]" />
              <p className="text-center font-semibold">Hoặc bạn có thể</p>
              <hr className="border-[2px] border-black w-[80px]" />
            </section>
            <GoogleButton className="w-[36px] h-[36px]" />
            <div className="flex items-center justify-center gap-2">
              <p className="text-[14px]">Bạn chưa có tài khoản?</p>
              <TransitionLink href="/signup" className="text-[14px] font-semibold underline text-gray-600">
                <p>Đăng ký</p>
              </TransitionLink>
            </div>
          </motion.form>
        </Form>
      </section>
    </div>
  );
}

export default LoginPage
