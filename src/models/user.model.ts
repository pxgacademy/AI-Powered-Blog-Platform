import { User } from "@/types/user.types";
import { Schema } from "mongoose";
import { PostSchema } from "./post.model";

const UserSchema: Schema<User> = new Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },

  messages: [PostSchema],
});
