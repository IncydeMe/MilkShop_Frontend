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

function PreferenceSetting_3() {
  return (
    <section>
        <h1>Sắp xong rồi, còn chút xíu nữa là đủ nè!</h1>
        <p>Giúp chúng mình phát triển sản phẩm nhiều hơn nhé</p>
    </section>
  )
}

export default PreferenceSetting_3
