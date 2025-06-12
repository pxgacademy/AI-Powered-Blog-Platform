import { Document, Schema } from "mongoose";

export interface Post extends Document {
  content: string;
  image: string;
  createdAt: Date;
}

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
