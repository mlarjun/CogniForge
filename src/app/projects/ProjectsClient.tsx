"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { RagDemo } from "@/components/demos/RagDemo";
import { GenaiDemo } from "@/components/demos/GenaiDemo";

const projects = [
  {
    id: "exam-proctoring",
    title: "Real-Time AI Exam Proctoring System",
    summary: "An automated behavior tracking and cheating detection system processing high-fps webcam streams in the browser.",
    problem: "Traditional online exams require human proctors, which is expensive and doesn't scale for thousands of concurrent test-takers.",
    solution: "Developed a hybrid pipeline using MediaPipe for fast face mesh tracking and head pose estimation, paired with a cloud-based endpoint running SpeechBrain for background voice detection.",
    result: "Reduced manual proctoring costs by 85% while flagging suspicious behaviors with 94% accuracy in real-world university tests.",
    techStack: ["MediaPipe", "SpeechBrain", "Selenium", "Flask", "LLM Scoring"],
    demoLink: "#",
    githubLink: "#",
  },
  {
    id: "rag-hybrid",
    title: "Hybrid Search Enterprise RAG Assistant",
    summary: "A robust document Q&A system leveraging both semantic meaning and keyword matching for precision search.",
    problem: "Standard RAG systems often fail at finding exact keyword matches (like part numbers or strict legal phrasing) within thousands of uploaded PDFs.",
    solution: "Implemented a hybrid retrieval system combining FAISS (dense embeddings) and BM25 (sparse keyword search). Output is streamed in real-time using Server-Sent Events (SSE).",
    result: "Achieved a 93% precision@5 recall rate compared to the 72% baseline of dense-only retrieval, drastically improving enterprise user trust.",
    techStack: ["LangChain", "FAISS", "BM25", "Sentence-Transformers", "Pinecone", "Django REST", "React", "SSE"],
    demoLink: "#",
    githubLink: "#",
  },
  {
    id: "genai-cc",
    title: "GenAI Customer Care Training Platform",
    summary: "An AI roleplay platform simulating angry and persistent customers to train call center agents.",
    problem: "Training new customer care agents using human supervisors was slow, unscalable, and inconsistent across different regions.",
    solution: "Deployed local Ollama and DeepSeek-R1-14B models on the company's internal servers to simulate diverse customer personas via WebSockets for real-time conversation.",
    result: "Sped up onboarding time from 3 weeks to 1 week with continuous, risk-free training loops monitored tightly via LangSmith.",
    techStack: ["Ollama", "DeepSeek-R1-14B", "LangChain", "Django Channels", "WebSockets", "Redis", "LangSmith"],
    demoLink: "#",
    githubLink: "#",
  },
  {
    id: "face-auth",
    title: "Zero-Trust Face Recognition Auth",
    summary: "Biometric web login solution using vector-based facial embeddings mapped to employee records.",
    problem: "Company needed a foolproof, passwordless and ID-card-less desktop and web access system for high-security facilities.",
    solution: "Built a Chrome Extension and Electron app capturing frames, calculating embeddings locally, and syncing them against a ChromaDB vector store for instant matching using ArcFace and InsightFace.",
    result: "Reduced unauthorized facility access cases to zero, processing matching requests in <200ms with a 99.8% verification accuracy.",
    techStack: ["InsightFace", "ArcFace", "ChromaDB", "Django REST", "React", "Electron", "JWT"],
    demoLink: "#",
    githubLink: "#",
  }
];

export function ProjectsClient() {
  const [activeDemoModal, setActiveDemoModal] = useState<string | null>(null);

  const renderModalContent = () => {
    switch (activeDemoModal) {
      case "rag-hybrid":
        return <RagDemo />;
      case "genai-cc":
        return <GenaiDemo />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Case Studies & Projects</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Explore our real-world implementations of computer vision, generative AI, and classical ML systems solving complex enterprise challenges.
            </p>
          </div>

          <div className="space-y-16">
            {projects.map((project) => (
              <div key={project.id} className="bg-surface rounded-3xl border border-white/5 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8 lg:p-12 flex flex-col justify-center bg-background/30 border-b lg:border-b-0 lg:border-r border-white/5">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{project.title}</h2>
                    <p className="text-gray-400 text-lg mb-6">{project.summary}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20 font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-col xl:flex-row gap-4 mt-auto">
                      {(project.id === "rag-hybrid" || project.id === "genai-cc") ? (
                        <button 
                          onClick={(e) => { e.preventDefault(); setActiveDemoModal(project.id); }}
                          className="flex-1 text-center bg-primary hover:bg-primary-hover text-background font-semibold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(45,212,191,0.3)]"
                        >
                          Launch Live Demo
                        </button>
                      ) : (
                        <a 
                          href={project.demoLink} 
                          className="flex-1 text-center bg-primary/80 hover:bg-primary text-background font-semibold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(45,212,191,0.2)]"
                          onClick={(e) => { 
                            if(project.demoLink === '#') { 
                              e.preventDefault(); 
                              alert('Live demo coming soon!'); 
                            } 
                          }}
                        >
                          Launch Live Demo
                        </a>
                      )}
                      
                      <a href={project.githubLink} className="flex-1 text-center bg-surface border border-white/10 hover:bg-white/5 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
                        View on GitHub
                      </a>
                    </div>
                  </div>
                  
                  <div className="p-8 lg:p-12 flex flex-col justify-center space-y-8 bg-surface">
                    <div>
                      <h3 className="text-xl font-bold border-l-4 border-red-500 pl-4 mb-3 text-white">The Problem</h3>
                      <p className="text-gray-400 pl-5">{project.problem}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold border-l-4 border-secondary pl-4 mb-3 text-white">The Solution</h3>
                      <p className="text-gray-400 pl-5">{project.solution}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold border-l-4 border-green-500 pl-4 mb-3 text-white">The Result</h3>
                      <p className="text-gray-400 pl-5">{project.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={activeDemoModal !== null} onClose={() => setActiveDemoModal(null)}>
        {renderModalContent()}
      </Modal>
    </>
  );
}
