import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  unit?: string;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  trackingNumber?: string;
}

// Mock orders data - in real app from Supabase
const mockOrders: Order[] = [
  {
    id: 'PDS-7890',
    date: 'June 12, 2024',
    status: 'delivered',
    total: 30,
    items: [
      {
        id: '1',
        name: 'Premium Long Grain Rice (25kg)',
        price: 15,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80'
      }
    ],
    shippingAddress: {
      fullName: 'John Doe Farmer',
      address: '123 Farm Road, Agricultural Village',
      city: 'Abuja',
      state: 'FCT',
      zipCode: '900001',
      country: 'Nigeria'
    },
    trackingNumber: 'PDS-TRACK-7890-NG'
  },
  {
    id: 'PDS-7889',
    date: 'June 10, 2024',
    status: 'processing',
    total: 45,
    items: [
      {
        id: '2',
        name: 'Fresh Organic Beans',
        price: 20,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: '3',
        name: 'Yellow Maize (Corn)',
        price: 18,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1593642532843-3690d151cb38?auto=format&fit=crop&w=400&q=80'
      }
    ],
    shippingAddress: {
      fullName: 'John Doe Farmer',
      address: '123 Farm Road, Agricultural Village',
      city: 'Abuja',
      state: 'FCT',
      zipCode: '900001',
      country: 'Nigeria'
    }
  },
  {
    id: 'PDS-7888',
    date: 'June 8, 2024',
    status: 'delivered',
    total: 22,
    items: [
      {
        id: '4',
        name: 'Fresh Tomatoes (5kg box)',
        price: 12,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1592924403410-0001ca42cb5e?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: '5',
        name: 'Organic Carrots (3kg)',
        price: 10,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1591876323328-770d49ba3955?auto=format&fit=crop&w=400&q=80'
      }
    ],
    shippingAddress: {
      fullName: 'John Doe Farmer',
      address: '123 Farm Road, Agricultural Village',
      city: 'Abuja',
      state: 'FCT',
      zipCode: '900001',
      country: 'Nigeria'
    },
    trackingNumber: 'PDS-TRACK-7888-NG'
  },
  {
    id: 'PDS-7887',
    date: 'June 5, 2024',
    status: 'cancelled',
    total: 0,
    items: [],
    shippingAddress: {
      fullName: 'John Doe Farmer',
      address: '123 Farm Road, Agricultural Village',
      city: 'Abuja',
      state: 'FCT',
      zipCode: '900001',
      country: 'Nigeria'
    }
  }
];

export function Orders() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'>('all');
  const [isCancelling, setIsCancelling] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState<string | null>(null);

  const filteredOrders = mockOrders.filter(order => {
    if (statusFilter === 'all') return true;
    return order.status === statusFilter;
  });

  const getStatusBadgeClass = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-pi-purple/20 text-pi-pulse';
      case 'processing': return 'bg-pi-gold/20 text-pi-gold';
      case 'shipped': return 'bg-muted/20 text-muted-foreground';
      case 'delivered': return 'bg-green-500/20 text-green-500';
      case 'cancelled': return 'bg-red-500/20 text-red-500';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'processing': return 'Processing';
      case 'shipped': return 'Shipped';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    setIsCancelling(orderId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    // In real app: update order status in Supabase
    setIsCancelling(null);
    // For demo, we'll just filter it out (in real app would refetch)
  };

  const handleTrackOrder = (trackingNumber: string) => {
    setIsTracking(trackingNumber);
    // In real app: open tracking popup or redirect to carrier site
    alert(`Tracking your order with number: ${trackingNumber}\n\nIn a real app, this would open a tracking page or modal.`);
    setIsTracking(null);
  };

  return (
    <div className="space-y-8">
      {/* Orders Header */}
      <div className="flex flex-col items-center gap-6 text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground bg-pi-gradient bg-clip-text text-transparent">
          My Orders
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          View your order history and track your purchases
        </p>
        
        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <button 
            onClick={() => setStatusFilter('all')}
            className={statusFilter === 'all' ? 
              'bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300' : 
              'border border-pi-pulse/50 hover:border-pi-pulse/100 text-pi-purple hover:bg-pi-purple/10 py-2 px-4 rounded-lg transition-colors duration-300'
            }
          >
            All Orders
          </button>
          <button 
            onClick={() => setStatusFilter('pending')}
            className={statusFilter === 'pending' ? 
              'bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300' : 
              'border border-pi-pulse/50 hover:border-pi-pulse/100 text-pi-purple hover:bg-pi-purple/10 py-2 px-4 rounded-lg transition-colors duration-300'
            }
          >
            Pending
          </button>
          <button 
            onClick={() => setStatusFilter('processing')}
            className={statusFilter === 'processing' ? 
              'bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300' : 
              'border border-pi-pulse/50 hover:border-pi-pulse/100 text-pi-purple hover:bg-pi-purple/10 py-2 px-4 rounded-lg transition-colors duration-300'
            }
          >
            Processing
          </button>
          <button 
            onClick={() => setStatusFilter('shipped')}
            className={statusFilter === 'shipped' ? 
              'bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300' : 
              'border border-pi-pulse/50 hover:border-pi-pulse/100 text-pi-purple hover:bg-pi-purple/10 py-2 px-4 rounded-lg transition-colors duration-300'
            }
          >
            Shipped
          </button>
          <button 
            onClick={() => setStatusFilter('delivered')}
            className={statusFilter === 'delivered' ? 
              'bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300' : 
              'border border-pi-pulse/50 hover:border-pi-pulse/100 text-pi-purple hover:bg-pi-purple/10 py-2 px-4 rounded-lg transition-colors duration-300'
            }
          >
            Delivered
          </button>
          <button 
            onClick={() => setStatusFilter('cancelled')}
            className={statusFilter === 'cancelled' ? 
              'bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300' : 
              'border border-pi-pulse/50 hover:border-pi-pulse/100 text-pi-purple hover:bg-pi-purple/10 py-2 px-4 rounded-lg transition-colors duration-300'
            }
          >
            Cancelled
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div 
              key={order.id} 
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="space-y-4">
                {/* Order Header */}
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h2 className="text-lg font-medium text-foreground">
                      Order #{order.id}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {order.date} • {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                    {order.status === 'cancelled' && (
                      <button 
                        onClick={() => navigate(`/marketplace`)}
                        className="ml-3 text-sm text-muted-foreground hover:text-foreground hover:underline mt-1 block"
                      >
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Order Items */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                      <div className="w-16 h-16 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} × {item.unit || 'pcs'} • {item.price}π each
                        </p>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="font-medium text-pi-purple">{item.price * item.quantity}π</p>
                        <p className="text-xs text-muted-foreground">subtotal</p>
                      </div>
                    </div>
                  ))}
                  
                  {order.items.length === 0 && (
                    <div className="col-span-2 text-center py-8">
                      <p className="text-muted-foreground">No items in this order</p>
                    </div>
                  )}
                </div>
                
                {/* Order Summary */}
                <div className="border-t border-border/50 pt-4">
                  <div className="flex justify-between items-start space-x-4">
                    <div className="flex-1 space-y-2">
                      <p className="text-sm text-muted-foreground">Items:</p>
                      <p className="text-sm text-muted-foreground">Shipping:</p>
                      {order.trackingNumber && (
                        <p className="text-sm text-muted-foreground">Tracking:</p>
                      )}
                    </div>
                    <div className="text-right space-y-2">
                      <p className="text-sm font-medium">{order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)}π</p>
                      <p className="text-sm font-medium">Free</p>
                      {order.trackingNumber && (
                        <>
                          <p className="text-sm font-medium">{order.trackingNumber}</p>
                          <button 
                            onClick={() => handleTrackOrder(order.trackingNumber!)}
                            className="mt-1 text-xs text-pi-purple hover:text-pi-purple/90 underline"
                          >
                            Track
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="border-t border-border/50 pt-4 mt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Order Total:</span>
                      <span className="text-2xl text-pi-purple">{order.total}π</span>
                    </div>
                  </div>
                </div>
                
                {/* Order Actions */}
                {order.status !== 'delivered' && order.status !== 'cancelled' && (
                  <div className="mt-4 flex justify-end space-x-3">
                    {order.status === 'processing' && (
                      <button 
                        onClick={() => handleCancelOrder(order.id)}
                        disabled={isCancelling === order.id}
                        className="border border-destructive/50 hover:border-destructive/100 text-destructive hover:bg-destructive/10 py-2 px-4 rounded-lg transition-colors duration-300 hover:-translate-y-1"
                      >
                        {isCancelling === order.id ? (
                          'Cancelling...'
                        ) : (
                          'Cancel Order'
                        )}
                      </button>
                    )}
                    <Link 
                      to={`/product-details/${order.items[0]?.id || '1'}`} 
                      className="border border-pi-pulse/50 hover:border-pi-pulse/100 text-pi-purple hover:bg-pi-purple/10 py-2 px-4 rounded-lg transition-colors duration-300 hover:-translate-y-1"
                    >
                      Reorder
                    </Link>
                  </div>
                )}
                
                {order.status === 'delivered' && (
                  <div className="mt-4 flex justify-end">
                    <button 
                      onClick={() => navigate(`/marketplace`)}
                      className="bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 hover:-translate-y-1"
                    >
                      Buy Again
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              You haven't placed any orders yet.
            </p>
            {statusFilter !== 'all' && (
              <p className="text-muted-foreground mt-2">
                Try changing the filter to see all orders.
              </p>
            )}
            <Link 
              to="/marketplace" 
              className="mt-6 inline-block bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 hover:-translate-y-1"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>

      {/* Empty State for Filters */}
      {filteredOrders.length === 0 && statusFilter !== 'all' && (
        <div className="text-center py-12">
          <svg className="h-12 w-12 text-muted-foreground mx-auto mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0018 0z" />
          </svg>
          <p className="text-muted-foreground">
            No orders found with status: {getStatusText(statusFilter as Order['status'])}
          </p>
          <button 
            onClick={() => setStatusFilter('all')}
            className="mt-4 bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 hover:-translate-y-1"
          >
            Show All Orders
          </button>
        </div>
      )}
    </div>
  );
}