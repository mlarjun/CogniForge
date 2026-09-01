"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CogniForge AI
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className="hover:text-primary transition-colors hover:bg-white/5 px-3 py-2 rounded-md font-medium text-sm">Home</Link>
              <Link href="/services" className="hover:text-primary transition-colors hover:bg-white/5 px-3 py-2 rounded-md font-medium text-sm">Services</Link>
              <Link href="/projects" className="hover:text-primary transition-colors hover:bg-white/5 px-3 py-2 rounded-md font-medium text-sm">Projects</Link>
              <Link href="/demos" className="text-primary hover:text-primary-hover transition-colors hover:bg-white/5 px-3 py-2 rounded-md font-medium text-sm">Demos</Link>
              <Link href="/about" className="hover:text-primary transition-colors hover:bg-white/5 px-3 py-2 rounded-md font-medium text-sm">About</Link>
              <Link href="/contact" className="hover:text-primary transition-colors hover:bg-white/5 px-3 py-2 rounded-md font-medium text-sm">Contact</Link>
              <Link href="/contact" className="bg-primary hover:bg-primary-hover text-background px-4 py-2 rounded-full font-bold text-sm transition-all shadow-[0_0_15px_rgba(45,212,191,0.3)] hover:shadow-[0_0_25px_rgba(45,212,191,0.5)]">
                Get a Quote
              </Link>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center mb-1">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Links */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-white/10 shadow-2xl">
          <div className="px-4 pt-2 pb-4 space-y-1 sm:px-3 flex flex-col">
            <Link onClick={() => setIsOpen(false)} href="/" className="hover:text-primary hover:bg-white/5 block px-3 py-3 rounded-md text-base font-medium transition-colors">Home</Link>
            <Link onClick={() => setIsOpen(false)} href="/services" className="hover:text-primary hover:bg-white/5 block px-3 py-3 rounded-md text-base font-medium transition-colors">Services</Link>
            <Link onClick={() => setIsOpen(false)} href="/projects" className="hover:text-primary hover:bg-white/5 block px-3 py-3 rounded-md text-base font-medium transition-colors">Projects</Link>
            <Link onClick={() => setIsOpen(false)} href="/demos" className="text-primary hover:bg-white/5 block px-3 py-3 rounded-md text-base font-medium transition-colors">Demos</Link>
            <Link onClick={() => setIsOpen(false)} href="/about" className="hover:text-primary hover:bg-white/5 block px-3 py-3 rounded-md text-base font-medium transition-colors">About</Link>
            <Link onClick={() => setIsOpen(false)} href="/contact" className="hover:text-primary hover:bg-white/5 block px-3 py-3 rounded-md text-base font-medium transition-colors">Contact</Link>
            <Link onClick={() => setIsOpen(false)} href="/contact" className="mt-4 text-center bg-primary hover:bg-primary-hover text-background px-4 py-3 rounded-full font-bold text-sm block shadow-lg">
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
