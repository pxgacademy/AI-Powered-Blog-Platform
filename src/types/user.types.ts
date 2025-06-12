import { Document } from "mongoose";
import { Post } from "./post.types";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  messages: Post[];
}
