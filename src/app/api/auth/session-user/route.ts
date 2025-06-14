import dbConnect from "@/lib/db_connect";
import UserModel from "@/models/user.model";
import api_response from "@/components/response";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.email) return Response.json({ user: null });

    const user = await UserModel.findOne({ email: token.email }).select(
      "-password"
    );
    return Response.json({ user });
  } catch (error) {
    console.log("Error from session-uer api route: ", error);
    return api_response(false, "Error creating blog", 500);
  }
}
