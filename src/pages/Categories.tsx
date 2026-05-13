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

const _ib = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&q=80`;

const categoriesData: Record<string, CategoryInfo> = {
  crops:    { name: 'Crops',       description: 'Grains, cereals, and staple foods',        imageUrl: _ib('1586201375761-83865001e31c'), icon: '🌾', productCount: 42 },
  rice:     { name: 'Rice',        description: 'Premium rice varieties from local farms',   imageUrl: _ib('1536304929831-ee1ca9d44906'), icon: '🍚', productCount: 18 },
  beans:    { name: 'Beans',       description: 'Protein-rich legumes and pulses',           imageUrl: _ib('1557804506-669a67965ba0'), icon: '🫘', productCount: 25 },
  yam:      { name: 'Yam',         description: 'Fresh tubers and root vegetables',          imageUrl: _ib('1598170845058-32b9d6a5da37'), icon: '🍠', productCount: 12 },
  cassava:  { name: 'Cassava',     description: 'Starchy root vegetables and derivatives',   imageUrl: _ib('1574323347407-f5e1ad6d020b'), icon: '🌱', productCount: 8 },
  maize:    { name: 'Maize',       description: 'Corn and maize products for food and feed', imageUrl: _ib('1514326640560-7d063ef2aed5'), icon: '🌽', productCount: 15 },
  vegetables: { name: 'Vegetables', description: 'Fresh and organic vegetables',             imageUrl: _ib('1540420773420-3366772f4999'), icon: '🥬', productCount: 67 },
  fruits:   { name: 'Fruits',      description: 'Seasonal and tropical fruits',              imageUrl: _ib('1601493700631-2b16ec4b4716'), icon: '🍎', productCount: 43 },
  livestock: { name: 'Livestock',  description: 'Cattle, goats, sheep, and other farm animals', imageUrl: _ib('1589923188900-85dae523342b'), icon: '🐄', productCount: 28 },
  poultry:  { name: 'Poultry',     description: 'Chicken, duck, turkey, and other birds',    imageUrl: _ib('1548550023-2bdb3c5beed7'), icon: '🐔', productCount: 31 },
  fishery:  { name: 'Fishery',     description: 'Fresh fish and seafood from local waters',  imageUrl: _ib('1578575437130-527eed3abbec'), icon: '🐟', productCount: 22 },
  dairy:    { name: 'Dairy',       description: 'Milk, cheese, yogurt, and dairy products',  imageUrl: _ib('1628088062854-d1870b4553da'), icon: '🥛', productCount: 19 },
  honey:    { name: 'Honey',       description: 'Natural honey and beekeeping products',      imageUrl: _ib('1587049352846-4a222e784d38'), icon: '🍯', productCount: 11 },
  'farm-tools': { name: 'Farm Tools', description: 'Equipment and tools for farming',        imageUrl: _ib('1597848212624-a19eb35e2651'), icon: '🔧', productCount: 34 },
  fertilizers: { name: 'Fertilizers', description: 'Nutrients and soil amendments for crops', imageUrl: _ib('1574323347407-f5e1ad6d020b'), icon: '🌿', productCount: 27 },
  seeds:    { name: 'Seeds',       description: 'Quality seeds for planting and cultivation', imageUrl: _ib('1416879595882-3373a0480b5b'), icon: '🌱', productCount: 41 },
  pets:     { name: 'Pets',        description: 'Companion animals and pet care products',    imageUrl: _ib('1552053831-71594a27632d'), icon: '🐕', productCount: 16 }
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

const _img = (id: string) => `https://images.unsplash.com/photo-${id}?w=400&q=80`;

const mockProductsByCategory: Record<string, CategoryProducts[]> = {
  crops: [{
    category: 'Crops',
    products: [
      { id: 'cr1', name: 'Premium Rice Bag (50kg)', price: 25, category: 'Crops', image: _img('1586201375761-83865001e31c'), rating: 4.8 },
      { id: 'cr2', name: 'Basmathi Rice (10kg)', price: 22, category: 'Crops', image: _img('1536304929831-ee1ca9d44906'), rating: 4.9 },
      { id: 'cr3', name: 'Brown Rice (5kg)', price: 12, category: 'Crops', image: _img('1595854341625-f33ee10dbf94'), rating: 4.7 },
      { id: 'cr4', name: 'Yellow Maize (10kg)', price: 18, category: 'Crops', image: _img('1514326640560-7d063ef2aed5'), rating: 4.7 },
      { id: 'cr5', name: 'Millet (5kg)', price: 10, category: 'Crops', image: _img('1551754655-cd27e38d2076'), rating: 4.6 }
    ]
  }],
  rice: [{
    category: 'Rice',
    products: [
      { id: 'ri1', name: 'Premium Long Grain Rice (25kg)', price: 15, category: 'Rice', image: _img('1586201375761-83865001e31c'), rating: 4.8 },
      { id: 'ri2', name: 'Basmathi Rice (10kg)', price: 22, category: 'Rice', image: _img('1536304929831-ee1ca9d44906'), rating: 4.9 },
      { id: 'ri3', name: 'Jasmine Rice (5kg)', price: 18, category: 'Rice', image: _img('1595854341625-f33ee10dbf94'), rating: 4.7 },
      { id: 'ri4', name: 'Brown Rice (5kg)', price: 12, category: 'Rice', image: _img('1506803682981-6e718a9dd3ee'), rating: 4.7 },
      { id: 'ri5', name: 'Wild Rice Blend (2kg)', price: 20, category: 'Rice', image: _img('1540189549336-e6e99c3679fe'), rating: 4.8 }
    ]
  }],
  beans: [{
    category: 'Beans',
    products: [
      { id: 'be1', name: 'Black Eyed Beans (2kg)', price: 8, category: 'Beans', image: _img('1557804506-669a67965ba0'), rating: 4.9 },
      { id: 'be2', name: 'Red Kidney Beans (2kg)', price: 9, category: 'Beans', image: _img('1584308666744-24d5c474f2ae'), rating: 4.8 },
      { id: 'be3', name: 'White Navy Beans (2kg)', price: 8, category: 'Beans', image: _img('1490645935967-10de6ba17061'), rating: 4.7 },
      { id: 'be4', name: 'Chickpeas (2kg)', price: 10, category: 'Beans', image: _img('1540189549336-e6e99c3679fe'), rating: 4.8 },
      { id: 'be5', name: 'Lentils (Red Split) (2kg)', price: 9, category: 'Beans', image: _img('1467003909585-2f8a72700288'), rating: 4.7 }
    ]
  }],
  yam: [{
    category: 'Yam',
    products: [
      { id: 'ya1', name: 'Fresh Yam Tubers (5kg)', price: 10, category: 'Yam', image: _img('1598170845058-32b9d6a5da37'), rating: 4.7 },
      { id: 'ya2', name: 'Pounded Yam Flour (2kg)', price: 12, category: 'Yam', image: _img('1598170845058-32b9d6a5da37'), rating: 4.6 },
      { id: 'ya3', name: 'White Yam (per piece)', price: 8, category: 'Yam', image: _img('1598170845058-32b9d6a5da37'), rating: 4.5 }
    ]
  }],
  cassava: [{
    category: 'Cassava',
    products: [
      { id: 'ca1', name: 'Cassava Flour (5kg)', price: 9, category: 'Cassava', image: _img('1490818387583-1babb5f335e2'), rating: 4.6 },
      { id: 'ca2', name: 'Garri (3kg)', price: 7, category: 'Cassava', image: _img('1574323347407-f5e1ad6d020b'), rating: 4.7 },
      { id: 'ca3', name: 'Frozen Cassava Leaves (2kg)', price: 8, category: 'Cassava', image: _img('1574323347407-f5e1ad6d020b'), rating: 4.5 }
    ]
  }],
  maize: [{
    category: 'Maize',
    products: [
      { id: 'mz1', name: 'Yellow Maize (10kg)', price: 18, category: 'Maize', image: _img('1514326640560-7d063ef2aed5'), rating: 4.7 },
      { id: 'mz2', name: 'Fresh Corn on the Cob (10pcs)', price: 12, category: 'Maize', image: _img('1551754655-cd27e38d2076'), rating: 4.8 },
      { id: 'mz3', name: 'Maize Flour (5kg)', price: 14, category: 'Maize', image: _img('1514326640560-7d063ef2aed5'), rating: 4.6 }
    ]
  }],
  vegetables: [{
    category: 'Vegetables',
    products: [
      { id: 'vg1', name: 'Fresh Tomatoes (5kg box)', price: 12, category: 'Vegetables', image: _img('1592924357228-91a4daadcfea'), rating: 4.8 },
      { id: 'vg2', name: 'Organic Carrots (3kg)', price: 10, category: 'Vegetables', image: _img('1540420773420-3366772f4999'), rating: 4.9 },
      { id: 'vg3', name: 'Red Bell Peppers (2kg)', price: 15, category: 'Vegetables', image: _img('1556801712-76c8eb07bbc9'), rating: 4.8 },
      { id: 'vg4', name: 'Green Spinach (1kg)', price: 5, category: 'Vegetables', image: _img('1540420773420-3366772f4999'), rating: 4.7 },
      { id: 'vg5', name: 'Fresh Onions (5kg)', price: 8, category: 'Vegetables', image: _img('1556801712-76c8eb07bbc9'), rating: 4.6 }
    ]
  }],
  fruits: [{
    category: 'Fruits',
    products: [
      { id: 'fr1', name: 'Sweet Mangoes (10pcs)', price: 20, category: 'Fruits', image: _img('1601493700631-2b16ec4b4716'), rating: 4.9 },
      { id: 'fr2', name: 'Fresh Pineapples (5pcs)', price: 18, category: 'Fruits', image: _img('1550258987-190a2d41a8ba'), rating: 4.8 },
      { id: 'fr3', name: 'Bananas (bunch)', price: 6, category: 'Fruits', image: _img('1601493700631-2b16ec4b4716'), rating: 4.7 },
      { id: 'fr4', name: 'Oranges (20pcs)', price: 10, category: 'Fruits', image: _img('1550258987-190a2d41a8ba'), rating: 4.6 }
    ]
  }],
  livestock: [{
    category: 'Livestock',
    products: [
      { id: 'lv1', name: 'Live Goat (Medium)', price: 150, category: 'Livestock', image: _img('1589923188900-85dae523342b'), rating: 4.7 },
      { id: 'lv2', name: 'Large Cow (Mature)', price: 300, category: 'Livestock', image: _img('1570042225831-d98fa7577f1e'), rating: 4.8 },
      { id: 'lv3', name: 'Sheep (Young)', price: 120, category: 'Livestock', image: _img('1589923188900-85dae523342b'), rating: 4.6 }
    ]
  }],
  poultry: [{
    category: 'Poultry',
    products: [
      { id: 'pl1', name: 'Broiler Chicken (2kg)', price: 25, category: 'Poultry', image: _img('1548550023-2bdb3c5beed7'), rating: 4.8 },
      { id: 'pl2', name: 'Turkey (4kg)', price: 45, category: 'Poultry', image: _img('1548550023-2bdb3c5beed7'), rating: 4.7 },
      { id: 'pl3', name: 'Duck (2.5kg)', price: 30, category: 'Poultry', image: _img('1548550023-2bdb3c5beed7'), rating: 4.6 }
    ]
  }],
  fishery: [{
    category: 'Fishery',
    products: [
      { id: 'fi1', name: 'Fresh Tilapia (5kg)', price: 35, category: 'Fishery', image: _img('1578575437130-527eed3abbec'), rating: 4.9 },
      { id: 'fi2', name: 'Catfish (3kg)', price: 25, category: 'Fishery', image: _img('1505253758473-96b7015fcd40'), rating: 4.8 },
      { id: 'fi3', name: 'Fresh Prawns (2kg)', price: 40, category: 'Fishery', image: _img('1578575437130-527eed3abbec'), rating: 4.7 }
    ]
  }],
  dairy: [{
    category: 'Dairy',
    products: [
      { id: 'da1', name: 'Fresh Cow Milk (10L)', price: 20, category: 'Dairy', image: _img('1628088062854-d1870b4553da'), rating: 4.8 },
      { id: 'da2', name: 'Yogurt (1L)', price: 8, category: 'Dairy', image: _img('1628088062854-d1870b4553da'), rating: 4.7 },
      { id: 'da3', name: 'Cheese (500g)', price: 15, category: 'Dairy', image: _img('1628088062854-d1870b4553da'), rating: 4.6 }
    ]
  }],
  honey: [{
    category: 'Honey',
    products: [
      { id: 'ho1', name: 'Natural Honey (500ml)', price: 15, category: 'Honey', image: _img('1587049352846-4a222e784d38'), rating: 4.9 },
      { id: 'ho2', name: 'Honeycomb (250g)', price: 12, category: 'Honey', image: _img('1587049352846-4a222e784d38'), rating: 4.8 }
    ]
  }],
  'farm-tools': [{
    category: 'Farm Tools',
    products: [
      { id: 'ft1', name: 'Hoe Tool Set (3pcs)', price: 45, category: 'Farm Tools', image: _img('1597848212624-a19eb35e2651'), rating: 4.7 },
      { id: 'ft2', name: 'Cutlass (Stainless)', price: 25, category: 'Farm Tools', image: _img('1597848212624-a19eb35e2651'), rating: 4.6 },
      { id: 'ft3', name: 'Watering Can (10L)', price: 18, category: 'Farm Tools', image: _img('1597848212624-a19eb35e2651'), rating: 4.5 }
    ]
  }],
  fertilizers: [{
    category: 'Fertilizers',
    products: [
      { id: 'fe1', name: 'NPK Fertilizer (25kg bag)', price: 60, category: 'Fertilizers', image: _img('1600585154340-be6161a56a0c'), rating: 4.8 },
      { id: 'fe2', name: 'Urea Fertilizer (25kg)', price: 45, category: 'Fertilizers', image: _img('1600585154340-be6161a56a0c'), rating: 4.7 },
      { id: 'fe3', name: 'Organic Compost (20kg)', price: 25, category: 'Fertilizers', image: _img('1600585154340-be6161a56a0c'), rating: 4.6 }
    ]
  }],
  seeds: [{
    category: 'Seeds',
    products: [
      { id: 'se1', name: 'Maize Seeds (2kg)', price: 12, category: 'Seeds', image: _img('1416879595882-3373a0480b5b'), rating: 4.7 },
      { id: 'se2', name: 'Vegetable Seed Pack (mixed)', price: 8, category: 'Seeds', image: _img('1416879595882-3373a0480b5b'), rating: 4.8 },
      { id: 'se3', name: 'Rice Seedlings (tray)', price: 15, category: 'Seeds', image: _img('1416879595882-3373a0480b5b'), rating: 4.6 }
    ]
  }],
  pets: [{
    category: 'Pets',
    products: [
      { id: 'pe1', name: 'Golden Retriever Puppy', price: 200, category: 'Pets', image: _img('1552053831-71594a27632d'), rating: 4.9 },
      { id: 'pe2', name: 'Pet Feeding Bowl Set', price: 15, category: 'Pets', image: _img('1552053831-71594a27632d'), rating: 4.7 }
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