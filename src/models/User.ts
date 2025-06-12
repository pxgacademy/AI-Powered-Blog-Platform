import mongoose, { Document, Schema } from "mongoose";
import { Post, PostSchema } from "./Post";

export interface User extends Document {
  name?: string;
  email: string;
  password: string;
  messages: Post[];
}

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

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model("User", UserSchema);

export default UserModel;
