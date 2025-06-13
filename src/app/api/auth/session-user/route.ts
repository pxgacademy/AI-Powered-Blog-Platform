import dbConnect from "@/lib/db_connect";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/options";
import UserModel from "@/models/user.model";
import api_response from "@/components/response";

export async function GET() {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) return Response.json({ user: null });

    const user = await UserModel.findOne({ email: session.user.email }).select(
      "-password"
    );
    return Response.json({ user });
  } catch (error) {
    console.log("Error from session-uer api route: ", error);
    return api_response(false, "Error creating blog", 500);
  }
}
