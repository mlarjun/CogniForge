"use client";

import React, { useState, useRef, useEffect } from "react";
import { Message, formatContent } from "./types";

const PERSONAS = [
  {
    id: "angry-customer",
    label: "😤 Angry Customer",
    color: "text-red-400 border-red-400/30 bg-red-400/10",
    description: "Simulate training for difficult customer interactions",
    responses: [
      "This is completely unacceptable! I've been waiting for 3 days and nobody has helped me!",
      "I want to speak to your manager RIGHT NOW. This is the worst service I've ever experienced!",
      "Do you think I have time to wait? I'm a very busy person and your company has wasted my time!",
      "Fine! I'm going to leave a 1-star review everywhere if this isn't resolved in the next 5 minutes!",
    ],
  },
  {
    id: "technical-client",
    label: "🔧 Technical Client",
    color: "text-blue-400 border-blue-400/30 bg-blue-400/10",
    description: "Simulate technical specification discussions",
    responses: [
      "Can you explain the embedding dimensionality of your FAISS index and whether you support HNSW over flat L2?",
      "What's the P99 latency for your inference endpoint? We need sub-100ms for our production workload.",
      "Do you support quantized models like GGUF format for the local LLM deployments?",
      "How does your RAG pipeline handle document chunking strategy — fixed size or semantic splitting?",
    ],
  },
  {
    id: "enterprise-exec",
    label: "💼 Enterprise Executive",
    color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
    description: "Simulate boardroom-level business discussions",
    responses: [
      "What's the ROI projection if we integrate your RAG system across our 500-person support team?",
      "We need a full risk assessment. What happens to our data privacy if your model is cloud-hosted?",
      "Can you give me a 6-month implementation roadmap with clear milestones before I take this to the board?",
      "What's your track record with enterprise clients? Do you have any Fortune 500 references?",
    ],
  },
];

export function GenaiDemo() {
  const [selectedPersona, setSelectedPersona] = useState(PERSONAS[0]);
  const [genaiMessages, setGenaiMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `I'm simulating persona: **${PERSONAS[0].label}**. Type any customer service response and I'll react as this customer persona. Press "Start Scenario" to get an opening message.`,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [genaiInput, setGenaiInput] = useState("");
  const [genaiTyping, setGenaiTyping] = useState(false);
  const genaiEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { genaiEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [genaiMessages]);

  const handlePersonaChange = (persona: typeof PERSONAS[0]) => {
    setSelectedPersona(persona);
    setGenaiMessages([
      {
        role: "assistant",
        content: `Switched to **${persona.label}** persona. ${persona.description}. Press "Start Scenario" to begin!`,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const fetchStreamingResponse = async (currentMessages: Message[]) => {
    try {
      const response = await fetch("/api/genai-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: currentMessages.filter(m => !m.content.startsWith("I'm simulating persona") && !m.content.startsWith("Switched to")),
          persona: selectedPersona,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch response");
      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      setGenaiMessages(prev => [...prev, { role: "assistant", content: "", timestamp: new Date().toLocaleTimeString() }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataStr = line.replace("data: ", "");
            if (dataStr.trim() === "[DONE]") break;
            
            try {
              const data = JSON.parse(dataStr);
              if (data.text) {
                setGenaiMessages(prev => {
                  const newMsgs = [...prev];
                  const lastMsg = { ...newMsgs[newMsgs.length - 1] };
                  lastMsg.content += data.text;
                  newMsgs[newMsgs.length - 1] = lastMsg;
                  return newMsgs;
                });
              }
            } catch (e) {
              console.error("Error parsing chunk", e);
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
      setGenaiMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again.", timestamp: new Date().toLocaleTimeString() }]);
    } finally {
      setGenaiTyping(false);
    }
  };

  const startScenario = async () => {
    if (genaiTyping) return;
    setGenaiTyping(true);
    
    const openingMsg: Message = { role: "user", content: `*[${selectedPersona.label} opens the conversation]*`, timestamp: new Date().toLocaleTimeString() };
    const newMessages = [...genaiMessages, openingMsg];
    setGenaiMessages(newMessages);
    
    await fetchStreamingResponse(newMessages);
  };

  const handleGenaiSend = async () => {
    if (!genaiInput.trim() || genaiTyping) return;
    const userMsg: Message = { role: "user", content: genaiInput.trim(), timestamp: new Date().toLocaleTimeString() };
    
    const newMessages = [...genaiMessages, userMsg];
    setGenaiMessages(newMessages);
    setGenaiInput("");
    setGenaiTyping(true);

    await fetchStreamingResponse(newMessages);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Persona Selector */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-surface border border-white/5 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Select Persona</h2>
          <div className="space-y-3">
            {PERSONAS.map((p) => (
              <button
                key={p.id}
                id={`persona-${p.id}`}
                onClick={() => handlePersonaChange(p)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${selectedPersona.id === p.id ? `${p.color} border-current` : "bg-background border-white/5 hover:border-white/20"}`}
              >
                <div className={`font-semibold text-sm mb-1 ${selectedPersona.id === p.id ? "" : "text-white"}`}>{p.label}</div>
                <div className="text-xs text-gray-400">{p.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-white/5 rounded-3xl p-6">
          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">How it Works</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex gap-2"><span className="text-secondary">→</span> Select a customer persona</li>
            <li className="flex gap-2"><span className="text-secondary">→</span> Hit &quot;Start Scenario&quot; to get an opening</li>
            <li className="flex gap-2"><span className="text-secondary">→</span> Respond as a support agent</li>
            <li className="flex gap-2"><span className="text-secondary">→</span> The AI replies in character</li>
          </ul>
          <p className="text-xs text-gray-500 mt-4">Real deployment uses Ollama + DeepSeek running locally on your servers for full data privacy.</p>
        </div>

        <button
          id="start-scenario-btn"
          onClick={startScenario}
          disabled={genaiTyping}
          className="w-full py-3.5 bg-primary hover:bg-primary-hover text-background font-bold rounded-2xl transition-all shadow-[0_0_15px_rgba(45,212,191,0.3)] disabled:opacity-50"
        >
          ▶ Start Scenario
        </button>
      </div>

      {/* Chat Panel */}
      <div className="lg:col-span-2 bg-surface border border-white/5 rounded-3xl overflow-hidden flex flex-col" style={{ height: "560px" }}>
        <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <span className="font-semibold text-sm">GenAI Persona Simulator</span>
          </div>
          <span className={`text-xs font-mono px-3 py-1 rounded-full border ${selectedPersona.color}`}>{selectedPersona.label}</span>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {genaiMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user" ? "bg-primary/20 border border-primary/30 text-white rounded-tr-sm" : "bg-background border border-white/10 text-gray-200 rounded-tl-sm"}`}>
                <div dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }} />
                <div className="text-xs text-gray-500 mt-1.5">{msg.timestamp}</div>
              </div>
            </div>
          ))}
          {genaiTyping && (
            <div className="flex justify-start">
              <div className="bg-background border border-white/10 px-4 py-3 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1 items-center h-4">
                  {[0, 150, 300].map((delay) => (
                    <span key={delay} className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={genaiEndRef} />
        </div>

        <div className="border-t border-white/5 p-4 flex gap-3 flex-shrink-0">
          <input
            id="genai-input"
            type="text"
            value={genaiInput}
            onChange={(e) => setGenaiInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleGenaiSend(); }}
            placeholder="Type your agent response..."
            disabled={genaiTyping}
            className="flex-1 bg-background border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
          />
          <button
            id="genai-send"
            onClick={handleGenaiSend}
            disabled={genaiTyping || !genaiInput.trim()}
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
