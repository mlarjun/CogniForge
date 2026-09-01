import type { Metadata } from 'next';
import { ProjectsClient } from './ProjectsClient';

export const metadata: Metadata = {
  title: 'Case Studies & Projects | CogniForge AI',
  description: 'Explore real-world AI projects by CogniForge AI: AI exam proctoring, hybrid RAG enterprise assistant, GenAI customer care platform, and zero-trust face recognition auth.',
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
