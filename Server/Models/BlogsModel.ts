import mongoose, { Schema, Document, Model } from "mongoose";

export interface Blog extends Document {
    authorId: string;
    title: string;
    content: string;
    coverImage: string;
    likes: any[];
    comments: any[];
}

const blogSchema: Schema<Blog> = new mongoose.Schema({
    authorId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    likes: [],
    comments: []
},
{
    timestamps: true
});

const BlogsModel: Model<Blog> = mongoose.model<Blog>("Blogs", blogSchema);

export default BlogsModel;