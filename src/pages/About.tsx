import { Link } from 'react-router-dom';
import { Truck, Shield, Heart, Users, Globe, Clock, Bot, Settings, Mail, MessageCircle, X } from 'lucide-react';

export function About() {
  return (
    <div className="space-y-16">
      {/* About Header */}
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground bg-pi-gradient bg-clip-text text-transparent mb-6">
          About PDS Agri-Hub
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Revolutionizing agricultural commerce through Pi Network technology, connecting farmers directly with consumers for a fresher, fairer food system.
        </p>
      </section>

      {/* Our Mission */}
      <section className="relative">
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.05),transparent)]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            Our Mission
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="w-20 h-20 bg-pi-purple/10 rounded-xl flex items-center justify-center">
                <Users className="h-10 w-10 text-pi-purple" />
              </div>
              <h3 className="font-semibold text-lg">Empowering Farmers</h3>
              <p className="text-muted-foreground max-w-md">
                We provide smallholder farmers with direct market access, eliminating middlemen and ensuring fair prices for their hard work.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="w-20 h-20 bg-pi-purple/10 rounded-xl flex items-center justify-center">
                <Truck className="h-10 w-10 text-pi-purple" />
              </div>
              <h3 className="font-semibold text-lg">Fresh Farm-to-Table</h3>
              <p className="text-muted-foreground max-w-md">
                From harvest to your doorstep in days, not weeks. Our logistics network ensures peak freshness and nutritional value.
              </p>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              By leveraging Pi Network's secure, low-fee transactions, we make agricultural trade accessible to everyone, everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="relative">
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.05),transparent)]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-6">
              <div className="w-16 h-16 bg-pi-purple/10 rounded-xl flex items-center justify-center">
                <Bot className="h-8 w-8 text-pi-purple" />
              </div>
              <h3 className="font-semibold text-lg">1. Browse & Select</h3>
              <p className="text-muted-foreground max-w-sm text-center">
                Explore our marketplace and find exactly what you need for your farm, home, or business.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-6">
              <div className="w-16 h-16 bg-pi-purple/10 rounded-xl flex items-center justify-center">
                <Shield className="h-8 w-8 text-pi-purple" />
              </div>
              <h3 className="font-semibold text-lg">2. Buy with Pi</h3>
              <p className="text-muted-foreground max-w-sm text-center">
                Secure checkout using Pi Network cryptocurrency - fast, low-fee, and accessible to all.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-6">
              <div className="w-16 h-16 bg-pi-purple/10 rounded-xl flex items-center justify-center">
                <Heart className="h-8 w-8 text-pi-purple" />
              </div>
              <h3 className="font-semibold text-lg">3. Get Delivered</h3>
              <p className="text-muted-foreground max-w-sm text-center">
                Your products are carefully packaged and delivered fresh to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Values
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-pi-pulse" />
              </div>
              <h3 className="font-semibold text-lg">Global Access</h3>
              <p className="text-muted-foreground">
                Connecting farmers and consumers across borders through decentralized technology.
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-pi-pulse" />
              </div>
              <h3 className="font-semibold text-lg">Fair Trade</h3>
              <p className="text-muted-foreground">
                Ensuring farmers receive fair compensation for their products and labor.
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <Settings className="h-8 w-8 text-pi-pulse" />
              </div>
              <h3 className="font-semibold text-lg">Quality Focus</h3>
              <p className="text-muted-foreground">
                Rigorous quality checks ensure only the best products reach our customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="relative">
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.03),transparent)]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold text-center mb-14">
            Our Impact
          </h2>
          <div className="grid gap-8 md:grid-cols-4 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-4xl font-bold text-pi-pulse">
                10K+
              </div>
              <p className="font-medium text-foreground">
                Farmers Empowered
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="text-4xl font-bold text-pi-pulse">
                500K+
              </div>
              <p className="font-medium text-foreground">
                Products Delivered
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="text-4xl font-bold text-pi-pulse">
                5M+
              </div>
              <p className="font-medium text-foreground">
                Pi Transactions
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="text-4xl font-bold text-pi-pulse">
                98%
              </div>
              <p className="font-medium text-foreground">
                Customer Satisfaction
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16">
        <h2 className="text-3xl font-bold text-foreground mb-6">
          Join the Agricultural Revolution
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Experience the future of farm-to-table commerce. Buy fresh, quality agricultural products with Pi Network cryptocurrency.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
          <Link 
            to="/marketplace" 
            className="bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 hover:-translate-y-1 transform"
          >
            Start Shopping Now
          </Link>
          <Link 
            to="/categories" 
            className="border border-pi-pulse/50 hover:border-pi-pulse/100 text-pi-purple hover:bg-pi-purple/10 py-3 px-8 rounded-lg transition-colors duration-300 hover:-translate-y-1 transform"
          >
            Explore Categories
          </Link>
        </div>
      </section>

      {/* Footer Section - Repeated from main footer but simplified for About page */}
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
                <button type="submit" className="w-full bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-3 px-4 rounded-md transition-colors">
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
    </div>
  );
}