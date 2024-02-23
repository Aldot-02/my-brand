import BlogsModel from "../Models/BlogsModel.js";
import mongoose from "mongoose";



// CREATING A NEW BLOG
export const createBlog = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json("Only admins can create blogs.");
    }

    const newBlog = new BlogsModel(req.body);

    try {
        await newBlog.save();
        res.status(200).json("Blog created successfully");
    } catch (error) {
        res.status(500).json(error);
    }
};


// GETTING A BLOG
export const getBlog = async(req, res) => {
    const id = req.params.id

    try {
        const blog = await BlogsModel.findById(id);
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json(error)
    }
}



// UPDATE A BLOG
export const updateBlog = async (req, res) => {
    const blogId = req.params.id;
    const { userId } = req.body;

    try {
        const blog = await BlogsModel.findById(blogId);
        
        if (!req.user.isAdmin && blog.userId !== userId) {
            return res.status(403).json("You do not have permission to update this blog.");
        }
        
        await BlogsModel.updateOne({ _id: blogId }, { $set: req.body });
        res.status(200).json("Blog updated successfully");
    } catch (error) {
        res.status(500).json(error);
    }
};


// DELETING A BLOG
export const deleteBlog = async (req, res) => {
    const blogId = req.params.id;
    const {userId} = req.body

    try {
        const blog = await BlogsModel.findById(blogId);
        if (!req.user.isAdmin && blog.userId !== userId) {
            return res.status(403).json("You do not have permission to update this blog.");
        }

        await post.deleteOne();
        res.status(200).json("Blog deleted successfully");
    } catch (error) {
        res.status(500).json(error);
    }
}