import { z } from "zod";

export const PostSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters" }),
  image: z.string(),
});
