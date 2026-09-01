import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | CogniForge AI — RAG, GenAI, Face Recognition & AI Proctoring',
  description: 'Explore CogniForge AI\'s full service lineup: RAG chatbot development, biometric face recognition auth, GenAI app development, AI proctoring, ML model development, and full-stack AI SaaS solutions.',
};

export default function ServicesPage() {
  const servicesList = [
    {
      id: "rag-chatbot",
      title: "RAG Chatbot Development",
      description: "Custom document Q&A bots, knowledge bases, and enterprise search.",
      useCases: ["Internal corporate wikis", "Customer support automation", "Legal document summarization"],
      technologies: ["LangChain", "FAISS", "Pinecone", "Claude 3 API"],
      deliverable: "A fully functional chat interface with streaming answers referencing your uploaded documents.",
      priceEstimate: "$300–$1,500",
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
    },
    {
      id: "face-rec",
      title: "Face Recognition & Biometric Auth Systems",
      description: "Web and desktop login, attendance systems, and identity verification with robust anti-spoofing.",
      useCases: ["Biometric app login", "Employee attendance tracking", "Secure access control"],
      technologies: ["InsightFace", "ArcFace", "ChromaDB", "MediaPipe"],
      deliverable: "Vector database integration and a live facial match API endpoint with a frontend demo.",
      priceEstimate: "$400–$1,500",
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    },
    {
      id: "genai-app",
      title: "GenAI-Powered App Development",
      description: "Custom LLM applications and local AI setups. Build specialized models for niche data privacy requirements.",
      useCases: ["Roleplay training platforms", "Content generation workflows", "Code review assistants"],
      technologies: ["Ollama", "DeepSeek-R1", "LangSmith", "Python"],
      deliverable: "End-to-end interactive application with a local LLM instance and monitoring dashboard.",
      priceEstimate: "$500–$2,000",
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
    },
    {
      id: "ai-proctoring",
      title: "AI Proctoring & Monitoring Systems",
      description: "Online exam monitoring, behavior detection for EdTech, and automated integrity scoring.",
      useCases: ["Online certification exams", "Remote university assessments", "Employee compliance tracking"],
      technologies: ["MediaPipe", "SpeechBrain", "Flask", "WebSockets"],
      deliverable: "Real-time automated alerting dashboard tracking gaze, voice, and multiple people detection.",
      priceEstimate: "$800–$3,000",
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
    },
    {
      id: "ml-model",
      title: "ML Model Development",
      description: "Classical predictive modeling, classification, regression, and recommendation systems tailored to your datasets.",
      useCases: ["Churn prediction", "Dynamic pricing engines", "Product recommendation algorithms"],
      technologies: ["scikit-learn", "PyTorch", "Pandas", "XGBoost"],
      deliverable: "Trained model artifacts, evaluation metrics report, and an inference API wrapper.",
      priceEstimate: "$1,000–$5,000",
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
    },
    {
      id: "fullstack-ai",
      title: "Full-Stack AI App Development",
      description: "End-to-end scalable AI SaaS platforms combining intuitive frontends with powerful ML backends.",
      useCases: ["B2B SaaS platforms", "Internal AI admin dashboards", "Consumer GenAI applications"],
      technologies: ["Next.js", "Django REST / FastAPI", "PostgreSQL", "Redis"],
      deliverable: "Complete deployed application source code, infrastructure as code, and CI/CD pipelines.",
      priceEstimate: "$1,000–$4,000",
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
    }
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Our Services</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From proof-of-concept prototypes to scalable enterprise systems, we design and build intelligent solutions that solve real business problems.
          </p>
        </div>

        <div className="space-y-12">
          {servicesList.map((service, idx) => (
            <div key={service.id} className={`flex flex-col lg:flex-row gap-10 p-8 rounded-3xl border border-white/5 bg-surface/30 backdrop-blur-sm hover:border-primary/20 transition-colors ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="flex-1">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{service.title}</h2>
                <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Key Use Cases</h3>
                  <ul className="space-y-2">
                    {service.useCases.map((useCase, i) => (
                      <li key={i} className="flex items-start text-gray-400">
                        <svg className="w-5 h-5 text-secondary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between p-6 bg-background/50 rounded-2xl border border-white/5">
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 bg-surface border border-white/10 text-primary text-sm rounded-lg font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Typical Deliverable</h3>
                  <p className="text-gray-400 text-sm mb-6 pb-6 border-b border-white/5">
                    {service.deliverable}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span className="block text-sm text-gray-400 mb-1">Starting from</span>
                    <span className="text-2xl font-bold text-white">{service.priceEstimate}</span>
                  </div>
                  <Link href="/contact" className="px-6 py-3 bg-primary/10 hover:bg-primary text-primary hover:text-background font-semibold rounded-xl transition-colors border border-primary/20">
                    Request Quote
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
