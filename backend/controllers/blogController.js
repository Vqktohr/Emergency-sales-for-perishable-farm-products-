import asyncHandler from "../middlewares/asyncHandler.js";
import Blog from "../models/blogModel.js";

const addBlog = asyncHandler(async (req, res) => {
    try {
      const { name, description } = req.fields;
  
      // Validation
      switch (true) {
        case !name:
          return res.json({ error: "name is required" });
        case !description:
          return res.json({ error: "Description is required" });
      }

      const blog = new Blog({ ...req.fields });
        await blog.save();
        res.json(blog);
      } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
});

const updateBlogDetails = asyncHandler(async (req, res) => {
    try {
      const { name, description } = req.fields;
  
      // Validation
      switch (true) {
        case !name:
          return res.json({ error: "name is required" });
        case !description:
          return res.json({ error: "Description is required" });
      }
  
      const blog = await Blog.findByIdAndUpdate(
        req.params.id,
        { ...req.fields },
        { new: true }
      );
  
      await blog.save();
  
      res.json(blog);
    } catch (error) {
      console.error(error);
      res.status(400).json(error.message);
    }
});

const removeBlog = asyncHandler(async (req, res) => {
    try {
      const blog = await Blog.findByIdAndDelete(req.params.id);
      res.json(blog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
});

const fetchBlogById = asyncHandler(async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (blog) {
        return res.json(blog);
      } else {
        res.status(404);
        throw new Error("Blog not found");
      }
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: "Blog not found" });
    }
});

const fetchBlogs = asyncHandler(async (req, res) => {
    try {
      const pageSize = 6;
  
      const keyword = req.query.keyword
        ? {
            name: {
              $regex: req.query.keyword,
              $options: "i",
            },
          }
        : {};
  
      const count = await Blog.countDocuments({ ...keyword });
      const blogs = await Blog.find({ ...keyword }).limit(pageSize);
  
      res.json({
        blogs,
        page: 1,
        pages: Math.ceil(count / pageSize),
        hasMore: false,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
});
  
const fetchAllBlogs = asyncHandler(async (req, res) => {
    try {
      const blogs = await Blog.find({})
        .populate("category")
        .limit(12)
        .sort({ createAt: -1 });
  
      res.json(blogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
});

export {
  addBlog,
  updateBlogDetails,
  removeBlog,
  fetchBlogById,
  fetchBlogs,
  fetchAllBlogs,
};
