import { useState, useMemo } from 'react';
import { LoadingFallback } from '../components/layout/LoadingFallback';
import { ProductCard } from '../components/product-card/ProductCard';
import { SmartSearch } from '../components/search/SmartSearch';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  description: string;
}

// Mock data - in real app this would come from Supabase
const allProducts: Product[] = [
  // Crops
  {
    id: 'c1',
    name: 'Premium Long Grain Rice (25kg)',
    price: 15,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80',
    category: 'Crops',
    rating: 4.8,
    description: 'High-quality long grain rice, perfect for daily consumption'
  },
  {
    id: 'c2',
    name: 'Basmathi Rice (10kg)',
    price: 22,
    image: 'https://images.unsplash.com/photo-1563729784474-d07d79ec55a0?auto=format&fit=crop&w=400&q=80',
    category: 'Crops',
    rating: 4.9,
    description: 'Premium basmati rice with aromatic fragrance'
  },
  {
    id: 'c3',
    name: 'Brown Rice (5kg)',
    price: 12,
    image: 'https://images.unsplash.com/photo-1556912051-8f9ef55cb370?auto=format&fit=crop&w=400&q=80',
    category: 'Crops',
    rating: 4.7,
    description: 'Nutritious brown rice with bran layer intact'
  },
  {
    id: 'c4',
    name: 'Black Eyed Beans (2kg)',
    price: 8,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
    category: 'Beans',
    rating: 4.9,
    description: 'Protein-rich black eyed beans, great for soups and stews'
  },
  {
    id: 'c5',
    name: 'Yellow Maize (Corn) (10kg)',
    price: 18,
    image: 'https://images.unsplash.com/photo-1593642532843-3690d151cb38?auto=format&fit=crop&w=400&q=80',
    category: 'Maize',
    rating: 4.7,
    description: 'Sweet yellow maize, ideal for roasting or grinding'
  },
  {
    id: 'c6',
    name: 'Fresh Tomatoes (5kg box)',
    price: 12,
    image: 'https://images.unsplash.com/photo-1592924403410-0001ca42cb5e?auto=format&fit=crop&w=400&q=80',
    category: 'Vegetables',
    rating: 4.8,
    description: 'Ripe, juicy tomatoes perfect for salads and cooking'
  },
  {
    id: 'c7',
    name: 'Organic Carrots (3kg)',
    price: 10,
    image: 'https://images.unsplash.com/photo-1591876323328-770d49ba3955?auto=format&fit=crop&w=400&q=80',
    category: 'Vegetables',
    rating: 4.9,
    description: 'Sweet, crunchy organic carrots, rich in beta-carotene'
  },
  {
    id: 'c8',
    name: 'Red Bell Peppers (2kg)',
    price: 15,
    image: 'https://images.unsplash.com/photo-1589274270882-3330a129c9f5?auto=format&fit=crop&w=400&q=80',
    category: 'Vegetables',
    rating: 4.8,
    description: 'Vibrant red bell peppers, sweet and crisp'
  },
  {
    id: 'c9',
    name: 'Sweet Mangoes (10pcs)',
    price: 20,
    image: 'https://images.unsplash.com/photo-1583396580942-3380ac6d5bee?auto=format&fit=crop&w=400&q=80',
    category: 'Fruits',
    rating: 4.9,
    description: 'Juicy ripe mangoes, perfect for smoothies and snacks'
  },
  {
    id: 'c10',
    name: 'Fresh Pineapples (5pcs)',
    price: 18,
    image: 'https://images.unsplash.com/photo-1567306225709-6d9b96d23a3e?auto=format&fit=crop&w=400&q=80',
    category: 'Fruits',
    rating: 4.8,
    description: 'Golden pineapples, rich in vitamin C and bromelain'
  },
  {
    id: 'c11',
    name: 'Live Goat (Medium)',
    price: 120,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1e7d9e9?auto=format&fit=crop&w=400&q=80',
    category: 'Livestock',
    rating: 4.7,
    description: 'Healthy live goat, suitable for breeding or meat'
  },
  {
    id: 'c12',
    name: 'Chicken (Broiler) (2kg)',
    price: 25,
    image: 'https://images.unsplash.com/photo-1582722573459-23b5b8e03dc2?auto=format&fit=crop&w=400&q=80',
    category: 'Poultry',
    rating: 4.8,
    description: 'Tender broiler chicken, raised without antibiotics'
  },
  {
    id: 'c13',
    name: 'Fresh Tilapia (5kg)',
    price: 35,
    image: 'https://images.unsplash.com/photo-1562584501-58b3b978aae3?auto=format&fit=crop&w=400&q=80',
    category: 'Fishery',
    rating: 4.9,
    description: 'Freshwater tilapia, clean and firm texture'
  },
  {
    id: 'c14',
    name: 'Fresh Cow Milk (10L)',
    price: 20,
    image: 'https://images.unsplash.com/photo-1589110383685-8b48970aea14?auto=format&fit=crop&w=400&q=80',
    category: 'Dairy',
    rating: 4.8,
    description: 'Pure cow milk, rich in calcium and protein'
  },
  {
    id: 'c15',
    name: 'Natural Honey (500ml)',
    price: 15,
    image: 'https://images.unsplash.com/photo-1578782973178-ab70462fab3e?auto=format&fit=crop&w=400&q=80',
    category: 'Honey',
    rating: 4.9,
    description: 'Pure natural honey, unfiltered and unpasteurized'
  },
  {
    id: 'c16',
    name: 'Hoe Tool Set (3pcs)',
    price: 45,
    image: 'https://images.unsplash.com/photo-1581091863477-7e58664e5e89?auto=format&fit=crop&w=400&q=80',
    category: 'Farm Tools',
    rating: 4.7,
    description: 'Durable hoe set for weeding and soil preparation'
  },
  {
    id: 'c17',
    name: 'NPK Fertilizer (25kg bag)',
    price: 60,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
    category: 'Fertilizers',
    rating: 4.8,
    description: 'Balanced NPK fertilizer for optimal crop growth'
  },
  {
    id: 'c18',
    name: 'Maize Seeds (2kg)',
    price: 12,
    image: 'https://images.unsplash.com/photo-1593642532843-3690d151cb38?auto=format&fit=crop&w=400&q=80',
    category: 'Seeds',
    rating: 4.7,
    description: 'High-yield maize seeds, treated and ready for planting'
  },
  {
    id: 'c19',
    name: 'Golden Retriever Puppy',
    price: 200,
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80',
    category: 'Pets',
    rating: 4.9,
    description: 'Friendly golden retriever puppy, vaccinated and dewormed'
  }
];

export function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'popularity' | 'price-low' | 'price-high' | 'name'>('popularity');

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Search filter
      if (searchTerm && 
          !product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !product.category.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      // Price filters
      if (minPrice !== null && product.price < minPrice) {
        return false;
      }
      if (maxPrice !== null && product.price > maxPrice) {
        return false;
      }

      return true;
    });
  }, [searchTerm, selectedCategory, minPrice, maxPrice]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'popularity':
        default:
          return b.rating - a.rating;
      }
    });
    return sorted;
  }, [filteredProducts, sortBy]);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col items-center gap-6 text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground bg-pi-gradient bg-clip-text text-transparent">
          Marketplace
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Browse thousands of quality agricultural products from trusted farmers across the region
        </p>
        
        {/* Search and Filters */}
        <div className="w-full max-w-4xl space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
          <SmartSearch 
            onSearchChange={setSearchTerm} 
            placeholder="Search for rice, beans, maize, tools..."
            suggestions={[
              'rice', 'rice bag', 'rice seed', 
              'beans', 'black eyed beans', 'bean seeds',
              'maize', 'corn', 'maize seeds',
              'tomato', 'tomatoes', 'vegetable seeds',
              'carrot', 'carrot seeds',
              'mango', 'pineapple', 'fruits',
              'goat', 'livestock',
              'chicken', 'poultry',
              'fish', 'tilapia', 'fishery',
              'milk', 'dairy',
              'honey', 'beekeeping',
              'hoe', 'shovel', 'rake', 'farm tools',
              'fertilizer', 'npk', 'urea',
              'seeds', 'maize seeds', 'bean seeds',
              'pet', 'dog', 'cat', 'puppy'
            ]}
          />
          
          <div className="flex items-center gap-4">
            <select 
              value={selectedCategory ?? ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="bg-muted/50 border border-muted/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pi-purple/20"
            >
              <option value="">All Categories</option>
              <option value="Crops">Crops</option>
              <option value="Beans">Beans</option>
              <option value="Maize">Maize</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Livestock">Livestock</option>
              <option value="Poultry">Poultry</option>
              <option value="Fishery">Fishery</option>
              <option value="Dairy">Dairy</option>
              <option value="Honey">Honey</option>
              <option value="Farm Tools">Farm Tools</option>
              <option value="Fertilizers">Fertilizers</option>
              <option value="Seeds">Seeds</option>
              <option value="Pets">Pets</option>
            </select>
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-muted/50 border border-muted/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pi-purple/20"
            >
              <option value="popularity">Sort by Popularity</option>
              <option value="price-low">Sort by Price: Low to High</option>
              <option value="price-high">Sort by Price: High to Low</option>
              <option value="name">Sort by Name: A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count and Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4">
        <div className="text-sm text-muted-foreground">
          Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
        </div>
        
        {sortedProducts.length === 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>No products found</span>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory(null);
                setMinPrice(null);
                setMaxPrice(null);
                setSortBy('popularity');
              }}
              className="text-pi-purple hover:text-pi-purple/90 underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              className="hover:-translate-y-1 transition-transform duration-300"
            />
          ))
        ) : (
          <LoadingFallback type="grid" count={8} />
        )}
      </div>

      {/* Load More Button (if we had pagination) */}
      {sortedProducts.length > 0 && (
        <div className="flex justify-center py-12">
          <button 
            className="bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 hover:-translate-y-1"
          >
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
}