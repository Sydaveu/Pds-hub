import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  return (
    <Link
      to={`/product-details/${product.id}`}
      className={`group bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 ${className ?? ''}`}
    >
      <div className="relative h-48 bg-muted/50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80';
          }}
        />
        <div className="absolute top-2 right-2 bg-pi-purple/90 text-white text-xs font-medium px-2 py-1 rounded-full">
          {product.category}
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-foreground group-hover:text-pi-purple transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-pi-purple">
            {product.price}π
          </span>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span className="text-pi-gold">★</span>
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
