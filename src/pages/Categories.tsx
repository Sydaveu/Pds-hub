import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/product-card/ProductCard';
import { CATEGORY_LIST, getProductsByCategory, getProductById } from '../lib/products';
import { getCategoryImageUrl } from '../lib/images';

interface CategoryInfo {
  name: string;
  description: string;
  imageUrl: string;
  icon: ReactNode;
  productCount: number;
}

const categoriesData: Record<string, CategoryInfo> = {};
for (const cat of CATEGORY_LIST) {
  categoriesData[cat.id] = {
    name: cat.name,
    description: cat.description,
    imageUrl: cat.imageUrl,
    icon: cat.icon,
    productCount: cat.productCount,
  };
}

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

const mockProductsByCategory: Record<string, CategoryProducts[]> = {};
for (const cat of CATEGORY_LIST) {
  const products = getProductsByCategory(cat.id);
  if (products.length > 0) {
    mockProductsByCategory[cat.id] = [{
      category: cat.name,
      products: products.map(p => ({
        id: p.id, name: p.name, price: p.price,
        image: p.image, category: p.category, rating: p.rating,
      })),
    }];
  }
}

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