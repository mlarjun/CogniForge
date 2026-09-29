"use client";

import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', service: 'rag-chatbot', description: '', budget: ''
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source: "contact-page",
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message. Please try again or reach out via WhatsApp.");
      }

      setStatus("success");
      setFormData({
        name: '', email: '', company: '', service: 'rag-chatbot', description: '', budget: ''
      });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Let&apos;s Build Something</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to integrate production-grade AI into your enterprise? Fill out the form below or contact me directly via WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-surface p-8 rounded-3xl border border-white/5 space-y-8">
              <div>
                <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Location</h3>
                <p className="text-xl text-white font-medium">Chennai, Tamil Nadu<br />India</p>
              </div>

              <div>
                <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Direct Contact</h3>
                <a href="https://wa.me/+916369186624" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-lg text-white hover:text-primary transition-colors bg-green-500/10 px-4 py-3 rounded-xl border border-green-500/20 w-fit">
                  <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                  WhatsApp Me
                </a>
              </div>

              <div>
                <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Availability</h3>
                <div className="flex items-center gap-2 text-white">
                  <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(45,212,191,0.6)]"></div>
                  Accepting new projects
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-surface p-8 lg:p-12 rounded-3xl border border-white/5">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center text-center h-full py-12">
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Message Received!</h2>
                  <p className="text-gray-400 text-lg mb-8">Thank you for reaching out. We will get back to you within 24 hours.</p>
                  <button onClick={() => setStatus("idle")} className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-colors border border-white/10">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Your Name *</label>
                      <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Email Address *</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="john@company.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Company</label>
                      <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="Acme Inc." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Service Needed *</label>
                      <select name="service" value={formData.service} onChange={handleChange} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none">
                        <option value="rag-chatbot">RAG Chatbot Development</option>
                        <option value="face-rec">Face Recognition & Auth</option>
                        <option value="genai-app">GenAI-Powered App</option>
                        <option value="ai-proctoring">AI Proctoring Systems</option>
                        <option value="ml-model">ML Model Development</option>
                        <option value="fullstack-ai">Full-Stack AI Application</option>
                        <option value="other">Other / Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Project Description *</label>
                    <textarea required name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none" placeholder="Briefly describe your project requirements, challenges, and goals..."></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Budget Range</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['<$1k', '$1k - $3k', '$3k - $10k', '>$10k'].map((budget) => (
                        <label key={budget} className={`flex items-center justify-center py-3 border rounded-xl cursor-pointer transition-colors ${formData.budget === budget ? 'bg-primary/10 border-primary text-primary' : 'bg-background border-white/10 text-gray-400 hover:border-white/30'}`}>
                          <input type="radio" name="budget" value={budget} checked={formData.budget === budget} onChange={handleChange} className="hidden" />
                          <span className="text-sm font-medium">{budget}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {status === "error" && errorMessage && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-start gap-3">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <span className="font-semibold block">Failed to send inquiry</span>
                        <span>{errorMessage}</span>
                      </div>
                    </div>
                  )}

                  <button type="submit" disabled={status === "submitting"} className="w-full py-4 bg-primary hover:bg-primary-hover text-background font-bold text-lg rounded-xl transition-all shadow-[0_0_20px_rgba(45,212,191,0.3)] hover:shadow-[0_0_30px_rgba(45,212,191,0.5)] disabled:opacity-70 disabled:cursor-not-allowed mt-4">
                    {status === "submitting" ? "Sending Request..." : "Submit Project Inquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
