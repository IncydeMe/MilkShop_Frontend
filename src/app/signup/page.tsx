"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useRouter } from "next/navigation";
import { type AuthenticatedUser } from "@/types/auth/authenticatedUser";

import axios from "@/lib/axios";

//for video background
import BackgroundVideo from "../public/video/BackgroundVideo.mp4";

//for motion
import { motion } from "framer-motion";
import TransitionLink from "@/components/transition-link";
import { ChevronLeft } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const SignupSchema = zod
  .object({
    email: zod.string().email({ message: "Email không hợp lệ" }),
    password: zod
      .string()
      .min(6, { message: "Mật khẩu phải chứa ít nhất 6 ký tự" }),
    confirmPassword: zod
      .string()
      .min(6, { message: "Mật khẩu phải chứa ít nhất 6 ký tự" }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp, vui lòng thử lại",
        path: ["confirmPassword"],
      });
    }
  });

function SignupPage() {
  const router = useRouter();

  const signupForm = useForm<zod.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
  });

  async function onSubmit(data: zod.infer<typeof SignupSchema>) {
    try {
      SignupSchema.parse(data);

      const response = await axios.post("/register?email=" + data.email + "&password=" + data.password);

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

          router.push("/signup/preferences");
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = signupForm.handleSubmit(onSubmit);

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
      <span className="absolute top-4 left-0 flex items-center gap-2 cursor-pointer text-white bg-black px-2 py-1" onClick={() => router.back()}>
          <ChevronLeft size={24}/>
          <p>Quay lại</p>
      </span>
      <section className="absolute inset-0 top-[20%] left-[36%]">
        <Form {...signupForm}>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 1, delay: 1 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-[420px] h-fit z-[10] bg-white shadow-md rounded-[8px] p-10"
          >
            <h1 className="text-[24px] font-bold text-center">Đăng ký</h1>
            <FormField
              control={signupForm.control}
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
              control={signupForm.control}
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
            <FormField
              control={signupForm.control}
              name="confirmPassword"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-[16px] font-semibold">
                      Xác thực mật khẩu
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Xác thực mật khẩu của bạn"
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
            <Button
              type="submit"
              className="w-full bg-gradient-to-br from-pink-500 to-purple-600 text-white hover:bg-gradient-to-bl hover:from-pink-600 hover:to-purple-600 rounded-[4px] transition-all ease-in-out duration-700"
            >
              Đăng ký
            </Button>
            <div className="flex items-center justify-center gap-2">
              <p className="text-[14px]">Bạn đã có tài khoản?</p>
              <TransitionLink
                href="/login"
                className="text-[14px] font-semibold underline text-gray-600 bg-transparent"
              >
                <p>Đăng nhập</p>
              </TransitionLink>
            </div>
          </motion.form>
        </Form>
      </section>
    </div>
  );
}

export default SignupPage;
