"use client";

import { Combobox } from "@/components/Combobox";
import { DatePicker } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateBlogMutation,
  useGetAiBlogResMutation,
} from "@/states/blogApi";
import { selectCurrentUser } from "@/states/userSlice";
import { ArrowUp, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const apiLink =
  "https://api.imgbb.com/1/upload?key=e13fec8a5a7efc33a77d01b46d56c042";

export default function CreateBlogPost() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [image, setImage] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [prompts, setPrompts] = useState<string>("");
  const { replace: redirect } = useRouter();

  const user = useSelector(selectCurrentUser);

  const [crateBlog] = useCreateBlogMutation();
  const [crateAiBlog] = useGetAiBlogResMutation();

  const handleAiBlogGenerate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await crateAiBlog({ prompt: prompts }).unwrap();
      const text = result?.candidates[0]?.content?.parts[0]?.text || "";
      if (!text)
        return toast.error("Error", { description: "Failed to generate text" });

      const cleanText = text
        .replace(/[*_~`#>-]/g, "")
        .replace(/\n{2,}/g, "\n\n");

      setContent(cleanText);

      //
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return toast.error("Error", { description: "Login please..." });

    if (!value || !content || !date || !image || !title)
      return toast.error("Error", {
        description: "Fill the required value(s)",
      });

    setIsSubmitting(true);

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
        title,
        content,
        image: imageRes?.display_url,
        category: value,
        date: date.toString(),
        email: user.email,
      };

      await crateBlog(values).unwrap();

      setTitle("");
      setContent("");
      setValue("");
      setDate(undefined);
      if (fileRef?.current) {
        fileRef.current.value = "";
        setImage(null);
      }
      setPrompts("");
      toast("Success", { description: "Successfully created the blog" });
      redirect("/");

      //
    } catch (error: any) {
      toast.error("Error", { description: error?.message });
    } finally {
      setIsSubmitting(false);
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

        <form onSubmit={handleAiBlogGenerate} className="relative">
          <label className="text-sm font-semibold mb-1.5 inline-block">
            Generate bog from AI
          </label>
          <Textarea
            placeholder="Type your prompts"
            className="max-h-36"
            onChange={(e) => setPrompts(e.target.value)}
          />
          {prompts.trim() && (
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center justify-center absolute bottom-1.5 right-1.5 rounded-full p-1.5 bg-gray-800/5 transition-all duration-200 cursor-pointer ${!isSubmitting && "hover:bg-gray-800 hover:text-white"}`}
            >
              {isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <ArrowUp className="size-4" />
              )}
            </button>
          )}
        </form>

        <div className="border-b" />

        <form onSubmit={onSubmit} className="space-y-6">
          <label className="text-sm font-semibold mb-1.5 inline-block">
            Title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Type a short and attractive title"
          />

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
            ref={fileRef}
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

const result = {
  candidates: [
    {
      content: {
        parts: [
          {
            text: "Okay, here's a snippet about Bangladesh:\n\nBangladesh, officially the People's Republic of Bangladesh, is a South Asian country located on the fertile Bengal delta.  Here's a few quick facts:\n\n*   **It's densely populated:** Bangladesh is one of the most densely populated countries in the world.\n\n*   **Home to the Sundarbans:** A significant portion of the Sundarbans, the world's largest mangrove forest and a UNESCO World Heritage Site, is located in Bangladesh.\n\n*   **Rich culture and history:** It has a rich cultural heritage, with influences from various religions and empires throughout history.  Its language, Bengali, is one of the most spoken languages in the world.\n\n*   **Challenges and Resilience:** The country faces challenges related to poverty, climate change (particularly flooding), and infrastructure development, but the people are known for their resilience and entrepreneurial spirit.\n",
          },
        ],
        role: "model",
      },
      finishReason: "STOP",
      avgLogprobs: -0.3860876317967706,
    },
  ],
  modelVersion: "gemini-2.0-flash",
  usageMetadata: {
    promptTokenCount: 6,
    candidatesTokenCount: 187,
    totalTokenCount: 193,
    promptTokensDetails: [
      {
        modality: "TEXT",
        tokenCount: 6,
      },
    ],
    candidatesTokensDetails: [
      {
        modality: "TEXT",
        tokenCount: 187,
      },
    ],
  },
};
