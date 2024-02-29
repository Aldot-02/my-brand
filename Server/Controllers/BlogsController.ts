// import BlogsModel from "../Models/BlogsModel.js"
// import UserModel, { User } from "../Models/UserModel.js";
// import mongoose from "mongoose"

// // CREATE A NEW BLOG
// export const createBlog = async (req: any, res: any) => {
//     const { authorId } = req.body;

//     try {
//         const author: User | null = await UserModel.findById(authorId);
//         if (!author || !author.isAdmin) {
//             return res.status(403).json("Only admins can create blogs");
//         }
//         const newBlog = new BlogsModel(req.body);
//         await newBlog.save();
//         res.status(200).json("Blog Created Successfully");

//     } catch (error) {
//         res.status(500).json(error);
//     }
// };

// // GET A BLOG
// export const getBlog = async(req: any, res: any)=> {
//     const id = req.params.id

//     try {
//         const blog = await BlogsModel.findById(id)

//         if (!blog) {
//             return res.status(404).json("Blog not found");
//         }else {
//             res.status(200).json(blog)
//         }

//     } catch (error) {
//         res.status(500).json(error)
//     }
// }


// // UPDATE A BLOG
// export const updateBlog = async (req: any, res: any) => {
//     const blogId = req.params._id;
//     const { authorId } = req.body;

//     try {
//         const blog = await BlogsModel.findById(blogId);
//         if (!blog) {
//             return res.status(404).json("Blog not found");
//         }

//         const author: User | null = await UserModel.findById(authorId);
//         if (!author || (!author.isAdmin && blog.authorId !== authorId)) {
//             return res.status(403).json("Permission Denied");
//         }

//         await blog.updateOne({ $set: req.body });
//         res.status(200).json("Blog Updated Successfully");
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };


// // DELETE A BLOG
// export const deleteBlog = async (req: any, res: any) => {
//     const blogId = req.params._id;
//     const { authorId } = req.body;

//     try {
//         const blog = await BlogsModel.findById(blogId);
//         if (!blog) {
//             return res.status(404).json("Blog not found");
//         }

//         const author: User | null = await UserModel.findById(authorId);
//         if (!author || (!author.isAdmin && blog.authorId !== authorId)) {
//             return res.status(403).json("Permission Denied");
//         }

//         await blog.deleteOne();
//         res.status(200).json("Blog deleted Successfully");
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };


// // LIKING AND DISLIKING A BLOG
// export const likeBlog = async(req: any, res: any) => {
//     const id = req.params.id
//     const { authorId } = req.body

//     try {
//         const blog = await BlogsModel.findById(id)

//         if (blog) {
//             if (!blog.likes.includes(authorId)) {
//                 await blog.updateOne({$push:{likes: authorId}});
//                 res.status(200).json("You liked this Blog");
//             } else {
//                 await blog.updateOne({$pull:{likes: authorId}});
//                 res.status(200).json("You unliked this Blog");
//             }
//         } else {
//             res.status(404).json("Blog not found");
//         }
//     } catch (error) {
//         res.status(500).json(error);
//     }
// }

import BlogsModel, { Blog } from "../Models/BlogsModel.js";
import { Request, Response } from "express";

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
    const id = req.params.id;
    const {authorId} = req.body;

    try {
        const blogPost = await BlogsModel.findById(id);
        if (blogPost){
            const index = blogPost.likes.indexOf(authorId);
            if (index === -1) {
                blogPost.likes.push(authorId);
                res.status(200).json("You liked this blog");
            }
            else {
                blogPost.likes.splice(index, 1);
                res.status(200).json("You Unliked this blog");
            }
            await blogPost.save();
        } else {
            res.status(404).json("Blog Post Not Found");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};