/**
 * Blog, used to store the details of a blog
 * @param blogId: number, the id of the blog
 * @param blogCategoryId: number, the id of the blog category
 * @param accountId: number, the id of the account created the blog
 * @param title: string, the title of the blog
 * @param createAt: Date, the created date of the blog
 * @param updatedAt: Date, the updated date of the blog
 * @param docUrl: string, the document url of the blog
 * @param imageUrl: string, the image url of the blog
 */
export type Blog = {
    /**  Blog id of the blog */
    blogId: number;
    /**  Blog category id of the blog */
    blogCategoryId: number;
    /** Account id of the blog creator */
    accountId: number;
    /** Title of the blog */
    title: string;
    /**  Created date of the blog */
    createAt: Date;
    /**  Updated date of the blog */
    updatedAt: Date;
    /**
     * Document url of the blog
     * For this project, we use Google Docs to write the blog
     * So, the document url is the shareable link of the Google Docs
     */
    docUrl: string;
    /** Image url of the blog */
    imageUrl: string;
}

