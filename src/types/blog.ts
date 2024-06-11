//A Blog consist of a title, a date, and a body of text and images
export type Blog = {
    blogId: number;
    title: string;
    createDate: Date;
    content: string;
    imageUrl: string;
}