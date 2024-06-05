import { HtmlContext } from "next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints";

//A Blog consist of a title, a date, and a body of text and images
export type Blog = {
    id: number;
    title: string;
    date: string;
    body: BlogBody;
    image: BlogImage;
}

//A BlogBody is a collection of text and images
export type BlogBody = {
    text: string;
}

//A BlogImage is an image with a source and an alt text
export type BlogImage = {
    src: string;
    alt: string;
}
