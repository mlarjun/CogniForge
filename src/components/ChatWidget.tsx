"use client";

import React, { useReducer, useRef, useEffect, useCallback, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Lead {
  name: string;
  email: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface State {
  isOpen: boolean;
  lead: Lead | null;
  leadForm: { name: string; email: string };
  messages: Message[];
  input: string;
  isStreaming: boolean;
  error: string | null;
}

type Action =
  | { type: "TOGGLE" }
  | { type: "SET_LEAD_FORM"; field: "name" | "email"; value: string }
  | { type: "SUBMIT_LEAD" }
  | { type: "SET_SAVED_LEAD"; lead: Lead }
  | { type: "SET_INPUT"; value: string }
  | { type: "SEND_MESSAGE" }
  | { type: "APPEND_CHUNK"; chunk: string }
  | { type: "FINISH_STREAM" }
  | { type: "SET_ERROR"; error: string }
  | { type: "CLEAR_ERROR" };

// ─── Reducer ─────────────────────────────────────────────────────────────────

const initialState: State = {
  isOpen: false,
  lead: null,
  leadForm: { name: "", email: "" },
  messages: [],
  input: "",
  isStreaming: false,
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "TOGGLE":
      return { ...state, isOpen: !state.isOpen, error: null };
    case "SET_LEAD_FORM":
      return {
        ...state,
        leadForm: { ...state.leadForm, [action.field]: action.value },
      };
    case "SUBMIT_LEAD": {
      const name = state.leadForm.name.trim();
      const email = state.leadForm.email.trim();
      if (!name || !email) return state;
      try {
        localStorage.setItem("cogniforge_chat_lead", JSON.stringify({ name, email }));
      } catch {}
      return {
        ...state,
        lead: { name, email },
        messages: [
          {
            role: "assistant",
            content: `Hi ${name}! 👋 I'm Arjun's AI assistant. I'd love to help you explore how CogniForge AI can solve your engineering challenges. What are you working on?`,
          },
        ],
      };
    }
    case "SET_SAVED_LEAD":
      return {
        ...state,
        lead: action.lead,
        messages: [
          {
            role: "assistant",
            content: `Welcome back, ${action.lead.name}! 👋 How can I help you today?`,
          },
        ],
      };
    case "SET_INPUT":
      return { ...state, input: action.value };
    case "SEND_MESSAGE":
      if (!state.input.trim() || state.isStreaming) return state;
      return {
        ...state,
        messages: [
          ...state.messages,
          { role: "user", content: state.input.trim() },
          { role: "assistant", content: "" }, // placeholder for streaming
        ],
        input: "",
        isStreaming: true,
        error: null,
      };
    case "APPEND_CHUNK": {
      const msgs = [...state.messages];
      const last = msgs[msgs.length - 1];
      if (last && last.role === "assistant") {
        msgs[msgs.length - 1] = { ...last, content: last.content + action.chunk };
      }
      return { ...state, messages: msgs };
    }
    case "FINISH_STREAM":
      return { ...state, isStreaming: false };
    case "SET_ERROR":
      return { ...state, isStreaming: false, error: action.error };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mark client mounted and check for saved lead
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("cogniforge_chat_lead");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name && parsed.email) {
          dispatch({ type: "SET_SAVED_LEAD", lead: parsed });
        }
      }
    } catch {}
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.messages]);

  // Focus input when open
  useEffect(() => {
    if (state.lead && state.isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [state.lead, state.isOpen]);

  const sendMessage = useCallback(async () => {
    if (!state.input.trim() || state.isStreaming || !state.lead) return;

    const userContent = state.input.trim();

    // Filter previous messages (ignoring empty streaming placeholders)
    const conversationHistory: Message[] = state.messages
      .filter((m) => m.content !== "")
      .map((m) => ({ role: m.role, content: m.content }));

    dispatch({ type: "SEND_MESSAGE" });

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead: state.lead,
          messages: [
            ...conversationHistory,
            { role: "user", content: userContent },
          ],
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        dispatch({ type: "SET_ERROR", error: err.error || "Request failed." });
        return;
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) {
        dispatch({ type: "SET_ERROR", error: "No response stream from server." });
        return;
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") break;
          try {
            const parsed = JSON.parse(data);
            if (parsed.error) {
              dispatch({ type: "SET_ERROR", error: parsed.error });
              return;
            }
            if (parsed.text) {
              dispatch({ type: "APPEND_CHUNK", chunk: parsed.text });
            }
          } catch {
            // ignore partial JSON chunk
          }
        }
      }

      dispatch({ type: "FINISH_STREAM" });
    } catch {
      dispatch({ type: "SET_ERROR", error: "Network error. Please check your connection." });
    }
  }, [state.input, state.isStreaming, state.lead, state.messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = state.leadForm.name.trim();
    const email = state.leadForm.email.trim();
    if (!name || !email) return;

    dispatch({ type: "SUBMIT_LEAD" });

    // Send lead notification to owner email in background
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        source: "chat-widget",
      }),
    }).catch((err) => {
      console.warn("Failed to notify lead to server:", err);
    });
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-auto">
      {/* Chat Panel */}
      {state.isOpen && (
        <div
          id="chat-panel"
          className="bg-surface border border-white/10 rounded-2xl w-80 sm:w-96 shadow-2xl mb-4 flex flex-col overflow-hidden"
          style={{ height: "480px" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-white/5 p-4 flex justify-between items-center flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <div>
                <span className="font-semibold text-sm block leading-tight text-white">CogniForge AI</span>
                <span className="text-xs text-gray-400">Arjun&apos;s Assistant (Online)</span>
              </div>
            </div>
            <button
              id="chat-close-btn"
              onClick={() => dispatch({ type: "TOGGLE" })}
              className="text-gray-400 hover:text-white transition-colors p-1"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Lead Capture Gate */}
          {!state.lead ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-3">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-base mb-1">Chat with Arjun&apos;s AI</h3>
              <p className="text-gray-400 text-xs mb-5 max-w-xs">
                Enter your details to start chatting directly with CogniForge&apos;s AI assistant.
              </p>
              <form id="lead-capture-form" onSubmit={handleLeadSubmit} className="w-full space-y-3 text-left">
                <input
                  id="lead-name-input"
                  type="text"
                  placeholder="Your Name"
                  value={state.leadForm.name}
                  onChange={(e) => dispatch({ type: "SET_LEAD_FORM", field: "name", value: e.target.value })}
                  required
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors text-white placeholder-gray-500"
                />
                <input
                  id="lead-email-input"
                  type="email"
                  placeholder="Your Email"
                  value={state.leadForm.email}
                  onChange={(e) => dispatch({ type: "SET_LEAD_FORM", field: "email", value: e.target.value })}
                  required
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors text-white placeholder-gray-500"
                />
                <button
                  id="lead-submit-btn"
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-background font-bold py-2.5 rounded-xl transition-all text-sm shadow-[0_0_15px_rgba(45,212,191,0.3)] cursor-pointer"
                >
                  Start Chatting →
                </button>
              </form>
            </div>
          ) : (
            /* Message View */
            <>
              <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
                {state.messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`text-sm p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary/20 border border-primary/30 text-white self-end rounded-tr-sm"
                        : "bg-surface border border-white/10 text-gray-200 self-start rounded-tl-sm whitespace-pre-wrap"
                    }`}
                  >
                    {msg.content ? (
                      msg.content
                    ) : (
                      <span className="flex gap-1 items-center h-4 py-1">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </span>
                    )}
                  </div>
                ))}
                {state.error && (
                  <div className="text-red-400 text-xs text-center bg-red-400/10 border border-red-400/20 rounded-xl p-2.5">
                    {state.error}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Bar */}
              <div className="p-3 border-t border-white/5 bg-surface/80 backdrop-blur-sm flex gap-2 flex-shrink-0">
                <input
                  id="chat-message-input"
                  ref={inputRef}
                  type="text"
                  placeholder={state.isStreaming ? "Thinking..." : "Type your message..."}
                  value={state.input}
                  onChange={(e) => dispatch({ type: "SET_INPUT", value: e.target.value })}
                  onKeyDown={handleKeyDown}
                  disabled={state.isStreaming}
                  className="flex-1 bg-background border border-white/10 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors text-white placeholder-gray-500 disabled:opacity-50"
                />
                <button
                  id="chat-send-btn"
                  onClick={sendMessage}
                  disabled={state.isStreaming || !state.input.trim()}
                  className="w-10 h-10 bg-primary hover:bg-primary-hover rounded-full flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 cursor-pointer"
                  aria-label="Send message"
                >
                  <svg className="w-4 h-4 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* FAB Toggle Button */}
      <button
        id="chat-toggle-btn"
        onClick={() => dispatch({ type: "TOGGLE" })}
        className="w-14 h-14 bg-primary hover:bg-primary-hover rounded-full shadow-[0_0_20px_rgba(45,212,191,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0 cursor-pointer group"
        aria-label="Toggle chat"
      >
        {!state.isOpen ? (
          <svg className="w-6 h-6 text-background group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-background group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </button>
    </div>
  );
}
