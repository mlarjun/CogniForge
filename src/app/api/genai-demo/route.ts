import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, persona } = body;

    // Validate request
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "At least one message is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!persona || !persona.label) {
      return new Response(
        JSON.stringify({ error: "Persona information is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Missing GEMINI_API_KEY. Please add it to .env.local and restart the server." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Convert messages array to Gemini format
    const contents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // System instruction for the persona
    const systemInstruction = `You are playing the role of a persona in a customer service training simulator.
Your persona is: ${persona.label}
Description: ${persona.description}

You must embody this persona completely. If you are an angry customer, be irate but realistic. If you are a technical client, ask hard technical questions. If you are an enterprise executive, focus on ROI, risk, and timelines.
DO NOT break character. You are the customer/client, and the user talking to you is the support agent or sales representative trying to help you.
Keep your responses relatively brief (1-3 sentences) as if speaking in a real-time chat.`;

    // Create streaming encoder
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction,
          });

          // Start generation stream
          const result = await model.generateContentStream({ contents });

          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
              const dataString = `data: ${JSON.stringify({ text: chunkText })}\n\n`;
              controller.enqueue(encoder.encode(dataString));
            }
          }

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          const message = err instanceof Error ? err.message : "Stream error";
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`)
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request body." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Return 405 for non-POST methods
export async function GET() {
  return new Response(JSON.stringify({ error: "Method not allowed." }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
}
