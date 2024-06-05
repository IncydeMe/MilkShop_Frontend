import { HtmlContext } from "next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints";

//A Blog Category consist of a blog category id, a blog category name, and a list of the blog
export type ProductCategory = {
    id: number;
    name: string;
}