import { useParams, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { ProductCard } from '../components/product-card/ProductCard';

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

// Mock product data - in real app from Supabase
const mockProducts: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'Premium Long Grain Rice (25kg)',
    price: 15,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591876323328-770d49ba3955?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556912051-8f9ef55cb370?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Rice',
    description: 'High-quality long grain rice, aged to perfection for optimal flavor and texture. Each grain is carefully selected and polished to ensure uniform size and purity.',
    rating: 4.8,
    reviews: 124,
    stock: 50,
    unit: 'bag',
    origin: 'Northern Nigeria'
  },
  '2': {
    id: '2',
    name: 'Fresh Organic Beans',
    price: 20,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556912051-8f9ef55cb370?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Beans',
    description: 'Nutrient-rich black eyed beans, organically grown without pesticides or chemicals. High in protein, fiber, and essential minerals.',
    rating: 4.9,
    reviews: 89,
    stock: 30,
    unit: 'kg',
    origin: 'Southern Nigeria'
  },
  '3': {
    id: '3',
    name: 'Yellow Maize (Corn)',
    price: 18,
    image: 'https://images.unsplash.com/photo-1593642532843-3690d151cb38?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593642532843-3690d151cb38?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591876323328-770d49ba3955?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593642532843-3690d151cb38?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Maize',
    description: 'Sweet yellow maize kernels, perfect for roasting, boiling, or grinding into flour. Non-GMO and naturally grown.',
    rating: 4.7,
    reviews: 67,
    stock: 100,
    unit: 'kg',
    origin: 'Central Nigeria'
  }
};

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = mockProducts[id || ''];
  
  if (!product) {
    navigate('/marketplace');
    return null; // Redirect if product not found
  }

  return (
    <div className="space-y-8">
      {/* Product Header */}
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Product Images */}
        <div className="w-full md:w-1/2 space-y-4">
          <div className="relative h-96 bg-muted/50 rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              Loading product image...
            </div>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>
          
          <div className="flex gap-2">
            {product.gallery.slice(1, 4).map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`${product.name} ${index + 1}`} 
                className="w-20 h-20 object-cover rounded-lg border-2 border-transparent hover:border-pi-pulse/50 transition-all cursor-pointer"
                onClick={() => {
                  // In real app: open lightbox or change main image
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = product.image;
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="w-full md:w-1/2 space-y-6">
          <div className="flex items-baseline gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {product.name}
            </h1>
            <div className="flex items-center space-x-2 text-pi-pulse animate-pulse">
              <span className="text-pi-purple">●</span>
              <span className="text-xs">In Stock</span>
            </div>
          </div>
          
          <div className="flex items-baseline gap-6 mb-4">
            <div className="text-2xl font-bold text-pi-purple">
              {product.price}π
            </div>
            <span className="text-muted-foreground text-sm">
              /{product.unit} • {product.stock} available
            </span>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-4">
            <span className="bg-pi-purple/10 text-pi-purple px-3 py-1 rounded text-sm font-medium">
              {product.category}
            </span>
            <span className="bg-muted/50 px-3 py-1 rounded text-sm">
              Origin: {product.origin}
            </span>
            <div className="flex items-center space-x-2 text-pi-pulse">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-sm">
                  {star <= product.rating ? '★' : '☆'}
                </span>
              ))}
              <span className="ml-1 text-muted-foreground text-sm">
                ({product.rating} • {product.reviews} reviews)
              </span>
            </div>
          </div>
          
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(`/cart?add=${product.id}&quantity=1`)}
              className="flex-1 bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <Heart className="h-4 w-4" />
              Buy Now
            </button>
            <button 
              onClick={() => navigate(`/cart?add=${product.id}&quantity=1`)}
              className="border border-pi-pulse/50 hover:border-pi-pulse/100 text-pi-purple hover:bg-pi-purple/10 py-3 px-6 rounded-lg transition-colors duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <span className="flex-1 text-center">
                Add to Cart
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="space-y-6">
        <div className="border-b border-border/50 pb-2">
          <div className="flex flex-wrap gap-4 -mb-px">
            <button 
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-b-2 hover:border-pi-pulse border-b-2 border-pi-pulse text-pi-pulse"
            >
              Description
            </button>
            <button 
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Reviews ({product.reviews})
            </button>
            <button 
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Shipping & Returns
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Our {product.name.toLowerCase()} undergoes rigorous quality checks to ensure you receive only the best. 
            From farm to table, we maintain strict hygiene standards and optimal storage conditions 
            to preserve freshness and nutritional value. Each {product.unit} is carefully measured 
            and packaged to protect against moisture and contaminants.
          </p>
          
          <h3 className="font-semibold text-lg mb-2">Product Highlights</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Premium quality grade A</li>
            <li>Freshly harvested and processed</li>
            <li>No additives or preservatives</li>
            <li>Rich in essential nutrients</li>
            <li>Suitable for various culinary uses</li>
          </ul>
          
          <h3 className="font-semibold text-lg mb-2">Storage Instructions</h3>
          <p className="text-muted-foreground">
            Store in a cool, dry place away from direct sunlight. 
            Once opened, transfer to an airtight container to maintain freshness. 
            Consume within 6 months for best quality.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <div className="border-t border-border/50 pt-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          You May Also Like
        </h2>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Object.values(mockProducts)].slice(0, 4).map((related) => (
            related.id !== product.id && (
              <ProductCard 
                key={related.id} 
                product={related} 
                className="hover:-translate-y-1 transition-transform duration-300"
              />
            )
          ))}
        </div>
      </div>
    </div>
  );
}