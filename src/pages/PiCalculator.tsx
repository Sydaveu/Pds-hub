import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronDown } from 'lucide-react';

// Placeholder data for currencies and their conversion rates relative to USD.
// NOTE: This data is illustrative. For real-time rates, a dedicated API would be needed.
// The base rate is 1 Pi = $314,159 USD.
const currencyData = [
  { code: 'USD', name: 'United States Dollar', symbol: '$', rate: 1.0 },
  { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.92 }, // Example rate
  { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.79 }, // Example rate
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 155.50 }, // Example rate
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', rate: 1.37 }, // Example rate
  { code: 'AUD', name: 'Australian Dollar', symbol: 'AU$', rate: 1.51 }, // Example rate
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 83.50 }, // Example rate
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', rate: 1450 }, // Example rate (approximate)
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', rate: 18.50 }, // Example rate
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', rate: 129.50 }, // Example rate
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: 'GH₵', rate: 12.00 }, // Example rate
];

const PI_TO_USD_RATE = 314159;

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export function PiCalculator() {
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState('USD');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedCurrency = useMemo(() => {
    return currencyData.find(c => c.code === selectedCurrencyCode) || currencyData[0];
  }, [selectedCurrencyCode]);

  const piInSelectedCurrency = useMemo(() => {
    if (!selectedCurrency) return 0;
    // Convert Pi to USD, then USD to the selected currency
    const valueInUSD = PI_TO_USD_RATE;
    const valueInFiat = valueInUSD * selectedCurrency.rate;
    return valueInFiat;
  }, [selectedCurrency]);

  const formattedPiValue = useMemo(() => {
    if (!selectedCurrency) return 'N/A';
    return `${selectedCurrency.symbol} ${piInSelectedCurrency.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }, [selectedCurrency, piInSelectedCurrency]);

  const filteredCurrencies = useMemo(() => {
    if (!searchQuery) return currencyData;
    const q = searchQuery.toLowerCase();
    return currencyData.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.symbol.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCurrency = (code: string) => {
    setSelectedCurrencyCode(code);
    setIsDropdownOpen(false);
    setSearchQuery('');
  };

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="show" 
      className="glass-card rounded-3xl border border-white/10 p-8 text-center flex flex-col items-center"
    >
      <div className="text-5xl mb-4">π</div>
      <h1 className="text-4xl font-bold text-white mb-3">Pi Calculator</h1>
      <p className="text-purple-300 text-sm mb-6">Real-time value check powered by community estimates.</p>

      <div className="w-full max-w-md relative mb-6" ref={wrapperRef}>
        <label htmlFor="currency-select" className="sr-only">Select Currency</label>
        <button 
          onClick={() => setIsDropdownOpen(v => !v)}
          className="w-full flex justify-between items-center px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-base"
        >
          {selectedCurrency ? (
            <>
              <span className="flex items-center gap-2">
                {selectedCurrency.symbol} ({selectedCurrency.code})
              </span>
              <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
            </>
          ) : (
            <span className="text-gray-500">Select a currency</span>
          )}
        </button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
            >
              <div className="p-2">
                <div className="relative mb-2 px-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search currency..."
                    className="w-full px-10 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                  />
                </div>
                <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-600/40">
                  {filteredCurrencies.map(currency => (
                    <button 
                      key={currency.code}
                      onClick={() => handleSelectCurrency(currency.code)}
                      className="w-full flex justify-between items-center px-3 py-2.5 rounded-lg text-sm transition-colors text-gray-300 hover:bg-white/5 hover:text-white"
                    >
                      <span>{currency.symbol} ({currency.code}) - {currency.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Display Area */}
      <motion.div 
        variants={item}
        className="mt-4 p-6 border border-white/10 rounded-2xl bg-gray-900/70 backdrop-blur-sm shadow-inner w-full max-w-md"
      >
        <p className="text-gray-400 text-lg mb-2">1 Pi =</p>
        <p className="text-5xl font-bold text-purple-400 flex items-center justify-center gap-2">
          {selectedCurrency.symbol}
          <span className="text-white">{PI_TO_USD_RATE.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span> 
          <span className="text-lg text-purple-400">({selectedCurrency.code})</span>
        </p>
        <p className="text-gray-500 text-sm mt-1">
          ~ {formattedPiValue}
        </p>
      </motion.div>
      
      <p className="mt-8 text-gray-500 text-xs max-w-sm italic">
        Disclaimer: Pi conversion rates are community-driven estimates and not financial advice.
      </p>
    </motion.div>
  );
}
