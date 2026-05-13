import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, CreditCard, Coins, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

type PaymentMethod = 'pi' | 'visa' | 'mastercard' | 'crypto';
type Step = 'shipping' | 'payment' | 'confirmation';

interface ShippingInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<Step>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId] = useState(`PDS-${Math.floor(Math.random() * 90000) + 10000}`);
  const [shipping, setShipping] = useState<ShippingInfo>({
    fullName: '', phone: '', email: '', address: '', city: '', state: '', zipCode: ''
  });

  const tax = totalPrice * 0.075;
  const total = totalPrice + tax;

  const updateShipping = (field: keyof ShippingInfo, value: string) => {
    setShipping(prev => ({ ...prev, [field]: value }));
  };

  const handleContinueToPayment = () => {
    const required = ['fullName', 'phone', 'email', 'address', 'city', 'state', 'zipCode'] as const;
    const missing = required.find(f => !shipping[f]);
    if (missing) { alert('Please fill in all shipping fields'); return; }
    setStep('payment');
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsProcessing(false);
    setStep('confirmation');
    clearCart();
  };

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <div className="text-5xl">🛒</div>
        <h2 className="text-2xl font-bold text-white">Your cart is empty</h2>
        <Link to="/marketplace" className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-8 rounded-xl transition-all">
          Browse Marketplace
        </Link>
      </div>
    );
  }

  const steps: Step[] = ['shipping', 'payment', 'confirmation'];

  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Checkout</h1>
      </div>

      {/* Step Progress */}
      <div className="flex items-center justify-center gap-0">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              step === s ? 'bg-purple-600 text-white' :
              steps.indexOf(step) > i ? 'bg-green-600/20 text-green-400' : 'text-gray-500'
            }`}>
              {steps.indexOf(step) > i
                ? <Check className="h-4 w-4" />
                : <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs">{i+1}</span>
              }
              <span className="capitalize hidden sm:block">{s}</span>
            </div>
            {i < steps.length - 1 && <ChevronRight className="h-4 w-4 text-gray-600 mx-1" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {step === 'shipping' && (
              <motion.div key="shipping" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="glass-card rounded-2xl border border-white/5 p-6"
              >
                <h2 className="text-white font-semibold text-lg mb-6">Shipping Information</h2>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Full Name" value={shipping.fullName} onChange={v => updateShipping('fullName', v)} placeholder="John Doe" />
                    <Field label="Phone Number" value={shipping.phone} onChange={v => updateShipping('phone', v)} placeholder="+234 800 000 0000" type="tel" />
                  </div>
                  <Field label="Email Address" value={shipping.email} onChange={v => updateShipping('email', v)} placeholder="you@email.com" type="email" />
                  <Field label="Street Address" value={shipping.address} onChange={v => updateShipping('address', v)} placeholder="123 Farm Road" />
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Field label="City" value={shipping.city} onChange={v => updateShipping('city', v)} placeholder="Abuja" />
                    <Field label="State" value={shipping.state} onChange={v => updateShipping('state', v)} placeholder="FCT" />
                    <Field label="ZIP Code" value={shipping.zipCode} onChange={v => updateShipping('zipCode', v)} placeholder="900001" />
                  </div>
                  <div className="flex justify-end pt-2">
                    <button onClick={handleContinueToPayment}
                      className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-8 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/20 flex items-center gap-2"
                    >
                      Continue to Payment <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                className="glass-card rounded-2xl border border-white/5 p-6 space-y-6"
              >
                <h2 className="text-white font-semibold text-lg">Payment Method</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {([
                    { id: 'pi', label: 'Pi Network', icon: '🥧', desc: 'Pay with Pi cryptocurrency', recommended: true },
                    { id: 'visa', label: 'Visa', icon: '💳', desc: 'Credit or Debit card' },
                    { id: 'mastercard', label: 'Mastercard', icon: '💳', desc: 'Credit or Debit card' },
                    { id: 'crypto', label: 'Crypto', icon: '₿', desc: 'BTC, ETH, USDT' },
                  ] as const).map(pm => (
                    <button
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id)}
                      className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                        paymentMethod === pm.id
                          ? 'border-purple-500 bg-purple-600/10'
                          : 'border-white/10 hover:border-purple-500/50 hover:bg-white/2'
                      }`}
                    >
                      {'recommended' in pm && pm.recommended && (
                        <span className="absolute top-2 right-2 text-xs bg-amber-400/20 text-amber-400 px-2 py-0.5 rounded-full">Recommended</span>
                      )}
                      <div className="text-2xl mb-2">{pm.icon}</div>
                      <div className="text-white font-medium text-sm">{pm.label}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{pm.desc}</div>
                      {paymentMethod === pm.id && (
                        <div className="absolute top-2 left-2 w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="h-2.5 w-2.5 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {paymentMethod === 'pi' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-purple-600/10 border border-purple-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">🥧</div>
                      <div>
                        <p className="text-white font-medium">Pay with Pi Network</p>
                        <p className="text-gray-400 text-sm">Your Pi wallet will open to confirm the payment of <span className="text-purple-400 font-semibold">{total.toFixed(2)}π</span></p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {(paymentMethod === 'visa' || paymentMethod === 'mastercard') && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2"><CreditCard className="h-4 w-4" /> Card Number</label>
                      <input type="text" placeholder="1234 5678 9012 3456" maxLength={19}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Expiry Date</label>
                        <input type="text" placeholder="MM / YY" maxLength={5}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">CVV</label>
                        <input type="password" placeholder="•••" maxLength={4}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-all" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {paymentMethod === 'crypto' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                    <p className="text-amber-400 font-medium">₿ Crypto Payment</p>
                    <p className="text-gray-400 text-sm mt-1">Send <span className="text-amber-400 font-semibold">{total.toFixed(2)}π equivalent</span> to the wallet address provided after confirmation.</p>
                    <div className="mt-3 px-3 py-2 bg-black/30 rounded-lg font-mono text-xs text-gray-400 break-all">
                      0x742d35Cc6634C0532925a3b8D4C9a5b3f1c2d3e4
                    </div>
                  </motion.div>
                )}

                <div className="bg-white/3 rounded-xl p-4 space-y-2">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-400">{item.name} × {item.quantity}</span>
                      <span className="text-white">{(item.price * item.quantity)}π</span>
                    </div>
                  ))}
                  <div className="border-t border-white/5 pt-2 flex justify-between text-sm">
                    <span className="text-gray-400">Tax (7.5%)</span>
                    <span className="text-white">{tax.toFixed(2)}π</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-purple-400 text-lg">{total.toFixed(2)}π</span>
                  </div>
                </div>

                <div className="flex gap-3 justify-between">
                  <button onClick={() => setStep('shipping')} className="border border-white/10 hover:border-white/20 text-gray-400 hover:text-white font-medium py-3 px-6 rounded-xl transition-all text-sm">
                    ← Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-1 bg-purple-600 hover:bg-purple-500 disabled:opacity-60 text-white font-semibold py-3 px-8 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/20 flex items-center justify-center gap-2"
                  >
                    {isProcessing ? <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</> : `Place Order • ${total.toFixed(2)}π`}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'confirmation' && (
              <motion.div key="confirm" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl border border-green-500/20 p-8 text-center space-y-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.4, delay: 0.2 }}
                  className="w-20 h-20 mx-auto rounded-full bg-green-600/20 border border-green-500/30 flex items-center justify-center"
                >
                  <Check className="h-10 w-10 text-green-400" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Order Placed!</h2>
                  <p className="text-gray-400 mt-2">Your order <span className="text-purple-400 font-mono font-bold">#{orderId}</span> has been confirmed.</p>
                </div>
                <p className="text-gray-400 text-sm">
                  Thank you for shopping at PDS Agri-Hub. You'll receive a confirmation at <span className="text-white">{shipping.email || 'your email'}</span>.
                </p>
                <div className="flex gap-3 justify-center">
                  <Link to="/home" className="border border-white/10 hover:border-white/20 text-gray-300 hover:text-white font-medium py-3 px-6 rounded-xl transition-all text-sm">
                    Back to Home
                  </Link>
                  <Link to="/orders" className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-8 rounded-xl transition-all">
                    View Orders
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {step !== 'confirmation' && (
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl border border-purple-500/10 p-5 sticky top-24">
              <h3 className="text-white font-semibold mb-4">Your Items</h3>
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=100&q=80'; }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium line-clamp-1">{item.name}</p>
                      <p className="text-gray-500 text-xs">{item.quantity} × {item.price}π</p>
                    </div>
                    <span className="text-purple-400 text-xs font-bold">{(item.price * item.quantity)}π</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/5 mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Subtotal</span><span>{totalPrice.toFixed(0)}π</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Tax</span><span>{tax.toFixed(2)}π</span>
                </div>
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Total</span><span className="text-purple-400">{total.toFixed(2)}π</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all text-sm"
        required
      />
    </div>
  );
}
