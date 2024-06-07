//A Feedback consist of a feedback id, a account id, a product id, a content, a created date, and a rating.
export type Feedback = {
    id: number;
    accountId: number;
    productId: number;
    content: string;
    createdDate: Date;
    rating: number;
    feedbackMedia: FeedbackMedia[];
}

export type FeedbackMedia = {
    id: number;
    feedbackId: number;
    mediaUrl: string;
    mediaType: MediaType;
}

export enum MediaType {
    IMAGE = "IMAGE",
    VIDEO = "VIDEO"
}