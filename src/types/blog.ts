import { HtmlContext } from "next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints";

//A Blog consist of a title, a date, and a body of text and images
export type Blog = {
    blogId: number;
    title: string;
    createDate: Date;
    body: string;
    imageSrc: string;
}