import api_response from "@/components/response";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const { prompt } = await req.json();

    const res = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    return Response.json(res);
  } catch (error) {
    console.log("Error from gemini-blog route: ", error);
    return api_response(false, "Internal server error", 500);
  }
}
