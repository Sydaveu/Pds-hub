import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { ProductCard } from '../components/product-card/ProductCard';
import { mainCategories, allProducts, getAllSubcategories, type Product } from '../lib/productData';
import { getProductImage, getProductImageLarge } from '../lib/productImages';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const MAIN_COLORS: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  food: { bg: 'from-green-600/20 to-emerald-900/20', text: 'text-emerald-400', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20' },
  tools: { bg: 'from-amber-600/20 to-orange-900/20', text: 'text-amber-400', border: 'border-amber-500/30', glow: 'shadow-amber-500/20' },
  animals: { bg: 'from-purple-600/20 to-pink-900/20', text: 'text-purple-400', border: 'border-purple-500/30', glow: 'shadow-purple-500/20' },
};

const MAIN_ICONS: Record<string, string> = { food: '🌾', tools: '🔧', animals: '🐾' };

export function Categories() {
  const [activeMain, setActiveMain] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    let result = allProducts;
    if (activeMain) result = result.filter(p => p.mainCategory === activeMain);
    if (activeCategory) result = result.filter(p => p.category === activeCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeMain, activeCategory, searchQuery]);

  const subcategories = useMemo(() => {
    if (!activeMain) return [];
    return getAllSubcategories(activeMain);
  }, [activeMain]);

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Categories</h1>
        <p className="text-gray-400">Browse by main category or subcategory</p>
      </div>

      {/* Breadcrumb */}
      {(activeMain || activeCategory) && (
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <button onClick={() => { setActiveMain(null); setActiveCategory(null); }} className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> All Categories
          </button>
          {activeMain && (
            <>
              <ChevronRight className="h-3 w-3 text-gray-600" />
              <button onClick={() => setActiveCategory(null)} className="hover:text-white transition-colors">
                {mainCategories.find(m => m.id === activeMain)?.name}
              </button>
            </>
          )}
          {activeCategory && (
            <>
              <ChevronRight className="h-3 w-3 text-gray-600" />
              <span className="text-white">{activeCategory}</span>
            </>
          )}
        </div>
      )}

      {!activeMain && (
        /* Main Categories Grid */
        <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6 md:grid-cols-3">
          {mainCategories.map(mc => {
            const count = allProducts.filter(p => p.mainCategory === mc.id).length;
            const colors = MAIN_COLORS[mc.id]!;
            return (
              <motion.div key={mc.id} variants={item}>
                <button
                  onClick={() => setActiveMain(mc.id)}
                  className={`relative w-full overflow-hidden rounded-3xl bg-gradient-to-br ${mc.color} border ${colors.border} p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${colors.glow} group`}
                >
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10">
                    <div className="text-5xl mb-4">{mc.icon}</div>
                    <h2 className="text-2xl font-bold text-white mb-2">{mc.name}</h2>
                    <p className="text-white/80 text-sm mb-4">{mc.description}</p>
                    <div className="flex items-center gap-3">
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                        {count} products
                      </span>
                      <span className="text-white/60 text-sm group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Browse <ChevronRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {activeMain && !activeCategory && (
        /* Subcategories Grid */
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>{MAIN_ICONS[activeMain]}</span>
              {mainCategories.find(m => m.id === activeMain)?.name}
            </h2>
            <span className="text-gray-500 text-sm">{allProducts.filter(p => p.mainCategory === activeMain).length} products</span>
          </div>
          <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {subcategories.map(cat => {
              const products = allProducts.filter(p => p.mainCategory === activeMain && p.category === cat);
              const colors = MAIN_COLORS[activeMain]!;
              return (
                <motion.div key={cat} variants={item}>
                  <button
                    onClick={() => setActiveCategory(cat)}
                    className="glass-card rounded-2xl border border-white/5 p-5 text-left w-full hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-0.5 group"
                  >
                    <h3 className="text-white font-semibold group-hover:text-purple-300 transition-colors">{cat}</h3>
                    <p className="text-gray-500 text-sm mt-1">{products.length} products</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {products.slice(0, 3).map(p => (
                        <img
                          key={p.id}
                          src={getProductImage(p.name.split(' ').slice(0, 2).join('-'))}
                          alt=""
                          className="w-8 h-8 rounded-lg object-cover"
                          loading="lazy"
                        />
                      ))}
                      {products.length > 3 && (
                        <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[10px] text-gray-500">+{products.length - 3}</span>
                      )}
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      )}

      {activeCategory && (
        /* Products in category */
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">{activeCategory}</h2>
            <span className="text-gray-500 text-sm">{filteredProducts.length} products</span>
          </div>
          {filteredProducts.length > 0 ? (
            <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map(product => (
                <motion.div key={product.id} variants={item}>
                  <ProductCard product={product} className="hover:-translate-y-1 transition-transform duration-300" />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500">No products in this category yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
