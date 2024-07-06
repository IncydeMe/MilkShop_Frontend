/**
 * Feedback, used to store the details of a feedback
 */
export type Feedback = {
    /** Feedback Id of the feedback */
    feedbackId: number;
    /** Product Id of the feedback */
    productId: number;
    /** Account Id of the feedback creator */
    accountId: number;
    /** Feedback Media Id of the feedback, this will use to query the medias of the feedback*/
    feedbackMediaId: number;
    /** Rating points of the feedback */
    rating: number;
    /** Content of the feedback */
    content: string;
    /** Status of the feedback */
    isReported: boolean;
    /** Created time of the feedback */
    createdAt: Date;
    /** Updated time of the feedback */
    updatedAt: Date;
}

