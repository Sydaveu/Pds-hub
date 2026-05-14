import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Grid3X3, List, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/product-card/ProductCard';
import { SmartSearch } from '../components/search/SmartSearch';
import { allProducts, mainCategories, getAllSubcategories, type Product } from '../lib/productData';
import { getProductImage } from '../lib/productImages';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMain, setSelectedMain] = useState<string>('all');
  const [selectedSub, setSelectedSub] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'price-low' | 'price-high' | 'name'>('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    let result = allProducts;
    if (selectedMain !== 'all') result = result.filter(p => p.mainCategory === selectedMain);
    if (selectedSub !== 'all') result = result.filter(p => p.category === selectedSub);
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.searchTags.some(t => t.includes(q))
      );
    }
    return result;
  }, [searchTerm, selectedMain, selectedSub]);

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

  const subcats = useMemo(() => {
    if (selectedMain === 'all') return [];
    return getAllSubcategories(selectedMain);
  }, [selectedMain]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedMain('all');
    setSelectedSub('all');
    setSortBy('popularity');
  };

  const hasFilters = searchTerm || selectedMain !== 'all' || selectedSub !== 'all';

  const mainCatStyles: Record<string, string> = {
    food: 'from-green-600 to-emerald-800',
    tools: 'from-amber-600 to-orange-800',
    animals: 'from-purple-600 to-pink-800',
  };

  return (
    <div className="space-y-6 py-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Marketplace</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Browse thousands of products across Food, Tools, and Animals</p>
      </div>

      <SmartSearch onSearchChange={setSearchTerm} placeholder="Search across all categories..." />

      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
        <button
          onClick={() => { setSelectedMain('all'); setSelectedSub('all'); }}
          className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all ${
            selectedMain === 'all'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
              : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
          }`}
        >
          <Grid3X3 className="h-4 w-4" /> ALL CATEGORIES
        </button>
        {mainCategories.map(mc => (
          <button
            key={mc.id}
            onClick={() => { setSelectedMain(mc.id); setSelectedSub('all'); }}
            className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all ${
              selectedMain === mc.id
                ? `bg-gradient-to-r ${mc.color} text-white shadow-lg`
                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            <span>{mc.icon}</span> {mc.name}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selectedMain !== 'all' && subcats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex gap-2 flex-wrap"
          >
            <button
              onClick={() => setSelectedSub('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedSub === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              All
            </button>
            {subcats.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedSub(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedSub === cat
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between gap-3">
        <p className="text-gray-500 text-sm">
          <span className="text-white font-semibold">{sorted.length}</span> product{sorted.length !== 1 ? 's' : ''} found
          {selectedMain !== 'all' && ` in ${mainCategories.find(m => m.id === selectedMain)?.name}`}
          {selectedSub !== 'all' && ` \u2192 ${selectedSub}`}
        </p>
        <div className="flex items-center gap-2">
          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5">
              <X className="h-3 w-3" /> Clear
            </button>
          )}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-white text-xs focus:outline-none focus:border-purple-500 transition-colors"
          >
            <option value="popularity">Popular</option>
            <option value="price-low">Price \u2191</option>
            <option value="price-high">Price \u2193</option>
            <option value="name">A-Z</option>
          </select>
          <div className="flex border border-white/10 rounded-xl overflow-hidden">
            <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>
              <Grid3X3 className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {sorted.length > 0 ? (
        <motion.div
          key={`${searchTerm}-${selectedMain}-${selectedSub}-${sortBy}-${viewMode}`}
          variants={container}
          initial="hidden"
          animate="show"
          className={viewMode === 'grid'
            ? 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'space-y-3'
          }
        >
          {sorted.map(product => (
            <motion.div key={product.id} variants={item}>
              {viewMode === 'grid' ? (
                <ProductCard product={product} />
              ) : (
                <Link to={`/product-details/${product.id}`} className="glass-card rounded-2xl border border-white/5 p-4 flex gap-4 items-center hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 group">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                    <img
                       src={getProductImage(product.id, product.name.split(' ').slice(0, 2).join('-'))}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80'; }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate group-hover:text-purple-300 transition-colors">{product.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{product.category} \u2022 {product.unit}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-purple-400 font-bold text-lg">{product.price}{'\u03c0'}</p>
                    <p className="text-gray-500 text-xs flex items-center gap-1 justify-end"><Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {product.rating}</p>
                  </div>
                </Link>
              )}
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
