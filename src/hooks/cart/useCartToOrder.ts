"use client"

import React, { useState, useEffect, use } from "react"
import { useCartStore } from "./useCartStore"
import { createOrder } from "../order/useOrder"
import { createOrderDetail } from "../order/useOrderDetail"
import { useSingleProduct } from "../product/useProduct"

import axios from "@/lib/axios"

export function useCartToOrder() {
    const { cart, totalPrice } = useCartStore()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    const handleCartToOrder = async () => {
        try {
            
            
        } catch (error : any) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { handleCartToOrder, loading, error }
}