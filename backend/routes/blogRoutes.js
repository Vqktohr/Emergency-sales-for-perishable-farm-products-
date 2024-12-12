import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// controllers
import {
  addBlog,
  updateBlogDetails,
  removeBlog,
  fetchBlogById,
  fetchBlogs,
  fetchAllBlogs,
} from "../controllers/blogController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

router
  .route("/")
  .get(fetchBlogs)
  .post(authenticate, authorizeAdmin, formidable(), addBlog);

router.route("/allblogs").get(fetchAllBlogs);



router
  .route("/:id")
  .get(fetchBlogById)
  .put(authenticate, authorizeAdmin, formidable(), updateBlogDetails)
  .delete(authenticate, authorizeAdmin, removeBlog);

export default router;
