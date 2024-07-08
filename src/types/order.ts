/**
 * Order, used to store the details of an order
 */
export type Order = {
    /** Order Id of the order */
    orderId?: number;
    /** Account Id of the order creator, also means the user buying products */
    accountId: number;
    /** Order voucher id, which is the voucher that was applied to the order */
    voucherId?: number;
    /** Order detail id */
    orderDetailId: number;
    /** Order price (in this case, total price) */
    orderPrice: number;
    /** Order status */
    status: string;
}

/**
 * Order Detail, used to store the details of an order detail
 */
export type OrderDetail = {
    /** Order Detail Id of Order Detail */
    orderDetailId: number;
    /** Order Id of the Order Detail */
    orderId: number;
    /** Product Id of the Order, which is any product in the order */
    productId: number;
    /** Quantity of each product in the order detail */
    quantity: number;
}
