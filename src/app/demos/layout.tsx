import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live AI Demos | CogniForge AI — RAG & GenAI Persona Simulator',
  description: 'Try CogniForge AI\'s interactive demos without an API key. Test our Retrieval-Augmented Generation (RAG) knowledge assistant and custom GenAI Persona simulator.',
};

export default function DemosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
