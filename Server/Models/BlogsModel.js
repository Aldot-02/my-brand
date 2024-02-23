import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
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

const BlogsModel = mongoose.model("Blogs", blogSchema);

export default BlogsModel;
