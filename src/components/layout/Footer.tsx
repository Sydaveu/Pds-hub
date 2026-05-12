import { Mail, MessageCircle, X } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-20 bg-background/50 backdrop-blur-sm border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              PDS Agri-Hub
            </h3>
            <p className="text-muted-foreground">
              From Soil to Soul, Powered by Pi.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://wa.me/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp</span>
              </a>
              <a href="https://facebook.com/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span>Facebook</span>
              </a>
              <a href="https://x.com/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
                <span>X (Twitter)</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="mb-3 font-medium text-foreground">Information</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="/" className="hover:text-foreground transition-colors">How It Works</a></li>
              <li><a href="/" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="/" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="/" className="hover:text-foreground transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-3 font-medium text-foreground">Categories</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/categories?type=crops" className="hover:text-foreground transition-colors">Crops</a></li>
              <li><a href="/categories?type=livestock" className="hover:text-foreground transition-colors">Livestock</a></li>
              <li><a href="/categories?type=fishery" className="hover:text-foreground transition-colors">Fishery</a></li>
              <li><a href="/categories?type=dairy" className="hover:text-foreground transition-colors">Dairy</a></li>
              <li><a href="/categories?type=seeds" className="hover:text-foreground transition-colors">Seeds</a></li>
              <li><a href="/categories?type=fertilizers" className="hover:text-foreground transition-colors">Fertilizers</a></li>
              <li><a href="/categories?type=tools" className="hover:text-foreground transition-colors">Farm Tools</a></li>
              <li><a href="/categories?type=pets" className="hover:text-foreground transition-colors">Pets</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-3 font-medium text-foreground">Contact</h4>
            <p className="text-sm text-muted-foreground mb-2">
              <Mail className="h-4 w-4 mr-2" /> pds.agrihub@gmail.com
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Owner: Pisydaveu & Co.
            </p>
            
            <form className="space-y-3">
              <div>
                <label htmlFor="newsletter" className="mb-1 block text-sm font-medium text-muted-foreground">
                  Newsletter
                </label>
                <input
                  id="newsletter"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 bg-muted/50 border border-muted/20 rounded-md focus:outline-none focus:ring-2 focus:ring-pi-purple/20"
                />
              </div>
              <button type="submit" className="w-full bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-2 px-4 rounded-md transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} PDS Agri-Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}