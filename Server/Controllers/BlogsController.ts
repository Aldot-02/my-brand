import BlogsModel from "../Models/BlogsModel.js"
import UserModel, { User } from "../Models/UserModel.js";
import mongoose from "mongoose"

// CREATE A NEW BLOG
export const createBlog = async (req: any, res: any) => {
    const { authorId } = req.body;

    try {
        const author: User | null = await UserModel.findById(authorId);
        if (!author || !author.isAdmin) {
            return res.status(403).json("Only admins can create blogs");
        }

        const newBlog = new BlogsModel(req.body);
        await newBlog.save();
        res.status(200).json("Blog Created Successfully");
    } catch (error) {
        res.status(500).json(error);
    }
};

// GET A BLOG
export const getBlog = async(req: any, res: any)=> {
    const id = req.params.id

    try {
        const blog = await BlogsModel.findById(id)

        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json(error)
    }
}


// UPDATE A BLOG
export const updateBlog = async (req: any, res: any) => {
    const blogId = req.params.id;
    const { authorId } = req.body;

    try {
        const blog = await BlogsModel.findById(blogId);
        if (!blog) {
            return res.status(404).json("Blog not found");
        }

        const author: User | null = await UserModel.findById(authorId);
        if (!author || (!author.isAdmin && blog.authorId !== authorId)) {
            return res.status(403).json("Permission Denied");
        }

        await blog.updateOne({ $set: req.body });
        res.status(200).json("Blog Updated Successfully");
    } catch (error) {
        res.status(500).json(error);
    }
};


// DELETE A BLOG
export const deleteBlog = async (req: any, res: any) => {
    const blogId = req.params.id;
    const { authorId } = req.body;

    try {
        const blog = await BlogsModel.findById(blogId);
        if (!blog) {
            return res.status(404).json("Blog not found");
        }

        const author: User | null = await UserModel.findById(authorId);
        if (!author || (!author.isAdmin && blog.authorId !== authorId)) {
            return res.status(403).json("Permission Denied");
        }

        await blog.deleteOne();
        res.status(200).json("Blog deleted Successfully");
    } catch (error) {
        res.status(500).json(error);
    }
};


// LIKING AND DISLIKING A BLOG
export const likeBlog = async(req: any, res: any) => {
    const id = req.params.id
    const { authorId } = req.body

    try {
        const blog = await BlogsModel.findById(id)

        if (blog) {
            if (!blog.likes.includes(authorId)) {
                await blog.updateOne({ $push: { likes: authorId } })
                res.status(200).json("You liked this Post")
            } else {
                await blog.updateOne({ $pull: { likes: authorId } })
                res.status(200).json("You unliked this Post");
            }
        } else {
            res.status(404).json("Blog not found")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}