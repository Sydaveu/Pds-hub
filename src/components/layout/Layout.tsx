import { Navbar } from './Navbar';
import { Footer } from './Footer';
import type { ReactNode } from 'react';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
