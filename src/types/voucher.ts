/**
 * Voucher, used to store the details of a voucher
 */
export type Voucher = {
    /** Voucher id of the voucher */
    voucherId: number;
    /** Voucher value */
    value: number;
    /** 
     * Voucher type
     * 
     * For this project, we have 2 types of voucher:
     * 
     * The first type is "discount", which means the voucher is used to discount the price of the order
     * This first type has 2 different subtypes: "percent" and "amount"
     * - "percent" means the voucher will discount a percentage of the order price
     * - "amount" means the voucher will discount a fixed amount of the order price
     * 
     * The second type is "freeship", which means the voucher is used to discount the shipping fee of the order
    */
    type: string;
    /** Voucher description */
    description: string;
    /** Voucher start time that can be used */
    startDate: Date;
    /** Voucher end time that will expired */
    endDate: Date;
    /** Voucher status */
    status: string;
}