import { Navbar } from './Navbar';
import { Footer } from './Footer';
import type { ReactNode } from 'react';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar />
      <main className="pb-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}