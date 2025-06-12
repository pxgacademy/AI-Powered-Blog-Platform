import { Document } from "mongoose";

export interface Blog extends Document {
  content: string;
  category: string;
  image: string;
  date: Date;
}
