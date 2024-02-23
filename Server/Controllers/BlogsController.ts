import { Request, Response } from 'express';
import BlogsModel, { Blog } from "../Models/BlogsModel.js";

// CREATING A NEW BLOG
export const createBlog = async (req: Request, res: Response): Promise<void> => {
    // try {
    //     if (!req.user.isAdmin) {
    //         return res.status(403).json("Only admins can create blogs.");
    //     }

    //     const newBlog: Blog = new BlogsModel(req.body);

    //     await newBlog.save();
    //     res.status(200).json("Blog created successfully");
    // } catch (error) {
    //     res.status(500).json(error);
    // }
};

// GETTING A BLOG
export const getBlog = async (req: Request, res: Response): Promise<void> => {
    // const id: string = req.params.id;

    // try {
    //     const blog: Blog | null = await BlogsModel.findById(id);
    //     res.status(200).json(blog);
    // } catch (error) {
    //     res.status(500).json(error);
    // }
};

// UPDATE A BLOG
export const updateBlog = async (req: Request, res: Response): Promise<void> => {
    // const blogId: string = req.params.id;
    // const { userId }: { userId: string } = req.body;

    // try {
    //     const blog: Blog | null = await BlogsModel.findById(blogId);

    //     if (!req.user.isAdmin && blog?.userId !== userId) {
    //         return res.status(403).json("You do not have permission to update this blog.");
    //     }

    //     await BlogsModel.updateOne({ _id: blogId }, { $set: req.body });
    //     res.status(200).json("Blog updated successfully");
    // } catch (error) {
    //     res.status(500).json(error);
    // }
};

// DELETING A BLOG
export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
    // const blogId: string = req.params.id;
    // const { userId }: { userId: string } = req.body;

    // try {
    //     const blog: Blog | null = await BlogsModel.findById(blogId);

    //     if (!req.user.isAdmin && blog?.userId !== userId) {
    //         return res.status(403).json("You do not have permission to delete this blog.");
    //     }

    //     await BlogsModel.deleteOne({ _id: blogId });
    //     res.status(200).json("Blog deleted successfully");
    // } catch (error) {
    //     res.status(500).json(error);
    // }
};