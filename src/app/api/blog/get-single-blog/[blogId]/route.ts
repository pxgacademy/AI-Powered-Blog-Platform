import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import api_response from "@/components/response";
import dbConnect from "@/lib/db_connect";
import BlogModel from "@/models/blog.model";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function GET(
  req: Request,
  context: { params: { blogId: string } }
) {
  const { blogId }: { blogId: string } = await context.params;

  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session || !session?.user)
      return api_response(false, "Not authenticated", 401);

    const _id = new mongoose.Types.ObjectId(blogId);
    const blog = await BlogModel.findOne({ _id });

    return Response.json(blog);
  } catch (error) {
    console.log("Error from get-single-blog route: ", error);
    return api_response(false, "Internal server error", 500);
  }
}
