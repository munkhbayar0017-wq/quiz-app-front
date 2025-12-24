import { NextRequest } from "next/server";
import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content } = body;

    if (!content) {
      return Response.json({ error: "No message" }, { status: 400 });
    }
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Please provide a concise summary of the following article: ${content}`,
    });
    console.log(response.text);
    return Response.json({ result: response.text });
  } catch (err) {
    return Response.json(
      { error: "Server aldaa garlaa", details: String(err) },
      { status: 500 }
    );
  }
}
