"use client";

import React, { useState } from "react";
import { RagDemo } from "@/components/demos/RagDemo";
import { GenaiDemo } from "@/components/demos/GenaiDemo";

export default function DemosPage() {
  const [activeDemo, setActiveDemo] = useState<"rag" | "genai">("rag");

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium">
            Live Interactive Demos
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            See the Tech in Action
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Two live demos showcasing the technology behind CogniForge AI&apos;s services. No API key needed — try them now.
          </p>
        </div>

        {/* Demo Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            id="tab-rag"
            onClick={() => setActiveDemo("rag")}
            className={`px-8 py-3.5 rounded-full font-semibold transition-all ${activeDemo === "rag" ? "bg-primary text-background shadow-[0_0_20px_rgba(45,212,191,0.4)]" : "bg-surface border border-white/10 text-gray-300 hover:border-primary/30"}`}
          >
            📄 RAG Q&A Demo
          </button>
          <button
            id="tab-genai"
            onClick={() => setActiveDemo("genai")}
            className={`px-8 py-3.5 rounded-full font-semibold transition-all ${activeDemo === "genai" ? "bg-primary text-background shadow-[0_0_20px_rgba(45,212,191,0.4)]" : "bg-surface border border-white/10 text-gray-300 hover:border-primary/30"}`}
          >
            🤖 GenAI Persona Chat
          </button>
        </div>

        {activeDemo === "rag" && <RagDemo />}
        {activeDemo === "genai" && <GenaiDemo />}

      </div>
    </div>
  );
}
