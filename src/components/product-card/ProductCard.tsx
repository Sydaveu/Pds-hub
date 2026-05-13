import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  unit?: string;
}

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { addItem, isInCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      unit: product.unit || 'unit',
    });
  };

  const inCart = isInCart(product.id);

  return (
    <Link
      to={`/product-details/${product.id}`}
      className={`group glass-card rounded-2xl border border-white/5 overflow-hidden hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 ${className ?? ''}`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-2 left-2 bg-purple-600/90 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
          {product.category}
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleAddToCart}
          className={`absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            inCart
              ? 'bg-green-600/90 text-white'
              : 'bg-black/50 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 hover:bg-purple-600/90'
          }`}
          title={inCart ? 'In cart' : 'Add to cart'}
        >
          <ShoppingCart className="h-4 w-4" />
        </motion.button>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors line-clamp-2 text-sm leading-snug">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-purple-400">
            {product.price}π
          </span>
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
