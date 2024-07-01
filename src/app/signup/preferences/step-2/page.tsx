"use client"

import React from 'react'

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

function PreferenceSetting_2() {
  return (
    <section>
        <h1>Giờ thì cho chúng mình biết nhu cầu của bạn là gì nhá</h1>
        <p>Có thể chọn 1 hoặc nhiều mục dưới đây tùy nha</p>
    </section>
  )
}

export default PreferenceSetting_2
