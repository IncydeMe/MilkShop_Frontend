"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import type { Order } from "../../types/order";

//CRUD operations for order

//Fetch all orders
export const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchOrders = async () => {
        try {
            const response = await axios.get<Order[]>("/orders");
            setOrders(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return { orders, loading, error };
};

//Fetch a single order
export const useSingleOrder = (id: number) => {
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchOrder = async (id: number) => {
        try {
            const response = await axios.get<Order>(`/orders/${id}`);
            setOrder(response.data);
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder(id);
    }, [id]);

    return { order, loading, error };
};

//Create a new order
export const createOrder = async (order: Order) => {
    try {
        await axios.post("/orders", order);
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Update a order
export const updateOrder = async (order: Order) => {
    try {
    } catch (error : any) {
        await axios.put(`/orders/${order.orderId}`, order);
        throw new Error(error.message);
    }
};

//Delete a order
export const deleteOrder = async (id: number) => {
    try {
        await axios.delete(`/orders/${id}`);
    } catch (error : any) {
        throw new Error(error.message);
    }
};