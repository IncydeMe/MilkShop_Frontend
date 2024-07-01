"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shell } from "@/components/file-upload/shell";
import { BasicUploaderDemo } from "@/app/_components/uploader";

const formSchema = zod.object({
  // Object for form validation
  name: zod
    .string()
    .min(1, { message: "Tên không được để trống" })
    .max(255, { message: "Tên không được quá 255 ký tự" }),
  email: zod
    .string()
    .email({ message: "Email không hợp lệ" })
    .min(1, { message: "Email không được để trống" }),
  phoneNumber: zod
    .string()
    .min(1, { message: "Số điện thoại không được để trống" })
    .max(10, { message: "Số điện thoại không được quá 10 số" }),
  dateOfBirth: zod.string(),
  gender: zod.string(),
  role: zod.string(),
  imageUrl: zod.instanceof(File).optional(),
  address: zod.object({
    street: zod.string().min(1, { message: "Địa chỉ không được để trống" }),
    state: zod.string().min(1, { message: "Quận/Huyện không được để trống" }),
    city: zod
      .string()
      .min(1, { message: "Tỉnh/Thành phố không được để trống" }),
    country: zod.string().min(1, { message: "Quốc gia không được để trống" }),
    zipCode: zod.string(),
  }),
});

function AdminProfileEditPage() {
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Nguyễn Lê Nhật Trường",
      email: "truongnlnde160015@fpt.edu.vn",
      phoneNumber: "0982362591",
      dateOfBirth: "2000-01-10",
      gender: "Male",
      role: "Admin",
      imageUrl: undefined,
      address: {
        street: "12H, High Tech Street",
        state: "District 9",
        city: "Ho Chi Minh City",
        country: "Viet Nam",
        zipCode: "773000",
      },
    },
  });

  const router = useRouter();

  return (
    <>
      <section className="flex items-center gap-4">
        <ChevronLeft size={38} className="cursor-pointer" onClick={() => router.back()} />
        <h1 className="uppercase text-3xl font-bold underline underline-offset-4 m-4 cursor-pointer" onClick={() => router.back()}>
          Chỉnh sửa thông tin cá nhân
        </h1>
      </section>
      <Toaster position="top-center" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="w-full flex flex-col gap-6 mt-5 items-center"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => {
              return (
                <FormItem className="w-full mt-3">
                  <FormLabel
                    htmlFor="imageUrl"
                    className="text-xl font-semibold block text-center"
                  >
                    Chọn ảnh đại diện cho bạn
                  </FormLabel>
                  <FormControl>
                    <Shell>
                      <BasicUploaderDemo />
                    </Shell>
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.imageUrl?.message}
                  </FormMessage>
                </FormItem>
              );
            }}
          />

          <div className="w-full flex gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem className="w-1/2">
                    <FormLabel htmlFor="name" className="text-xl font-semibold">
                      Tên
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="name"
                        className="rounded-[4px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem className="w-1/2">
                    <FormLabel
                      htmlFor="email"
                      className="text-xl font-semibold"
                    >
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        id="email"
                        className="rounded-[4px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="w-full flex gap-6">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => {
                return (
                  <FormItem className="w-1/2">
                    <FormLabel
                      htmlFor="phoneNumber"
                      className="text-xl font-semibold"
                    >
                      Số điện thoại
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="phoneNumber"
                        className="rounded-[4px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.phoneNumber?.message}
                    </FormMessage>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => {
                return (
                  <FormItem className="w-1/2">
                    <FormLabel
                      htmlFor="dateOfBirth"
                      className="text-xl font-semibold"
                    >
                      Ngày tháng năm sinh
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        id="dateOfBirth"
                        className="rounded-[4px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.dateOfBirth?.message}
                    </FormMessage>
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="w-full flex gap-6">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => {
                return (
                  <FormItem className="w-1/2">
                    <FormLabel
                      htmlFor="gender"
                      className="text-xl font-semibold"
                    >
                      Giới tính
                    </FormLabel>
                    <FormControl>
                      <Select defaultValue="Male">
                        <SelectTrigger className="w-full rounded-[4px] text-lg">
                          <SelectValue placeholder="Chọn giới tính" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem
                              value="Male"
                              className="bg-white focus:bg-gray-400 text-lg"
                            >
                              Nam
                            </SelectItem>
                            <SelectItem
                              value="Female"
                              className="bg-white focus:bg-gray-400 text-lg"
                            >
                              Nữ
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.gender?.message}
                    </FormMessage>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => {
                return (
                  <FormItem className="w-1/2">
                    <FormLabel htmlFor="role" className="text-xl font-semibold">
                      Vai trò
                    </FormLabel>
                    <FormControl>
                      <Select disabled defaultValue="Admin">
                        <SelectTrigger className="w-full rounded-[4px] text-lg">
                          <SelectValue placeholder="Chọn vai trò cho tài khoản" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem
                              value="Admin"
                              className="bg-white focus:bg-gray-400 text-lg"
                            >
                              Quản trị viên
                            </SelectItem>
                            <SelectItem
                              value="User"
                              className="bg-white focus:bg-gray-400 text-lg"
                            >
                              Nhân viên
                            </SelectItem>
                            <SelectItem
                              value="User"
                              className="bg-white focus:bg-gray-400 text-lg"
                            >
                              Thành viên
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.role?.message}
                    </FormMessage>
                  </FormItem>
                );
              }}
            />
          </div>
          <hr className="w-full h-[2px]" />
          <div className="w-full flex gap-6">
            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => {
                return (
                  <FormItem className="w-1/2">
                    <FormLabel
                      htmlFor="address.street"
                      className="text-xl font-semibold"
                    >
                      Địa chỉ
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="address.street"
                        className="rounded-[4px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.address?.street?.message}
                    </FormMessage>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="address.state"
              render={({ field }) => {
                return (
                  <FormItem className="w-1/2">
                    <FormLabel
                      htmlFor="address.state"
                      className="text-xl font-semibold"
                    >
                      Quận/Huyện
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="address.state"
                        className="rounded-[4px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.address?.state?.message}
                    </FormMessage>
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="w-full flex gap-6">
            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => {
                return (
                  <FormItem className="w-2/5">
                    <FormLabel
                      htmlFor="address.city"
                      className="text-xl font-semibold"
                    >
                      Tỉnh/Thành phố
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="address.city"
                        className="rounded-[4px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.address?.city?.message}
                    </FormMessage>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="address.country"
              render={({ field }) => {
                return (
                  <FormItem className="w-2/5">
                    <FormLabel
                      htmlFor="address.country"
                      className="text-xl font-semibold"
                    >
                      Quốc gia
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="address.country"
                        className="rounded-[4px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.address?.country?.message}
                    </FormMessage>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="address.zipCode"
              render={({ field }) => {
                return (
                  <FormItem className="w-2/5">
                    <FormLabel
                      htmlFor="address.zipCode"
                      className="text-xl font-semibold"
                    >
                      Mã bưu điện
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="address.zipCode"
                        className="rounded-[4px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.address?.zipCode?.message}
                    </FormMessage>
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="w-full flex flex-col items-center mt-[30px]">
            <Button
              variant={"default"}
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white rounded-[4px] w-2/5"
            >
              Chỉnh sửa
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default AdminProfileEditPage;
