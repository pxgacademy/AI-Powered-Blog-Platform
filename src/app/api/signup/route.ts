import api_response from "@/components/response";
import dbConnect from "@/lib/db_connect";
import UserModel from "@/models/user.model";
import { hash } from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { name, email, password } = await request.json();

    const existingUserByEmail = await UserModel.findOne({ email });
    if (existingUserByEmail)
      return api_response(false, "User already exist with this email", 400);

    const hashedPassword = await hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return api_response(true, "Successfully created user", 200);

    //
  } catch (error) {
    console.log("Error from signup api route: ", error);
    return api_response(false, "Error registering user", 500);
  }
}
