"use client";

import React, { useState, useRef, useEffect } from "react";
import { Message, formatContent } from "./types";

// ─── RAG Demo Knowledge Base ─────────────────────────────────────────────────
const RAG_KB: Record<string, string> = {
  services: "CogniForge AI offers: RAG Chatbot Development ($300–$1,500), Face Recognition & Auth ($400–$1,500), GenAI App Development ($500–$2,000), AI Proctoring ($800–$3,000), ML Model Development ($1,000–$5,000), and Full-Stack AI Applications ($1,000–$4,000).",
  rag: "Our RAG chatbot development service builds custom document Q&A bots using LangChain, FAISS, and Pinecone. Typical deliverable: a fully functional streaming chat interface that references your uploaded documents. Starting from $300.",
  face: "Our Face Recognition system uses InsightFace and ArcFace for biometric authentication. We build Chrome extensions, Electron apps, and web APIs with ChromaDB vector stores. <200ms latency. 99.8% accuracy. Starting from $400.",
  "face recognition": "Our Face Recognition system uses InsightFace and ArcFace for biometric authentication. We build Chrome extensions, Electron apps, and web APIs with ChromaDB vector stores. <200ms latency. 99.8% accuracy. Starting from $400.",
  genai: "GenAI App Development uses Ollama and DeepSeek for on-premise, privacy-first LLM deployments. We build roleplay training platforms, content workflows, and code review assistants. Starting from $500.",
  proctoring: "Our AI Proctoring systems real-time webcam-based exam monitoring using MediaPipe and SpeechBrain. Tracks gaze deviation, multiple face detection, and background audio. Starting from $800.",
  pricing: "Our pricing ranges from $300 for RAG chatbots to $5,000 for complex ML model development. All quotes are custom based on scope. Contact us for a free consultation.",
  contact: "You can reach Arjun via the Contact page (WhatsApp, or form). Located in Chennai, India. Available globally for remote projects. Typically responds within 24 hours.",
  arjun: "Arjun is an ML/GenAI engineer with 3+ years of experience. Founder of CogniForge AI, Chennai, India. Specializes in RAG systems, computer vision, and local LLM deployment. Available for freelance projects.",
  stack: "CogniForge AI's tech stack: LangChain, FAISS, Pinecone, InsightFace, ArcFace, ChromaDB, Ollama, DeepSeek, FastAPI, Django, React, Next.js, MediaPipe, SpeechBrain, LangSmith.",
  technology: "CogniForge AI's tech stack: LangChain, FAISS, Pinecone, InsightFace, ArcFace, ChromaDB, Ollama, DeepSeek, FastAPI, Django, React, Next.js, MediaPipe, SpeechBrain, LangSmith.",
};

function ragSearch(query: string): string {
  const lower = query.toLowerCase();
  const entries = Object.entries(RAG_KB);
  
  const scored = entries.map(([key, value]) => {
    const score =
      (lower.includes(key) ? 10 : 0) +
      key.split(" ").filter((w) => lower.includes(w)).length * 3;
    return { key, value, score };
  });
  
  const best = scored.sort((a, b) => b.score - a.score)[0];
  
  if (best.score > 0) {
    return best.value;
  }
  
  return "I found relevant information in our knowledge base. Could you rephrase your question? I can answer about: services, pricing, RAG, face recognition, GenAI, AI proctoring, tech stack, contact info, and Arjun's background.";
}

export function RagDemo() {
  const [ragMessages, setRagMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hello! I'm a demo RAG assistant with access to CogniForge AI's knowledge base. Ask me anything about Arjun's services, pricing, tech stack, or background!",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [ragInput, setRagInput] = useState("");
  const [ragTyping, setRagTyping] = useState(false);
  const ragEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { ragEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [ragMessages]);

  const handleRagSend = async () => {
    if (!ragInput.trim() || ragTyping) return;
    const userMsg: Message = { role: "user", content: ragInput.trim(), timestamp: new Date().toLocaleTimeString() };
    setRagMessages((prev) => [...prev, userMsg]);
    setRagInput("");
    setRagTyping(true);

    const answer = ragSearch(ragInput.trim());
    
    // Simulate typing delay
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));
    
    setRagMessages((prev) => [
      ...prev,
      { role: "assistant", content: `📄 **Retrieved from Knowledge Base:**\n\n${answer}`, timestamp: new Date().toLocaleTimeString() },
    ]);
    setRagTyping(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Info Panel */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-surface border border-white/5 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-white mb-3">How it Works</h2>
          <ol className="space-y-3 text-sm text-gray-400">
            <li className="flex gap-3"><span className="text-primary font-bold">1.</span> Documents are chunked and embedded into a FAISS vector store</li>
            <li className="flex gap-3"><span className="text-primary font-bold">2.</span> Your query is embedded and compared via cosine similarity</li>
            <li className="flex gap-3"><span className="text-primary font-bold">3.</span> Top-k chunks are retrieved and passed to the LLM as context</li>
            <li className="flex gap-3"><span className="text-primary font-bold">4.</span> The LLM streams a grounded answer citing the source</li>
          </ol>
        </div>

        <div className="bg-surface border border-white/5 rounded-3xl p-6">
          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Try asking about</h3>
          <div className="flex flex-wrap gap-2">
            {["Services & pricing", "RAG chatbot", "Face recognition", "GenAI apps", "Tech stack", "Contact Arjun"].map((q) => (
              <button
                key={q}
                onClick={() => setRagInput(q)}
                className="text-xs px-3 py-2 bg-background border border-white/10 text-gray-300 rounded-lg hover:border-primary/40 hover:text-primary transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-5">
          <p className="text-xs text-gray-400 leading-relaxed">
            <span className="text-primary font-semibold">This demo</span> uses a local in-memory knowledge base. A real deployment uses LangChain + FAISS/Pinecone with your own documents streamed via SSE.
          </p>
        </div>
      </div>

      {/* Chat Panel */}
      <div className="lg:col-span-2 bg-surface border border-white/5 rounded-3xl overflow-hidden flex flex-col" style={{ height: "560px" }}>
        <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="font-semibold text-sm">RAG Knowledge Assistant</span>
          </div>
          <span className="text-xs text-gray-500 font-mono bg-background px-3 py-1 rounded-full">FAISS · In-Memory · Demo Mode</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {ragMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user" ? "bg-primary/20 border border-primary/30 text-white rounded-tr-sm" : "bg-background border border-white/10 text-gray-200 rounded-tl-sm"}`}>
                <div dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }} />
                <div className="text-xs text-gray-500 mt-1.5">{msg.timestamp}</div>
              </div>
            </div>
          ))}
          {ragTyping && (
            <div className="flex justify-start">
              <div className="bg-background border border-white/10 px-4 py-3 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1 items-center h-4">
                  {[0, 150, 300].map((delay) => (
                    <span key={delay} className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={ragEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-white/5 p-4 flex gap-3 flex-shrink-0">
          <input
            id="rag-input"
            type="text"
            value={ragInput}
            onChange={(e) => setRagInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleRagSend(); }}
            placeholder="Ask the RAG assistant anything..."
            disabled={ragTyping}
            className="flex-1 bg-background border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
          />
          <button
            id="rag-send"
            onClick={handleRagSend}
            disabled={ragTyping || !ragInput.trim()}
            className="w-10 h-10 bg-primary hover:bg-primary-hover rounded-full flex items-center justify-center transition-all disabled:opacity-40"
          >
            <svg className="w-4 h-4 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
