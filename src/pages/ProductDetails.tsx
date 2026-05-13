import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Star, MapPin, Package, Check, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '../components/product-card/ProductCard';
import { useCart } from '../context/CartContext';
import { useAuth } from '../lib/auth';
import { getProductById, getProductsByCategory } from '../lib/products';
import type { Product } from '../lib/products';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, isInCart } = useCart();
  const { user } = useAuth();

  const product = id ? getProductById(id) : undefined;
  const [mainImage, setMainImage] = useState(product?.image || '');
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'highlights' | 'shipping'>('description');

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-4">
        <div className="text-5xl">🌾</div>
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-gray-400">This product may have been removed or the link is invalid.</p>
        <Link to="/marketplace" className="bg-purple-600 hover:bg-purple-500 text-white font-medium py-3 px-8 rounded-xl transition-colors">
          Browse Marketplace
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: `/product-details/${product.id}` } } });
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      unit: product.unit,
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const handleBuyNow = () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      unit: product.unit,
    });
    navigate('/checkout');
  };

  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-10 py-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2 space-y-4">
          <motion.div
            key={mainImage}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            className="relative h-80 md:h-96 rounded-2xl overflow-hidden glass-card border border-purple-500/10"
          >
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80'; }}
            />
            <div className="absolute top-3 right-3 bg-purple-600/90 text-white text-xs font-medium px-2.5 py-1 rounded-full">
              {product.category}
            </div>
          </motion.div>
          <div className="flex gap-3">
            {product.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${mainImage === img ? 'border-purple-500' : 'border-white/10 hover:border-purple-500/50'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).src = product.image; }} />
              </button>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/2 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-purple-600/20 text-purple-400 px-2.5 py-1 rounded-full">{product.category}</span>
              {(product.stock ?? 0) > 0 && (
                <span className="text-xs bg-green-500/10 text-green-400 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> In Stock
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">{product.name}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-purple-400">{product.price}π</div>
            <div className="text-gray-400 text-sm">/ {product.unit}</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex">
              {[1,2,3,4,5].map(s => (
                <Star key={s} className={`h-4 w-4 ${s <= Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`} />
              ))}
            </div>
            <span className="text-white font-medium">{product.rating}</span>
            <span className="text-gray-400 text-sm">({product.reviews ?? 0} reviews)</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin className="h-4 w-4 text-purple-400" />
            <span>Origin: {product.origin}</span>
            <span className="ml-4">
              <Package className="h-4 w-4 text-purple-400 inline mr-1" />
              {product.stock ?? 0} available
            </span>
          </div>

          <p className="text-gray-300 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-3">
            <div className="flex items-center border border-white/10 rounded-xl overflow-hidden">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-lg font-bold">-</button>
              <span className="px-6 py-3 text-white font-medium">{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(product.stock ?? 99, q + 1))} className="px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-lg font-bold">+</button>
            </div>
            <span className="text-gray-500 text-sm">× {product.price}π = <span className="text-purple-400 font-bold">{(quantity * product.price).toFixed(0)}π</span></span>
          </div>

          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${
                isInCart(product.id)
                  ? 'bg-green-600/20 border border-green-500/50 text-green-400'
                  : 'border border-purple-500/50 hover:border-purple-500 text-purple-400 hover:bg-purple-500/10'
              }`}
            >
              <AnimatePresence mode="wait">
                {addedFeedback ? (
                  <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                    <Check className="h-4 w-4" /> Added to Cart!
                  </motion.span>
                ) : (
                  <motion.span key="cart" className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" /> {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleBuyNow}
              className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3.5 px-6 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/25"
            >
              Buy Now
            </motion.button>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="flex border-b border-white/5">
          {(['description', 'highlights', 'shipping'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-sm font-medium capitalize transition-all ${activeTab === tab ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
            >
              {tab === 'highlights' ? 'Product Highlights' : tab === 'shipping' ? 'Shipping & Storage' : 'Description'}
            </button>
          ))}
        </div>
        <div className="p-6">
          {activeTab === 'description' && (
            <p className="text-gray-300 leading-relaxed">
              Our {product.name.toLowerCase()} undergoes rigorous quality checks to ensure you receive only the best.
              From farm to table, we maintain strict hygiene standards and optimal storage conditions to preserve freshness and nutritional value.
              Each {product.unit} is carefully measured and packaged to protect against moisture and contaminants.
            </p>
          )}
          {activeTab === 'highlights' && (
            <ul className="space-y-2">
              {['Premium quality grade A', 'Freshly harvested and processed', 'No additives or preservatives', 'Rich in essential nutrients', 'Suitable for various culinary uses'].map(h => (
                <li key={h} className="flex items-center gap-2 text-gray-300">
                  <Check className="h-4 w-4 text-purple-400 flex-shrink-0" /> {h}
                </li>
              ))}
            </ul>
          )}
          {activeTab === 'shipping' && (
            <div className="space-y-3 text-gray-300">
              <p>Store in a cool, dry place away from direct sunlight. Once opened, transfer to an airtight container to maintain freshness.</p>
              <p>Delivery available nationwide. Orders are processed within 24 hours and delivered in 2–5 business days.</p>
            </div>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">You May Also Like</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map(related => (
              <ProductCard key={related.id} product={related} className="hover:-translate-y-1 transition-transform duration-300" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
