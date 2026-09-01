import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

export const metadata: Metadata = {
  title: 'CogniForge AI | Enterprise Grade AI, Engineered for Scale',
  description: 'AI and ML solutions company founded by Arjun, specializing in RAG Systems, Face Recognition, Local LLMs, and AI Proctoring.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
