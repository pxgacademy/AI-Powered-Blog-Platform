import { Document } from "mongoose";

export interface Blog extends Document {
  title: string;
  content: string;
  category: string;
  image: string;
  date: Date;
  email: string;
}
