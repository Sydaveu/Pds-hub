import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  unit: string;
}

// Mock cart data - in real app from localStorage or Supabase
const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Premium Long Grain Rice (25kg)',
    price: 15,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80',
    quantity: 2,
    unit: 'bag'
  },
  {
    id: '2',
    name: 'Fresh Organic Beans',
    price: 20,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
    quantity: 1,
    unit: 'kg'
  }
];

export function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [isCheckoutPending, setIsCheckoutPending] = useState(false);

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    // 7.5% tax (VAT-like)
    return calculateSubtotal() * 0.075;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleCheckout = async () => {
    setIsCheckoutPending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    // In real app: integrate with Supabase/Pi SDK
    setIsCheckoutPending(false);
    navigate('/orders');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center py-12">
        <div className="text-center space-y-6">
          <svg className="h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h10a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v4h4a2 2 0 002-2V3H3z" />
          </svg>
          <h2 className="text-2xl font-bold text-foreground">Your cart is empty</h2>
          <p className="text-muted-foreground max-w-xl">
            Looks like you haven't added any products yet. Start browsing our marketplace to find fresh agricultural products.
          </p>
          <Link 
            to="/marketplace" 
            className="bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 hover:-translate-y-1"
          >
            Go to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Cart Header */}
      <div className="flex flex-col items-center gap-4 text-center py-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground bg-pi-gradient bg-clip-text text-transparent">
          Shopping Cart
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Review your selected products before proceeding to checkout
        </p>
      </div>

      {/* Cart Items */}
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div 
            key={item.id} 
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Product Image */}
              <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80';
                  }}
                />
              </div>
              
              {/* Product Details */}
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-foreground">{item.name}</h3>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 rounded-lg hover:bg-muted/20 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
                
                <p className="text-muted-foreground">
                  {item.unit} • Farm fresh • {item.quantity} in cart
                </p>
                
                <div className="flex items-baseline gap-4 mt-2">
                  <div className="text-2xl font-bold text-pi-purple">
                    {item.price}π
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-muted/50 hover:bg-muted/100 rounded-lg flex items-center justify-center text-sm"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-muted/50 hover:bg-muted/100 rounded-lg flex items-center justify-center text-sm"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-2xl font-bold text-pi-purple ml-4">
                    {(item.price * item.quantity)}π
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center text-lg font-medium">
            <span>Subtotal</span>
            <span>{calculateSubtotal()}π</span>
          </div>
          
          <div className="flex justify-between items-center text-lg font-medium">
            <span>Tax (7.5%)</span>
            <span>{calculateTax().toFixed(2)}π</span>
          </div>
          
          <div className="border-t border-border/50 pt-4"></div>
          
          <div className="flex justify-between items-center text-2xl font-bold text-pi-purple">
            <span>Total</span>
            <span>{calculateTotal().toFixed(2)}π</span>
          </div>
        </div>
        
        <div className="mt-6">
          {isCheckoutPending ? (
            <div className="flex w-full items-center justify-center">
              <Loader2 className="h-5 w-5 text-pi-pulse animate-pulse" />
              <span className="ml-2 text-sm text-pi-purple">Processing...</span>
            </div>
          ) : (
            <div className="space-y-3">
              <Link 
                to="/marketplace" 
                className="w-full border border-pi-pulse/50 hover:border-pi-pulse/100 text-pi-purple hover:bg-pi-purple/10 py-3 px-6 rounded-lg transition-colors duration-300 hover:-translate-y-1 flex items-center justify-center"
              >
                Continue Shopping
              </Link>
              
              <button 
                onClick={handleCheckout}
                className="w-full bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 hover:-translate-y-1"
                disabled={isCheckoutPending}
              >
                Proceed to Checkout ({calculateTotal().toFixed(2)}π)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}