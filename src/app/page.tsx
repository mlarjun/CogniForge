import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CogniForge AI | Enterprise Grade AI, Engineered for Scale',
  description: 'CogniForge AI builds production-grade RAG systems, biometric authentication, and custom LLM applications engineered for enterprise scale.',
};

export default function Home() {
  const services = [
    {
      title: "RAG Chatbot Development",
      description: "Custom document Q&A bots, knowledge bases, and enterprise search powered by LangChain, FAISS, and Pinecone.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
      )
    },
    {
      title: "Face Recognition & Auth",
      description: "Biometric web and desktop login, attendance, and identity verification using InsightFace and ChromaDB.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      )
    },
    {
      title: "GenAI App Development",
      description: "Custom LLM applications and local AI deployments utilizing Ollama and DeepSeek for privacy-first AI.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
      )
    },
    {
      title: "AI Proctoring Systems",
      description: "Real-time online exam monitoring and behavior detection using MediaPipe and SpeechBrain algorithms.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
      )
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-50 mix-blend-screen pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium tracking-wide">
            Machine Learning & Generative AI Solutions
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-white leading-tight">
            Architecting the Future of <br className="hidden md:block"/>
            <span className="bg-gradient-to-r from-primary via-teal-300 to-secondary bg-clip-text text-transparent">Machine Intelligence</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            CogniForge AI builds production-grade RAG systems, biometric authentication, and custom LLM applications engineered for enterprise scale.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="w-full md:w-auto px-8 py-4 rounded-full bg-primary hover:bg-primary-hover text-background font-bold text-lg transition-all shadow-[0_0_20px_rgba(45,212,191,0.4)] hover:shadow-[0_0_30px_rgba(45,212,191,0.6)]">
              Get a Free Consultation
            </Link>
            <Link href="/projects" className="w-full md:w-auto px-8 py-4 rounded-full bg-surface border border-white/10 hover:bg-white/5 text-white font-semibold text-lg transition-all">
              View Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24 bg-surface/50 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What We Do</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We specialize in solving complex business challenges using state-of-the-art AI models, 
              computer vision, and real-time data processing.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/services" className="text-primary hover:text-primary-hover font-medium inline-flex items-center transition-colors">
              View all services 
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Choose CogniForge AI?</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Production-Ready Code</h4>
                    <p className="text-gray-400">We do not build toys. Our ML pipelines and GenAI apps are deployed with proper streaming, web sockets, and robust backends.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Data Privacy & Local LLMs</h4>
                    <p className="text-gray-400">Security-first approaches using locally hosted models (Ollama, DeepSeek) ensuring your enterprise data never leaves your VPC.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Domain Expertise</h4>
                    <p className="text-gray-400">Deep understanding of real-time Computer Vision architectures, vector databases, and seamless React integrations.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl rounded-[3rem]"></div>
              <div className="relative bg-surface border border-white/10 p-8 rounded-3xl shadow-2xl">
                <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/10">
                  <div>
                    <div className="text-4xl font-bold text-white mb-1">3+ Years</div>
                    <div className="text-sm text-gray-400">ML/GenAI Experience</div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-primary mb-1">100%</div>
                    <div className="text-sm text-gray-400">Project Success Rate</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">LangChain & FAISS</span>
                    <span className="text-primary font-mono">Expert</span>
                  </div>
                  <div className="w-full bg-black/50 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-[95%]"></div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm pt-4">
                    <span className="text-gray-300">Computer Vision (InsightFace)</span>
                    <span className="text-primary font-mono">Advanced</span>
                  </div>
                  <div className="w-full bg-black/50 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-[90%]"></div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm pt-4">
                    <span className="text-gray-300">Backend Development (FastAPI)</span>
                    <span className="text-primary font-mono">Expert</span>
                  </div>
                  <div className="w-full bg-black/50 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-[92%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
