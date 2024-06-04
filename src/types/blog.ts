import { HtmlContext } from "next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints";

//A Blog consist of a title, a date, and a body of text and images
export type Blog = {
    title: string;
    date: string;
    body: BlogBody;
}

//A BlogBody is a collection of text and images
export type BlogBody = {
    text: string;
    images: BlogImage[];
}

//A BlogImage is an image with a source and an alt text
export type BlogImage = {
    src: string;
    alt: string;
}
