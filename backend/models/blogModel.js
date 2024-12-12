import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const blogSchema = mongoose.Schema(
    {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
}, 
{ timestamp: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;