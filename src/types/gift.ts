/**
 * Gift, used to store the details of a gift
 */
export type Gift = {
    /** Gift Id of the gift */
    giftId?: number;
    /** Account Id of the gift creator */
    accountId?: string;
    /** Gift Name */
    name: string;
    /** Member points required to redeem the gift */
    point: number;
    /** Description of the gift */
    description: string;
    /** Image url of the gift */
    imageUrl: string;
    /** Quantity of the gift */
    quantity: number;
    /** Status of the gift */
    status?: string;
    /** Created date of the gift */
    createdAt?: Date;
    /** Updated date of the gift */
    updatedAt?: Date;
}

/**
 * Gifted, used to store the details of a gifted gift
 */
export type Gifted = {
    /** Gifted Id */
    giftedId?: number;
    /** Gift Id of the gifted gift */
    giftId?: number;
    /** Account Id of the account who received the gift */
    accountId?: number;
    /** Quantity of the gifted gift */
    status?: string;
    /** Created date of the gifted gift */
    createdAt?: Date;
}