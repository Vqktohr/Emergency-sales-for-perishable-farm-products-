import { CATEGORY_URL, BLOG_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const blogApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getBlogs: builder.query({
        query: ({ keyword }) => ({
          url: `${BLOG_URL}`,
          params: { keyword },
        }),
        keepUnusedDataFor: 5,
        providesTags: ["Blogs"],
      }),
  
      getBlogById: builder.query({
        query: (blogId) => `${BLOG_URL}/${blogId}`,
        providesTags: (result, error, blogId) => [
          { type: "Blog", id: blogId },
        ],
      }),
  
      allBlogs: builder.query({
        query: () => `${BLOG_URL}/allBlogs`,
      }),
  
      getBlogDetails: builder.query({
        query: (blogId) => ({
          url: `${BLOG_URL}/${blogId}`,
        }),
        keepUnusedDataFor: 5,
      }),
  
      createBlog: builder.mutation({
        query: (blogData) => ({
          url: `${BLOG_URL}`,
          method: "POST",
          body: blogData,
        }),
        invalidatesTags: ["Blog"],
      }),
  
      updateBlog: builder.mutation({
        query: ({ blogId, formData }) => ({
          url: `${BLOG_URL}/${blogId}`,
          method: "PUT",
          body: formData,
        }),
      }),
  
      uploadProductImage: builder.mutation({
        query: (data) => ({
          url: `${UPLOAD_URL}`,
          method: "POST",
          body: data,
        }),
      }),
  
      deleteBlog: builder.mutation({
        query: (blogId) => ({
          url: `${BLOG_URL}/${blogId}`,
          method: "DELETE",
        }),
        providesTags: ["Blog"],
      }),
  
    }),
  });
  
  export const {
    useGetBlogByIdQuery,
    useGetBlogQuery,
    useGetBlogDetailsQuery,
    useAllBlogsQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
    useUploadProductImageMutation,
  } = blogApiSlice;
  