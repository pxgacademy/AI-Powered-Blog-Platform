import api_response from "@/components/response";
import dbConnect from "@/lib/db_connect";
import BlogModel from "@/models/blog.model";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const newBlog = new BlogModel(body);
    await newBlog.save();
    return Response.json(newBlog);
  } catch (error) {
    console.log("Error from create blog api route: ", error);
    return api_response(false, "Error creating blog", 500);
  }
}
