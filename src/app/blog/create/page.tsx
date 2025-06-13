"use client";

import { Combobox } from "@/components/Combobox";
import { DatePicker } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BlogSchema } from "@/schemas/postSchema";
import { useCreateBlogMutation } from "@/states/blogApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const apiLink =
  "https://api.imgbb.com/1/upload?key=e13fec8a5a7efc33a77d01b46d56c042";

export default function CreateBlogPost() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [image, setImage] = useState<File | null>(null);

  const [crateBlog] = useCreateBlogMutation();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value || !content || !date || !image)
      return toast.error("Error", {
        description: "Fill the required value(s)",
      });

    try {
      const imageData = new FormData();
      imageData.append("image", image);

      const imageResponse = await fetch(apiLink, {
        method: "POST",
        body: imageData,
      });

      const { data: imageRes } = await imageResponse.json();
      if (!imageRes?.display_url)
        return toast.error("Error", { description: "Failed to upload image" });

      const values = {
        content,
        image: imageRes?.display_url,
        category: value,
        date,
      };

      //
    } catch (error: any) {
      toast.error("Error", { description: error?.message });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg space-y-8 bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <h1 className="text-xl md:text-4xl font-extrabold tracking-tight mb-6">
            Create a Magical Blog
          </h1>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <label className="text-sm font-semibold mb-1.5 inline-block">
            Content
          </label>
          <Textarea
            className="min-h-40 max-h-80"
            placeholder="Type your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <label className="text-sm font-semibold mb-1.5 inline-block">
            Category
          </label>
          <Combobox value={value} setValue={setValue} />

          <DatePicker date={date} setDate={setDate} />

          <label className="text-sm font-semibold mb-1.5 inline-block">
            Image
          </label>
          <Input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />

          <div className="flex justify-center">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 w-4 animate-spin" /> Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
