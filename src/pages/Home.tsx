import { Link } from 'react-router-dom';
import { LoadingFallback } from '../components/layout/LoadingFallback';
import { ProductCard } from '../components/product-card/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

// Mock data - in real app this would come from Supabase
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Rice Bag (50kg)',
    price: 25,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80',
    category: 'Rice',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Fresh Organic Beans',
    price: 20,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
    category: 'Beans',
    rating: 4.9
  },
  {
    id: '3',
    name: 'Yellow Maize (Corn)',
    price: 18,
    image: 'https://images.unsplash.com/photo-1593642532843-3690d151cb38?auto=format&fit=crop&w=400&q=80',
    category: 'Maize',
    rating: 4.7
  },
  {
    id: '4',
    name: 'Farm Fresh Tomatoes',
    price: 15,
    image: 'https://images.unsplash.com/photo-1592924403410-0001ca42cb5e?auto=format&fit=crop&w=400&q=80',
    category: 'Vegetables',
    rating: 4.8
  }
];

export function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-pi-gradient overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1416879595882-3383a0084b0d?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-20" />
        </div>
        <div className="relative z-10 flex h-full items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl w-full text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
              From Soil to Soul<br />
              <span className="block text-pi-gold">Powered by Pi</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Discover fresh, quality agricultural products directly from trusted farmers. 
              Buy with Pi cryptocurrency and experience the future of farm-to-table commerce.
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                to="/marketplace" 
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-medium py-3 px-8 rounded-lg border border-white/20 hover:border-white/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                Start Buying Now
              </Link>
              <Link 
                to="/categories" 
                className="border border-white/20 hover:border-white/30 text-white font-medium py-3 px-8 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
              >
                Explore Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative">
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.1),transparent)]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="text-pi-pulse animate-pulse w-12 h-12 bg-pi-purple/10 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-pi-purple">10K+</span>
              </div>
              <h3 className="font-semibold text-lg">Trusted Farmers</h3>
              <p className="text-muted-foreground max-w-sm">Verified producers from across the region</p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="text-pi-pulse animate-pulse w-12 h-12 bg-pi-purple/10 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-pi-purple">50K+</span>
              </div>
              <h3 className="font-semibold text-lg">Products Available</h3>
              <p className="text-muted-foreground max-w-sm">Fresh crops, livestock, and farm supplies</p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="text-pi-pulse animate-pulse w-12 h-12 bg-pi-purple/10 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-pi-purple">100%</span>
              </div>
              <h3 className="font-semibold text-lg">Pi Payments</h3>
              <p className="text-muted-foreground max-w-sm">Secure transactions with Pi Network</p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="text-pi-pulse animate-pulse w-12 h-12 bg-pi-purple/10 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-pi-purple">24/7</span>
              </div>
              <h3 className="font-semibold text-lg">Support</h3>
              <p className="text-muted-foreground max-w-sm">Dedicated AI assistant always ready to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-4">
              Featured Products
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              Handpicked quality products from our top-rated farmers
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                className="hover:-translate-y-1 transition-transform duration-300"
              />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link 
              to="/marketplace" 
              className="bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative">
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.1),transparent)]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-3 text-center">
            <div className="flex flex-col items-center space-y-6">
              <div className="w-16 h-16 bg-pi-purple/10 rounded-xl flex items-center justify-center">
                <svg className="h-8 w-8 text-pi-purple" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v4.875h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">1. Browse & Select</h3>
              <p className="text-muted-foreground max-w-sm">
                Explore our marketplace and find exactly what you need for your farm or home.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-6">
              <div className="w-16 h-16 bg-pi-purple/10 rounded-xl flex items-center justify-center">
                <svg className="h-8 w-8 text-pi-purple" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m2 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">2. Buy with Pi</h3>
              <p className="text-muted-foreground max-w-sm">
                Secure checkout using Pi Network cryptocurrency - fast, low-fee, and borderless.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-6">
              <div className="w-16 h-16 bg-pi-purple/10 rounded-xl flex items-center justify-center">
                <svg className="h-8 w-8 text-pi-purple" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h10a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-5" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v4h4a2 2 0 002-2V3H3z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">3. Get Delivered</h3>
              <p className="text-muted-foreground max-w-sm">
                Your products are carefully packaged and delivered fresh to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-4">
              Shop by Category
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              Find everything you need organized by agricultural categories
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Link 
              to="/categories?type=crops" 
              className="group relative overflow-hidden bg-muted/50 hover:bg-muted/100 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center transition-transform duration-500 group-hover:scale-105" />
              <div className="relative z-10 flex flex-col items-center py-8 px-4 text-center">
                <h3 className="font-semibold text-lg text-foreground">Crops</h3>
                <p className="text-sm text-muted-foreground mt-1">Grains, cereals & more</p>
              </div>
            </Link>
            
            <Link 
              to="/categories?type=vegetables" 
              className="group relative overflow-hidden bg-muted/50 hover:bg-muted/100 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1592924403410-0001ca42cb5e?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center transition-transform duration-500 group-hover:scale-105" />
              <div className="relative z-10 flex flex-col items-center py-8 px-4 text-center">
                <h3 className="font-semibold text-lg text-foreground">Vegetables</h3>
                <p className="text-sm text-muted-foreground mt-1">Fresh & organic produce</p>
              </div>
            </Link>
            
            <Link 
              to="/categories?type=fruits" 
              className="group relative overflow-hidden bg-muted/50 hover:bg-muted/100 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center transition-transform duration-500 group-hover:scale-105" />
              <div className="relative z-10 flex flex-col items-center py-8 px-4 text-center">
                <h3 className="font-semibold text-lg text-foreground">Fruits</h3>
                <p className="text-sm text-muted-foreground mt-1">Seasonal & tropical varieties</p>
              </div>
            </Link>
            
            <Link 
              to="/categories?type=livestock" 
              className="group relative overflow-hidden bg-muted/50 hover:bg-muted/100 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1583337130417-3346a1e7d9e9?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center transition-transform duration-500 group-hover:scale-105" />
              <div className="relative z-10 flex flex-col items-center py-8 px-4 text-center">
                <h3 className="font-semibold text-lg text-foreground">Livestock</h3>
                <p className="text-sm text-muted-foreground mt-1">Cattle, goats, sheep & more</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}