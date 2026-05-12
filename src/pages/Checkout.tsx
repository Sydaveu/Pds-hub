import { Link } from 'react-router-dom';
import { useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  unit: string;
}

interface ShippingInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
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

export function Checkout() {
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const cartItems = mockCartItems;
  
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.075;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleShippingChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field: keyof PaymentInfo, value: string) => {
    setPaymentInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleBack = () => {
    if (step === 'payment') {
      setStep('shipping');
    } else if (step === 'confirmation') {
      setStep('payment');
    }
  };

  const handleContinueToPayment = () => {
    // Basic validation
    if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.email || 
        !shippingInfo.address || !shippingInfo.city || !shippingInfo.state || !shippingInfo.zipCode) {
      alert('Please fill in all shipping fields');
      return;
    }
    setStep('payment');
  };

  const handlePlaceOrder = async () => {
    // Basic validation
    if (!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv) {
      alert('Please fill in all payment fields');
      return;
    }
    
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    // In real app: integrate with Supabase/Pi SDK
    setIsProcessing(false);
    setStep('confirmation');
  };

  return (
    <div className="space-y-8">
      {/* Checkout Header */}
      <div className="flex flex-col items-center gap-4 text-center py-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground bg-pi-gradient bg-clip-text text-transparent">
          Checkout
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Review your order and enter shipping information
        </p>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between space-x-6">
          <div 
            className={`flex-1 flex items-center gap-3 text-sm font-medium 
              ${step === 'shipping' ? 'text-pi-pulse border-b-2 border-pi-pulse pb-1' : 
                step === 'payment' ? 'text-muted-foreground hover:text-foreground' : 
                'text-muted-foreground'}`}
          >
            <span className="w-3 h-3 bg-pi-pulse/20 rounded-full flex items-center justify-center">
              1
            </span>
            Shipping
          </div>
          <div className="w-px bg-border/50 mx-4 hidden md:block" />
          <div 
            className={`flex-1 flex items-center gap-3 text-sm font-medium 
              ${step === 'payment' ? 'text-pi-pulse border-b-2 border-pi-pulse pb-1' : 
                step === 'confirmation' ? 'text-muted-foreground hover:text-foreground' : 
                'text-muted-foreground'}`}
          >
            <span className="w-3 h-3 bg-pi-pulse/20 rounded-full flex items-center justify-center">
              2
            </span>
            Payment
          </div>
          <div className="w-px bg-border/50 mx-4 hidden md:block" />
          <div 
            className={`flex-1 flex items-center gap-3 text-sm font-medium 
              ${step === 'confirmation' ? 'text-pi-pulse border-b-2 border-pi-pulse pb-1' : 
                'text-muted-foreground'}`}
          >
            <span className="w-3 h-3 bg-pi-pulse/20 rounded-full flex items-center justify-center">
              3
            </span>
            Confirmation
          </div>
        </div>
      </div>

      {/* Step Content */}
      {step === 'shipping' && (
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-muted-foreground">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={shippingInfo.fullName}
                    onChange={(e) => handleShippingChange('fullName', e.target.value)}
                    className="w-full px-4 py-3 bg-muted/50 border border-muted/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pi-purple/20"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-muted-foreground">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={shippingInfo.phone}
                    onChange={(e) => handleShippingChange('phone', e.target.value)}
                    className="w-full px-4 py-3 bg-muted/50 border border-muted/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pi-purple/20"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-muted-foreground">
                  Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={shippingInfo.email}
                    onChange={(e) => handleShippingChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-muted/50 border border-muted/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pi-purple/20"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="mb-2 block text-sm font-medium text-muted-foreground">
                    Street Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Enter your street address"
                    value={shippingInfo.address}
                    onChange={(e) => handleShippingChange('address', e.target.value)}
                    className="w-full px-4 py-3 bg-muted/50 border border-muted/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pi-purple/20"
                    required
                  />
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="city" className="mb-2 block text-sm font-medium text-muted-foreground">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      placeholder="Enter your city"
                      value={shippingInfo.city}
                      onChange={(e) => handleShippingChange('city', e.target.value)}
                      className="w-full px-4 py-3 bg-muted/50 border border-muted/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pi-purple/20"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="mb-2 block text-sm font-medium text-muted-foreground">
                      State/Province
                    </label>
                    <input
                      id="state"
                      type="text"
                      placeholder="Enter your state"
                      value={shippingInfo.state}
                      onChange={(e) => handleShippingChange('state', e.target.value)}
                      className="w-full px-4 py-3 bg-muted/50 border border-muted/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pi-purple/20"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="zipCode" className="mb-2 block text-sm font-medium text-muted-foreground">
                    ZIP / Postal Code
                  </label>
                  <input
                    id="zipCode"
                    type="text"
                    placeholder="Enter your ZIP code"
                    value={shippingInfo.zipCode}
                    onChange={(e) => handleShippingChange('zipCode', e.target.value)}
                    className="w-full px-4 py-3 bg-muted/50 border border-muted/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pi-purple/20"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <button 
                  type="button"
                  onClick={handleContinueToPayment}
                  className="bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 hover:-translate-y-1"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>
      )}
      
      {step === 'payment' && (
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Order Summary</h3>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-start text-sm">
                      <span className="flex-1">
                        {item.name} ({item.quantity} × {item.unit})
                      </span>
                      <span className="text-muted-foreground">
                        {(item.price * item.quantity)}π
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-border/50 pt-3 mt-3">
                    <div className="flex justify-between items-start text-sm">
                      <span className="flex-1">Subtotal</span>
                      <span className="text-muted-foreground">{calculateSubtotal()}π</span>
                    </div>
                    <div className="flex justify-between items-start text-sm">
                      <span className="flex-1">Tax (7.5%)</span>
                      <span className="text-muted-foreground">{calculateTax().toFixed(2)}π</span>
                    </div>
                  </div>
                  <div className="border-t border-border/50 pt-3 mt-3">
                    <div className="flex justify-between items-start text-lg font-medium">
                      <span className="flex-1">Total</span>
                      <span className="text-2xl font-bold text-pi-purple">{calculateTotal().toFixed(2)}π</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-foreground">Payment Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="mb-2 block text-sm font-medium text-muted-foreground">
                      Card Number
                    </label>
                    <input
                      id="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => handlePaymentChange('cardNumber', e.target.value.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || '')}
                      className="w-full px-4 py-3 bg-muted/50 border border-muted/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pi-purple/20"
                      required
                      maxLength={19}
                    />
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="expiryDate" className="mb-2 block text-sm font-medium text-muted-foreground">
                        Expiry Date (MM/YY)
                      </label>
                      <input
                        id="expiryDate"
                        type="text"
                        placeholder="MM / YY"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                        className="w-full px-4 py-3 bg-muted/50 border border-muted/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pi-purple/20"
                        required
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="mb-2 block text-sm font-medium text-muted-foreground">
                        CVV
                      </label>
                      <input
                        id="cvv"
                        type="password"
                        placeholder="•••"
                        value={paymentInfo.cvv}
                        onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                        className="w-full px-4 py-3 bg-muted/50 border border-muted/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pi-purple/20"
                        required
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <button 
                  type="button"
                  onClick={handleBack}
                  className="mr-4 border border-pi-pulse/50 hover:border-pi-pulse/100 text-pi-purple hover:bg-pi-purple/10 py-3 px-6 rounded-lg transition-colors duration-300 hover:-translate-y-1"
                >
                  Go Back
                </button>
                <button 
                  type="button"
                  onClick={handlePlaceOrder}
                  className="bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 hover:-translate-y-1"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-pulse bg-pi-pulse" />
                      Processing...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>
              </div>
            </div>
            </form>
          </div>
      )}
      
      {step === 'confirmation' && (
        <div className="text-center py-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <svg className="h-12 w-12 text-pi-pulse" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0018 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground">Order Placed Successfully!</h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Thank you for your purchase. Your order has been confirmed and will be processed shortly.
            You'll receive a confirmation email at {shippingInfo.email} with your order details.
          </p>
          <div className="mt-8">
            <Link 
              to="/" 
              className="bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 hover:-translate-y-1"
            >
              Back to Home
            </Link>
            <Link 
              to="/orders" 
              className="ml-4 border border-pi-pulse/50 hover:border-pi-pulse/100 text-pi-purple hover:bg-pi-purple/10 py-3 px-8 rounded-lg transition-colors duration-300 hover:-translate-y-1"
            >
              View Orders
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}