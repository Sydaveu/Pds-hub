import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/product-card/ProductCard';

interface CategoryInfo {
  name: string;
  description: string;
  imageUrl: string;
  icon: ReactNode;
  productCount: number;
}

const categoriesData: Record<string, CategoryInfo> = {
  crops: {
    name: 'Crops',
    description: 'Grains, cereals, and staple foods',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    icon: '🌾',
    productCount: 42
  },
  rice: {
    name: 'Rice',
    description: 'Premium rice varieties from local farms',
    imageUrl: 'https://images.unsplash.com/photo-1563729784474-d07d79ec55a0?auto=format&fit=crop&w=800&q=80',
    icon: '🍚',
    productCount: 18
  },
  beans: {
    name: 'Beans',
    description: 'Protein-rich legumes and pulses',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    icon: '🫘',
    productCount: 25
  },
  yam: {
    name: 'Yam',
    description: 'Fresh tubers and root vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1600891964599-f43ba0e33d41?auto=format&fit=crop&w=800&q=80',
    icon: '🍠',
    productCount: 12
  },
  cassava: {
    name: 'Cassava',
    description: 'Starchy root vegetables and derivatives',
    imageUrl: 'https://images.unsplash.com/photo-1600566746221-272634f0e239?auto=format&fit=crop&w=800&q=80',
    icon: '🌱',
    productCount: 8
  },
  maize: {
    name: 'Maize',
    description: 'Corn and maize products for food and feed',
    imageUrl: 'https://images.unsplash.com/photo-1593642532843-3690d151cb38?auto=format&fit=crop&w=800&q=80',
    icon: '🌽',
    productCount: 15
  },
  vegetables: {
    name: 'Vegetables',
    description: 'Fresh and organic vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1592924403410-0001ca42cb5e?auto=format&fit=crop&w=800&q=80',
    icon: '🥬',
    productCount: 67
  },
  fruits: {
    name: 'Fruits',
    description: 'Seasonal and tropical fruits',
    imageUrl: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?auto=format&fit=crop&w=800&q=80',
    icon: '🍎',
    productCount: 43
  },
  livestock: {
    name: 'Livestock',
    description: 'Cattle, goats, sheep, and other farm animals',
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1e7d9e9?auto=format&fit=crop&w=800&q=80',
    icon: '🐄',
    productCount: 28
  },
  poultry: {
    name: 'Poultry',
    description: 'Chicken, duck, turkey, and other birds',
    imageUrl: 'https://images.unsplash.com/photo-1582722573459-23b5b8e03dc2?auto=format&fit=crop&w=800&q=80',
    icon: '🐔',
    productCount: 31
  },
  fishery: {
    name: 'Fishery',
    description: 'Fresh fish and seafood from local waters',
    imageUrl: 'https://images.unsplash.com/photo-1562584501-58b3b978aae3?auto=format&fit=crop&w=800&q=80',
    icon: '🐟',
    productCount: 22
  },
  dairy: {
    name: 'Dairy',
    description: 'Milk, cheese, yogurt, and dairy products',
    imageUrl: 'https://images.unsplash.com/photo-1589110383685-8b48970aea14?auto=format&fit=crop&w=800&q=80',
    icon: '🥛',
    productCount: 19
  },
  honey: {
    name: 'Honey',
    description: 'Natural honey and beekeeping products',
    imageUrl: 'https://images.unsplash.com/photo-1578782973178-ab70462fab3e?auto=format&fit=crop&w=800&q=80',
    icon: '🍯',
    productCount: 11
  },
  'farm-tools': {
    name: 'Farm Tools',
    description: 'Equipment and tools for farming',
    imageUrl: 'https://images.unsplash.com/photo-1581091863477-7e58664e5e89?auto=format&fit=crop&w=800&q=80',
    icon: '🔧',
    productCount: 34
  },
  fertilizers: {
    name: 'Fertilizers',
    description: 'Nutrients and soil amendments for crops',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    icon: '🌿',
    productCount: 27
  },
  seeds: {
    name: 'Seeds',
    description: 'Quality seeds for planting and cultivation',
    imageUrl: 'https://images.unsplash.com/photo-1593642532843-3690d151cb38?auto=format&fit=crop&w=800&q=80',
    icon: '🌱',
    productCount: 41
  },
  pets: {
    name: 'Pets',
    description: 'Companion animals and pet care products',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
    icon: '🐕',
    productCount: 16
  }
};

interface CategoryProducts {
  category: string;
  products: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    rating: number;
  }>;
}

// Mock products by category - in real app from Supabase
const mockProductsByCategory: Record<string, CategoryProducts[]> = {
  crops: [{
    category: 'Crops',
    products: [
      { id: 'cr1', name: 'Premium Rice Bag (50kg)', price: 25, category: 'Crops', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80', rating: 4.8 },
      { id: 'cr2', name: 'Basmathi Rice (10kg)', price: 22, category: 'Crops', image: 'https://images.unsplash.com/photo-1563729784474-d07d79ec55a0?auto=format&fit=crop&w=400&q=80', rating: 4.9 },
      { id: 'cr3', name: 'Brown Rice (5kg)', price: 12, category: 'Crops', image: 'https://images.unsplash.com/photo-1556912051-8f9ef55cb370?auto=format&fit=crop&w=400&q=80', rating: 4.7 },
      { id: 'cr4', name: 'Yellow Maize (Corn) (10kg)', price: 18, category: 'Crops', image: 'https://images.unsplash.com/photo-1593642532843-3690d151cb38?auto=format&fit=crop&w=400&q=80', rating: 4.7 },
      { id: 'cr5', name: 'Millet (5kg)', price: 10, category: 'Crops', image: 'https://images.unsplash.com/photo-1591876323328-770d49ba3955?auto=format&fit=crop&w=400&q=80', rating: 4.6 }
    ]
  }],
  rice: [{
    category: 'Rice',
    products: [
      { id: 'ri1', name: 'Premium Long Grain Rice (25kg)', price: 15, category: 'Rice', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80', rating: 4.8 },
      { id: 'ri2', name: 'Basmathi Rice (10kg)', price: 22, category: 'Rice', image: 'https://images.unsplash.com/photo-1563729784474-d07d79ec55a0?auto=format&fit=crop&w=400&q=80', rating: 4.9 },
      { id: 'ri3', name: 'Jasmine Rice (5kg)', price: 18, category: 'Rice', image: 'https://images.unsplash.com/photo-1593642532843-3690d151cb38?auto=format&fit=crop&w=400&q=80', rating: 4.7 },
      { id: 'ri4', name: 'Brown Rice (5kg)', price: 12, category: 'Rice', image: 'https://images.unsplash.com/photo-1556912051-8f9ef55cb370?auto=format&fit=crop&w=400&q=80', rating: 4.7 },
      { id: 'ri5', name: 'Wild Rice Blend (2kg)', price: 20, category: 'Rice', image: 'https://images.unsplash.com/photo-1591876323328-770d49ba3955?auto=format&fit=crop&w=400&q=80', rating: 4.8 }
    ]
  }],
  beans: [{
    category: 'Beans',
    products: [
      { id: 'be1', name: 'Black Eyed Beans (2kg)', price: 8, category: 'Beans', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80', rating: 4.9 },
      { id: 'be2', name: 'Red Kidney Beans (2kg)', price: 9, category: 'Beans', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80', rating: 4.8 },
      { id: 'be3', name: 'White Navy Beans (2kg)', price: 8, category: 'Beans', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80', rating: 4.7 },
      { id: 'be4', name: 'Chickpeas (Garbanzo) (2kg)', price: 10, category: 'Beans', image: 'https://images.unsplash.com/photo-1599486577294-0cba4265caf2?auto=format&fit=crop&w=400&q=80', rating: 4.8 },
      { id: 'be5', name: 'Lentils (Red Split) (2kg)', price: 9, category: 'Beans', image: 'https://images.unsplash.com/photo-1600891964599-f43ba0e33d41?auto=format&fit=crop&w=400&q=80', rating: 4.7 }
    ]
  }]
};

export function Categories() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('type')?.toLowerCase() || 'all';
  
  const categoryInfo = (categoryParam !== 'all' && categoriesData[categoryParam]) ? categoriesData[categoryParam]! : null;
  const isCategorySpecific = !!categoryInfo;
  
  // Get products for this category
  const categoryProducts = mockProductsByCategory[categoryParam as keyof typeof mockProductsByCategory] || [];
  const products = categoryProducts.length > 0 ? categoryProducts[0]?.products : [];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col items-center gap-6 text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground bg-pi-gradient bg-clip-text text-transparent">
          {isCategorySpecific ? categoryInfo.name : 'Categories'}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          {isCategorySpecific ? 
            categoryInfo.description : 
            'Browse our comprehensive selection of agricultural products organized by category'}
        </p>
        
        {!isCategorySpecific && (
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/categories?type=crops" 
              className="bg-muted/50 hover:bg-muted/100 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Crops
            </Link>
            <Link 
              to="/categories?type=rice" 
              className="bg-muted/50 hover:bg-muted/100 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Rice
            </Link>
            <Link 
              to="/categories?type=beans" 
              className="bg-muted/50 hover:bg-muted/100 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Beans
            </Link>
            <Link 
              to="/categories?type=vegetables" 
              className="bg-muted/50 hover:bg-muted/100 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Vegetables
            </Link>
            <Link 
              to="/categories?type=fruits" 
              className="bg-muted/50 hover:bg-muted/100 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Fruits
            </Link>
            <Link 
              to="/categories?type=livestock" 
              className="bg-muted/50 hover:bg-muted/100 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Livestock
            </Link>
          </div>
        )}
      </div>

      {isCategorySpecific && categoryInfo ? (
        // Category-specific view
        <>
          {/* Category Header */}
          <section className="relative">
            <div className="absolute inset-0">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-10"
                style={{ backgroundImage: `url(${categoryInfo.imageUrl})` }}
              />
            </div>
            <div className="relative z-10 pt-16 pb-8">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {categoryInfo.name}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {categoryInfo.description}
                </p>
                <div className="flex items-center justify-center space-x-4 mt-6">
                  <span className="text-pi-pulse animate-pulse w-10 h-10 bg-pi-purple/20 rounded-full flex items-center justify-center">
                    {categoryInfo.icon}
                  </span>
                  <span className="text-muted-foreground">{categoryInfo.productCount} products available</span>
                </div>
              </div>
            </div>
          </section>

          {/* Products Grid */}
          <section>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {products.length > 0 ? (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-center mb-4">
                      Featured {categoryInfo.name} Products
                    </h2>
                    <p className="text-center text-muted-foreground max-w-2xl mx-auto">
                      Top quality {categoryInfo.name.toLowerCase()} from trusted suppliers
                    </p>
                  </div>
                  
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        className="hover:-translate-y-1 transition-transform duration-300"
                      />
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Link 
                      to="/marketplace" 
                      className="bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300"
                    >
                      Browse All {categoryInfo.name}
                    </Link>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No products available in this category yet. Check back soon!
                  </p>
                  <Link 
                    to="/marketplace" 
                    className="mt-6 inline-block bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-2 px-6 rounded-md transition-colors"
                  >
                    Go to Marketplace
                  </Link>
                </div>
              )}
            </div>
          </section>
        </>
      ) : (
        // All categories view
        <section>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(categoriesData).map(([key, category]) => (
                <Link 
                  key={key} 
                  to={`/categories?type=${key}`} 
                  className="group relative overflow-hidden bg-muted/50 hover:bg-muted/100 transition-all duration-300"
                >
                  <div className="absolute inset-0">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${category.imageUrl})` }}
                    />
                  </div>
                  <div className="relative z-10 flex flex-col items-center py-8 px-4 text-center">
                    <div className="w-12 h-12 bg-pi-purple/20 rounded-full flex items-center justify-center mb-4">
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-lg text-foreground">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.productCount} products
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}