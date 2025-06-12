import { Post } from "@/types/post.types";
import { Schema } from "mongoose";

export const PostSchema: Schema<Post> = new Schema({
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
