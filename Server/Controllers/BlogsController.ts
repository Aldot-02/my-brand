import BlogsModel, { Blog } from "../Models/BlogsModel.js";
import { Request, Response } from "express";
import CommentsModel, {Comment} from "../Models/BlogsCommentsModel.js"

// CREATING A BLOG
export const createBlog = async (req: Request, res: Response): Promise<void> => {
    const newBlog = new BlogsModel(req.body);

    try {
        await newBlog.save();
        res.status(200).json("Blog Created");
    } catch (error) {
        res.status(500).json(error);
    }
};


//get a Blog
export const getBlog = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    try {
        const blog = await BlogsModel.findById(id);
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json(error);
    }
};


// get All Blogs
export const getAllBlogs = async (req: Request, res: Response) : Promise<void> => {
    try {
        const blogs: Blog[] = await BlogsModel.find()
        res.status(200).send(blogs);
    } catch (error) {
        res.status(500).json(error);
    }
}

// Update a Blog
export const updateBlog = async (req: Request, res: Response): Promise<void> => {
    const blogPostId = req.params.id;

    try {
        const blogPost = await BlogsModel.findById(blogPostId);
        if(blogPost) {
            await blogPost.updateOne({ $set: req.body });
            res.status(200).json("Blog Post Updated Successfully");

        }
        else {
            res.status(404).json("Blog Post Not found");
        }
    } catch (error: any) {
        res.status(500).json(error);
    }
};

// Delete a Blog
export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    try {
        const blogPost = await BlogsModel.findById(id);
        if (blogPost) {
            await blogPost.deleteOne();
            res.status(200).json("Blog Post Successfully deleted");
        } else {
            res.status(404).json("Blog Post Not Found");
        }
    } catch (error: any) {
        res.status(500).json(error);
    }
};

// Liking a Blog Post
export const likeBlog = async (req: Request, res: Response): Promise<void> => {
    const blogId = req.params.id;
    const userId = req.body.userId;

    try {
        const blogPost = await BlogsModel.findById(blogId);
        if(blogPost){
            const index = blogPost.likes.indexOf(userId);
            if (index !== -1){
                blogPost.likes.splice(index, 1);
                await blogPost.save();
                res.status(200).json("You unliked this Blog");
            } else {
                blogPost.likes.push(userId);
                await blogPost.save();
                res.status(200).json("You liked this Blog");
            }
        } else {
            res.status(404).json("Blog Post Not Found");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// Commenting on a blog post
export const commentBlog = async (req: Request, res: Response): Promise<void> => {
    const blogId = req.params.id;
    const { userId, name, email, message } = req.body;

    try {
        const blogPost = await BlogsModel.findById(blogId);
        if (blogPost) {
            let alreadyCommented = false;
            for (const commentId of blogPost.comments) {
                const comment = await CommentsModel.findById(commentId);
                if (comment && comment.userId === userId) {
                    alreadyCommented = true;
                    break;
                }
            }

            if (alreadyCommented) {
                res.status(400).json("You've already commented on this blog post");
            } else {
                const newComment = new CommentsModel({ userId, name, email, message });
                await newComment.save();

                blogPost.comments.push(newComment._id);
                await blogPost.save();

                res.status(200).json("Comment added successfully");
            }
        } else {
            res.status(404).json("Blog Post Not Found");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};