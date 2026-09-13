import Groq from "groq-sdk";
import { NextRequest } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

const SYSTEM_PROMPT = `You are an AI assistant for CogniForge AI, a cutting-edge AI engineering company founded by Arjun. Your job is to engage website visitors warmly, understand their needs, and help them explore how Arjun can solve their business problems.

About Arjun & CogniForge AI:
- Arjun is an ML/GenAI engineer with 3+ years of experience building production-grade AI systems
- Services: RAG Chatbot Development, Face Recognition & Auth, GenAI App Development, AI Proctoring Systems
- Tech stack: LangChain, FAISS, Pinecone, InsightFace, ChromaDB, Ollama, DeepSeek, FastAPI, React, Next.js
- Strong focus on data privacy, local LLMs, and enterprise-scale deployments
- 100% project success rate

Your goals:
1. Answer questions about Arjun's services, experience, and tech expertise enthusiastically
2. Help identify which service best fits the visitor's needs
3. Encourage the visitor to book a free consultation at the Contact page
4. Be concise, friendly, and professional – like a senior engineer who loves their work

Do NOT make up specific client names or case studies unless they ask about the portfolio page.
Keep responses short (2-4 sentences) unless a detailed technical explanation is warranted.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, lead } = body;

    // Validate lead capture
    if (!lead || !lead.name || !lead.email) {
      return new Response(
        JSON.stringify({ error: "Lead information (name and email) is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "At least one message is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Missing GROQ_API_KEY. Please add it to .env.local and restart the server." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Format messages for Groq
    const groqMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.content,
      }))
    ];

    // Create streaming encoder
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const chatCompletion = await groq.chat.completions.create({
            messages: groqMessages as any,
            model: "groq/compound-mini",
            stream: true,
          });

          for await (const chunk of chatCompletion) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              const dataString = `data: ${JSON.stringify({ text: content })}\n\n`;
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
