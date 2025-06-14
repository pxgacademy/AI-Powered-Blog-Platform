Great! Let's now extend your project by adding:

### ✅ Blog Features:

1. **Create Blog Post Page** – Form to submit blog data (`content`, `category`, `image`, `email`)
2. **View Blogs Page** – Display all blog posts
3. **RTK Query API** – To handle blog mutations and queries
4. **Mongoose Model** – For blog schema

---

## 🗂 Updated Folder Structure (additional)

```
app/
  blog/
    create/page.tsx
    list/page.tsx
  api/
    blog/
      create/route.ts
      list/route.ts

models/
  Blog.ts

store/
  blogApi.ts

types/
  index.ts (add Blog type)
```

---

## 1️⃣ **models/Blog.ts**

```ts
// models/Blog.ts
import mongoose, { Schema, model, models } from "mongoose";

const blogSchema = new Schema(
  {
    content: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

export const Blog = models.Blog || model("Blog", blogSchema);
```

---

## 2️⃣ **types/index.ts** (extend)

```ts
// types/index.ts
export interface Blog {
  _id: string;
  content: string;
  category: string;
  image: string;
  email: string;
  createdAt?: string;
}

export interface CreateBlogInput {
  content: string;
  category: string;
  image: string;
  email: string;
}
```

---

## 3️⃣ **store/blogApi.ts**

```ts
// store/blogApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Blog, CreateBlogInput } from "@/types";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/blog" }),
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
```

✅ Also add `blogApi.reducer` to `store.ts`:

```ts
// In store/store.ts
import { blogApi } from "./blogApi";

...

reducer: {
  ...
  [blogApi.reducerPath]: blogApi.reducer,
},
middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(userApi.middleware, blogApi.middleware),
```

---

## 4️⃣ **app/api/blog/create/route.ts**

```ts
// app/api/blog/create/route.ts
import { connectDB } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const blog = await Blog.create(body);
  return NextResponse.json(blog);
}
```

---

## 5️⃣ **app/api/blog/list/route.ts**

```ts
// app/api/blog/list/route.ts
import { connectDB } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const blogs = await Blog.find().sort({ createdAt: -1 });
  return NextResponse.json(blogs);
}
```

---

## 6️⃣ **app/blog/create/page.tsx**

```tsx
// app/blog/create/page.tsx
"use client";

import { useState } from "react";
import { useCreateBlogMutation } from "@/store/blogApi";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
  const [form, setForm] = useState({ content: "", category: "", image: "", email: "" });
  const [createBlog] = useCreateBlogMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBlog(form).unwrap();
      router.push("/blog/list");
    } catch (err) {
      alert("Failed to create blog");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <input placeholder="Content" onChange={(e) => setForm({ ...form, content: e.target.value })} />
      <input placeholder="Category" onChange={(e) => setForm({ ...form, category: e.target.value })} />
      <input placeholder="Image URL" onChange={(e) => setForm({ ...form, image: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <button type="submit">Post Blog</button>
    </form>
  );
}
```

---

## 7️⃣ **app/blog/list/page.tsx**

```tsx
// app/blog/list/page.tsx
"use client";

import { useGetBlogsQuery } from "@/store/blogApi";

export default function BlogListPage() {
  const { data: blogs, isLoading } = useGetBlogsQuery();

  if (isLoading) return <p>Loading blogs...</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Blog Posts</h1>
      {blogs?.map((blog) => (
        <div key={blog._id} className="border p-4 rounded">
          <p><strong>Category:</strong> {blog.category}</p>
          <p>{blog.content}</p>
          <img src={blog.image} alt="Blog" className="w-40 h-40 object-cover mt-2" />
          <p className="text-sm text-gray-500">Posted by {blog.email}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## ✅ What’s Next?

Would you like to:

* Add blog edit/delete?
* Filter blogs by category or user?
* Upload actual images (not just URLs)?

Let me know and I’ll guide you further!
