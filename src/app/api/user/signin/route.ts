import api_response from "@/components/response";
import dbConnect from "@/lib/db_connect";
import UserModel from "@/models/user.model";
import { compare } from "bcryptjs";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { email, password } = await req.json();

    const user = await UserModel.findOne({ email });
    if (!user) return api_response(false, "User not found", 400);
    const validPass = await compare(password, user.password);
    if (!validPass) return api_response(false, "Invalid credentials", 401);

    return Response.json(
      { name: user.name, email: user.email },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error from signin api route: ", error);
    return api_response(false, "Error logging in user", 500);
  }
}
