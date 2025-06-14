import { Blog } from "@/types/post.types";
import mongoose from "mongoose";
import { Schema } from "mongoose";

export const BlogSchema: Schema<Blog> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BlogModel =
  (mongoose.models.Blog as mongoose.Model<Blog>) ||
  mongoose.model("Blog", BlogSchema);

export default BlogModel;
