"use client";

import DateTimeFormate from "@/components/DateTimeFormate";
import { ShortenByCharacters } from "@/components/stringShortener";
import { useGetBlogsQuery } from "@/states/blogApi";
import Link from "next/link";

export default function Home() {
  const { data: blogs, isLoading } = useGetBlogsQuery();

  return (
    <main className="w-full h-full bg-gray-50 min-h-screen pt-16">
      <section className="container mx-auto px-5 sm:px-10 bg-gray-50 min-h-screen">
        <h2 className="text-5xl font-extrabold text-center">Blogs</h2>

        {isLoading ? (
          <div>Loading blogs...</div>
        ) : (
          <div className="w-full mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {blogs?.map((blog) => (
              <div key={blog._id} className="bg-white p-2 rounded shadow">
                <img
                  src={blog.image}
                  alt=""
                  className="h-48 w-full object-cover"
                />
                <p className="text-xs">
                  <DateTimeFormate isoString={blog.createdAt || ""} />
                </p>
                <h3 className="text-lg font-semibold">{blog?.title}</h3>
                <p className="text-sm">
                  <ShortenByCharacters text={blog.content} />{" "}
                  <Link
                    className="text-blue-600"
                    href={`/blog/details/${blog?._id}`}
                  >
                    See more
                  </Link>
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
