import { Blog } from "./post.types";

export interface ApiResponse {
  success: boolean;
  message: string;
  posts?: Array<Blog>;
}
