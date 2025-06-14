import api_response from "@/components/response";
import dbConnect from "@/lib/db_connect";
import BlogModel from "@/models/blog.model";

export async function GET() {
  try {
    await dbConnect();
    const blogs = await BlogModel.find().sort({ createdAt: -1 });
    return Response.json(blogs);
  } catch (error) {
    console.log("Error from get blog api route: ", error);
    return api_response(false, "Error getting blog", 500);
  }
}
