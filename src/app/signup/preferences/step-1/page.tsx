"use client"

import React, { useState } from 'react'

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
import { PhoneInput } from '@/components/phone-input';
import {
    Country,
    formatPhoneNumber,
    formatPhoneNumberIntl,
    getCountryCallingCode,
  } from "react-phone-number-input";
import tr from "react-phone-number-input/locale/tr";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const step_1_Schema = zod.object({
    houseNumber: zod.string({ required_error: "Số nhà không được để trống"}).min(2, { message: "Số nhà phải chứa ít nhất 2 ký tự" }),
    street: zod.string({ required_error: "Tên đường không được để trống"}).min(2, { message: "Tên đường phải chứa ít nhất 2 ký tự" }),
    ward: zod.string({ required_error: "Phường không được để trống"}).min(2, { message: "Phường phải chứa ít nhất 2 ký tự" }),
    district: zod.string({ required_error: "Quận không được để trống"}).min(2, { message: "Quận phải chứa ít nhất 2 ký tự" }),
    city: zod.string({ required_error: "Thành phố không được để trống"}).min(2, { message: "Thành phố phải chứa ít nhất 2 ký tự" }),
    phone: zod.string({ required_error: "Số điện thoại không được để trống"}).min(10, { message: "Số điện thoại phải chứa ít nhất 10 ký tự" }),
    name: zod.string({ required_error: "Tên mình mà quên à người ơi~?"}).min(2, { message: "Tên phải chứa ít nhất 2 ký tự" }),
    dateOfBirth: zod.date({
        required_error: "A date of birth is required.",
      }),
});

function PreferenceSetting_1() {
    const preferenceSetting_1_Form = useForm<zod.infer<typeof step_1_Schema>>({
        resolver: zodResolver(step_1_Schema),
    });

    const [country, setCountry] = useState<Country>();
    const [phoneNumber, setPhoneNumber] = useState("");
  
    return (
        <section>
            <h1>Đầu tiên, bạn hãy bổ sung thêm một số thông tin cá nhân</h1>
            <p>Các thông tin này khá quan trọng để bạn trở thành thành viên chính thức của cửa hàng, nên đừng bỏ qua nhá</p>

            <Form {...preferenceSetting_1_Form}>
                <form>
                <FormField
                    control={preferenceSetting_1_Form.control}
                    name="houseNumber"
                    render={({ field }) => {
                        return (
                        <FormItem>
                            <FormLabel className="text-[16px] font-semibold">
                            Số nhà
                            </FormLabel>
                            <FormControl>
                            <Input
                                placeholder="Số nhà của bạn"
                                type="text"
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
                        control={preferenceSetting_1_Form.control}
                        name="street"
                        render={({ field }) => {
                            return (
                            <FormItem>
                                <FormLabel className="text-[16px] font-semibold">
                                Đường
                                </FormLabel>
                                <FormControl>
                                <Input
                                    placeholder="Tên đường của bạn"
                                    type="text"
                                    className="rounded-[4px]"
                                    {...field}
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            );
                        }}
                    />
                </form>
            </Form>
        </section>
    )
}

export default PreferenceSetting_1
