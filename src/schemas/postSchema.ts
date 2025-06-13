import { z } from "zod";

export const BlogSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters" }),
  image: z.string(),
  category: z.string(),
  email: z.string(),
  date: z.string(),
});
