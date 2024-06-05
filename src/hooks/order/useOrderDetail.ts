"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import type { OrderDetail } from "../../types/order";

//CRUD operations for order detail

//Fetch all order details
export const useOrderDetails = () => {
    const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchOrderDetails = async () => {
        try {
            const response = await axios.get<OrderDetail[]>("/order-details");
            setOrderDetails(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderDetails();
    }, []);

    return { orderDetails, loading, error };
};

//Fetch a single order detail
export const useSingleOrderDetail = (id: number) => {
    const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchOrderDetail = async (id: number) => {
        try {
            const response = await axios.get<OrderDetail>(`/order-details/${id}`);
            setOrderDetail(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderDetail(id);
    }, [id]);

    return { orderDetail, loading, error };
};

//Create a new order detail
export const createOrderDetail = async (orderDetail: OrderDetail) => {
    try {
        await axios.post("/order-details", orderDetail);
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Update a order detail
export const updateOrderDetail = async (orderDetail: OrderDetail) => {
    try {
        await axios.put(`/order-details/${orderDetail.id}`, orderDetail);
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Delete a order detail
export const deleteOrderDetail = async (id: number) => {
    try {
        await axios.delete(`/order-details/${id}`);
    } catch (error : any) {
        throw new Error(error.message);
    }
};