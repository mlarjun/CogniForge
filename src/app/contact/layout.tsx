import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | CogniForge AI — Get a Free AI Consultation',
  description: 'Ready to integrate AI into your business? Contact Arjun at CogniForge AI for RAG, face recognition, GenAI app development, and more. Based in Chennai, available globally.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

