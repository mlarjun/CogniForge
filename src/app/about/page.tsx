import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Arjun | CogniForge AI — ML Engineer & GenAI Developer, Chennai',
  description: 'Arjun is a Chennai-based ML/GenAI engineer with 3+ years building production-grade RAG systems, biometric authentication, and custom LLM applications. Founder of CogniForge AI.',
};

export default function AboutPage() {
  const skills = [
    { name: "LangChain & Core AI", level: 95 },
    { name: "Python / FastAPI / Django", level: 92 },
    { name: "React & Next.js", level: 88 },
    { name: "Ollama / DeepSeek Setup", level: 90 },
    { name: "Face Recognition (ArcFace)", level: 85 },
    { name: "WebSockets & Real-time", level: 88 },
    { name: "Vector Databases (FAISS, Chroma)", level: 93 },
    { name: "Computer Vision (MediaPipe)", level: 86 }
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Profile Header */}
        <div className="bg-surface rounded-3xl p-8 lg:p-12 mb-16 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>

          <div className="flex flex-col lg:flex-row items-center gap-10 relative z-10">
            <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-primary to-secondary p-1 flex-shrink-0">
              <div className="w-full h-full rounded-full bg-surface border-4 border-background flex items-center justify-center text-4xl font-bold text-gray-500 overflow-hidden">
                <svg className="w-24 h-24 text-gray-700" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
              </div>
            </div>

            <div className="text-center lg:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Available for Freelance Projects
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Arjun </h1>
              <h2 className="text-xl text-primary font-medium mb-4">ML Engineer & GenAI Solutions Developer</h2>
              <p className="text-gray-400 text-lg max-w-2xl leading-relaxed mb-6">
                Based in Chennai, India. I specialize in bridging the gap between cutting-edge AI research and production-grade enterprise software. With over 3 years of hands-on experience in ML systems, I build zero-trust auth solutions, local LLM wrappers, and hybrid RAG architecture.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link href="/contact" className="px-6 py-3 bg-primary hover:bg-primary-hover text-background font-semibold rounded-xl transition-all shadow-[0_0_15px_rgba(45,212,191,0.3)]">
                  Hire Me
                </Link>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium rounded-xl transition-colors">
                  GitHub Profile
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Skill Bars */}
          <div className="bg-surface p-8 rounded-3xl border border-white/5">
            <h3 className="text-2xl font-bold text-white mb-8">Technical Expertise</h3>
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 font-medium">{skill.name}</span>
                    <span className="text-primary font-mono text-sm">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(45,212,191,0.5)]"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Experience */}
          <div className="space-y-8">
            <div className="bg-surface p-8 rounded-3xl border border-white/5 h-full">
              <h3 className="text-2xl font-bold text-white mb-8">Experience</h3>

              <div className="relative border-l border-white/10 ml-3 pl-6 space-y-10">
                <div className="relative">
                  <div className="absolute -left-[31px] bg-primary w-4 h-4 rounded-full border-4 border-surface shadow-[0_0_10px_rgba(45,212,191,0.5)]"></div>
                  <div className="text-sm text-primary font-mono mb-1">2021 - Present</div>
                  <h4 className="text-xl font-bold text-white mb-2">Founder & Lead Engineer</h4>
                  <div className="text-gray-400 text-sm mb-2">CogniForge AI | Chennai, India</div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Architecting scalable ML systems, RAG chat interfaces, and computer vision authentication products for global B2B clients.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] bg-secondary w-4 h-4 rounded-full border-4 border-surface"></div>
                  <div className="text-sm text-secondary font-mono mb-1">Pre-2021</div>
                  <h4 className="text-xl font-bold text-white mb-2">Software Engineer Intern</h4>
                  <div className="text-gray-400 text-sm mb-2">Tech Solutions Inc.</div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Developed backend microservices using Python and Django. Introduced initial pipelines for data preprocessing and scraping capabilities using Selenium.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
