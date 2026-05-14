import { useState, useRef, useEffect, useCallback } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { searchProducts, getAutocompleteSuggestions, type SearchResult } from '../../lib/searchUtils';
import { ProductImage } from '../../components/ui/ProductImage';

interface SmartSearchProps {
  onSearchChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  onProductSelect?: (productId: string) => void;
}

const MAIN_CAT_COLORS: Record<string, string> = {
  food: 'bg-emerald-500/20 text-emerald-400',
  tools: 'bg-amber-500/20 text-amber-400',
  animals: 'bg-purple-500/20 text-purple-400',
};

const MAIN_CAT_LABELS: Record<string, string> = {
  food: 'FOOD',
  tools: 'TOOLS',
  animals: 'ANIMALS',
};

export function SmartSearch({ onSearchChange, placeholder, autoFocus, onProductSelect }: SmartSearchProps) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [autocompleteItems, setAutocompleteItems] = useState<{ text: string; category: string; mainCategory: string }[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const doSearch = useCallback((value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setResults([]);
      setAutocompleteItems([]);
      setIsSearching(false);
      return;
    }
    const productResults = searchProducts(trimmed, 8);
    setResults(productResults);
    const suggestions = getAutocompleteSuggestions(trimmed, 5);
    setAutocompleteItems(suggestions);
    setIsSearching(false);
  }, []);

  const handleChange = (value: string) => {
    setInputValue(value);
    onSearchChange(value);
    setSelectedIndex(-1);

    if (value.trim()) {
      setShowDropdown(true);
      setIsSearching(true);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => doSearch(value), 100);
    } else {
      setShowDropdown(false);
      setResults([]);
      setAutocompleteItems([]);
      setIsSearching(false);
    }
  };

  const handleSelect = (result: SearchResult) => {
    setInputValue(result.product.name);
    onSearchChange(result.product.name);
    setShowDropdown(false);
    if (onProductSelect) {
      onProductSelect(result.product.id);
    } else {
      navigate(`/product-details/${result.product.id}`);
    }
  };

  const handleAutocompleteSelect = (text: string) => {
    setInputValue(text);
    onSearchChange(text);
    doSearch(text);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setInputValue('');
    onSearchChange('');
    setResults([]);
    setAutocompleteItems([]);
    setShowDropdown(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return;
    const totalItems = results.length + (inputValue.trim() ? 1 : 0);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < totalItems - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : totalItems - 1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      if (selectedIndex < results.length) {
        handleSelect(results[selectedIndex]);
      } else {
        handleChange(inputValue);
        setShowDropdown(false);
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  const showDropdownContent = showDropdown && inputValue.trim() && (results.length > 0 || autocompleteItems.length > 0);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={e => handleChange(e.target.value)}
          onFocus={() => { if (inputValue.trim()) setShowDropdown(true); }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder ?? 'Search anything... Try "rice", "tractor", "german shepherd"...'}
          className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-base"
        />
        {inputValue && (
          <button onClick={handleClear} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
            {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : <X className="h-5 w-5" />}
          </button>
        )}
      </div>

      {showDropdownContent && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 z-[100] overflow-hidden max-h-96 overflow-y-auto">
          {/* Autocomplete suggestions */}
          {autocompleteItems.length > 0 && (
            <div>
              <div className="px-4 pt-3 pb-1.5 text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Suggestions</div>
              {autocompleteItems.map((item, i) => (
                <button
                  key={`ac-${i}`}
                  onClick={() => handleAutocompleteSelect(item.text)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${selectedIndex === results.length + i ? 'bg-purple-600/20 text-white' : 'text-gray-300 hover:bg-white/5'}`}
                >
                  <Search className="h-3.5 w-3.5 text-gray-500 flex-shrink-0" />
                  <span className="flex-1 text-left">{item.text}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${MAIN_CAT_COLORS[item.mainCategory] ?? 'bg-gray-500/20 text-gray-400'}`}>
                    {MAIN_CAT_LABELS[item.mainCategory] ?? item.mainCategory}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Product results */}
          {results.length > 0 && (
            <div>
              <div className="px-4 pt-2 pb-1.5 text-[10px] uppercase tracking-widest text-gray-500 font-semibold border-t border-white/5">
                Products ({results.length})
              </div>
              {results.map((result, i) => (
                <button
                  key={result.product.id}
                  onClick={() => handleSelect(result)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${selectedIndex === i ? 'bg-purple-600/20 text-white' : 'text-gray-300 hover:bg-white/5'}`}
                >
                  <ProductImage
                    src=""
                    alt={result.product.name}
                    productId={result.product.id}
                    productName={result.product.name}
                    category={result.product.mainCategory}
                    className="w-10 h-10 rounded-lg overflow-hidden bg-white/5 flex-shrink-0"
                  />
                  <div className="flex-1 text-left min-w-0">
                    <p className="font-medium text-white truncate">{result.product.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-purple-400 font-semibold text-xs">{result.product.price}{'\u03c0'}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${MAIN_CAT_COLORS[result.product.mainCategory] ?? 'bg-gray-500/20 text-gray-400'}`}>
                        {result.product.category}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* View all */}
          <button
            onClick={() => { onSearchChange(inputValue); setShowDropdown(false); }}
            className="w-full px-4 py-3 text-center text-sm text-purple-400 hover:bg-purple-600/10 border-t border-white/5 font-medium transition-colors"
          >
            View all results for "{inputValue}"
          </button>
        </div>
      )}
    </div>
  );
}
