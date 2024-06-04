export type Voucher = {
    id: number;
    code: string;
    discount: number;
    expirationDate: Date;
    description: string;
}