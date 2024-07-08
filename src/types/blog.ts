/**
 * Blog, used to store the details of a blog
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

