import { Document } from "mongoose";

export interface Post extends Document {
  content: string;
  image: string;
  date: Date;
}
