import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  return response.text;
}
