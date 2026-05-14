import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getProductImage } from '../lib/productImages';

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
  shippingAddress: { fullName: string; address: string; city: string; state: string; zipCode: string; country: string };
  trackingNumber?: string;
}

const mockOrders: Order[] = [
  {
    id: 'PDS-7890', date: 'June 12, 2024', status: 'delivered', total: 30,
     items: [
       { id: 'f001', name: 'Premium Long Grain Rice (25kg)', price: 15, quantity: 2, image: getProductImage('f001', 'rice') },
       { id: 'f011', name: 'Red Kidney Beans (2kg)', price: 9, quantity: 2, image: getProductImage('f011', 'kidney-beans') },
       { id: 'f030', name: 'Yellow Maize (10kg)', price: 18, quantity: 1, image: getProductImage('f030', 'maize') },
       { id: 't001', name: 'Stainless Cutlass', price: 15, quantity: 1, image: getProductImage('t001', 'cutlass') },
       { id: 'f043', name: 'Fresh Tomatoes (5kg box)', price: 12, quantity: 1, image: getProductImage('f043', 'tomatoes') },
       { id: 'f044', name: 'Organic Carrots (3kg)', price: 10, quantity: 1, image: getProductImage('f044', 'carrots') },
       { id: 'a060', name: 'Mature Cow (White Fulani)', price: 300, quantity: 1, image: getProductImage('a060', 'cow') },
       { id: 'a063', name: 'Red Sokoto Goat', price: 80, quantity: 1, image: getProductImage('a063', 'goat') }
     ],
    shippingAddress: { fullName: 'John Doe', address: '123 Farm Road', city: 'Abuja', state: 'FCT', zipCode: '900001', country: 'Nigeria' },
    trackingNumber: 'PDS-TRACK-7887-NG'
  },
  {
    id: 'PDS-7886', date: 'June 1, 2024', status: 'cancelled', total: 0,
    items: [],
    shippingAddress: { fullName: 'John Doe', address: '123 Farm Road', city: 'Abuja', state: 'FCT', zipCode: '900001', country: 'Nigeria' }
  }
];

export function Orders() {
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'>('all');
  const [isCancelling, setIsCancelling] = useState<string | null>(null);

  const filteredOrders = mockOrders.filter(order => statusFilter === 'all' || order.status === statusFilter);

  const getStatusBadgeClass = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-purple-500/20 text-purple-400';
      case 'processing': return 'bg-amber-500/20 text-amber-400';
      case 'shipped': return 'bg-blue-500/20 text-blue-400';
      case 'delivered': return 'bg-green-500/20 text-green-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'Pending'; case 'processing': return 'Processing';
      case 'shipped': return 'Shipped'; case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled'; default: return status;
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    setIsCancelling(orderId);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsCancelling(null);
  };

  const handleTrackOrder = (trackingNumber: string) => {
    alert(`Tracking your order: ${trackingNumber}\n\nIn a real app this would open a tracking page.`);
  };

  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Orders</h1>
        <p className="text-gray-400">View your order history and track your purchases</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {(['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map(status => (
          <button key={status} onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              statusFilter === status
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                : 'border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            {status === 'all' ? 'All Orders' : getStatusText(status)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredOrders.length > 0 ? filteredOrders.map(order => (
          <div key={order.id} className="glass-card rounded-2xl border border-white/5 p-6 hover:border-purple-500/20 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold text-white">Order #{order.id}</h2>
                <p className="text-sm text-gray-500">{order.date} \u2022 {order.items.reduce((s, i) => s + i.quantity, 0)} items</p>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>

            {order.items.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-2 mb-4">
                {order.items.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-white/3 rounded-xl">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" loading="lazy" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{item.name}</p>
                      <p className="text-gray-500 text-xs">{item.quantity} \u00d7 {item.price}{'\u03c0'} {item.unit || ''}</p>
                    </div>
                    <p className="text-purple-400 font-semibold text-sm">{(item.price * item.quantity)}{'\u03c0'}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t border-white/5 pt-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                {order.status === 'processing' && (
                  <button onClick={() => handleCancelOrder(order.id)} disabled={isCancelling === order.id}
                    className="text-xs border border-red-500/30 hover:border-red-500/60 text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    {isCancelling === order.id ? 'Cancelling...' : 'Cancel'}
                  </button>
                )}
                {order.trackingNumber && (
                  <button onClick={() => handleTrackOrder(order.trackingNumber!)}
                    className="text-xs text-purple-400 hover:text-purple-300 underline"
                  >
                    Track
                  </button>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-sm">Total:</span>
                <span className="text-purple-400 font-bold text-xl">{order.total}{'\u03c0'}</span>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-16 space-y-4">
            <p className="text-gray-500">No orders found with the selected filter.</p>
            {statusFilter !== 'all' && (
              <button onClick={() => setStatusFilter('all')} className="bg-purple-600 hover:bg-purple-500 text-white font-medium py-2 px-6 rounded-lg transition-all">
                Show All Orders
              </button>
            )}
            <div>
              <Link to="/marketplace" className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-medium py-3 px-8 rounded-xl transition-all">
                Start Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
