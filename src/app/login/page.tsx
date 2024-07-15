"use client"
import React, { useState } from "react";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
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
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import GoogleButton from "@/components/shared/user/social-button/google";
import { Checkbox } from "@/components/ui/checkbox";

//for motion
import { motion } from "framer-motion";
import TransitionLink from "@/components/transition-link";

import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const loginSchema = zod.object({
  email: zod.string().email({ message: "Email không hợp lệ" }),
  password: zod
    .string()
    .min(6, { message: "Mật khẩu phải chứa ít nhất 6 ký tự" }),
});

export default function LoginPage() {
  const loginForm = useForm<zod.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const route = useRouter();

  async function onSubmit(data: zod.infer<typeof loginSchema>) {
      try{
        loginSchema.parse(data);

        const response = await axios.post('/login?email='+data.email+'&password='+data.password);

        if (response.data.status === 1) {
          const token = response.data.data;
          const decoded = jwtDecode(token) as { [key: string]: string };
    
          // Store the token in cookies
          Cookies.set('token', token, { secure: true, sameSite: 'strict' });
    
          // Optionally store additional data in sessionStorage/localStorage
          const userRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
          sessionStorage.setItem('user', JSON.stringify({
            email: decoded.Email,
            role: userRole,
          }));

          const roleRouteMap: { [key: string]: string } = {
            admin: '/admin',
            manager: '/manager',
            staff: '/staff',
            member: '/'
          };

          route.push(roleRouteMap[userRole] || '/');

        } else {
          // Handle error
          console.error(response.data.message);
        }
      } catch(error) {
        // Handle error
        console.error(error);
      }
  };  

  const handleSubmit = loginForm.handleSubmit(onSubmit);

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <video
        autoPlay
        muted
        loop
        className="absolute w-full h-full object-cover"
        onContextMenu={(e) => e.preventDefault()}
      >
        <source src={"/videos/BackgroundVideo.mp4"} type="video/mp4" />
      </video>
      <div className="absolute w-full h-full bg-black bg-opacity-50"></div>
      <span className="absolute top-4 left-0 flex items-center gap-2 cursor-pointer text-white bg-black px-2 py-1" onClick={() => route.back()}>
          <ChevronLeft size={24}/>
          <p>Quay lại</p>
      </span>
      <section className="absolute inset-0 top-[20%] left-[36%]">
        <Form {...loginForm}>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 1, delay: 1 }}
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
            <div className="flex justify-end items-center">
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
              <TransitionLink
                href="/signup"
                className="text-[14px] font-semibold underline text-gray-600"
              >
                <p>Đăng ký</p>
              </TransitionLink>
            </div>
          </motion.form>
        </Form>
      </section>
    </div>
  );
}
