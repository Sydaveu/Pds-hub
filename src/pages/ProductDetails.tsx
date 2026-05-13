import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Star, MapPin, Package, Check, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '../components/product-card/ProductCard';
import { useCart } from '../context/CartContext';
import { useAuth } from '../lib/auth';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  gallery: string[];
  category: string;
  description: string;
  rating: number;
  reviews: number;
  stock: number;
  unit: string;
  origin: string;
}

const allProducts: Record<string, Product> = {
  'c1': { id: 'c1', name: 'Premium Long Grain Rice (25kg)', price: 15, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1563729784474-d07d79ec55a0?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1556912051-8f9ef55cb370?auto=format&fit=crop&w=800&q=80'], category: 'Rice', description: 'High-quality long grain rice, aged to perfection for optimal flavor and texture. Each grain is carefully selected and polished to ensure uniform size and purity.', rating: 4.8, reviews: 124, stock: 50, unit: 'bag', origin: 'Northern Nigeria' },
  'c2': { id: 'c2', name: 'Basmathi Rice (10kg)', price: 22, image: 'https://images.unsplash.com/photo-1563729784474-d07d79ec55a0?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1563729784474-d07d79ec55a0?auto=format&fit=crop&w=800&q=80'], category: 'Rice', description: 'Premium basmati rice with aromatic fragrance and long grains. Perfect for biryanis and pilaf dishes.', rating: 4.9, reviews: 89, stock: 30, unit: 'bag', origin: 'Northern Nigeria' },
  'c3': { id: 'c3', name: 'Brown Rice (5kg)', price: 12, image: 'https://images.unsplash.com/photo-1556912051-8f9ef55cb370?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1556912051-8f9ef55cb370?auto=format&fit=crop&w=800&q=80'], category: 'Rice', description: 'Nutritious brown rice with bran layer intact. Rich in fiber and essential minerals.', rating: 4.7, reviews: 67, stock: 100, unit: 'bag', origin: 'Central Nigeria' },
  'c4': { id: 'c4', name: 'Black Eyed Beans (2kg)', price: 8, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80'], category: 'Beans', description: 'Protein-rich black eyed beans, organically grown without pesticides. High in protein, fiber, and essential minerals.', rating: 4.9, reviews: 45, stock: 80, unit: 'kg', origin: 'Southern Nigeria' },
  'c5': { id: 'c5', name: 'Yellow Maize (Corn) (10kg)', price: 18, image: 'https://images.unsplash.com/photo-1593642532843-3690d151cb38?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1593642532843-3690d151cb38?auto=format&fit=crop&w=800&q=80'], category: 'Maize', description: 'Sweet yellow maize kernels, perfect for roasting, boiling, or grinding into flour. Non-GMO and naturally grown.', rating: 4.7, reviews: 67, stock: 100, unit: 'kg', origin: 'Central Nigeria' },
  'c6': { id: 'c6', name: 'Fresh Tomatoes (5kg box)', price: 12, image: 'https://images.unsplash.com/photo-1592924403410-0001ca42cb5e?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1592924403410-0001ca42cb5e?auto=format&fit=crop&w=800&q=80'], category: 'Vegetables', description: 'Ripe, juicy tomatoes perfect for salads and cooking. Farm fresh and full of vitamins.', rating: 4.8, reviews: 56, stock: 60, unit: 'box', origin: 'Plateau State' },
  'c7': { id: 'c7', name: 'Organic Carrots (3kg)', price: 10, image: 'https://images.unsplash.com/photo-1591876323328-770d49ba3955?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1591876323328-770d49ba3955?auto=format&fit=crop&w=800&q=80'], category: 'Vegetables', description: 'Sweet, crunchy organic carrots, rich in beta-carotene and antioxidants.', rating: 4.9, reviews: 78, stock: 120, unit: 'kg', origin: 'Jos, Nigeria' },
  'c8': { id: 'c8', name: 'Red Bell Peppers (2kg)', price: 15, image: 'https://images.unsplash.com/photo-1589274270882-3330a129c9f5?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1589274270882-3330a129c9f5?auto=format&fit=crop&w=800&q=80'], category: 'Vegetables', description: 'Vibrant red bell peppers, sweet and crisp. Perfect for stir-fries, salads and stuffing.', rating: 4.8, reviews: 34, stock: 50, unit: 'kg', origin: 'Plateau State' },
  'c9': { id: 'c9', name: 'Sweet Mangoes (10pcs)', price: 20, image: 'https://images.unsplash.com/photo-1583396580942-3380ac6d5bee?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1583396580942-3380ac6d5bee?auto=format&fit=crop&w=800&q=80'], category: 'Fruits', description: 'Juicy ripe mangoes, perfect for smoothies and snacks. Packed with vitamins A and C.', rating: 4.9, reviews: 90, stock: 200, unit: 'pack', origin: 'Benue State' },
  'c10': { id: 'c10', name: 'Fresh Pineapples (5pcs)', price: 18, image: 'https://images.unsplash.com/photo-1567306225709-6d9b96d23a3e?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1567306225709-6d9b96d23a3e?auto=format&fit=crop&w=800&q=80'], category: 'Fruits', description: 'Golden pineapples, rich in vitamin C and bromelain. Naturally sweet and juicy.', rating: 4.8, reviews: 43, stock: 80, unit: 'pack', origin: 'Cross River State' },
  'c11': { id: 'c11', name: 'Live Goat (Medium)', price: 150, image: 'https://images.unsplash.com/photo-1583337130417-3346a1e7d9e9?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1583337130417-3346a1e7d9e9?auto=format&fit=crop&w=800&q=80'], category: 'Livestock', description: 'Healthy live goat, suitable for breeding or meat. Properly vaccinated and certified.', rating: 4.7, reviews: 28, stock: 15, unit: 'head', origin: 'Kaduna State' },
  'c12': { id: 'c12', name: 'Broiler Chicken (2kg)', price: 25, image: 'https://images.unsplash.com/photo-1582722573459-23b5b8e03dc2?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1582722573459-23b5b8e03dc2?auto=format&fit=crop&w=800&q=80'], category: 'Poultry', description: 'Tender broiler chicken, raised without antibiotics. Fresh and ready for cooking.', rating: 4.8, reviews: 65, stock: 40, unit: 'bird', origin: 'Lagos State' },
  'c13': { id: 'c13', name: 'Fresh Tilapia (5kg)', price: 35, image: 'https://images.unsplash.com/photo-1562584501-58b3b978aae3?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1562584501-58b3b978aae3?auto=format&fit=crop&w=800&q=80'], category: 'Fishery', description: 'Freshwater tilapia, clean and firm texture. Caught fresh from local fish farms.', rating: 4.9, reviews: 72, stock: 60, unit: 'kg', origin: 'Niger State' },
  'c14': { id: 'c14', name: 'Fresh Cow Milk (10L)', price: 20, image: 'https://images.unsplash.com/photo-1589110383685-8b48970aea14?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1589110383685-8b48970aea14?auto=format&fit=crop&w=800&q=80'], category: 'Dairy', description: 'Pure cow milk, rich in calcium and protein. Collected fresh daily from grass-fed cows.', rating: 4.8, reviews: 55, stock: 30, unit: 'litre', origin: 'Kano State' },
  'c15': { id: 'c15', name: 'Natural Honey (500ml)', price: 15, image: 'https://images.unsplash.com/photo-1578782973178-ab70462fab3e?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1578782973178-ab70462fab3e?auto=format&fit=crop&w=800&q=80'], category: 'Honey', description: 'Pure natural honey, unfiltered and unpasteurized. Rich in antioxidants and antibacterial properties.', rating: 4.9, reviews: 110, stock: 80, unit: 'jar', origin: 'Plateau State' },
  'c16': { id: 'c16', name: 'Hoe Tool Set (3pcs)', price: 45, image: 'https://images.unsplash.com/photo-1581091863477-7e58664e5e89?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1581091863477-7e58664e5e89?auto=format&fit=crop&w=800&q=80'], category: 'Farm Tools', description: 'Durable hoe set for weeding and soil preparation. Heavy-duty steel with ergonomic handles.', rating: 4.7, reviews: 38, stock: 25, unit: 'set', origin: 'Made in Nigeria' },
  'c17': { id: 'c17', name: 'NPK Fertilizer (25kg bag)', price: 60, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'], category: 'Fertilizers', description: 'Balanced NPK fertilizer for optimal crop growth. Suitable for all soil types and crop varieties.', rating: 4.8, reviews: 44, stock: 100, unit: 'bag', origin: 'Nigeria' },
  'c18': { id: 'c18', name: 'Maize Seeds (2kg)', price: 12, image: 'https://images.unsplash.com/photo-1593642532843-3690d151cb38?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1593642532843-3690d151cb38?auto=format&fit=crop&w=800&q=80'], category: 'Seeds', description: 'High-yield maize seeds, treated and ready for planting. 95% germination rate guaranteed.', rating: 4.7, reviews: 29, stock: 150, unit: 'pack', origin: 'IITA Certified' },
  'c19': { id: 'c19', name: 'Golden Retriever Puppy', price: 200, image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80'], category: 'Pets', description: 'Friendly golden retriever puppy, vaccinated and dewormed. Health certificate included.', rating: 4.9, reviews: 22, stock: 5, unit: 'puppy', origin: 'Lagos State' },
  '1': { id: '1', name: 'Premium Rice Bag (50kg)', price: 25, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80'], category: 'Rice', description: 'Premium quality long grain rice in a 50kg bag. Perfect for families and bulk buyers.', rating: 4.8, reviews: 124, stock: 50, unit: 'bag', origin: 'Northern Nigeria' },
  '2': { id: '2', name: 'Fresh Organic Beans', price: 20, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80'], category: 'Beans', description: 'Nutrient-rich organic beans, grown without pesticides. High in protein and fiber.', rating: 4.9, reviews: 89, stock: 30, unit: 'kg', origin: 'Southern Nigeria' },
  '3': { id: '3', name: 'Yellow Maize (Corn)', price: 18, image: 'https://images.unsplash.com/photo-1593642532843-3690d151cb38?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1593642532843-3690d151cb38?auto=format&fit=crop&w=800&q=80'], category: 'Maize', description: 'Sweet yellow maize kernels, perfect for roasting or grinding. Non-GMO.', rating: 4.7, reviews: 67, stock: 100, unit: 'kg', origin: 'Central Nigeria' },
  '4': { id: '4', name: 'Farm Fresh Tomatoes', price: 15, image: 'https://images.unsplash.com/photo-1592924403410-0001ca42cb5e?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1592924403410-0001ca42cb5e?auto=format&fit=crop&w=800&q=80'], category: 'Vegetables', description: 'Farm-fresh tomatoes, ripe and full of flavor. Perfect for cooking and salads.', rating: 4.8, reviews: 56, stock: 60, unit: 'kg', origin: 'Plateau State' },
};

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, isInCart } = useCart();
  const { user } = useAuth();

  const product = allProducts[id || ''];
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

  const relatedProducts = Object.values(allProducts)
    .filter(p => p.category === product.category && p.id !== product.id)
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
              {product.stock > 0 && (
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
            <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin className="h-4 w-4 text-purple-400" />
            <span>Origin: {product.origin}</span>
            <span className="ml-4">
              <Package className="h-4 w-4 text-purple-400 inline mr-1" />
              {product.stock} available
            </span>
          </div>

          <p className="text-gray-300 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-3">
            <div className="flex items-center border border-white/10 rounded-xl overflow-hidden">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-lg font-bold">-</button>
              <span className="px-6 py-3 text-white font-medium">{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-lg font-bold">+</button>
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
