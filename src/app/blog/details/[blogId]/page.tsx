"use client";

import DateTimeFormate from "@/components/DateTimeFormate";
import { useGetSingleBlogQuery } from "@/states/blogApi";
import { useParams } from "next/navigation";

export default function BlogListPage() {
  const { blogId }: { blogId: string } = useParams();
  const { data: blog, isLoading } = useGetSingleBlogQuery(blogId);

  if (isLoading) return <p>Loading blog...</p>;

  return (
    <div className="container mx-auto pt-16">
      <h1 className="text-xl font-bold text-center mb-4">Blog Details</h1>

      {blog && (
        <div className="border p-4 rounded mb-5">
          <img
            src={blog?.image}
            alt="Blog"
            className="max-h-48 object-cover rounded"
          />
          <p className="text-xs mt-1.5">
            <DateTimeFormate isoString={blog.createdAt || ""} />
          </p>
          <h2 className="text-lg font-semibold">{blog.title}</h2>
          <p>
            <strong>Category:</strong> {blog?.category}
          </p>
          <p className="my-2 text-justify">{blog?.content}</p>

          <p className="text-sm text-gray-500">Posted by {blog?.email}</p>
          <p className="text-sm text-gray-500">
            Updated at: <DateTimeFormate isoString={blog.updatedAt || ""} />
          </p>
        </div>
      )}
    </div>
  );
}
