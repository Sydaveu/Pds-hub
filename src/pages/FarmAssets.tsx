import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronDown, Grid3X3, List } from 'lucide-react';
import { farmAssets, assetCategories, getAssetImageUrl, type FarmAsset } from '../data/farmAssets';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const ERA_COLORS = {
  native: { bg: 'from-amber-700/30 to-yellow-900/30', text: 'text-amber-400', border: 'border-amber-500/30', glow: 'shadow-amber-500/15', tag: 'bg-amber-600/20 text-amber-300' },
  modern: { bg: 'from-cyan-700/30 to-blue-900/30', text: 'text-cyan-400', border: 'border-cyan-500/30', glow: 'shadow-cyan-500/15', tag: 'bg-cyan-600/20 text-cyan-300' },
};

const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  food: { bg: 'bg-emerald-500/20', text: 'text-emerald-400' },
  animal: { bg: 'bg-purple-500/20', text: 'text-purple-400' },
  tool: { bg: 'bg-amber-500/20', text: 'text-amber-400' },
  utility: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
};

const CAT_LABELS: Record<string, string> = {
  food: 'Food', animal: 'Animal', tool: 'Tool', utility: 'Utility',
};

export function FarmAssets() {
  const [selectedEra, setSelectedEra] = useState<'all' | 'native' | 'modern'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    let result = farmAssets;
    if (selectedEra !== 'all') result = result.filter(a => a.era === selectedEra);
    if (selectedCategory !== 'all') result = result.filter(a => a.category === selectedCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.era.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.keywords.some(k => k.includes(q))
      );
    }
    return result;
  }, [selectedEra, selectedCategory, searchQuery]);

  const nativeCount = farmAssets.filter(a => a.era === 'native').length;
  const modernCount = farmAssets.filter(a => a.era === 'modern').length;

  const clearFilters = () => {
    setSelectedEra('all');
    setSelectedCategory('all');
    setSearchQuery('');
  };

  const hasFilters = selectedEra !== 'all' || selectedCategory !== 'all' || searchQuery;

  return (
    <div className="space-y-8 py-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Farm Asset Showcase</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Explore agricultural assets from Native traditions to Modern innovations</p>
      </div>

      {/* Era Toggle */}
      <div className="flex gap-3 justify-center flex-wrap">
        <button onClick={() => setSelectedEra('all')}
          className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all ${selectedEra === 'all' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'}`}
        >
          All Eras ({farmAssets.length})
        </button>
        <button onClick={() => setSelectedEra('native')}
          className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all ${selectedEra === 'native' ? 'bg-gradient-to-r from-amber-600 to-yellow-700 text-white shadow-lg shadow-amber-500/25' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'}`}
        >
          <span className="mr-1">🪵</span> Native Era ({nativeCount})
        </button>
        <button onClick={() => setSelectedEra('modern')}
          className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all ${selectedEra === 'modern' ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white shadow-lg shadow-cyan-500/25' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'}`}
        >
          <span className="mr-1">⚙️</span> Modern Era ({modernCount})
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search farm assets..."
            className="w-full pl-11 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {assetCategories.map(cat => (
            <button key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${selectedCategory === cat.id ? 'bg-purple-600 text-white' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'}`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
        <div className="flex border border-white/10 rounded-xl overflow-hidden">
          <button onClick={() => setViewMode('grid')} className={`p-2.5 ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>
            <Grid3X3 className="h-4 w-4" />
          </button>
          <button onClick={() => setViewMode('list')} className={`p-2.5 ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Results info */}
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-sm">
          <span className="text-white font-semibold">{filtered.length}</span> asset{filtered.length !== 1 ? 's' : ''} found
        </p>
        {hasFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5">
            <X className="h-3 w-3" /> Clear Filters
          </button>
        )}
      </div>

      {/* Results Grid / List */}
      {filtered.length > 0 ? (
        viewMode === 'grid' ? (
          <motion.div variants={container} initial="hidden" animate="show"
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.map(asset => (
              <motion.div key={asset.id} variants={item}>
                <AssetCard asset={asset} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
            {filtered.map(asset => (
              <motion.div key={asset.id} variants={item}>
                <AssetListItem asset={asset} />
              </motion.div>
            ))}
          </motion.div>
        )
      ) : (
        <div className="text-center py-20 space-y-4">
          <div className="text-6xl">🔍</div>
          <h3 className="text-white text-xl font-semibold">No assets found</h3>
          <p className="text-gray-400">Try a different search or filter combination</p>
          <button onClick={clearFilters} className="bg-purple-600 hover:bg-purple-500 text-white font-medium py-2.5 px-6 rounded-xl transition-all">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

function AssetCard({ asset }: { asset: FarmAsset }) {
  const [imgError, setImgError] = useState(false);
  const imgSrc = getAssetImageUrl(asset);
  const eraStyle = ERA_COLORS[asset.era];
  const catStyle = CAT_COLORS[asset.category] ?? { bg: 'bg-gray-500/20', text: 'text-gray-400' };

  return (
    <div className="glass-card rounded-2xl border border-white/5 overflow-hidden hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 group">
      <div className="relative overflow-hidden bg-black/20" style={{ maxHeight: '160px' }}>
        {imgError ? (
          <div className="w-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-8" style={{ height: '160px' }}>
            <span className="text-5xl opacity-30">
              {asset.category === 'food' ? '🌾' : asset.category === 'animal' ? '🐾' : asset.category === 'tool' ? '🔧' : '⚡'}
            </span>
          </div>
        ) : (
          <img
            src={imgSrc}
            alt={asset.alt}
            loading="lazy"
            className="w-full object-contain bg-black/40 transition-transform duration-500 group-hover:scale-105"
            style={{ maxHeight: '160px' }}
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute top-0 left-0 right-0 p-2 flex justify-between items-start">
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${eraStyle.tag}`}>
            {asset.era === 'native' ? '🪵 Native' : '⚙️ Modern'}
          </span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${catStyle.bg} ${catStyle.text}`}>
            {CAT_LABELS[asset.category] ?? asset.category}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors text-sm leading-snug truncate">
          {asset.name}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
          {asset.description}
        </p>
      </div>
    </div>
  );
}

function AssetListItem({ asset }: { asset: FarmAsset }) {
  const [imgError, setImgError] = useState(false);
  const imgSrc = getAssetImageUrl(asset);
  const eraStyle = ERA_COLORS[asset.era];
  const catStyle = CAT_COLORS[asset.category] ?? { bg: 'bg-gray-500/20', text: 'text-gray-400' };

  return (
    <div className="glass-card rounded-2xl border border-white/5 p-3 flex gap-4 items-center hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 group">
      <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-2xl">
            {asset.category === 'food' ? '🌾' : asset.category === 'animal' ? '🐾' : asset.category === 'tool' ? '🔧' : '⚡'}
          </div>
        ) : (
          <img
            src={imgSrc}
            alt={asset.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium text-sm truncate group-hover:text-purple-300 transition-colors">{asset.name}</p>
        <p className="text-gray-500 text-xs mt-0.5 truncate">{asset.description}</p>
      </div>
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${eraStyle.tag}`}>
          {asset.era === 'native' ? 'Native' : 'Modern'}
        </span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${catStyle.bg} ${catStyle.text}`}>
          {CAT_LABELS[asset.category] ?? asset.category}
        </span>
      </div>
    </div>
  );
}
