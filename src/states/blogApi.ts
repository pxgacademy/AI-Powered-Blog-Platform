import { Blog, CreateBlogInput } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/blog",
  }),
  endpoints: (builder) => ({
    createBlog: builder.mutation<Blog, CreateBlogInput>({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
    }),

    getBlogs: builder.query<Blog[], void>({
      query: () => "/list",
    }),
  }),
});

export const { useCreateBlogMutation, useGetBlogsQuery } = blogApi;
