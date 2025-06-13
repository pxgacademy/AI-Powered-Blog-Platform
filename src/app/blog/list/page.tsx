"use client";

import { useGetBlogsQuery } from "@/states/blogApi";

export default function BlogListPage() {
  const { data: blogs, isLoading } = useGetBlogsQuery();

  if (isLoading) return <p>Loading blogs...</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Blog Posts</h1>
      {blogs?.map((blog) => (
        <div key={blog._id} className="border p-4 rounded">
          <p>
            <strong>Category:</strong> {blog.category}
          </p>
          <p>{blog.content}</p>
          <img
            src={blog.image}
            alt="Blog"
            className="w-40 h-40 object-cover mt-2"
          />
          <p className="text-sm text-gray-500">Posted by {blog.email}</p>
        </div>
      ))}
    </div>
  );
}
