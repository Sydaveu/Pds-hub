export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  mainCategory: 'food' | 'tools' | 'animals';
  category: string;
  subcategory: string;
  description: string;
  rating: number;
  reviews: number;
  stock: number;
  unit: string;
  origin: string;
  isFeatured?: boolean;
  searchTags: string[];
}

import { getProductImage } from './productImages';

const PI = '\u03c0';
const IMG = (id: string, kw: string) => getProductImage(id, kw);

export const allProducts: Product[] = [
  // ═══════════════════════════════════════════
  // FOOD CATEGORY
  // ═══════════════════════════════════════════
  ...(function(): Product[] {
    const f = (id: string, name: string, price: number, category: string, sub: string, desc: string, rating: number, reviews: number, stock: number, unit: string, origin: string, imgKw: string, featured = false, tags?: string[]): Product => ({
       id, name, price, mainCategory: 'food', category, subcategory: sub,
       image: IMG(id, imgKw), description: desc, rating, reviews, stock, unit, origin, isFeatured: featured,
      searchTags: tags ?? [category.toLowerCase(), sub.toLowerCase(), ...name.toLowerCase().split(' ')]
    });
    const r = [
      // Rice
      f('f001', `Premium Long Grain Rice (25kg)`, 15, 'Rice', 'Grains', 'High-quality long grain rice aged for optimal flavor', 4.8, 124, 50, 'bag', 'Northern Nigeria', 'rice'),
      f('f002', `Basmati Rice (10kg)`, 22, 'Rice', 'Grains', 'Premium aromatic basmati rice with long slender grains', 4.9, 89, 30, 'bag', 'Northern Nigeria', 'basmati-rice'),
      f('f003', `Brown Rice (5kg)`, 12, 'Rice', 'Grains', 'Nutritious brown rice with bran layer intact, rich in fiber', 4.7, 67, 100, 'bag', 'Central Nigeria', 'brown-rice'),
      f('f004', `Jasmine Rice (5kg)`, 18, 'Rice', 'Grains', 'Fragrant jasmine rice from Thailand', 4.8, 55, 40, 'bag', 'Thailand', 'jasmine-rice'),
      f('f005', `Wild Rice Blend (2kg)`, 20, 'Rice', 'Grains', 'Premium wild rice blend with nutty flavor', 4.6, 33, 25, 'bag', 'USA', 'wild-rice'),
      f('f006', `Jollof Rice Party Pack`, 25, 'Rice', 'Prepared Meals', 'Party-size Jollof rice with spicy tomato stew', 4.9, 210, 80, 'tray', 'Nigeria', 'jollof-rice', true, ['jollof', 'party rice', 'nigerian rice']),
      f('f007', `Fried Rice Special (Large Tray)`, 20, 'Rice', 'Prepared Meals', 'Large tray of fried rice with mixed vegetables', 4.7, 145, 60, 'tray', 'Nigeria', 'fried-rice'),
      f('f008', `Chinese Fried Rice`, 18, 'Rice', 'Prepared Meals', 'Authentic Chinese-style fried rice with egg and veggies', 4.6, 98, 45, 'pack', 'Nigeria', 'chinese-rice'),
      f('f009', `Coconut Rice (Prepared)`, 15, 'Rice', 'Prepared Meals', 'Creamy coconut rice made with fresh coconut milk', 4.7, 76, 35, 'pack', 'Nigeria', 'coconut-rice'),

      // Beans
      f('f010', `Black Eyed Beans (2kg)`, 8, 'Beans', 'Legumes', 'Protein-rich black eyed beans, organically grown', 4.9, 45, 80, 'kg', 'Southern Nigeria', 'beans'),
      f('f011', `Red Kidney Beans (2kg)`, 9, 'Beans', 'Legumes', 'Premium red kidney beans for stews and salads', 4.8, 38, 60, 'kg', 'Kenya', 'kidney-beans'),
      f('f012', `White Navy Beans (2kg)`, 8, 'Beans', 'Legumes', 'Smooth white beans perfect for porridge and stews', 4.7, 29, 55, 'kg', 'Tanzania', 'navy-beans'),
      f('f013', `Chickpeas (2kg)`, 10, 'Beans', 'Legumes', 'Premium chickpeas for hummus and curries', 4.8, 52, 70, 'kg', 'Ethiopia', 'chickpeas'),
      f('f014', `Red Split Lentils (2kg)`, 9, 'Beans', 'Legumes', 'Quick-cooking red lentils rich in protein', 4.7, 41, 90, 'kg', 'India', 'lentils'),
      f('f015', `Brown Beans (1kg)`, 6, 'Beans', 'Legumes', 'Traditional brown beans for hearty meals', 4.6, 33, 100, 'kg', 'Nigeria', 'brown-beans'),
      f('f016', `Green Beans (1kg)`, 7, 'Beans', 'Legumes', 'Fresh green beans packed with vitamins', 4.7, 28, 65, 'kg', 'Kenya', 'green-beans'),

      // Yam
      f('f017', `Fresh Yam Tubers (5kg)`, 10, 'Yam', 'Roots & Tubers', 'Fresh yam tubers straight from the farm', 4.7, 88, 40, 'kg', 'Nigeria', 'yam'),
      f('f018', `Pounded Yam Flour (2kg)`, 12, 'Yam', 'Roots & Tubers', 'Premium pounded yam flour - just add hot water', 4.8, 67, 55, 'bag', 'Nigeria', 'pounded-yam'),
      f('f019', `White Yam (per piece)`, 8, 'Yam', 'Roots & Tubers', 'Large white yam, perfect for boiling or frying', 4.6, 54, 80, 'piece', 'Ghana', 'white-yam'),
      f('f020', `Yellow Yam (per piece)`, 9, 'Yam', 'Roots & Tubers', 'Rich yellow yam with earthy flavor', 4.5, 32, 45, 'piece', 'Nigeria', 'yellow-yam'),
      f('f021', `Water Yam (per piece)`, 7, 'Yam', 'Roots & Tubers', 'Light water yam, ideal for pottage', 4.5, 28, 50, 'piece', 'Nigeria', 'water-yam'),

      // Cassava
      f('f022', `Cassava Flour (5kg)`, 9, 'Cassava', 'Roots & Tubers', 'Fine cassava flour for baking and cooking', 4.6, 47, 60, 'bag', 'Nigeria', 'cassava-flour'),
      f('f023', `Fresh Cassava Tubers (5kg)`, 6, 'Cassava', 'Roots & Tubers', 'Freshly harvested cassava tubers', 4.5, 38, 70, 'kg', 'Nigeria', 'cassava'),
      f('f024', `Frozen Cassava Leaves (2kg)`, 8, 'Cassava', 'Roots & Tubers', 'Pounded cassava leaves ready for cooking', 4.5, 25, 40, 'kg', 'DR Congo', 'cassava-leaves'),
      f('f025', `Cassava Chips (1kg)`, 5, 'Cassava', 'Roots & Tubers', 'Dried cassava chips for flour production', 4.4, 19, 100, 'kg', 'Nigeria', 'cassava-chips'),

      // Garri
      f('f026', `White Garri (5kg)`, 7, 'Garri', 'Roots & Tubers', 'Classic white garri for soaking or making eba', 4.7, 95, 100, 'bag', 'Nigeria', 'garri'),
      f('f027', `Yellow Garri (5kg)`, 8, 'Garri', 'Roots & Tubers', 'Golden garri enriched with palm oil', 4.8, 78, 80, 'bag', 'Nigeria', 'garri', true),
      f('f028', `Ijebu Garri (2kg)`, 5, 'Garri', 'Roots & Tubers', 'Premium Ijebu garri - the finest texture', 4.9, 112, 60, 'bag', 'Nigeria', 'garri'),
      f('f029', `Soaked Garri (Prepared)`, 4, 'Garri', 'Prepared Meals', 'Ready-to-eat soaked garri with sugar and groundnut', 4.6, 56, 90, 'pack', 'Nigeria', 'garri'),

      // Maize
      f('f030', `Yellow Maize (10kg)`, 18, 'Maize', 'Grains', 'Premium yellow maize for animal feed or flour', 4.7, 67, 100, 'kg', 'Central Nigeria', 'maize'),
      f('f031', `Fresh Corn on the Cob (10pcs)`, 12, 'Maize', 'Grains', 'Sweet fresh corn cobs perfect for roasting', 4.8, 88, 50, 'pack', 'Nigeria', 'corn'),
      f('f032', `Maize Flour (5kg)`, 14, 'Maize', 'Grains', 'Stone-ground maize flour for pap and baking', 4.6, 43, 75, 'bag', 'Nigeria', 'maize-flour'),
      f('f033', `Sweet Corn Canned (6pcs)`, 8, 'Maize', 'Grains', 'Imported sweet corn in cans', 4.5, 32, 90, 'pack', 'USA', 'sweet-corn'),
      f('f034', `Popcorn Kernels (1kg)`, 6, 'Maize', 'Grains', 'Premium popping corn for delicious popcorn', 4.6, 29, 120, 'kg', 'Nigeria', 'popcorn'),

      // Wheat
      f('f035', `Whole Wheat Flour (5kg)`, 10, 'Wheat', 'Grains', 'Stone-ground whole wheat flour for bread making', 4.7, 54, 80, 'bag', 'Nigeria', 'wheat'),
      f('f036', `Wheat Grains (10kg)`, 15, 'Wheat', 'Grains', 'Clean wheat grains for milling or animal feed', 4.5, 22, 60, 'kg', 'Ukraine', 'wheat'),
      f('f037', `Wheat Bran (5kg)`, 8, 'Wheat', 'Grains', 'Nutritious wheat bran for baking and cereals', 4.4, 18, 90, 'bag', 'Nigeria', 'wheat-bran'),

      // Millet
      f('f038', `Millet Grains (5kg)`, 10, 'Millet', 'Grains', 'Nutritious millet grains for porridge and flour', 4.6, 31, 60, 'kg', 'Nigeria', 'millet'),
      f('f039', `Millet Flour (2kg)`, 7, 'Millet', 'Grains', 'Fine millet flour for traditional dishes', 4.5, 26, 70, 'bag', 'Nigeria', 'millet-flour'),
      f('f040', `Finger Millet (3kg)`, 9, 'Millet', 'Grains', 'Ragi finger millet rich in calcium', 4.6, 20, 45, 'kg', 'India', 'finger-millet'),

      // Sorghum
      f('f041', `Sorghum Grains (10kg)`, 12, 'Sorghum', 'Grains', 'Red sorghum grains for flour and brewing', 4.5, 28, 55, 'kg', 'Nigeria', 'sorghum'),
      f('f042', `Sorghum Flour (3kg)`, 8, 'Sorghum', 'Grains', 'Fine sorghum flour for gluten-free baking', 4.4, 17, 40, 'bag', 'Nigeria', 'sorghum-flour'),

      // Vegetables
      f('f043', `Fresh Tomatoes (5kg box)`, 12, 'Vegetables', 'Fresh Produce', 'Ripe juicy tomatoes perfect for stews and salads', 4.8, 56, 60, 'box', 'Plateau State', 'tomatoes', true),
      f('f044', `Organic Carrots (3kg)`, 10, 'Vegetables', 'Fresh Produce', 'Sweet crunchy organic carrots rich in beta-carotene', 4.9, 78, 120, 'kg', 'Jos Nigeria', 'carrots'),
      f('f045', `Red Bell Peppers (2kg)`, 15, 'Vegetables', 'Fresh Produce', 'Vibrant red bell peppers sweet and crisp', 4.8, 34, 50, 'kg', 'Plateau State', 'bell-peppers'),
      f('f046', `Green Spinach (1kg)`, 5, 'Vegetables', 'Fresh Produce', 'Fresh green spinach leaves packed with iron', 4.7, 44, 80, 'kg', 'Nigeria', 'spinach'),
      f('f047', `Fresh Onions (5kg)`, 8, 'Vegetables', 'Fresh Produce', 'Large fresh onions for everyday cooking', 4.6, 61, 100, 'kg', 'Nigeria', 'onions'),
      f('f048', `Cabbage (per head)`, 4, 'Vegetables', 'Fresh Produce', 'Fresh green cabbage heads', 4.5, 33, 90, 'head', 'Nigeria', 'cabbage'),
      f('f049', `Lettuce (per head)`, 3, 'Vegetables', 'Fresh Produce', 'Crisp fresh lettuce for salads', 4.6, 29, 70, 'head', 'Nigeria', 'lettuce'),
      f('f050', `Cucumber (per piece)`, 2, 'Vegetables', 'Fresh Produce', 'Fresh cucumber perfect for salads', 4.5, 38, 120, 'piece', 'Nigeria', 'cucumber'),
      f('f051', `Zucchini (1kg)`, 6, 'Vegetables', 'Fresh Produce', 'Fresh green zucchini', 4.5, 22, 50, 'kg', 'Kenya', 'zucchini'),
      f('f052', `Broccoli (per head)`, 5, 'Vegetables', 'Fresh Produce', 'Fresh broccoli florets rich in vitamins', 4.7, 28, 40, 'head', 'Kenya', 'broccoli'),
      f('f053', `Cauliflower (per head)`, 5, 'Vegetables', 'Fresh Produce', 'Fresh white cauliflower', 4.5, 19, 35, 'head', 'Kenya', 'cauliflower'),
      f('f054', `Eggplant (1kg)`, 6, 'Vegetables', 'Fresh Produce', 'Fresh purple eggplant for stews', 4.6, 25, 45, 'kg', 'Nigeria', 'eggplant'),
      f('f055', `Fresh Okra (1kg)`, 5, 'Vegetables', 'Fresh Produce', 'Tender fresh okra for soups and stews', 4.7, 42, 65, 'kg', 'Nigeria', 'okra'),
      f('f056', `Bitter Leaf (500g)`, 4, 'Vegetables', 'Fresh Produce', 'Fresh bitter leaf for traditional soups', 4.5, 31, 50, 'bunch', 'Nigeria', 'bitter-leaf'),
      f('f057', `Ugu Pumpkin Leaf (bunch)`, 3, 'Vegetables', 'Fresh Produce', 'Fresh pumpkin leaves for vegetable soup', 4.6, 48, 80, 'bunch', 'Nigeria', 'ugu'),
      f('f058', `Waterleaf (bunch)`, 2, 'Vegetables', 'Fresh Produce', 'Fresh waterleaf for salads and soups', 4.4, 22, 90, 'bunch', 'Nigeria', 'waterleaf'),

      // Fruits
      f('f059', `Sweet Mangoes (10pcs)`, 20, 'Fruits', 'Fresh Produce', 'Ripe juicy mangoes perfect for smoothies', 4.9, 90, 200, 'pack', 'Benue State', 'mangoes', true),
      f('f060', `Fresh Pineapples (5pcs)`, 18, 'Fruits', 'Fresh Produce', 'Golden pineapples rich in vitamin C', 4.8, 43, 80, 'pack', 'Cross River State', 'pineapples'),
      f('f061', `Bananas (bunch)`, 6, 'Fruits', 'Fresh Produce', 'Fresh ripe bananas, naturally sweet', 4.7, 55, 150, 'bunch', 'Nigeria', 'bananas'),
      f('f062', `Oranges (20pcs)`, 10, 'Fruits', 'Fresh Produce', 'Sweet juicy oranges from local farms', 4.6, 48, 100, 'pack', 'Nigeria', 'oranges'),
      f('f063', `Apples (10pcs)`, 12, 'Fruits', 'Fresh Produce', 'Crisp red apples imported fresh', 4.7, 35, 60, 'pack', 'South Africa', 'apples'),
      f('f064', `Red Grapes (2kg)`, 15, 'Fruits', 'Fresh Produce', 'Sweet seedless red grapes', 4.8, 29, 40, 'kg', 'South Africa', 'grapes'),
      f('f065', `Watermelon (per piece)`, 8, 'Fruits', 'Fresh Produce', 'Large sweet red watermelon', 4.7, 52, 50, 'piece', 'Nigeria', 'watermelon'),
      f('f066', `Pawpaw (per piece)`, 5, 'Fruits', 'Fresh Produce', 'Ripe pawpaw rich in enzymes and vitamins', 4.6, 33, 70, 'piece', 'Nigeria', 'pawpaw'),
      f('f067', `Avocado (5pcs)`, 10, 'Fruits', 'Fresh Produce', 'Buttery ripe avocados', 4.8, 44, 60, 'pack', 'Kenya', 'avocado'),
      f('f068', `Strawberries (500g)`, 12, 'Fruits', 'Fresh Produce', 'Fresh red strawberries', 4.9, 38, 30, 'pack', 'South Africa', 'strawberries'),
      f('f069', `Blueberries (250g)`, 10, 'Fruits', 'Fresh Produce', 'Antioxidant-rich blueberries', 4.7, 22, 25, 'pack', 'South Africa', 'blueberries'),
      f('f070', `Lemons (10pcs)`, 5, 'Fruits', 'Fresh Produce', 'Fresh sour lemons for juice and cooking', 4.5, 26, 80, 'pack', 'Nigeria', 'lemons'),
      f('f071', `Limes (10pcs)`, 4, 'Fruits', 'Fresh Produce', 'Fresh green limes', 4.5, 19, 75, 'pack', 'Nigeria', 'lime'),
      f('f072', `Coconut (5pcs)`, 8, 'Fruits', 'Fresh Produce', 'Fresh mature coconuts with milk', 4.6, 37, 50, 'pack', 'Nigeria', 'coconut'),
      f('f073', `Medjool Dates (1kg)`, 14, 'Fruits', 'Fresh Produce', 'Premium Medjool dates naturally sweet', 4.8, 28, 35, 'kg', 'Saudi Arabia', 'dates'),

      // Palm Oil
      f('f074', `Red Palm Oil (5L)`, 15, 'Palm Oil', 'Oils & Fats', 'Pure red palm oil for cooking and frying', 4.7, 73, 60, 'litre', 'Nigeria', 'palm-oil'),
      f('f075', `Bleached Palm Oil (5L)`, 12, 'Palm Oil', 'Oils & Fats', 'Refined bleached palm oil for light cooking', 4.5, 41, 45, 'litre', 'Nigeria', 'palm-oil'),
      f('f076', `Palm Kernel Oil (2L)`, 10, 'Palm Oil', 'Oils & Fats', 'Pure palm kernel oil for soap and cooking', 4.6, 33, 50, 'litre', 'Nigeria', 'palm-oil'),
      f('f077', `Organic Red Palm Oil (3L)`, 18, 'Palm Oil', 'Oils & Fats', 'Organic unrefined red palm oil', 4.8, 29, 30, 'litre', 'Ghana', 'palm-oil'),

      // Groundnut
      f('f078', `Raw Groundnuts (5kg)`, 10, 'Groundnut', 'Legumes', 'Fresh raw groundnuts for boiling or roasting', 4.7, 55, 80, 'kg', 'Nigeria', 'groundnut'),
      f('f079', `Roasted Groundnuts (1kg)`, 6, 'Groundnut', 'Legumes', 'Crunchy roasted groundnuts salted to perfection', 4.8, 72, 100, 'kg', 'Nigeria', 'groundnut'),
      f('f080', `Groundnut Oil (5L)`, 14, 'Groundnut', 'Oils & Fats', 'Pure groundnut oil for deep frying', 4.7, 48, 60, 'litre', 'Nigeria', 'groundnut-oil'),
      f('f081', `Groundnut Paste (500g)`, 5, 'Groundnut', 'Legumes', 'Smooth groundnut paste for sauces and soups', 4.6, 35, 70, 'jar', 'Nigeria', 'groundnut'),

      // Pepper
      f('f082', `Fresh Red Pepper (2kg)`, 8, 'Pepper', 'Spices', 'Fresh red pepper for spicy dishes', 4.7, 52, 60, 'kg', 'Nigeria', 'red-pepper'),
      f('f083', `Scotch Bonnet (500g)`, 6, 'Pepper', 'Spices', 'Hot scotch bonnet peppers for authentic heat', 4.8, 44, 45, 'kg', 'Nigeria', 'scotch-bonnet'),
      f('f084', `Dried Pepper (1kg)`, 7, 'Pepper', 'Spices', 'Sun-dried pepper for long-term storage', 4.6, 31, 80, 'kg', 'Nigeria', 'dried-pepper'),
      f('f085', `Ground Cayenne (250g)`, 4, 'Pepper', 'Spices', 'Fine ground cayenne pepper powder', 4.5, 22, 90, 'pack', 'Nigeria', 'cayenne'),
      f('f086', `Black Peppercorns (250g)`, 5, 'Pepper', 'Spices', 'Whole black peppercorns for fresh grinding', 4.6, 26, 70, 'pack', 'India', 'black-pepper'),
      f('f087', `Mixed Bell Peppers (1kg)`, 7, 'Pepper', 'Fresh Produce', 'Colorful mix of bell peppers', 4.6, 28, 50, 'kg', 'Nigeria', 'bell-peppers'),

      // Plantain
      f('f088', `Green Plantain (10pcs)`, 8, 'Plantain', 'Roots & Tubers', 'Unripe plantain for boiling and frying', 4.7, 49, 80, 'pack', 'Nigeria', 'plantain'),
      f('f089', `Ripe Plantain (10pcs)`, 10, 'Plantain', 'Roots & Tubers', 'Sweet ripe plantain for dodo and snacks', 4.8, 55, 70, 'pack', 'Nigeria', 'plantain'),
      f('f090', `Plantain Flour (2kg)`, 7, 'Plantain', 'Roots & Tubers', 'Finely milled plantain flour for Amala', 4.6, 33, 60, 'bag', 'Nigeria', 'plantain-flour'),
      f('f091', `Plantain Chips (500g)`, 5, 'Plantain', 'Snacks', 'Crunchy salted plantain chips', 4.5, 41, 90, 'pack', 'Nigeria', 'plantain-chips'),

      // Potato
      f('f092', `Irish Potatoes (10kg)`, 12, 'Potato', 'Roots & Tubers', 'Premium Irish potatoes for all cooking uses', 4.7, 52, 80, 'kg', 'Nigeria', 'potato'),
      f('f093', `Sweet Potatoes (5kg)`, 8, 'Potato', 'Roots & Tubers', 'Orange-fleshed sweet potatoes rich in vitamin A', 4.6, 43, 70, 'kg', 'Nigeria', 'sweet-potato'),
      f('f094', `Potato Chips (1kg)`, 6, 'Potato', 'Snacks', 'Crispy potato chips ready to eat', 4.5, 36, 100, 'pack', 'Nigeria', 'potato-chips'),
      f('f095', `Mashed Potato Mix (500g)`, 4, 'Potato', 'Prepared Meals', 'Instant mashed potato mix', 4.4, 18, 60, 'pack', 'USA', 'mashed-potato'),

      // Cocoa & Coffee
      f('f096', `Cocoa Beans (5kg)`, 25, 'Cocoa', 'Beverages', 'Premium fermented cocoa beans for processing', 4.7, 22, 40, 'kg', 'Ghana', 'cocoa'),
      f('f097', `Cocoa Powder (1kg)`, 12, 'Cocoa', 'Beverages', 'Pure unsweetened cocoa powder for drinks and baking', 4.8, 34, 55, 'kg', 'Ghana', 'cocoa-powder'),
      f('f098', `Cocoa Butter (500g)`, 15, 'Cocoa', 'Beverages', 'Pure cocoa butter for skincare and chocolate', 4.7, 19, 30, 'pack', 'Côte d\'Ivoire', 'cocoa-butter'),
      f('f099', `Ground Coffee (500g)`, 14, 'Coffee', 'Beverages', 'Rich aromatic ground coffee', 4.8, 44, 50, 'pack', 'Ethiopia', 'coffee'),
      f('f100', `Coffee Beans (1kg)`, 18, 'Coffee', 'Beverages', 'Whole arabica coffee beans for fresh grinding', 4.9, 38, 35, 'kg', 'Ethiopia', 'coffee-beans'),
      f('f101', `Instant Coffee (200g)`, 10, 'Coffee', 'Beverages', 'Premium instant coffee crystals', 4.5, 52, 80, 'jar', 'Brazil', 'instant-coffee'),

      // Bread & Bakery
      f('f102', `Fresh White Bread (loaf)`, 3, 'Bread', 'Bakery', 'Soft fresh white bread loaf', 4.6, 88, 100, 'loaf', 'Nigeria', 'bread'),
      f('f103', `Whole Wheat Bread (loaf)`, 4, 'Bread', 'Bakery', 'Nutritious whole wheat bread', 4.7, 52, 80, 'loaf', 'Nigeria', 'wheat-bread'),
      f('f104', `French Baguette`, 3, 'Bread', 'Bakery', 'Crispy French baguette', 4.5, 33, 60, 'piece', 'Nigeria', 'baguette'),
      f('f105', `Butter Croissant (4pcs)`, 5, 'Bread', 'Bakery', 'Flaky butter croissants', 4.7, 29, 40, 'pack', 'Nigeria', 'croissant'),

      // Pasta
      f('f106', `Spaghetti (1kg)`, 4, 'Pasta', 'Grains', 'Premium durum wheat spaghetti', 4.5, 63, 120, 'pack', 'Italy', 'spaghetti'),
      f('f107', `Macaroni (1kg)`, 4, 'Pasta', 'Grains', 'Elbow macaroni for salads and baking', 4.5, 48, 110, 'pack', 'Italy', 'macaroni'),
      f('f108', `Penne Pasta (1kg)`, 5, 'Pasta', 'Grains', 'Penne rigate pasta for hearty sauces', 4.6, 31, 80, 'pack', 'Italy', 'penne'),
      f('f109', `Lasagna Sheets (500g)`, 6, 'Pasta', 'Grains', 'Oven-ready lasagna sheets', 4.5, 22, 50, 'pack', 'Italy', 'lasagna'),
      f('f110', `Instant Noodles (pack of 10)`, 5, 'Pasta', 'Grains', 'Quick instant noodles', 4.4, 75, 200, 'pack', 'Nigeria', 'noodles'),

      // Prepared Foods
      f('f111', `Large Pizza (Pepperoni)`, 15, 'Pizza', 'Prepared Meals', 'Large pepperoni pizza with mozzarella', 4.7, 98, 30, 'piece', 'Nigeria', 'pizza'),
      f('f112', `Classic Beef Burger`, 8, 'Burger', 'Prepared Meals', 'Juicy beef burger with fries', 4.6, 72, 40, 'piece', 'Nigeria', 'burger'),
      f('f113', `Chicken Shawarma Wrap`, 7, 'Shawarma', 'Prepared Meals', 'Spiced chicken shawarma with garlic sauce', 4.8, 85, 50, 'wrap', 'Nigeria', 'shawarma'),
      f('f114', `Sushi Set (12pcs)`, 18, 'Sushi', 'Prepared Meals', 'Assorted fresh sushi with soy sauce and wasabi', 4.8, 44, 25, 'set', 'Nigeria', 'sushi'),
      f('f115', `Caesar Salad (Large)`, 8, 'Salad', 'Prepared Meals', 'Fresh Caesar salad with croutons and parmesan', 4.6, 32, 35, 'bowl', 'Nigeria', 'caesar-salad'),

      // Meat & Seafood
      f('f116', `Whole Chicken (2kg)`, 12, 'Chicken', 'Meat', 'Fresh whole chicken, farm-raised', 4.7, 63, 40, 'bird', 'Nigeria', 'chicken'),
      f('f117', `Goat Meat (1kg)`, 14, 'Goat Meat', 'Meat', 'Tender goat meat cuts for stews and grills', 4.8, 51, 35, 'kg', 'Nigeria', 'goat-meat'),
      f('f118', `Beef (1kg)`, 12, 'Beef', 'Meat', 'Prime beef cuts for various dishes', 4.7, 58, 50, 'kg', 'Nigeria', 'beef'),
      f('f119', `Whole Turkey (4kg)`, 25, 'Turkey', 'Meat', 'Large oven-ready turkey', 4.6, 38, 20, 'bird', 'Nigeria', 'turkey'),
      f('f120', `Fresh Tilapia (1kg)`, 8, 'Seafood', 'Meat', 'Fresh tilapia from clean waters', 4.8, 59, 60, 'kg', 'Nigeria', 'tilapia'),
      f('f121', `Catfish (1kg)`, 7, 'Seafood', 'Meat', 'Live fresh catfish', 4.7, 48, 55, 'kg', 'Nigeria', 'catfish'),
      f('f122', `Salmon Fillet (500g)`, 15, 'Seafood', 'Meat', 'Fresh Atlantic salmon fillet', 4.9, 36, 25, 'pack', 'Norway', 'salmon'),
      f('f123', `Prawns (1kg)`, 18, 'Seafood', 'Meat', 'Large fresh prawns', 4.8, 28, 30, 'kg', 'Nigeria', 'prawns'),
      f('f124', `Snails (500g)`, 10, 'Seafood', 'Meat', 'Giant land snails, cleaned and ready', 4.7, 33, 25, 'kg', 'Nigeria', 'snails'),
      f('f125', `Beef Liver (1kg)`, 8, 'Beef', 'Meat', 'Fresh beef liver', 4.5, 24, 40, 'kg', 'Nigeria', 'beef-liver'),
      f('f126', `Shrimp (1kg)`, 16, 'Seafood', 'Meat', 'Peeled and deveined shrimp', 4.7, 31, 35, 'kg', 'Nigeria', 'shrimp'),

      // African Soups
      f('f127', `Egusi Soup (1L)`, 10, 'African Soups', 'Prepared Meals', 'Rich melon seed soup with leafy greens', 4.8, 67, 40, 'litre', 'Nigeria', 'egusi-soup'),
      f('f128', `Ogbono Soup (1L)`, 10, 'African Soups', 'Prepared Meals', 'Smooth draw soup made from ogbono seeds', 4.7, 54, 35, 'litre', 'Nigeria', 'ogbono-soup'),
      f('f129', `Afang Soup (1L)`, 12, 'African Soups', 'Prepared Meals', 'Traditional Afang soup with waterleaf and beef', 4.8, 48, 30, 'litre', 'Nigeria', 'afang-soup'),
      f('f130', `Nsala Soup (1L)`, 12, 'African Soups', 'Prepared Meals', 'Light yellow soup with catfish and utazi', 4.7, 41, 25, 'litre', 'Nigeria', 'nsala-soup'),
      f('f131', `Banga Soup (1L)`, 10, 'African Soups', 'Prepared Meals', 'Palm nut soup with fresh catfish', 4.8, 52, 30, 'litre', 'Nigeria', 'banga-soup'),
      f('f132', `Okro Soup (1L)`, 8, 'African Soups', 'Prepared Meals', 'Slimy okro soup with assorted meats', 4.6, 38, 45, 'litre', 'Nigeria', 'okro-soup'),
      f('f133', `Vegetable Soup (1L)`, 8, 'African Soups', 'Prepared Meals', 'Mixed vegetable soup with beef and fish', 4.6, 35, 50, 'litre', 'Nigeria', 'vegetable-soup'),

      // Jollof Rice & Rice Meals
      f('f134', `Jollof Rice with Chicken`, 12, 'Jollof Rice', 'Prepared Meals', 'Party Jollof rice served with fried chicken', 4.9, 156, 60, 'pack', 'Nigeria', 'jollof-rice'),
      f('f135', `Jollof Rice with Beef`, 12, 'Jollof Rice', 'Prepared Meals', 'Classic Jollof rice with grilled beef', 4.8, 112, 55, 'pack', 'Nigeria', 'jollof-rice'),
      f('f136', `Fried Rice with Chicken`, 10, 'Fried Rice', 'Prepared Meals', 'Nigerian fried rice with chicken', 4.7, 89, 50, 'pack', 'Nigeria', 'fried-rice'),

      // Dairy
      f('f137', `Fresh Cow Milk (10L)`, 20, 'Dairy', 'Dairy', 'Pure fresh cow milk', 4.8, 55, 30, 'litre', 'Kano State', 'milk'),
      f('f138', `Yogurt (1L)`, 8, 'Dairy', 'Dairy', 'Creamy natural yogurt', 4.7, 42, 50, 'litre', 'Nigeria', 'yogurt'),
      f('f139', `Cheddar Cheese (500g)`, 15, 'Dairy', 'Dairy', 'Aged cheddar cheese block', 4.8, 31, 25, 'pack', 'Netherlands', 'cheese'),
      f('f140', `Butter (500g)`, 10, 'Dairy', 'Dairy', 'Creamy unsalted butter', 4.7, 38, 40, 'pack', 'Nigeria', 'butter'),
      f('f141', `Vanilla Ice Cream (1L)`, 8, 'Dairy', 'Dairy', 'Rich vanilla ice cream', 4.6, 45, 60, 'litre', 'Nigeria', 'ice-cream'),

      // Honey
      f('f142', `Natural Honey (500ml)`, 15, 'Honey', 'Honey', 'Pure natural honey, unfiltered and unpasteurized', 4.9, 110, 80, 'jar', 'Plateau State', 'honey', true),
      f('f143', `Honeycomb (250g)`, 12, 'Honey', 'Honey', 'Pure honeycomb for chewing', 4.8, 45, 30, 'pack', 'Nigeria', 'honeycomb'),
      f('f144', `Manuka Honey (250g)`, 25, 'Honey', 'Honey', 'Premium Manuka honey from New Zealand', 4.9, 28, 15, 'jar', 'New Zealand', 'manuka-honey'),

      // Spices & Herbs
      f('f145', `Mixed Spice Pack`, 5, 'Spices', 'Spices', 'Essential spice pack for everyday cooking', 4.6, 88, 120, 'pack', 'Nigeria', 'spices'),
      f('f146', `Curry Powder (200g)`, 4, 'Spices', 'Spices', 'Aromatic curry powder blend', 4.5, 54, 100, 'pack', 'India', 'curry'),
      f('f147', `Dried Thyme (100g)`, 3, 'Spices', 'Spices', 'Dried thyme leaves for seasoning', 4.5, 37, 90, 'pack', 'Nigeria', 'thyme'),
      f('f148', `Fresh Ginger (500g)`, 5, 'Spices', 'Spices', 'Fresh ginger roots', 4.6, 44, 80, 'kg', 'Nigeria', 'ginger'),
      f('f149', `Fresh Garlic (500g)`, 6, 'Spices', 'Spices', 'Fresh garlic bulbs', 4.6, 52, 90, 'kg', 'Nigeria', 'garlic'),
      f('f150', `Seasoning Cubes (50 pack)`, 3, 'Spices', 'Spices', 'Popular seasoning cubes for flavor', 4.4, 92, 200, 'pack', 'Nigeria', 'seasoning'),
      f('f151', `Turmeric Powder (200g)`, 4, 'Spices', 'Spices', 'Pure ground turmeric', 4.6, 25, 70, 'pack', 'India', 'turmeric'),
      f('f152', `Cinnamon Sticks (100g)`, 5, 'Spices', 'Spices', 'Aromatic cinnamon bark sticks', 4.5, 22, 60, 'pack', 'Sri Lanka', 'cinnamon'),
      f('f153', `Nutmeg (whole 100g)`, 6, 'Spices', 'Spices', 'Whole nutmeg seeds for fresh grating', 4.6, 19, 40, 'pack', 'Nigeria', 'nutmeg'),

      // Snacks
      f('f154', `Assorted Cakes (1kg)`, 12, 'Cakes', 'Bakery', 'Mixed cake selection for parties', 4.7, 68, 30, 'kg', 'Nigeria', 'cake'),
      f('f155', `Doughnuts (6pcs)`, 6, 'Snacks', 'Snacks', 'Soft glazed doughnuts', 4.6, 55, 50, 'pack', 'Nigeria', 'doughnuts'),
      f('f156', `Meat Pie (per piece)`, 4, 'Snacks', 'Snacks', 'Savory Nigerian meat pie with beef filling', 4.7, 72, 80, 'piece', 'Nigeria', 'meat-pie'),
      f('f157', `Samosa (6pcs)`, 5, 'Snacks', 'Snacks', 'Crispy beef samosas', 4.6, 48, 60, 'pack', 'Nigeria', 'samosa'),
      f('f158', `Chin Chin (500g)`, 4, 'Snacks', 'Snacks', 'Crunchy fried chin chin snack', 4.5, 61, 100, 'pack', 'Nigeria', 'chin-chin'),

      // Frozen Foods
      f('f159', `Frozen Mixed Vegetables (2kg)`, 8, 'Frozen Foods', 'Frozen', 'Mixed vegetables, peas, carrots, corn, and green beans', 4.5, 43, 70, 'pack', 'Nigeria', 'frozen-vegetables'),
      f('f160', `Frozen Chicken Wings (2kg)`, 10, 'Frozen Foods', 'Frozen', 'Frozen chicken wings ready to cook', 4.6, 52, 50, 'pack', 'Brazil', 'frozen-chicken'),
      f('f161', `Frozen Fish (2kg)`, 12, 'Frozen Foods', 'Frozen', 'Frozen mackerel fish', 4.5, 38, 60, 'pack', 'Nigeria', 'frozen-fish'),
      f('f162', `Frozen Pizza (Margherita)`, 10, 'Frozen Foods', 'Frozen', 'Frozen margherita pizza ready to bake', 4.4, 29, 40, 'piece', 'Nigeria', 'frozen-pizza'),

      // Organic Foods
      f('f163', `Organic Vegetable Box`, 20, 'Organic Foods', 'Fresh Produce', 'Mixed organic vegetables weekly supply', 4.8, 33, 25, 'box', 'Nigeria', 'organic-vegetables', true),
      f('f164', `Organic Fruit Basket`, 25, 'Organic Foods', 'Fresh Produce', 'Premium organic fruit selection', 4.8, 28, 20, 'box', 'Nigeria', 'organic-fruits'),
      f('f165', `Organic Eggs (12pcs)`, 6, 'Organic Foods', 'Fresh Produce', 'Free-range organic eggs', 4.7, 44, 40, 'tray', 'Nigeria', 'organic-eggs'),
    ];
    return r;
  })(),

  // ═══════════════════════════════════════════
  // TOOLS CATEGORY
  // ═══════════════════════════════════════════
  ...(function(): Product[] {
    const f = (id: string, name: string, price: number, category: string, sub: string, desc: string, rating: number, reviews: number, stock: number, unit: string, origin: string, imgKw: string, featured = false): Product => ({
       id, name, price, mainCategory: 'tools', category, subcategory: sub,
       image: IMG(id, imgKw), description: desc, rating, reviews, stock, unit, origin, isFeatured: featured,
      searchTags: [category.toLowerCase(), sub.toLowerCase(), ...name.toLowerCase().split(' ')]
    });
    return [
      // Hand Tools
      f('t001', 'Stainless Cutlass', 15, 'Cutlass', 'Hand Tools', 'Sharp stainless steel cutlass for clearing farm land', 4.7, 88, 50, 'piece', 'Nigeria', 'cutlass', true),
      f('t002', 'Heavy Duty Hoe', 10, 'Hoe', 'Hand Tools', 'Sturdy hoe for weeding and tilling', 4.6, 72, 60, 'piece', 'Nigeria', 'hoe'),
      f('t003', 'Garden Fork', 12, 'Garden Fork', 'Hand Tools', 'Steel garden fork for soil aeration', 4.5, 34, 40, 'piece', 'Nigeria', 'garden-fork'),
      f('t004', 'Farm Rake', 8, 'Rake', 'Hand Tools', 'Wide farm rake for gathering leaves and leveling', 4.5, 28, 45, 'piece', 'Nigeria', 'rake'),
      f('t005', 'Woodcutting Axe', 20, 'Axe', 'Hand Tools', 'Sharp axe for cutting firewood and clearing', 4.7, 45, 35, 'piece', 'Nigeria', 'axe'),
      f('t006', 'Digging Shovel', 12, 'Shovel', 'Hand Tools', 'Heavy-duty shovel for digging and moving earth', 4.6, 38, 50, 'piece', 'Nigeria', 'shovel'),
      f('t007', 'Heavy Duty Wheelbarrow', 35, 'Wheelbarrow', 'Hand Tools', 'Iron wheelbarrow with pneumatic tyre', 4.7, 52, 25, 'piece', 'Nigeria', 'wheelbarrow', true),
      f('t008', 'Plastic Watering Can (10L)', 8, 'Watering Can', 'Hand Tools', 'Durable watering can with rose head', 4.4, 29, 70, 'piece', 'Nigeria', 'watering-can'),
      f('t009', 'Knapsack Sprayer (16L)', 25, 'Sprayer', 'Hand Tools', 'Manual knapsack sprayer for pesticide application', 4.6, 43, 35, 'piece', 'Nigeria', 'sprayer'),
      f('t010', 'Garden Pruning Shears', 8, 'Pruning Shears', 'Hand Tools', 'Sharp pruning shears for trimming branches', 4.5, 26, 45, 'piece', 'Nigeria', 'pruning-shears'),
      f('t011', 'Mattock Pickaxe', 18, 'Mattock', 'Hand Tools', 'Combined pickaxe and mattock for tough ground', 4.6, 31, 30, 'piece', 'Nigeria', 'pickaxe'),
      f('t012', 'Scythe Grass Cutter', 22, 'Scythe', 'Hand Tools', 'Curved scythe for cutting tall grass', 4.4, 18, 20, 'piece', 'Nigeria', 'scythe'),
      f('t013', 'Hand Trowel Set (3pcs)', 6, 'Trowel', 'Hand Tools', 'Garden trowel set for planting and potting', 4.5, 33, 80, 'set', 'China', 'trowel'),
      f('t014', 'Farm Gloves (pair)', 5, 'Gloves', 'Hand Tools', 'Thick protective farm work gloves', 4.4, 42, 100, 'pair', 'Nigeria', 'gloves'),

      // Machinery
      f('t015', 'Farm Tractor (New Model)', 500, 'Tractor', 'Machinery', 'Brand new farm tractor with plough attachment', 4.8, 12, 5, 'piece', 'Nigeria', 'tractor', true),
      f('t016', 'Mini Bulldozer', 1500, 'Bulldozer', 'Machinery', 'Compact bulldozer for land clearing', 4.6, 8, 3, 'piece', 'Japan', 'bulldozer'),
      f('t017', 'Combine Harvester', 800, 'Harvester', 'Machinery', 'Combine harvester for wheat maize and rice', 4.7, 6, 4, 'piece', 'Germany', 'harvester'),
      f('t018', 'Disc Plough Machine', 400, 'Plough Machine', 'Machinery', 'Heavy disc plough for deep tilling', 4.6, 14, 8, 'piece', 'Nigeria', 'plough'),
      f('t019', 'Automatic Seed Planter', 150, 'Seed Planter', 'Machinery', 'Multi-row seed planter for efficient planting', 4.7, 22, 12, 'piece', 'China', 'seed-planter'),
      f('t020', 'Irrigation Sprinkler System', 300, 'Irrigation Machine', 'Machinery', 'Complete sprinkler irrigation system for 1 acre', 4.7, 28, 10, 'set', 'Nigeria', 'irrigation'),
      f('t021', 'Mini Excavator', 1200, 'Excavator', 'Machinery', 'Mini excavator for digging and trenching', 4.6, 10, 4, 'piece', 'Japan', 'excavator'),
      f('t022', 'Industrial Chainsaw', 100, 'Chainsaw', 'Machinery', 'Powerful chainsaw for felling trees and cutting logs', 4.7, 35, 20, 'piece', 'Germany', 'chainsaw', true),
      f('t023', 'Electric Grinding Machine', 80, 'Grinding Machine', 'Processing', 'Heavy-duty electric grinding machine for grains', 4.6, 42, 18, 'piece', 'Nigeria', 'grinding-machine'),
      f('t024', 'Rice Milling Machine', 250, 'Rice Milling Machine', 'Processing', 'Complete rice mill with destoner and polisher', 4.7, 15, 8, 'piece', 'Nigeria', 'rice-mill'),
      f('t025', 'Palm Oil Processing Machine', 350, 'Palm Processing Machine', 'Processing', 'Full palm oil extraction machine set', 4.6, 11, 6, 'piece', 'Nigeria', 'palm-oil-machine'),
      f('t026', 'Cassava Processing Machine', 200, 'Processing Machine', 'Processing', 'Cassava grater and press for garri production', 4.6, 18, 10, 'piece', 'Nigeria', 'cassava-machine'),
      f('t027', 'Packaging Sealing Machine', 200, 'Packaging Machine', 'Processing', 'Automatic bag sealer and packaging machine', 4.5, 25, 15, 'piece', 'China', 'packaging-machine'),

      // Modern Equipment
      f('t028', 'Greenhouse Complete Kit', 500, 'Greenhouse', 'Modern Equipment', 'Complete greenhouse structure with UV cover', 4.7, 20, 10, 'set', 'Nigeria', 'greenhouse'),
      f('t029', 'Agriculture Drone', 600, 'Drone', 'Modern Equipment', 'Farm drone for crop monitoring and spraying', 4.8, 14, 8, 'piece', 'China', 'drone'),
      f('t030', 'GPS Farm Navigation Device', 150, 'GPS', 'Modern Equipment', 'GPS guidance system for precision farming', 4.5, 16, 15, 'piece', 'USA', 'gps'),
      f('t031', 'Soil Testing Kit', 35, 'Soil Tester', 'Modern Equipment', 'Digital soil pH moisture and nutrient tester', 4.6, 28, 25, 'set', 'USA', 'soil-tester'),
      f('t032', 'Electric Fence Energizer', 80, 'Electric Fence', 'Modern Equipment', 'Solar-powered electric fence for livestock', 4.5, 22, 20, 'piece', 'Nigeria', 'electric-fence'),
      f('t033', 'Incubation Machine (200 eggs)', 120, 'Incubator', 'Modern Equipment', 'Automatic egg incubator with digital control', 4.7, 31, 15, 'piece', 'Nigeria', 'incubator'),
      f('t034', 'Water Pump (2HP)', 85, 'Water Pump', 'Modern Equipment', 'Submersible water pump for irrigation and borehole', 4.6, 38, 25, 'piece', 'Nigeria', 'water-pump'),
      f('t035', 'Feed Pellet Machine', 180, 'Feed Machine', 'Processing', 'Animal feed pellet making machine', 4.6, 24, 12, 'piece', 'Nigeria', 'pellet-machine'),
      f('t036', 'Drip Irrigation Kit (1 acre)', 250, 'Irrigation', 'Modern Equipment', 'Complete drip irrigation system with drip lines', 4.7, 33, 15, 'set', 'Nigeria', 'drip-irrigation'),
      f('t037', 'Cold Storage Room Unit', 1000, 'Cold Storage', 'Modern Equipment', 'Cold room for produce storage up to 10 tons', 4.6, 7, 3, 'set', 'Nigeria', 'cold-storage'),
      f('t038', 'Weighing Scale (100kg)', 40, 'Weighing Scale', 'Modern Equipment', 'Digital platform weighing scale', 4.5, 29, 30, 'piece', 'Nigeria', 'weighing-scale'),
    ];
  })(),

  // ═══════════════════════════════════════════
  // ANIMALS / PETS / FOWL CATEGORY
  // ═══════════════════════════════════════════
  ...(function(): Product[] {
    const f = (id: string, name: string, price: number, category: string, sub: string, desc: string, rating: number, reviews: number, stock: number, unit: string, origin: string, imgKw: string, featured = false): Product => ({
       id, name, price, mainCategory: 'animals', category, subcategory: sub,
       image: IMG(id, imgKw), description: desc, rating, reviews, stock, unit, origin, isFeatured: featured,
      searchTags: [category.toLowerCase(), sub.toLowerCase(), ...name.toLowerCase().split(' ')]
    });
    return [
      // 🐕 DOGS
      f('a001', 'German Shepherd Puppy', 200, 'Dogs', 'Dog Breeds', 'Intelligent German Shepherd puppy, trained and vaccinated', 4.8, 45, 8, 'puppy', 'Nigeria', 'german-shepherd-puppy', true),
      f('a002', 'Rottweiler Puppy', 250, 'Dogs', 'Dog Breeds', 'Strong Rottweiler puppy with pedigree papers', 4.7, 32, 6, 'puppy', 'Nigeria', 'rottweiler-puppy'),
      f('a003', 'Pitbull Puppy', 180, 'Dogs', 'Dog Breeds', 'Healthy American Pitbull Terrier puppy', 4.6, 28, 5, 'puppy', 'Nigeria', 'pitbull-puppy'),
      f('a004', 'Siberian Husky Puppy', 350, 'Dogs', 'Dog Breeds', 'Beautiful Husky puppy with blue eyes', 4.9, 38, 4, 'puppy', 'Nigeria', 'husky-puppy', true),
      f('a005', 'English Bulldog Puppy', 300, 'Dogs', 'Dog Breeds', 'Adorable English Bulldog puppy', 4.8, 22, 3, 'puppy', 'Nigeria', 'bulldog-puppy'),
      f('a006', 'Chihuahua Puppy', 150, 'Dogs', 'Dog Breeds', 'Tiny Chihuahua puppy perfect for apartments', 4.6, 25, 7, 'puppy', 'Nigeria', 'chihuahua-puppy'),
      f('a007', 'Labrador Retriever Puppy', 220, 'Dogs', 'Dog Breeds', 'Friendly Labrador puppy great with kids', 4.8, 41, 6, 'puppy', 'Nigeria', 'labrador-puppy'),
      f('a008', 'Golden Retriever Puppy', 280, 'Dogs', 'Dog Breeds', 'Gentle Golden Retriever puppy', 4.9, 36, 5, 'puppy', 'Nigeria', 'golden-retriever-puppy'),
      f('a009', 'Caucasian Shepherd Puppy', 400, 'Dogs', 'Dog Breeds', 'Massive Caucasian Shepherd guard dog puppy', 4.7, 18, 3, 'puppy', 'Nigeria', 'caucasian-shepherd'),
      f('a010', 'Boerboel Puppy', 350, 'Dogs', 'Dog Breeds', 'South African Boerboel puppy, excellent guard dog', 4.7, 20, 4, 'puppy', 'Nigeria', 'boerboel-puppy'),
      f('a011', 'Poodle Puppy (Toy)', 250, 'Dogs', 'Dog Breeds', 'Smart Toy Poodle puppy, hypoallergenic', 4.8, 29, 5, 'puppy', 'Nigeria', 'poodle-puppy'),
      f('a012', 'Doberman Pinscher Puppy', 300, 'Dogs', 'Dog Breeds', 'Alert Doberman puppy, excellent protection dog', 4.7, 24, 4, 'puppy', 'Nigeria', 'doberman-puppy'),
      f('a013', 'American Eskimo Puppy', 200, 'Dogs', 'Dog Breeds', 'Fluffy white American Eskimo puppy', 4.6, 16, 5, 'puppy', 'Nigeria', 'american-eskimo'),
      f('a014', 'Japanese Spitz Puppy', 220, 'Dogs', 'Dog Breeds', 'White Japanese Spitz puppy, friendly and alert', 4.7, 19, 4, 'puppy', 'Nigeria', 'japanese-spitz'),
      f('a015', 'Alsatian Puppy', 250, 'Dogs', 'Dog Breeds', 'German Alsatian puppy, intelligent and loyal', 4.7, 31, 6, 'puppy', 'Nigeria', 'alsatian-puppy'),
      f('a016', 'Belgian Malinois Puppy', 300, 'Dogs', 'Dog Breeds', 'High-energy Belgian Malinois working dog puppy', 4.8, 22, 4, 'puppy', 'Nigeria', 'belgian-malinois'),
      f('a017', 'Great Dane Puppy', 350, 'Dogs', 'Dog Breeds', 'Gentle giant Great Dane puppy', 4.7, 15, 3, 'puppy', 'Nigeria', 'great-dane-puppy'),
      f('a018', 'Pomeranian Puppy', 180, 'Dogs', 'Dog Breeds', 'Tiny fluffy Pomeranian puppy', 4.7, 26, 6, 'puppy', 'Nigeria', 'pomeranian-puppy'),
      f('a019', 'Cocker Spaniel Puppy', 200, 'Dogs', 'Dog Breeds', 'Sweet Cocker Spaniel puppy with silky ears', 4.7, 18, 4, 'puppy', 'Nigeria', 'cocker-spaniel'),
      f('a020', 'Dalmatian Puppy', 260, 'Dogs', 'Dog Breeds', 'Spotted Dalmatian puppy, energetic and playful', 4.6, 14, 3, 'puppy', 'Nigeria', 'dalmatian-puppy'),
      f('a021', 'Boxer Puppy', 230, 'Dogs', 'Dog Breeds', 'Playful Boxer puppy, great family dog', 4.7, 20, 5, 'puppy', 'Nigeria', 'boxer-puppy'),
      f('a022', 'Maltese Puppy', 210, 'Dogs', 'Dog Breeds', 'White Maltese puppy, perfect lap dog', 4.7, 17, 5, 'puppy', 'Nigeria', 'maltese-puppy'),
      f('a023', 'Shih Tzu Puppy', 190, 'Dogs', 'Dog Breeds', 'Cute Shih Tzu puppy with long flowing coat', 4.6, 21, 6, 'puppy', 'Nigeria', 'shih-tzu'),
      f('a024', 'Bullmastiff Puppy', 380, 'Dogs', 'Dog Breeds', 'Powerful Bullmastiff puppy, excellent guardian', 4.7, 12, 3, 'puppy', 'Nigeria', 'bullmastiff-puppy'),
      f('a025', 'Bichon Frise Puppy', 240, 'Dogs', 'Dog Breeds', 'Fluffy Bichon Frise puppy, hypoallergenic', 4.7, 16, 4, 'puppy', 'Nigeria', 'bichon-frise'),

      // 🐱 CATS
      f('a026', 'Persian Cat (Kitten)', 150, 'Cats', 'Cat Breeds', 'Fluffy Persian kitten with flat face and sweet temperament', 4.8, 28, 6, 'kitten', 'Nigeria', 'persian-cat'),
      f('a027', 'Siamese Cat (Kitten)', 200, 'Cats', 'Cat Breeds', 'Elegant Siamese kitten with striking blue eyes', 4.7, 22, 5, 'kitten', 'Nigeria', 'siamese-cat'),
      f('a028', 'Maine Coon Kitten', 350, 'Cats', 'Cat Breeds', 'Large Maine Coon kitten, gentle giant breed', 4.8, 16, 3, 'kitten', 'Nigeria', 'maine-coon'),
      f('a029', 'Bengal Cat (Kitten)', 400, 'Cats', 'Cat Breeds', 'Exotic Bengal kitten with leopard-like spots', 4.8, 14, 2, 'kitten', 'Nigeria', 'bengal-cat'),
      f('a030', 'British Shorthair Kitten', 250, 'Cats', 'Cat Breeds', 'Plush British Shorthair kitten with round face', 4.7, 18, 4, 'kitten', 'Nigeria', 'british-shorthair'),
      f('a031', 'Sphynx Cat (Kitten)', 500, 'Cats', 'Cat Breeds', 'Hairless Sphynx kitten, affectionate and warm', 4.6, 10, 2, 'kitten', 'Nigeria', 'sphynx-cat'),
      f('a032', 'Ragdoll Cat (Kitten)', 300, 'Cats', 'Cat Breeds', 'Floppy Ragdoll kitten, goes limp when held', 4.8, 15, 3, 'kitten', 'Nigeria', 'ragdoll-cat'),
      f('a033', 'Scottish Fold Kitten', 280, 'Cats', 'Cat Breeds', 'Cute Scottish Fold with folded ears and owl-like face', 4.7, 13, 3, 'kitten', 'Nigeria', 'scottish-fold'),
      f('a034', 'Abyssinian Cat (Kitten)', 220, 'Cats', 'Cat Breeds', 'Active Abyssinian kitten with ticked coat', 4.6, 11, 4, 'kitten', 'Nigeria', 'abyssinian-cat'),

      // 🐟 FISH (Pet)
      f('a035', 'Koi Fish (Pair)', 50, 'Fish', 'Pet Fish', 'Beautiful Japanese Koi fish for ornamental ponds', 4.8, 24, 20, 'pair', 'Nigeria', 'koi-fish'),
      f('a036', 'Goldfish (Pair)', 15, 'Fish', 'Pet Fish', 'Ornamental goldfish for aquariums and ponds', 4.6, 35, 50, 'pair', 'Nigeria', 'goldfish'),
      f('a037', 'Tropical Fish Assortment (10)', 20, 'Fish', 'Pet Fish', 'Mixed tropical fish including tetras and guppies', 4.5, 22, 30, 'pack', 'Nigeria', 'tropical-fish'),
      f('a038', 'Asian Arowana', 200, 'Fish', 'Pet Fish', 'Dragon fish Arowana, symbol of luck and prosperity', 4.7, 8, 5, 'piece', 'Nigeria', 'arowana'),
      f('a039', 'Guppy Fish (10pcs)', 10, 'Fish', 'Pet Fish', 'Colorful guppy fish, easy to breed', 4.5, 28, 60, 'pack', 'Nigeria', 'guppy'),
      f('a040', 'Molly Fish (5pcs)', 12, 'Fish', 'Pet Fish', 'Peaceful molly fish for community tanks', 4.5, 18, 40, 'pack', 'Nigeria', 'molly-fish'),
      f('a041', 'Angelfish (Pair)', 25, 'Fish', 'Pet Fish', 'Elegant freshwater angelfish', 4.6, 15, 20, 'pair', 'Nigeria', 'angelfish'),
      f('a042', 'Discus Fish (Pair)', 80, 'Fish', 'Pet Fish', 'Premium discus fish, king of the aquarium', 4.7, 10, 8, 'pair', 'Brazil', 'discus-fish'),
      f('a043', 'Cichlid Assortment (6)', 18, 'Fish', 'Pet Fish', 'Colorful African cichlids from Lake Malawi', 4.5, 16, 25, 'pack', 'Nigeria', 'cichlid'),
      f('a044', 'Betta Fish (Male)', 12, 'Fish', 'Pet Fish', 'Beautiful male Betta fish with flowing fins', 4.7, 32, 30, 'piece', 'Nigeria', 'betta-fish'),

      // 🐦 FOWL / BIRDS
      f('a045', 'Broiler Chickens (10 pcs)', 80, 'Fowl', 'Poultry', 'Day-old broiler chicks, fully vaccinated', 4.7, 42, 50, 'pack', 'Nigeria', 'broiler-chicks', true),
      f('a046', 'Laying Hens (5 pcs)', 50, 'Fowl', 'Poultry', 'Mature laying hens, ready to lay', 4.6, 33, 30, 'pack', 'Nigeria', 'laying-hens'),
      f('a047', 'Turkey Poults (2 pcs)', 35, 'Fowl', 'Poultry', 'Young turkeys for rearing', 4.6, 18, 15, 'pair', 'Nigeria', 'turkey-poults'),
      f('a048', 'Muscovy Duck (Pair)', 20, 'Fowl', 'Poultry', 'Adult Muscovy ducks for breeding or meat', 4.5, 22, 20, 'pair', 'Nigeria', 'duck'),
      f('a049', 'African Goose (Pair)', 30, 'Fowl', 'Poultry', 'Large African geese, excellent watch animals', 4.6, 14, 10, 'pair', 'Nigeria', 'goose'),
      f('a050', 'Pigeon Pair (Homing)', 15, 'Fowl', 'Poultry', 'Trained homing pigeons', 4.5, 20, 25, 'pair', 'Nigeria', 'pigeon'),
      f('a051', 'African Grey Parrot', 100, 'Fowl', 'Birds', 'Talking African Grey Parrot, highly intelligent', 4.8, 12, 5, 'piece', 'Nigeria', 'african-grey-parrot'),
      f('a052', 'Peacock (Pair)', 200, 'Fowl', 'Birds', 'Beautiful peacock and peahen pair', 4.8, 8, 4, 'pair', 'India', 'peacock'),
      f('a053', 'Quail (10 pcs)', 15, 'Fowl', 'Poultry', 'Japanese quails for eggs and meat', 4.5, 28, 40, 'pack', 'Nigeria', 'quail'),
      f('a054', 'Guinea Fowl (Pair)', 15, 'Fowl', 'Poultry', 'Helmeted guinea fowl for pest control and meat', 4.5, 16, 20, 'pair', 'Nigeria', 'guinea-fowl'),
      f('a055', 'Ostrich Chick', 500, 'Fowl', 'Birds', 'Young ostrich for farming', 4.6, 5, 3, 'chick', 'South Africa', 'ostrich'),
      f('a056', 'Lovebirds (Pair)', 20, 'Fowl', 'Birds', 'Colorful lovebirds, perfect pet birds', 4.6, 24, 30, 'pair', 'Nigeria', 'lovebirds'),
      f('a057', 'Canary (Male)', 18, 'Fowl', 'Birds', 'Singing male canary with beautiful voice', 4.5, 19, 20, 'piece', 'Nigeria', 'canary'),
      f('a058', 'Cockatiel (Pair)', 35, 'Fowl', 'Birds', 'Friendly cockatiels with crest', 4.6, 15, 15, 'pair', 'Nigeria', 'cockatiel'),
      f('a059', 'Macaw Parrot', 800, 'Fowl', 'Birds', 'Large colorful Macaw, hand-tamed', 4.7, 4, 2, 'piece', 'South America', 'macaw'),

      // 🐄 LIVESTOCK
      f('a060', 'Mature Cow (White Fulani)', 300, 'Livestock', 'Cattle', 'Healthy white Fulani cow for milk or breeding', 4.7, 28, 10, 'head', 'Nigeria', 'cow', true),
      f('a061', 'Male Calf (6 months)', 180, 'Livestock', 'Cattle', 'Young bull calf for rearing', 4.6, 22, 15, 'head', 'Nigeria', 'calf'),
      f('a062', 'Lactating Cow', 350, 'Livestock', 'Cattle', 'Mature cow currently producing milk', 4.7, 16, 8, 'head', 'Nigeria', 'dairy-cow'),
      f('a063', 'Red Sokoto Goat (Female)', 80, 'Livestock', 'Goats', 'Red Sokoto goat excellent for breeding', 4.6, 35, 25, 'head', 'Nigeria', 'goat'),
      f('a064', 'Sokoto Red Buck (Male)', 100, 'Livestock', 'Goats', 'Mature Sokoto red buck for breeding', 4.6, 18, 10, 'head', 'Nigeria', 'goat'),
      f('a065', 'West African Dwarf Goat', 70, 'Livestock', 'Goats', 'WAD goat, hardy and disease resistant', 4.6, 24, 20, 'head', 'Nigeria', 'dwarf-goat'),
      f('a066', 'Balami Ram (Mature)', 150, 'Livestock', 'Sheep', 'Large Balami ram for breeding or meat', 4.7, 20, 12, 'head', 'Nigeria', 'ram'),
      f('a067', 'Uda Ram', 180, 'Livestock', 'Sheep', 'Premium Uda ram with distinctive markings', 4.6, 14, 8, 'head', 'Nigeria', 'sheep'),
      f('a068', 'Yankasa Sheep (Ewe)', 120, 'Livestock', 'Sheep', 'Yankasa ewe for breeding flock', 4.5, 16, 15, 'head', 'Nigeria', 'sheep'),
      f('a069', 'Large White Pig (Weaner)', 100, 'Livestock', 'Pigs', 'Large White piglet ready for fattening', 4.6, 22, 18, 'head', 'Nigeria', 'pig'),
      f('a070', 'Duroc Boar (Mature)', 250, 'Livestock', 'Pigs', 'Pure Duroc boar for breeding', 4.6, 10, 5, 'head', 'Nigeria', 'pig'),
      f('a071', 'Local Pigs (Weaner Pair)', 120, 'Livestock', 'Pigs', 'Pair of local breed weaner pigs', 4.5, 18, 12, 'pair', 'Nigeria', 'pig'),
      f('a072', 'Horse (Nigerian Pony)', 2000, 'Livestock', 'Horses', 'Well-trained Nigerian pony horse', 4.7, 6, 3, 'head', 'Nigeria', 'horse'),
      f('a073', 'Donkey (Mature)', 500, 'Livestock', 'Horses', 'Strong working donkey for transport', 4.6, 12, 6, 'head', 'Nigeria', 'donkey'),
      f('a074', 'Camel (Dromedary)', 1500, 'Livestock', 'Camels', 'Healthy dromedary camel for transport and milk', 4.7, 4, 2, 'head', 'Nigeria', 'camel'),
      f('a075', 'Rabbit (Breeding Trio)', 25, 'Livestock', 'Rabbits', 'One male and two female rabbits for breeding', 4.6, 38, 30, 'trio', 'Nigeria', 'rabbit'),
      f('a076', 'New Zealand White Rabbits (Pair)', 20, 'Livestock', 'Rabbits', 'Pure New Zealand White rabbits for meat', 4.5, 25, 25, 'pair', 'Nigeria', 'white-rabbit'),
      f('a077', 'Grasscutter (Pair)', 40, 'Livestock', 'Grasscutters', 'Cane rats for meat farming', 4.5, 12, 15, 'pair', 'Nigeria', 'grasscutter'),
      f('a078', 'Snail Breeding Stock (10)', 35, 'Livestock', 'Snails', 'Giant African land snails for snail farming', 4.6, 18, 20, 'pack', 'Nigeria', 'snail-farming'),
    ];
  })(),
];

export const mainCategories = [
  { id: 'food', name: 'FOOD', icon: '🌾', description: 'Grains, fresh produce, prepared meals, spices, and global foods', color: 'from-green-600 to-emerald-800' },
  { id: 'tools', name: 'TOOLS', icon: '🔧', description: 'Farm tools, machinery, processing equipment, and modern farming tech', color: 'from-amber-600 to-orange-800' },
  { id: 'animals', name: 'ANIMALS / PETS / FOWL', icon: '🐾', description: 'Dogs, cats, fish, poultry, livestock, and exotic pets', color: 'from-purple-600 to-pink-800' },
] as const;

export function getProductsByMainCategory(mainCat: string): Product[] {
  return allProducts.filter(p => p.mainCategory === mainCat);
}

export function getProductsByCategory(mainCat: string, cat: string): Product[] {
  return allProducts.filter(p => p.mainCategory === mainCat && p.category.toLowerCase() === cat.toLowerCase());
}

export function getFeaturedProducts(): Product[] {
  return allProducts.filter(p => p.isFeatured);
}

export function getProductById(id: string): Product | undefined {
  return allProducts.find(p => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, limit);
}

export function getAllSubcategories(mainCat: string): string[] {
  return [...new Set(allProducts.filter(p => p.mainCategory === mainCat).map(p => p.category))];
}

export function getAllCategories(): string[] {
  return [...new Set(allProducts.map(p => p.category))];
}

export function getAllSearchableTexts(): string[] {
  const set = new Set<string>();
  for (const p of allProducts) {
    set.add(p.name);
    set.add(p.category);
    set.add(p.subcategory);
    for (const tag of p.searchTags) set.add(tag);
  }
  return [...set].sort();
}
