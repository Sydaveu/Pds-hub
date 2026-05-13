import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '../components/product-card/ProductCard';
import { SmartSearch } from '../components/search/SmartSearch';
import allProducts from '../lib/products';

const CATEGORIES = ['All', 'Rice', 'Beans', 'Maize', 'Yam', 'Cassava', 'Vegetables', 'Fruits', 'Livestock', 'Poultry', 'Fishery', 'Dairy', 'Honey', 'Farm Tools', 'Fertilizers', 'Seeds', 'Pets', 'Oils & Spices'];

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
