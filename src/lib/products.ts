import { getImageUrl, getGallery } from './images';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  description: string;
  unit: string;
  gallery: string[];
  origin?: string;
  reviews?: number;
  stock?: number;
}

const CATS = {
  rice: 'Rice',
  beans: 'Beans',
  maize: 'Maize / Corn',
  yam: 'Yam',
  cassava: 'Cassava',
  vegetables: 'Vegetables',
  fruits: 'Fruits',
  livestock: 'Livestock',
  poultry: 'Poultry',
  fishery: 'Fishery',
  dairy: 'Dairy',
  honey: 'Honey',
  seeds: 'Seeds',
  tools: 'Farm Tools',
  fertilizers: 'Fertilizers',
  pets: 'Pets',
  oils: 'Oils & Spices',
};

function p(
  id: string, name: string, price: number, cat: string, unit: string,
  rating?: number, origin?: string
): Product {
  return {
    id, name, price,
    image: getImageUrl(cat),
    category: cat,
    rating: rating ?? (4 + Math.random()),
    description: `Fresh ${name.toLowerCase()} sourced directly from farms. Premium quality, best for your kitchen.`,
    unit,
    gallery: getGallery(cat, 5),
    origin: origin ?? 'Nigeria',
  };
}

const allProducts: Product[] = [

  // ===== RICE (12) =====
  p('r1', 'Premium Long Grain Rice (50kg)', 28, 'rice', '50kg bag', 5, 'Niger State'),
  p('r2', 'Basmathi Rice (10kg)', 12, 'rice', '10kg bag', 5, 'India'),
  p('r3', 'Brown Rice (5kg)', 8, 'rice', '5kg bag', 4, 'Benue State'),
  p('r4', 'Ofada Rice (5kg)', 10, 'rice', '5kg bag', 5, 'Ogun State'),
  p('r5', 'Jollof Rice Pre-Pack (2kg)', 5, 'rice', '2kg pack', 4),
  p('r6', 'Coconut Rice Mix (1kg)', 4, 'rice', '1kg pack', 4),
  p('r7', 'Abakaliki Rice (25kg)', 15, 'rice', '25kg bag', 4, 'Ebonyi State'),
  p('r8', 'Thai Jasmine Rice (5kg)', 9, 'rice', '5kg bag', 5, 'Thailand'),
  p('r9', 'Arborio Rice (1kg)', 4, 'rice', '1kg pack', 4, 'Italy'),
  p('r10', 'Wild Rice Mix (500g)', 6, 'rice', '500g pack', 4),
  p('r11', 'Rice Flour (2kg)', 4, 'rice', '2kg pack', 4),
  p('r12', 'Parboiled Rice (25kg)', 14, 'rice', '25kg bag', 4),

  // ===== BEANS (12) =====
  p('b1', 'Black Eyed Beans (2kg)', 5, 'beans', '2kg bag', 5),
  p('b2', 'Red Kidney Beans (2kg)', 5, 'beans', '2kg bag', 4),
  p('b3', 'Honey Beans — Ewa Oloyin (2kg)', 6, 'beans', '2kg bag', 5, 'Oyo State'),
  p('b4', 'Brown Beans (2kg)', 4, 'beans', '2kg bag', 4),
  p('b5', 'Chickpeas — Garbanzo (1kg)', 4, 'beans', '1kg pack', 4),
  p('b6', 'Green Lentils (1kg)', 4, 'beans', '1kg pack', 4),
  p('b7', 'Red Lentils (1kg)', 4, 'beans', '1kg pack', 4),
  p('b8', 'Butter Beans (1kg)', 5, 'beans', '1kg pack', 4),
  p('b9', 'Black Beans (1kg)', 4, 'beans', '1kg pack', 4),
  p('b10', 'Pinto Beans (1kg)', 4, 'beans', '1kg pack', 4),
  p('b11', 'Soybeans (2kg)', 4, 'beans', '2kg bag', 4),
  p('b12', 'Mixed Legumes Pack (2kg)', 6, 'beans', '2kg pack', 4),

  // ===== MAIZE / CORN (10) =====
  p('m1', 'Yellow Maize (50kg)', 18, 'maize', '50kg bag', 4, 'Kaduna State'),
  p('m2', 'White Maize (50kg)', 18, 'maize', '50kg bag', 4, 'Kaduna State'),
  p('m3', 'Sweet Corn on Cob (10pcs)', 6, 'maize', '10 pieces', 5),
  p('m4', 'Corn Flour — Elubo (2kg)', 4, 'maize', '2kg pack', 4),
  p('m5', 'Popcorn Kernels (1kg)', 4, 'maize', '1kg pack', 4),
  p('m6', 'Cornmeal — Pap / Ogi (2kg)', 4, 'maize', '2kg pack', 4),
  p('m7', 'Baby Corn (500g)', 4, 'maize', '500g pack', 4),
  p('m8', 'Roasted Corn (1kg)', 5, 'maize', '1kg pack', 4),
  p('m9', 'Cornflakes (500g)', 4, 'maize', '500g box', 4),
  p('m10', 'Corn Starch (500g)', 3, 'maize', '500g pack', 4),

  // ===== YAM (10) =====
  p('y1', 'White Yam Tuber (per piece)', 8, 'yam', 'per tuber (≈3kg)', 5, 'Benue State'),
  p('y2', 'Yellow Yam (per piece)', 9, 'yam', 'per tuber', 4, 'Benue State'),
  p('y3', 'Water Yam (per piece)', 6, 'yam', 'per tuber', 4),
  p('y4', 'Pounded Yam Flour — Elubo (2kg)', 7, 'yam', '2kg pack', 5),
  p('y5', 'Yam Chips — Isi Ewu (500g)', 5, 'yam', '500g pack', 4),
  p('y6', 'Roasted Yam Slice (per piece)', 3, 'yam', 'per slice', 4),
  p('y7', 'Yam Flour — Amala (2kg)', 6, 'yam', '2kg pack', 4),
  p('y8', 'Sweet Potato (per kg)', 3, 'yam', 'per kg', 4),
  p('y9', 'Purple Yam — Ube (per kg)', 5, 'yam', 'per kg', 4),
  p('y10', 'Yam Porridge Pack (1kg)', 4, 'yam', '1kg pack', 4),

  // ===== CASSAVA (10) =====
  p('c1', 'Fresh Cassava Roots (5kg)', 6, 'cassava', '5kg bag', 4),
  p('c2', 'Garri — Ijebu (2kg)', 4, 'cassava', '2kg bag', 5, 'Ogun State'),
  p('c3', 'Garri — Southern (2kg)', 4, 'cassava', '2kg bag', 4),
  p('c4', 'Fufu Flour — Akpu (2kg)', 5, 'cassava', '2kg pack', 4),
  p('c5', 'Cassava Flour — Lafun (2kg)', 4, 'cassava', '2kg pack', 4),
  p('c6', 'Tapioca Pearls (1kg)', 4, 'cassava', '1kg pack', 4),
  p('c7', 'Cassava Chips (500g)', 3, 'cassava', '500g pack', 4),
  p('c8', 'Abacha — African Salad (500g)', 5, 'cassava', '500g pack', 4),
  p('c9', 'Kpokpo Garri (1kg)', 3, 'cassava', '1kg bag', 4),
  p('c10', 'Cassava Leaves (500g)', 3, 'cassava', '500g bunch', 4),

  // ===== VEGETABLES (30) =====
  p('v1', 'Fresh Tomatoes (5kg box)', 8, 'vegetables', '5kg box', 5, 'Kaduna State'),
  p('v2', 'Plum Tomatoes (2kg)', 4, 'vegetables', '2kg pack', 4),
  p('v3', 'Red Onions (2kg)', 3, 'vegetables', '2kg bag', 4),
  p('v4', 'White Onions (2kg)', 3, 'vegetables', '2kg bag', 4),
  p('v5', 'Red Bell Pepper — Tatashe (1kg)', 5, 'vegetables', '1kg bag', 5),
  p('v6', 'Green Bell Pepper (1kg)', 4, 'vegetables', '1kg bag', 4),
  p('v7', 'Scotch Bonnet — Atarodo (500g)', 5, 'vegetables', '500g pack', 5),
  p('v8', 'Fresh Carrots (3kg)', 5, 'vegetables', '3kg bag', 4),
  p('v9', 'Green Cabbage (per head)', 3, 'vegetables', 'per head', 4),
  p('v10', 'Spinach — Efo Tete (1kg)', 4, 'vegetables', '1kg bunch', 4),
  p('v11', 'Bitter Leaf — Ewuro (500g)', 4, 'vegetables', '500g pack', 4),
  p('v12', 'Uziza Leaves (500g)', 5, 'vegetables', '500g pack', 4),
  p('v13', 'Pumpkin Leaves — Ugu (1kg)', 4, 'vegetables', '1kg bunch', 4),
  p('v14', 'Fresh Okra (1kg)', 4, 'vegetables', '1kg bag', 4),
  p('v15', 'Cucumber (per piece)', 2, 'vegetables', 'per piece', 4),
  p('v16', 'Lettuce — Iceberg (per head)', 3, 'vegetables', 'per head', 4),
  p('v17', 'Green Beans (1kg)', 4, 'vegetables', '1kg pack', 4),
  p('v18', 'Broccoli (per head)', 4, 'vegetables', 'per head', 4),
  p('v19', 'Cauliflower (per head)', 4, 'vegetables', 'per head', 4),
  p('v20', 'Eggplant — Garden Egg (1kg)', 3, 'vegetables', '1kg bag', 4),
  p('v21', 'Zucchini (1kg)', 4, 'vegetables', '1kg pack', 4),
  p('v22', 'Fresh Ginger (500g)', 3, 'vegetables', '500g pack', 4),
  p('v23', 'Garlic (500g)', 4, 'vegetables', '500g pack', 4),
  p('v24', 'Spring Onions (bunch)', 2, 'vegetables', 'per bunch', 4),
  p('v25', 'Sweet Corn (per piece)', 2, 'vegetables', 'per piece', 4),
  p('v26', 'Mushrooms (500g)', 5, 'vegetables', '500g pack', 4),
  p('v27', 'Fresh Turmeric (500g)', 4, 'vegetables', '500g pack', 4),
  p('v28', 'Waterleaf — Gbure (1kg)', 3, 'vegetables', '1kg bunch', 4),
  p('v29', 'Scent Leaf — Nchanwu (500g)', 4, 'vegetables', '500g pack', 4),
  p('v30', 'Mixed Salad Pack (1kg)', 5, 'vegetables', '1kg pack', 4),

  // ===== FRUITS (24) =====
  p('f1', 'Sweet Mangoes (10pcs)', 12, 'fruits', '10 pieces', 5),
  p('f2', 'Fresh Pineapples (3pcs)', 9, 'fruits', '3 pieces', 4),
  p('f3', 'Ripe Bananas (bunch)', 4, 'fruits', 'per bunch', 4),
  p('f4', 'Green Plantains (5pcs)', 5, 'fruits', '5 pieces', 4),
  p('f5', 'Ripe Plantains (5pcs)', 5, 'fruits', '5 pieces', 4),
  p('f6', 'Sweet Oranges (10pcs)', 6, 'fruits', '10 pieces', 4),
  p('f7', 'Watermelon (per piece)', 7, 'fruits', 'per piece', 5),
  p('f8', 'Pawpaw — Papaya (per piece)', 5, 'fruits', 'per piece', 4),
  p('f9', 'Avocado Pear (5pcs)', 6, 'fruits', '5 pieces', 4),
  p('f10', 'Red Apples (1kg)', 5, 'fruits', '1kg bag', 4),
  p('f11', 'Green Apples (1kg)', 5, 'fruits', '1kg bag', 4),
  p('f12', 'Red Grapes (1kg)', 8, 'fruits', '1kg pack', 4),
  p('f13', 'Strawberries (500g)', 7, 'fruits', '500g pack', 4),
  p('f14', 'Fresh Lemons (5pcs)', 3, 'fruits', '5 pieces', 4),
  p('f15', 'Fresh Limes (5pcs)', 3, 'fruits', '5 pieces', 4),
  p('f16', 'Coconut (3pcs)', 5, 'fruits', '3 pieces', 4),
  p('f17', 'Tangerine (10pcs)', 5, 'fruits', '10 pieces', 4),
  p('f18', 'Soursop — Graviola (per piece)', 6, 'fruits', 'per piece', 4),
  p('f19', 'Guava (1kg)', 4, 'fruits', '1kg bag', 4),
  p('f20', 'Tamarind (500g)', 4, 'fruits', '500g pack', 4),
  p('f21', 'Dragon Fruit (per piece)', 6, 'fruits', 'per piece', 4),
  p('f22', 'Kiwi (6pcs)', 5, 'fruits', '6 pieces', 4),
  p('f23', 'Dates — Deglet Nour (500g)', 6, 'fruits', '500g pack', 4),
  p('f24', 'Pomegranate (per piece)', 4, 'fruits', 'per piece', 4),

  // ===== LIVESTOCK (12) =====
  p('l1', 'Live Goat — Medium', 150, 'livestock', 'medium (≈25kg)', 4),
  p('l2', 'Live Goat — Large', 200, 'livestock', 'large (≈35kg)', 4),
  p('l3', 'Mature Bull — Cow', 300, 'livestock', 'full grown', 4, 'Northern Nigeria'),
  p('l4', 'Young Bull — Calf', 250, 'livestock', 'young (≈150kg)', 4),
  p('l5', 'Sheep — Ram', 180, 'livestock', 'mature', 4),
  p('l6', 'Goat Meat (per kg)', 12, 'livestock', 'per kg', 4),
  p('l7', 'Beef — Cow Meat (per kg)', 10, 'livestock', 'per kg', 4),
  p('l8', 'Pork (per kg)', 9, 'livestock', 'per kg', 4),
  p('l9', 'Live Pig — Weaner', 120, 'livestock', 'weaner', 4),
  p('l10', 'Cow Hide — Ponmo (per kg)', 6, 'livestock', 'per kg', 4),
  p('l11', 'Cow Trotter — Cow Leg (per kg)', 5, 'livestock', 'per kg', 4),
  p('l12', 'Smoked Beef — Kilishi (500g)', 8, 'livestock', '500g pack', 5),

  // ===== POULTRY (12) =====
  p('pl1', 'Broiler Chicken — Live (2kg+)', 12, 'poultry', 'per bird', 5),
  p('pl2', 'Layer Chicken — Live', 10, 'poultry', 'per bird', 4),
  p('pl3', 'Frozen Chicken — Whole (2kg)', 8, 'poultry', 'per bird', 4),
  p('pl4', 'Chicken Thighs (1kg)', 7, 'poultry', '1kg pack', 4),
  p('pl5', 'Chicken Wings (1kg)', 6, 'poultry', '1kg pack', 4),
  p('pl6', 'Turkey — Live (5kg+)', 40, 'poultry', 'per bird', 4),
  p('pl7', 'Duck — Live', 18, 'poultry', 'per bird', 4),
  p('pl8', 'Quail — Live (per pair)', 8, 'poultry', 'per pair', 4),
  p('pl9', 'Fresh Chicken Eggs (crate — 30pcs)', 6, 'poultry', '30 eggs', 5),
  p('pl10', 'Fresh Duck Eggs (12pcs)', 6, 'poultry', '12 eggs', 4),
  p('pl11', 'Frozen Turkey (5kg)', 35, 'poultry', 'per bird', 4),
  p('pl12', 'Chicken Gizzards (1kg)', 6, 'poultry', '1kg pack', 4),

  // ===== FISHERY (16) =====
  p('fi1', 'Fresh Tilapia (5kg)', 35, 'fishery', '5kg pack', 5),
  p('fi2', 'Live Catfish (3kg)', 25, 'fishery', 'per fish', 5),
  p('fi3', 'Frozen Catfish (2kg)', 18, 'fishery', '2kg pack', 4),
  p('fi4', 'Croaker Fish — Frozen (2kg)', 22, 'fishery', '2kg pack', 4),
  p('fi5', 'Titus Fish — Frozen (1kg)', 12, 'fishery', '1kg pack', 4),
  p('fi6', 'Mackerel — Frozen (1kg)', 10, 'fishery', '1kg pack', 4),
  p('fi7', 'Sardines — Canned (12 tins)', 10, 'fishery', '12 pack', 4),
  p('fi8', 'Stockfish — Dried Cod (500g)', 15, 'fishery', '500g pack', 4),
  p('fi9', 'Smoked Fish — Mangala (1kg)', 12, 'fishery', '1kg pack', 5),
  p('fi10', 'Dried Catfish (500g)', 10, 'fishery', '500g pack', 4),
  p('fi11', 'Prawns — Jumbo (1kg)', 20, 'fishery', '1kg pack', 4),
  p('fi12', 'Shrimp — Small (1kg)', 14, 'fishery', '1kg pack', 4),
  p('fi13', 'Crayfish — Ground (500g)', 6, 'fishery', '500g pack', 4),
  p('fi14', 'Tuna — Canned (6 tins)', 10, 'fishery', '6 pack', 4),
  p('fi15', 'Salmon — Smoked (500g)', 18, 'fishery', '500g pack', 4),
  p('fi16', 'Mixed Seafood Platter (2kg)', 35, 'fishery', '2kg pack', 4),

  // ===== DAIRY (10) =====
  p('d1', 'Fresh Cow Milk (10L)', 20, 'dairy', '10L can', 4),
  p('d2', 'Goat Milk (2L)', 8, 'dairy', '2L bottle', 4),
  p('d3', 'Plain Yogurt (1L)', 6, 'dairy', '1L tub', 4),
  p('d4', 'Greek Yogurt (500ml)', 5, 'dairy', '500ml tub', 4),
  p('d5', 'Fresh Cheese — Wara (500g)', 6, 'dairy', '500g pack', 4),
  p('d6', 'Cheddar Cheese (500g)', 8, 'dairy', '500g block', 4),
  p('d7', 'Butter — Unsalted (500g)', 7, 'dairy', '500g pack', 4),
  p('d8', 'Heavy Cream (500ml)', 6, 'dairy', '500ml bottle', 4),
  p('d9', 'Evaporated Milk (6 tins)', 8, 'dairy', '6 pack', 4),
  p('d10', 'Ice Cream — Vanilla (1L)', 5, 'dairy', '1L tub', 4),

  // ===== HONEY (8) =====
  p('h1', 'Natural Wildflower Honey (500ml)', 15, 'honey', '500ml jar', 5),
  p('h2', 'Forest Honey (500ml)', 18, 'honey', '500ml jar', 4),
  p('h3', 'Acacia Honey (500ml)', 20, 'honey', '500ml jar', 4),
  p('h4', 'Pure Honey — Raw (1L)', 28, 'honey', '1L jar', 5),
  p('h5', 'Honeycomb (250g)', 12, 'honey', '250g pack', 4),
  p('h6', 'Honey with Propolis (500ml)', 22, 'honey', '500ml jar', 4),
  p('h7', 'Manuka Honey (250g)', 35, 'honey', '250g jar', 5, 'New Zealand'),
  p('h8', 'Honey Sticks (50 pack)', 8, 'honey', '50 sticks', 4),

  // ===== SEEDS (12) =====
  p('s1', 'Hybrid Maize Seeds (5kg)', 15, 'seeds', '5kg bag', 4),
  p('s2', 'Tomato Seeds (100g)', 8, 'seeds', '100g pack', 4),
  p('s3', 'Scotch Bonnet Seeds (50g)', 6, 'seeds', '50g pack', 4),
  p('s4', 'Watermelon Seeds — Egusi (2kg)', 8, 'seeds', '2kg bag', 4),
  p('s5', 'Pumpkin Seeds (500g)', 6, 'seeds', '500g pack', 4),
  p('s6', 'Okra Seeds (100g)', 5, 'seeds', '100g pack', 4),
  p('s7', 'Bean Seeds (2kg)', 8, 'seeds', '2kg bag', 4),
  p('s8', 'Carrot Seeds (50g)', 5, 'seeds', '50g pack', 4),
  p('s9', 'Cabbage Seeds (50g)', 5, 'seeds', '50g pack', 4),
  p('s10', 'Rice Seeds — Paddy (5kg)', 12, 'seeds', '5kg bag', 4),
  p('s11', 'Cassava Stem Cuttings (bundle)', 10, 'seeds', 'per bundle', 4),
  p('s12', 'Mixed Vegetable Seed Pack', 8, 'seeds', 'assorted pack', 4),

  // ===== FARM TOOLS (14) =====
  p('t1', 'Premium Garden Hoe', 8, 'tools', 'per piece', 4),
  p('t2', 'Cutlass — Machete (24\")', 10, 'tools', 'per piece', 4),
  p('t3', 'Shovel — Round Point', 12, 'tools', 'per piece', 4),
  p('t4', 'Garden Rake — Steel', 10, 'tools', 'per piece', 4),
  p('t5', 'Watering Can (10L)', 8, 'tools', 'per piece', 4),
  p('t6', 'Knapsack Sprayer (20L)', 35, 'tools', 'per piece', 4),
  p('t7', 'Pruning Shears', 12, 'tools', 'per piece', 4),
  p('t8', 'Axe — Splitting (3.5kg)', 15, 'tools', 'per piece', 4),
  p('t9', 'Wheelbarrow — Steel', 45, 'tools', 'per piece', 4),
  p('t10', 'Sickle — Harvesting', 8, 'tools', 'per piece', 4),
  p('t11', 'Hand Trowel — Garden', 6, 'tools', 'per piece', 4),
  p('t12', 'Pitchfork — Hay', 14, 'tools', 'per piece', 4),
  p('t13', 'Gloves — Gardening (pair)', 5, 'tools', 'per pair', 4),
  p('t14', 'Weed Whacker — Grass Cutter', 55, 'tools', 'per piece', 4),

  // ===== FERTILIZERS (8) =====
  p('ft1', 'NPK Fertilizer 15-15-15 (25kg)', 25, 'fertilizers', '25kg bag', 4),
  p('ft2', 'Urea Fertilizer (25kg)', 22, 'fertilizers', '25kg bag', 4),
  p('ft3', 'Organic Compost (25kg)', 18, 'fertilizers', '25kg bag', 4),
  p('ft4', 'Poultry Manure (25kg)', 12, 'fertilizers', '25kg bag', 4),
  p('ft5', 'Potassium Fertilizer — KCL (25kg)', 28, 'fertilizers', '25kg bag', 4),
  p('ft6', 'Liquid Seaweed Extract (1L)', 15, 'fertilizers', '1L bottle', 4),
  p('ft7', 'Bone Meal (5kg)', 12, 'fertilizers', '5kg bag', 4),
  p('ft8', 'Foliar Spray — Boost (500ml)', 10, 'fertilizers', '500ml bottle', 4),

  // ===== PETS (6) =====
  p('pt1', 'German Shepherd Puppy', 150, 'pets', 'per pup', 4),
  p('pt2', 'Boer Goat — Pet', 80, 'pets', 'per goat', 4),
  p('pt3', 'Rabbit — New Zealand (pair)', 25, 'pets', 'per pair', 4),
  p('pt4', 'Guinea Pig (pair)', 15, 'pets', 'per pair', 4),
  p('pt5', 'Cat — Domestic Short Hair', 50, 'pets', 'per cat', 4),
  p('pt6', 'Fish — Koi (per piece)', 20, 'pets', 'per piece', 4),

  // ===== OILS & SPICES (16) =====
  p('o1', 'Red Palm Oil (5L)', 12, 'oils', '5L bottle', 4),
  p('o2', 'Vegetable Oil (5L)', 10, 'oils', '5L bottle', 4),
  p('o3', 'Groundnut Oil — Pure (2L)', 8, 'oils', '2L bottle', 5),
  p('o4', 'Coconut Oil — Virgin (500ml)', 8, 'oils', '500ml bottle', 4),
  p('o5', 'Olive Oil — Extra Virgin (1L)', 12, 'oils', '1L bottle', 4),
  p('o6', 'Sesame Oil (500ml)', 8, 'oils', '500ml bottle', 4),
  p('o7', 'Shea Butter — Raw (1kg)', 10, 'oils', '1kg pack', 4),
  p('o8', 'Dry Pepper — Ground (250g)', 3, 'oils', '250g pack', 4),
  p('o9', 'Curry Powder (200g)', 3, 'oils', '200g pack', 4),
  p('o10', 'Thyme — Dried (100g)', 3, 'oils', '100g pack', 4),
  p('o11', 'Seasoning Cubes — 100 pack', 5, 'oils', '100 cubes', 4),
  p('o12', 'Salt — Table (1kg)', 2, 'oils', '1kg pack', 4),
  p('o13', 'Sugar — Granulated (1kg)', 3, 'oils', '1kg pack', 4),
  p('o14', 'Cinnamon Sticks (100g)', 4, 'oils', '100g pack', 4),
  p('o15', 'Nutmeg — Whole (100g)', 5, 'oils', '100g pack', 4),
  p('o16', 'Dried Onion Flakes (200g)', 3, 'oils', '200g pack', 4),
];

export const PRODUCTS_BY_CATEGORY = allProducts.reduce<Record<string, Product[]>>((acc, p) => {
  (acc[p.category] ??= []).push(p);
  return acc;
}, {});

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS_BY_CATEGORY[category] || [];
}

export function getProductById(id: string): Product | undefined {
  return allProducts.find(p => p.id === id);
}

export const CATEGORY_LIST = Object.entries(CATS).map(([key, name]) => ({
  id: key,
  name,
  icon: getCategoryIcon(key),
  imageUrl: getImageUrl(key, 0),
  productCount: (PRODUCTS_BY_CATEGORY[key] || []).length,
  description: getCategoryDesc(key),
}));

function getCategoryIcon(cat: string): string {
  const icons: Record<string, string> = {
    rice: '\uD83C\uDF3E', beans: '\uD83E\uDD6D', maize: '\uD83C\uDF3D',
    yam: '\uD83C\uDF60', cassava: '\uD83C\uDF3F', vegetables: '\uD83E\uDD6C',
    fruits: '\uD83C\uDF4E', livestock: '\uD83D\uDC04', poultry: '\uD83D\uDC14',
    fishery: '\uD83D\uDC1F', dairy: '\uD83E\uDD5B', honey: '\uD83C\uDF6F',
    seeds: '\uD83C\uDF31', tools: '\uD83D\uDD27', fertilizers: '\uD83E\uDDEA',
    pets: '\uD83D\uDC36', oils: '\uD83E\uDDED',
  };
  return icons[cat] || '\uD83D\uDED2';
}

function getCategoryDesc(cat: string): string {
  const descs: Record<string, string> = {
    rice: 'Premium rice varieties from local and international sources',
    beans: 'Protein-rich beans and legumes for healthy meals',
    maize: 'Fresh corn and maize products for your kitchen',
    yam: 'Fresh yam tubers and yam-based products',
    cassava: 'Cassava roots, garri, fufu flour and more',
    vegetables: 'Fresh leafy greens, peppers, tomatoes and roots',
    fruits: 'Sweet tropical and exotic fruits from farm to table',
    livestock: 'Quality goats, cattle, sheep and meat products',
    poultry: 'Fresh chicken, turkey, duck and farm eggs',
    fishery: 'Fresh and dried fish, prawns and seafood',
    dairy: 'Farm-fresh milk, cheese, yogurt and butter',
    honey: 'Pure natural honey from Plateau State beekeepers',
    seeds: 'Certified high-yield seeds for your farm',
    tools: 'Heavy-duty farm tools and equipment',
    fertilizers: 'Quality fertilizers for healthy crop growth',
    pets: 'Loving companion animals for your home',
    oils: 'Pure cooking oils, spices and seasonings',
  };
  return descs[cat] || 'Quality farm products';
}

export default allProducts;
