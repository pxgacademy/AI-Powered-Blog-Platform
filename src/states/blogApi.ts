import { Blog, CreateBlogInput, GeminiResponse } from "@/types";
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

    getSingleBlog: builder.query<Blog, string>({
      query: (link) => `/get-single-blog/${link}`,
    }),

    getAiBlogRes: builder.mutation<GeminiResponse, { prompt: string }>({
      query: (body) => ({
        url: "/gemini-blog",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetBlogsQuery,
  useGetSingleBlogQuery,
  useGetAiBlogResMutation,
} = blogApi;
