import React from 'react';

interface ProjectCardProps {
  title: string;
  summary: string;
  techStack: string[];
}

export default function ProjectCard({ title, summary, techStack }: ProjectCardProps) {
  return (
    <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden hover:border-secondary/30 transition-all duration-300">
      <div className="h-48 bg-gray-800 relative group flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60 z-10"></div>
        <div className="w-full relative z-0 h-full flex flex-col items-center justify-center text-gray-500 text-sm">
          <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          Thumbnail
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{summary}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {techStack.map((tech) => (
            <span key={tech} className="px-3 py-1 bg-white/5 text-gray-300 text-xs rounded-full border border-white/10">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <button className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-2 rounded-lg text-sm transition-colors border border-white/10">
            View Case Study
          </button>
        </div>
      </div>
    </div>
  );
}
