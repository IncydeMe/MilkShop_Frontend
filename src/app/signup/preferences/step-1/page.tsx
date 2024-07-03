"use client";

import React, { useEffect, useState } from "react";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhoneInput } from "@/components/phone-input";
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
import {
  useDistricts,
  useProvinces,
  useWards,
} from "@/hooks/address/useAddress";

const step_1_Schema = zod.object({
  houseNumber: zod
    .string({ required_error: "Số nhà không được để trống" })
    .min(2, { message: "Số nhà phải chứa ít nhất 2 ký tự" }),
  street: zod
    .string({ required_error: "Tên đường không được để trống" })
    .min(2, { message: "Tên đường phải chứa ít nhất 2 ký tự" }),
  ward: zod
    .string({ required_error: "Phường không được để trống" })
    .min(2, { message: "Phường phải chứa ít nhất 2 ký tự" }),
  district: zod
    .string({ required_error: "Quận không được để trống" })
    .min(2, { message: "Quận phải chứa ít nhất 2 ký tự" }),
  city: zod
    .string({ required_error: "Thành phố không được để trống" })
    .min(2, { message: "Thành phố phải chứa ít nhất 2 ký tự" }),
  phone: zod
    .string({ required_error: "Số điện thoại không được để trống" })
    .min(10, { message: "Số điện thoại phải chứa ít nhất 10 ký tự" }),
  name: zod
    .string({ required_error: "Tên mình mà quên à người ơi~?" })
    .min(2, { message: "Tên phải chứa ít nhất 2 ký tự" }),
  dateOfBirth: zod.date({
    required_error: "A date of birth is required.",
  }),
});

function PreferenceSetting_1() {
  const preferenceSetting_1_Form = useForm<zod.infer<typeof step_1_Schema>>({
    resolver: zodResolver(step_1_Schema),
  });

  // State hooks for selected province, district, and ward
  const [selectedProvince, setSelectedProvince] = useState<number>(0);
  const [selectedDistrict, setSelectedDistrict] = useState<number>(0);
  const [selectedWard, setSelectedWard] = useState<number>(0);

  // Fetch provinces, districts, and wards based on selected values
  const {
    provinces,
    loading: provincesLoading,
    error: provincesError,
  } = useProvinces();
  const {
    districts,
    loading: districtsLoading,
    error: districtsError,
  } = useDistricts(selectedProvince);
  const {
    wards,
    loading: wardsLoading,
    error: wardsError,
  } = useWards(selectedDistrict);

  // Automatically select the first province, district, and ward when the lists are loaded
  useEffect(() => {
    if (provinces.length > 0) {
      setSelectedProvince(provinces[0].province_id);
    }
  }, [provinces]);

  useEffect(() => {
    if (districts.length > 0) {
      setSelectedDistrict(districts[0].district_id);
    }
  }, [districts]);

  useEffect(() => {
    if (wards.length > 0) {
      setSelectedWard(wards[0].ward_id);
    }
  }, [wards]);

  return (
    <section>
      <h1>Đầu tiên, bạn hãy bổ sung thêm một số thông tin cá nhân</h1>
      <p>
        Các thông tin này khá quan trọng để bạn trở thành thành viên chính thức
        của cửa hàng, nên đừng bỏ qua nhá
      </p>

      <Form {...preferenceSetting_1_Form}>
        <form className='w-fit'>
          <div className="flex justify-start items-center gap-4">
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
          </div>
          <div>
            <FormField
              control={preferenceSetting_1_Form.control}
              name="city"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-[16px] font-semibold">
                      Thành phố
                    </FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Chọn thành phố của bạn" />
                        </SelectTrigger>
                        <SelectContent>
                          {provinces.map((province) => (
                            <SelectItem
                              key={province.province_id}
                              value={province.province_name}
                              onClick={() => setSelectedProvince(province.province_id)}
                            >
                              {province.province_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={preferenceSetting_1_Form.control}
              name="district"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-[16px] font-semibold">
                      Quận
                    </FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Chọn quận của bạn" />
                        </SelectTrigger>
                        <SelectContent>
                          {districts.map((district) => (
                            <SelectItem
                              key={district.district_id}
                              value={district.district_name}
                              onClick={() => setSelectedDistrict(district.district_id)}
                            >
                              {district.district_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={preferenceSetting_1_Form.control}
              name="ward"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-[16px] font-semibold">
                      Phường
                    </FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Chọn phường của bạn" />
                        </SelectTrigger>
                        <SelectContent>
                          {wards.map((ward) => (
                            <SelectItem
                              key={ward.ward_id}
                              value={ward.ward_name}
                              onClick={() => setSelectedWard(ward.ward_id)}
                            >
                              {ward.ward_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        </form>
      </Form>
    </section>
  );
}

export default PreferenceSetting_1;
