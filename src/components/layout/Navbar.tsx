import { Search, ShoppingCart } from 'lucide-react';
import { AiAssistant } from '../ai-assistant/AiAssistant';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/home" className="flex items-center space-x-3 text-2xl font-bold bg-pi-gradient bg-clip-text text-transparent">
            <span className="text-pi-purple">PDS</span>
            <span className="text-pi-gold">Agri-Hub</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/marketplace" className="text-muted-foreground hover:text-foreground transition-colors">
            Marketplace
          </Link>
          <Link to="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
            Categories
          </Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link
            to="/marketplace"
            className="relative"
          >
            <div className="absolute inset-0 bg-muted/50 rounded-lg" />
            <Search className="relative h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </Link>
          
          <Link to="/cart" className="relative">
            <button 
              className="relative w-10 h-10 rounded-lg bg-muted/50 hover:bg-muted/100 transition-colors flex items-center justify-center"
            >
              <span className="absolute -top-2 -right-2 w-3 h-3 bg-pi-pulse animate-pulse rounded-full border-2 border-background"></span>
              <ShoppingCart className="h-5 w-5 text-muted-foreground" />
            </button>
          </Link>
          
          <AiAssistant />
        </div>
        
        <div className="-mr-2 flex items-center md:hidden">
          <button className="p-2 rounded-lg bg-muted/50 hover:bg-muted/100">
            <svg className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}