import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ProductImage } from '../components/ui/ProductImage';

export function Cart() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  const tax = totalPrice * 0.075;
  const total = totalPrice + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-purple-600/10 border border-purple-500/20 flex items-center justify-center">
            <ShoppingBag className="h-10 w-10 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Your cart is empty</h2>
          <p className="text-gray-400 max-w-sm">
            Looks like you haven't added any products yet. Start browsing our marketplace to find fresh agricultural products.
          </p>
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-8 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/25"
          >
            Browse Marketplace <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Shopping Cart</h1>
        <p className="text-gray-400 mt-2">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map(item => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20, height: 0 }}
                className="glass-card rounded-2xl border border-white/5 p-5"
              >
                <div className="flex gap-5">
                  <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                    <ProductImage src={item.image} alt={item.name} className="w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-xs text-purple-400 bg-purple-600/10 px-2 py-0.5 rounded-full">{item.category}</span>
                        <h3 className="text-white font-medium mt-1 line-clamp-2">{item.name}</h3>
                        <p className="text-gray-500 text-sm">{item.unit}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1 bg-white/5 rounded-xl border border-white/10">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-2 text-gray-400 hover:text-white transition-colors text-lg leading-none"
                        >-</button>
                        <span className="px-3 text-white font-medium min-w-[2rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-2 text-gray-400 hover:text-white transition-colors text-lg leading-none"
                        >+</button>
                      </div>
                      <div className="text-right">
                        <div className="text-purple-400 font-bold text-lg">{(item.price * item.quantity).toFixed(0)}π</div>
                        <div className="text-gray-500 text-xs">{item.price}π each</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-1">
          <div className="glass-card rounded-2xl border border-purple-500/10 p-6 sticky top-24">
            <h3 className="text-white font-semibold text-lg mb-5">Order Summary</h3>
            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span>{totalPrice.toFixed(0)}π</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Tax (7.5%)</span>
                <span>{tax.toFixed(2)}π</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Delivery</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="border-t border-white/5 pt-3 flex justify-between text-white font-bold text-xl">
                <span>Total</span>
                <span className="text-purple-400">{total.toFixed(2)}π</span>
              </div>
            </div>
            <div className="space-y-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/checkout')}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight className="h-4 w-4" />
              </motion.button>
              <Link
                to="/marketplace"
                className="w-full border border-white/10 hover:border-purple-500/50 text-gray-400 hover:text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
