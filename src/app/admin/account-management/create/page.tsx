"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ChevronLeft } from "lucide-react";
import { Toaster, toast } from "sonner";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Shell } from "@/components/file-upload/shell";
import { BasicUploaderDemo } from "@/app/_components/uploader";
import { Account, Role } from "@/types/account";
import { createAccount } from "@/hooks/account/useAccount";

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
  // password: zod
  //   .string()
  //   .min(6, { message: "Mật khẩu phải chứa ít nhất 6 ký tự" }),
  phoneNumber: zod
    .string()
    .min(1, { message: "Số điện thoại không được để trống" })
    .max(10, { message: "Số điện thoại không hợp lệ" }),
  gender: zod.string(),
  role: zod.string(),
  imageUrl: zod.instanceof(File).optional(),
  address: zod.object({
    street: zod.string().min(1, { message: "Địa chỉ không được để trống" }),
    state: zod.string().min(1, { message: "Quận không được để trống " }),
    city: zod.string().min(1, { message: "Thành phố không được để trống" }),
    country: zod.string().min(1, { message: "Quốc gia không được để trống" }),
    zipCode: zod.string(),
  }),
});

function CreateAccountPage() {
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      // password: "",
      phoneNumber: "",
      gender: "",
      role: Role.USER,
      imageUrl: undefined,
      address: {
        street: "",
        state: "",
        city: "",
        country: "",
        zipCode: "",
      },
    },
  });

  const router = useRouter();

  const onSubmit = () => {
    // const {
    //   name,
    //   email,
    //   password,
    //   phoneNumber,
    //   role,
    //   imageUrl,
    //   address,
    // } = form.getValues();

    // const newAccount: Account = {
    // id: 0,
    // name: name,
    // email: email,
    // password: password,
    // phonenumber: phoneNumber,
    // role: Role.USER,
    // imageUrl: imageUrl,
    // createdAt: new Date(),
    // updatedAt: new Date(),
    // disabled: false,
    // address: {
    //   street: address.street,
    //   city: address.city,
    //   state: address.state,
    //   country: address.country,
    //   zipCode: address.zipCode,
    // },
    // };

    try {
      // createAccount(newAccount);
      toast.success("Tạo tài khoản thành công!");
      window.location.href = "/admin/account-management";
    } catch (error) {
      toast.error("Có lỗi xảy ra khi tạo tài khoản!");
    }
  };

  return (
    <main>
      <span className="flex items-center gap-4">
        <ChevronLeft
          size={36}
          onClick={() => router.back()}
          className="cursor-pointer"
        />
        <h1 className="text-2xl font-bold">Tạo tài khoản mới</h1>
      </span>
      <Toaster position="top-center" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6 mt-5 items-center"
        >
          <div className="w-full flex gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem className="w-1/2">
                    <FormLabel
                      className="text-[20px] font-semibold"
                      htmlFor="accountName"
                    >
                      Tên tài khoản
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="accountName"
                        type="text"
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
                      className="text-[20px] font-semibold"
                      htmlFor="email"
                    >
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
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
                  <FormItem className="w-2/5">
                    <FormLabel
                      className="text-[20px] font-semibold"
                      htmlFor="phoneNumber"
                    >
                      Số điện thoại
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="phoneNumber"
                        type="text"
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
              name="gender"
              render={({ field }) => {
                return (
                  <FormItem className="w-2/5">
                    <FormLabel
                      className="text-[20px] font-semibold"
                      htmlFor="gender"
                    >
                      Giới tính
                    </FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-full rounded-[4px] text-lg">
                          <SelectValue placeholder="Chọn giới tính" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem
                              value="Male"
                              className="bg-white focus:bg-gray-400 text-base"
                            >
                              Nam
                            </SelectItem>
                            <SelectItem
                              value="Female"
                              className="bg-white focus:bg-gray-400 text-base"
                            >
                              Nữ
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => {
                return (
                  <FormItem className="w-2/5">
                    <FormLabel
                      className="text-[20px] font-semibold"
                      htmlFor="role"
                    >
                      Role
                    </FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-full rounded-[4px] text-lg">
                          <SelectValue placeholder="Chọn role cho tài khoản" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem
                              value="Admin"
                              className="bg-white focus:bg-gray-400 text-base"
                            >
                              Quản trị viên
                            </SelectItem>
                            <SelectItem
                              value="Staff"
                              className="bg-white focus:bg-gray-400 text-base"
                            >
                              Nhân viên
                            </SelectItem>
                            <SelectItem
                              value="Member"
                              className="bg-white focus:bg-gray-400 text-base"
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
          <hr className="h-[2px] w-full" />
          <div className="w-full flex gap-6">
            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => {
                return (
                  <FormItem className="w-1/2">
                    <FormLabel
                      className="text-[20px] font-semibold"
                      htmlFor="address.street"
                    >
                      Số nhà, đường
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="address.street"
                        type="text"
                        {...field}
                        className="rounded-[4px]"
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
                      className="text-[20px] font-semibold"
                      htmlFor="address.state"
                    >
                      Quận / Huyện
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="address.state"
                        type="text"
                        {...field}
                        className="rounded-[4px]"
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
                      className="text-[20px] font-semibold"
                      htmlFor="address.city"
                    >
                      Thành phố / Tỉnh
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="address.city"
                        type="text"
                        {...field}
                        className="rounded-[4px]"
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
                      className="text-[20px] font-semibold"
                      htmlFor="address.country"
                    >
                      Quốc gia
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="address.country"
                        type="text"
                        {...field}
                        className="rounded-[4px]"
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
                      className="text-[20px] font-semibold"
                      htmlFor="address.zipCode"
                    >
                      Zip code
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="address.zipCode"
                        type="text"
                        {...field}
                        className="rounded-[4px]"
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
          <hr className="h-[2px] w-full" />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => {
              return (
                <FormItem className="w-full mt-3">
                  <FormLabel
                    className="text-[20px] font-semibold block text-center"
                    htmlFor="imageUrl"
                  >
                    Chọn ảnh đại diện
                  </FormLabel>
                  <FormControl>
                    <Shell>
                      <BasicUploaderDemo />
                    </Shell>
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.name?.message}
                  </FormMessage>
                </FormItem>
              );
            }}
          />
          <Button
            variant={"default"}
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-[4px] w-1/2 flex items-center"
          >
            Tạo mới
          </Button>
        </form>
      </Form>
    </main>
  );
}

export default CreateAccountPage;
