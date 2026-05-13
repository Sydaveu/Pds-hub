import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
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
  unit?: string;
}

const allProducts: Product[] = [
  { id: 'c1', name: 'Premium Long Grain Rice (25kg)', price: 15, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80', category: 'Rice', rating: 4.8, description: 'High-quality long grain rice', unit: 'bag' },
  { id: 'c2', name: 'Basmathi Rice (10kg)', price: 22, image: 'https://images.unsplash.com/photo-1563729784474-d07d79ec55a0?auto=format&fit=crop&w=400&q=80', category: 'Rice', rating: 4.9, description: 'Premium basmati rice with aromatic fragrance', unit: 'bag' },
  { id: 'c3', name: 'Brown Rice (5kg)', price: 12, image: 'https://images.unsplash.com/photo-1556912051-8f9ef55cb370?auto=format&fit=crop&w=400&q=80', category: 'Rice', rating: 4.7, description: 'Nutritious brown rice with bran layer intact', unit: 'bag' },
  { id: 'c4', name: 'Black Eyed Beans (2kg)', price: 8, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80', category: 'Beans', rating: 4.9, description: 'Protein-rich black eyed beans', unit: 'kg' },
  { id: 'c5', name: 'Yellow Maize (Corn) (10kg)', price: 18, image: 'https://images.unsplash.com/photo-1593642532843-3690d151cb38?auto=format&fit=crop&w=400&q=80', category: 'Maize', rating: 4.7, description: 'Sweet yellow maize, ideal for roasting or grinding', unit: 'kg' },
  { id: 'c6', name: 'Fresh Tomatoes (5kg box)', price: 12, image: 'https://images.unsplash.com/photo-1592924403410-0001ca42cb5e?auto=format&fit=crop&w=400&q=80', category: 'Vegetables', rating: 4.8, description: 'Ripe juicy tomatoes', unit: 'box' },
  { id: 'c7', name: 'Organic Carrots (3kg)', price: 10, image: 'https://images.unsplash.com/photo-1591876323328-770d49ba3955?auto=format&fit=crop&w=400&q=80', category: 'Vegetables', rating: 4.9, description: 'Sweet crunchy organic carrots', unit: 'kg' },
  { id: 'c8', name: 'Red Bell Peppers (2kg)', price: 15, image: 'https://images.unsplash.com/photo-1589274270882-3330a129c9f5?auto=format&fit=crop&w=400&q=80', category: 'Vegetables', rating: 4.8, description: 'Vibrant red bell peppers', unit: 'kg' },
  { id: 'c9', name: 'Sweet Mangoes (10pcs)', price: 20, image: 'https://images.unsplash.com/photo-1583396580942-3380ac6d5bee?auto=format&fit=crop&w=400&q=80', category: 'Fruits', rating: 4.9, description: 'Juicy ripe mangoes', unit: 'pack' },
  { id: 'c10', name: 'Fresh Pineapples (5pcs)', price: 18, image: 'https://images.unsplash.com/photo-1567306225709-6d9b96d23a3e?auto=format&fit=crop&w=400&q=80', category: 'Fruits', rating: 4.8, description: 'Golden pineapples rich in vitamin C', unit: 'pack' },
  { id: 'c11', name: 'Live Goat (Medium)', price: 150, image: 'https://images.unsplash.com/photo-1583337130417-3346a1e7d9e9?auto=format&fit=crop&w=400&q=80', category: 'Livestock', rating: 4.7, description: 'Healthy live goat', unit: 'head' },
  { id: 'c12', name: 'Broiler Chicken (2kg)', price: 25, image: 'https://images.unsplash.com/photo-1582722573459-23b5b8e03dc2?auto=format&fit=crop&w=400&q=80', category: 'Poultry', rating: 4.8, description: 'Tender broiler chicken', unit: 'bird' },
  { id: 'c13', name: 'Fresh Tilapia (5kg)', price: 35, image: 'https://images.unsplash.com/photo-1562584501-58b3b978aae3?auto=format&fit=crop&w=400&q=80', category: 'Fishery', rating: 4.9, description: 'Freshwater tilapia', unit: 'kg' },
  { id: 'c14', name: 'Fresh Cow Milk (10L)', price: 20, image: 'https://images.unsplash.com/photo-1589110383685-8b48970aea14?auto=format&fit=crop&w=400&q=80', category: 'Dairy', rating: 4.8, description: 'Pure cow milk', unit: 'litre' },
  { id: 'c15', name: 'Natural Honey (500ml)', price: 15, image: 'https://images.unsplash.com/photo-1578782973178-ab70462fab3e?auto=format&fit=crop&w=400&q=80', category: 'Honey', rating: 4.9, description: 'Pure natural honey', unit: 'jar' },
  { id: 'c16', name: 'Hoe Tool Set (3pcs)', price: 45, image: 'https://images.unsplash.com/photo-1581091863477-7e58664e5e89?auto=format&fit=crop&w=400&q=80', category: 'Farm Tools', rating: 4.7, description: 'Durable hoe set', unit: 'set' },
  { id: 'c17', name: 'NPK Fertilizer (25kg bag)', price: 60, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80', category: 'Fertilizers', rating: 4.8, description: 'Balanced NPK fertilizer', unit: 'bag' },
  { id: 'c18', name: 'Maize Seeds (2kg)', price: 12, image: 'https://images.unsplash.com/photo-1593642532843-3690d151cb38?auto=format&fit=crop&w=400&q=80', category: 'Seeds', rating: 4.7, description: 'High-yield maize seeds', unit: 'pack' },
  { id: 'c19', name: 'Golden Retriever Puppy', price: 200, image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80', category: 'Pets', rating: 4.9, description: 'Friendly golden retriever puppy', unit: 'puppy' },
  { id: 'c20', name: 'Fresh Yam (5kg)', price: 10, image: 'https://images.unsplash.com/photo-1600891964599-f43ba0e33d41?auto=format&fit=crop&w=400&q=80', category: 'Yam', rating: 4.7, description: 'Fresh tubers from local farms', unit: 'kg' },
  { id: 'c21', name: 'Cassava Flour (5kg)', price: 9, image: 'https://images.unsplash.com/photo-1600566746221-272634f0e239?auto=format&fit=crop&w=400&q=80', category: 'Cassava', rating: 4.6, description: 'Fine cassava flour for cooking', unit: 'bag' },
  { id: 'c22', name: 'Large Cow (Mature)', price: 300, image: 'https://images.unsplash.com/photo-1583337130417-3346a1e7d9e9?auto=format&fit=crop&w=400&q=80', category: 'Livestock', rating: 4.8, description: 'Healthy mature cow', unit: 'head' },
];

const CATEGORIES = ['All', 'Rice', 'Beans', 'Maize', 'Yam', 'Cassava', 'Vegetables', 'Fruits', 'Livestock', 'Poultry', 'Fishery', 'Dairy', 'Honey', 'Farm Tools', 'Fertilizers', 'Seeds', 'Pets'];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'popularity' | 'price-low' | 'price-high' | 'name'>('popularity');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return allProducts.filter(p => {
      if (searchTerm && !p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !p.category.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !p.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      return true;
    });
  }, [searchTerm, selectedCategory]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'name': return a.name.localeCompare(b.name);
        default: return b.rating - a.rating;
      }
    });
  }, [filtered, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('popularity');
  };

  const hasFilters = searchTerm || selectedCategory !== 'All';

  return (
    <div className="space-y-8 py-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Marketplace</h1>
        <p className="text-gray-400">Browse thousands of quality agricultural products from trusted farmers</p>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SmartSearch
            onSearchChange={setSearchTerm}
            placeholder="Search rice, beans, maize, goat..."
            suggestions={[
              'rice', 'rice bag', 'rice seed', 'beans', 'black eyed beans', 'bean seeds',
              'maize', 'corn', 'maize seeds', 'tomato', 'tomatoes', 'vegetable',
              'carrot', 'mango', 'pineapple', 'fruits', 'goat', 'livestock', 'cow',
              'chicken', 'poultry', 'fish', 'tilapia', 'fishery', 'milk', 'dairy',
              'honey', 'hoe', 'farm tools', 'fertilizer', 'npk', 'seeds', 'pet', 'dog'
            ]}
          />
        </div>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
          >
            <option value="popularity">Popular</option>
            <option value="price-low">Price ↑</option>
            <option value="price-high">Price ↓</option>
            <option value="name">Name A-Z</option>
          </select>
          <button
            onClick={() => setShowFilters(v => !v)}
            className={`p-2.5 rounded-xl border transition-all ${showFilters ? 'border-purple-500 bg-purple-600/20 text-purple-400' : 'border-white/10 text-gray-400 hover:border-white/20'}`}
          >
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results info */}
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-sm">
          {sorted.length} product{sorted.length !== 1 ? 's' : ''} found
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </p>
        {hasFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
            <X className="h-3.5 w-3.5" /> Clear filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {sorted.length > 0 ? (
        <motion.div
          key={`${searchTerm}-${selectedCategory}-${sortBy}`}
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {sorted.map(product => (
            <motion.div key={product.id} variants={item}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20 space-y-4">
          <div className="text-6xl">🔍</div>
          <h3 className="text-white text-xl font-semibold">No products found</h3>
          <p className="text-gray-400">Try a different search term or category</p>
          <button onClick={clearFilters} className="bg-purple-600 hover:bg-purple-500 text-white font-medium py-2.5 px-6 rounded-xl transition-all">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
