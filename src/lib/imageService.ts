// Image Service for fetching real product images from external APIs
// Fallback chain: Pexels -> Pixabay -> Unsplash -> Static placeholder

const imageCache = new Map<string, string>();

const STATIC_PLACEHOLDER = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="#1a1a2e"/><text x="200" y="180" text-anchor="middle" fill="rgba(168,85,247,0.5)" font-size="64">🌾</text><text x="200" y="240" text-anchor="middle" fill="rgba(168,85,247,0.3)" font-size="16" font-family="sans-serif">Product Image</text></svg>'
);

export function getFallbackImage(): string {
  return STATIC_PLACEHOLDER;
}

const PRODUCT_KEYWORDS: Record<string, string> = {
  // ===== GRAINS =====
  'premium long grain rice': 'rice bag product grain',
  'basmati rice': 'basmati rice bag grain',
  'brown rice': 'brown rice grain healthy',
  'jasmine rice': 'jasmine rice grain aromatic',
  'wild rice': 'wild rice grain blend',
  'jollof rice': 'jollof rice food plate',
  'fried rice': 'fried rice food plate dish',
  'coconut rice': 'coconut rice food dish',
  'chinese rice': 'chinese fried rice food',
  'black eyed beans': 'black eyed beans legume',
  'red kidney beans': 'kidney beans legume',
  'navy beans': 'white navy beans legume',
  'chickpeas': 'chickpeas legume product',
  'red split lentils': 'red lentils legume product',
  'brown beans': 'brown beans legume',
  'green beans': 'green beans vegetable fresh',
  'yellow maize': 'maize corn grain',
  'fresh corn': 'fresh corn cob vegetable',
  'maize flour': 'maize flour bag product',
  'sweet corn': 'sweet corn canned product',
  'popcorn kernels': 'popcorn corn kernel snack',
  'whole wheat flour': 'wheat flour bag baking',
  'wheat grains': 'wheat grain cereal',
  'wheat bran': 'wheat bran cereal',
  'millet grains': 'millet grain cereal',
  'millet flour': 'millet flour bag product',
  'finger millet': 'finger millet grain',
  'sorghum grains': 'sorghum grain cereal',
  'sorghum flour': 'sorghum flour bag product',

  // ===== ROOTS & TUBERS =====
  'fresh yam tubers': 'yam tuber root vegetable',
  'pounded yam flour': 'pounded yam flour food',
  'white yam': 'white yam tuber',
  'yellow yam': 'yellow yam tuber',
  'water yam': 'water yam tuber',
  'cassava flour': 'cassava flour product bag',
  'fresh cassava tubers': 'cassava root tuber',
  'frozen cassava leaves': 'cassava leaves vegetable',
  'cassava chips': 'cassava chips dried',
  'white garri': 'garri cassava flakes product',
  'yellow garri': 'garri cassava flakes product',
  'ijebu garri': 'garri cassava flakes product',
  'soaked garri': 'garri cassava food bowl',
  'irish potatoes': 'potato tuber vegetable',
  'sweet potatoes': 'sweet potato vegetable',
  'potato chips': 'potato chips snack pack',
  'green plantain': 'plantain fruit green',
  'ripe plantain': 'plantain fruit ripe',
  'plantain flour': 'plantain flour bag product',
  'plantain chips': 'plantain chips snack pack',

  // ===== VEGETABLES =====
  'fresh tomatoes': 'tomatoes fresh vegetable',
  'organic carrots': 'carrots fresh vegetable',
  'red bell peppers': 'bell peppers fresh vegetable',
  'green spinach': 'spinach fresh green leaves',
  'fresh onions': 'onions fresh vegetable',
  'cabbage': 'cabbage fresh vegetable',
  'lettuce': 'lettuce fresh vegetable',
  'cucumber': 'cucumber fresh vegetable',
  'zucchini': 'zucchini fresh vegetable',
  'broccoli': 'broccoli fresh vegetable',
  'cauliflower': 'cauliflower fresh vegetable',
  'eggplant': 'eggplant fresh vegetable',
  'fresh okra': 'okra fresh vegetable',
  'bitter leaf': 'bitter leaf vegetable',
  'ugu pumpkin leaf': 'ugu pumpkin leaf vegetable',
  'waterleaf': 'waterleaf green vegetable',

  // ===== FRUITS =====
  'sweet mangoes': 'mango fresh fruit',
  'fresh pineapples': 'pineapple fresh fruit',
  'bananas': 'banana fresh fruit bunch',
  'oranges': 'orange fresh fruit',
  'apples': 'apple fresh fruit',
  'red grapes': 'grapes fresh fruit',
  'watermelon': 'watermelon fresh fruit',
  'pawpaw': 'pawpaw fresh fruit',
  'avocado': 'avocado fresh fruit',
  'strawberries': 'strawberries fresh fruit',
  'blueberries': 'blueberries fresh fruit',
  'lemons': 'lemon fresh fruit',
  'limes': 'lime fresh fruit',
  'coconut': 'coconut fresh fruit',
  'medjool dates': 'dates dried fruit',

  // ===== OILS & FATS =====
  'red palm oil': 'palm oil bottle product',
  'bleached palm oil': 'palm oil bottle refined',
  'palm kernel oil': 'palm kernel oil bottle',
  'organic red palm oil': 'palm oil bottle organic',
  'groundnut oil': 'groundnut oil cooking bottle',
  'vegetable oil': 'vegetable oil cooking bottle',
  'olive oil': 'olive oil cooking bottle',
  'coconut oil': 'coconut oil jar product',

  // ===== LEGUMES & NUTS =====
  'raw groundnuts': 'groundnut peanut product',
  'roasted groundnuts': 'groundnut roasted snack',
  'groundnut paste': 'groundnut paste jar',

  // ===== SPICES =====
  'fresh red pepper': 'red pepper fresh vegetable',
  'scotch bonnet': 'scotch bonnet pepper hot',
  'dried pepper': 'dried pepper spice',
  'ground cayenne': 'cayenne pepper ground spice',
  'black peppercorns': 'black peppercorns spice whole',
  'mixed bell peppers': 'bell peppers fresh mix',

  // ===== MEAT & SEAFOOD =====
  'goat meat': 'fresh goat meat cuts',
  'beef': 'fresh beef meat cuts',
  'whole chicken': 'fresh whole chicken',
  'fresh chicken': 'fresh chicken meat cuts',
  'whole turkey': 'turkey whole bird',
  'pork': 'fresh pork meat cuts',
  'fresh fish': 'fresh fish seafood',
  'tilapia fish': 'tilapia fish fresh',
  'smoked catfish': 'catfish smoked fish',
  'mackerel fish': 'mackerel fish fresh',
  'salmon fish': 'salmon fish fresh',
  'shrimp': 'shrimp seafood fresh',
  'crab': 'crab seafood fresh',

  // ===== AFRICAN SOUPS =====
  'egusi': 'egusi melon seed product',
  'ogbono': 'ogbono soup seed',
  'afang': 'afang soup vegetable',
  'nsala': 'nsala soup white soup',
  'banga': 'banga soup palm nut',

  // ===== PREPARED MEALS =====
  'pizza': 'pizza food dish',
  'burger': 'burger sandwich food',
  'shawarma': 'shawarma wrap food',
  'sushi': 'sushi japanese food',
  'sandwich': 'sandwich food',
  'bread loaf': 'bread loaf bakery',
  'whole wheat bread': 'bread loaf healthy',
  'pasta': 'pasta noodles pack',

  // ===== DAIRY =====
  'fresh milk': 'milk dairy product',
  'cheese': 'cheese dairy product',
  'butter': 'butter dairy product',
  'yogurt': 'yogurt dairy product',

  // ===== HONEY & SPREADS =====
  'honey': 'honey jar product',

  // ===== BEVERAGES =====
  'instant coffee': 'instant coffee jar',
  'coffee beans': 'coffee beans product',
  'cocoa beans': 'cocoa beans product',
  'cocoa powder': 'cocoa powder product',
  'tea leaves': 'tea leaves product',
  'fruit juice': 'juice drink bottle',
  'cocoa beverage': 'cocoa drink powder',

  // ===== SNACKS =====
  'cake': 'cake dessert sweet',
  'chocolate': 'chocolate bar product',
  'biscuit': 'biscuits cookies snack',

  // ===== TOOLS - HAND TOOLS =====
  'stainless cutlass': 'cutlass machete farm tool',
  'heavy duty hoe': 'hoe garden farm tool',
  'garden fork': 'garden fork tool soil',
  'farm rake': 'rake garden tool',
  'woodcutting axe': 'axe wood cutting tool',
  'digging shovel': 'shovel digging garden tool',
  'heavy duty wheelbarrow': 'wheelbarrow garden utility',
  'plastic watering can': 'watering can garden tool',
  'knapsack sprayer': 'sprayer garden tool',
  'garden pruning shears': 'pruning shears garden tool',
  'mattock pickaxe': 'pickaxe mattock tool',
  'scythe grass cutter': 'scythe grass cutting tool',
  'hand trowel set': 'trowel garden hand tool',
  'farm gloves': 'farm work gloves protective',

  // ===== TOOLS - MACHINERY =====
  'farm tractor': 'tractor farm vehicle machine',
  'mini bulldozer': 'bulldozer construction machine',
  'combine harvester': 'combine harvester machine',
  'disc plough machine': 'disc plough farm machine',
  'automatic seed planter': 'seed planter farm machine',
  'irrigation sprinkler system': 'irrigation sprinkler system',
  'mini excavator': 'excavator digging machine',
  'industrial chainsaw': 'chainsaw power tool',
  'electric grinding machine': 'grinding mill machine',
  'rice milling machine': 'rice mill machine',
  'palm oil processing machine': 'palm oil processing machine',
  'cassava processing machine': 'cassava processing machine',
  'packaging sealing machine': 'packaging sealing machine',

  // ===== TOOLS - MODERN =====
  'greenhouse complete kit': 'greenhouse garden structure',
  'agriculture drone': 'drone quadcopter agriculture',
  'gps farm navigation': 'gps navigation device',
  'soil testing kit': 'soil tester ph meter',
  'electric fence energizer': 'electric fence energizer',
  'incubation machine': 'egg incubator machine',
  'water pump': 'water pump machine',
  'feed pellet machine': 'feed pellet machine',
  'drip irrigation kit': 'drip irrigation kit',
  'cold storage room': 'cold storage refrigeration',
  'weighing scale': 'weighing scale digital',

  // ===== ANIMALS - DOG BREEDS =====
  'german shepherd': 'german shepherd dog breed pet',
  'rottweiler': 'rottweiler dog breed',
  'pitbull': 'pitbull dog breed',
  'siberian husky': 'husky dog breed',
  'english bulldog': 'bulldog dog breed',
  'chihuahua': 'chihuahua dog breed',
  'labrador retriever': 'labrador retriever dog breed',
  'golden retriever': 'golden retriever dog breed',
  'caucasian shepherd': 'caucasian shepherd dog breed',
  'boerboel': 'boerboel dog breed',
  'poodle': 'poodle dog breed pet',
  'doberman pinscher': 'doberman pinscher dog breed',
  'american eskimo': 'american eskimo dog breed',
  'japanese spitz': 'japanese spitz dog breed',
  'alsatian': 'alsatian dog breed',
  'belgian malinois': 'belgian malinois dog breed',
  'great dane': 'great dane dog breed',
  'pomeranian': 'pomeranian dog breed',
  'cocker spaniel': 'cocker spaniel dog breed',
  'dalmatian': 'dalmatian dog breed',
  'boxer': 'boxer dog breed',
  'maltese': 'maltese dog breed',
  'shih tzu': 'shih tzu dog breed',
  'bullmastiff': 'bullmastiff dog breed',
  'bichon frise': 'bichon frise dog breed',

  // ===== ANIMALS - CAT BREEDS =====
  'persian cat': 'persian cat breed pet',
  'siamese cat': 'siamese cat breed',
  'maine coon': 'maine coon cat breed',
  'bengal cat': 'bengal cat breed',
  'british shorthair': 'british shorthair cat',
  'sphynx cat': 'sphynx cat breed',
  'ragdoll cat': 'ragdoll cat breed',
  'scottish fold': 'scottish fold cat',
  'abyssinian cat': 'abyssinian cat breed',

  // ===== ANIMALS - FISH =====
  'koi fish': 'koi fish pond ornamental',
  'goldfish': 'goldfish aquarium',
  'tropical fish': 'tropical fish aquarium',
  'betta fish': 'betta fish aquarium',
  'guppy fish': 'guppy fish aquarium',
  'angelfish': 'angelfish aquarium',
  'molly fish': 'molly fish aquarium',
  'tetra fish': 'tetra fish aquarium',
  'cichlid': 'cichlid fish aquarium',
  'discus fish': 'discus fish aquarium',

  // ===== ANIMALS - FOWL =====
  'broiler chickens': 'broiler chicken poultry',
  'layer chickens': 'layer chicken poultry',
  'cockerel': 'cockerel rooster poultry',
  'turkey poults': 'turkey poult bird',
  'ducklings': 'duck duckling bird',
  'goslings': 'goose gosling bird',
  'guinea fowl keets': 'guinea fowl bird',
  'quail birds': 'quail bird poultry',
  'pigeons': 'pigeon bird',
  'parrot': 'parrot bird pet',
  'peacock': 'peacock bird colorful',
  'ostrich': 'ostrich bird large',

  // ===== ANIMALS - LIVESTOCK =====
  'nanny goat': 'goat animal livestock',
  'billy goat': 'goat animal livestock',
  'calf': 'cow cattle livestock calf',
  'heifer': 'cow cattle livestock',
  'bull': 'cow cattle livestock bull',
  'sheep': 'sheep animal livestock',
  'piglets': 'pig animal livestock',
  'foal': 'horse foal livestock',
  'donkey': 'donkey animal livestock',
  'camel': 'camel animal livestock',
  'rabbit': 'rabbit animal pet',
  'grasscutter': 'grasscutter rodent farm',
  'giant land snail': 'snail garden animal',
};

function pixabayCategory(mainCategory: string): string | undefined {
  const map: Record<string, string> = { food: 'food', tools: 'industry', animals: 'animals' };
  return map[mainCategory];
}

function buildSearchQuery(productName: string, category: string): string {
  const nameLower = productName.toLowerCase().trim();

  // 1) Exact product name match in keyword map
  for (const [key, query] of Object.entries(PRODUCT_KEYWORDS)) {
    if (nameLower.includes(key)) return query;
  }

  // 2) Category-based fallback — no "agriculture", "farm", "market" (those return landscapes)
  const cat = category.toLowerCase().trim();

  // Food fallback
  if (cat === 'food') {
    if (/rice|beans|maize|wheat|millet|sorghum|garri|flour|cereal|grain/.test(nameLower)) {
      return `${nameLower} bag grain product`;
    }
    if (/vegetable|tomato|carrot|onion|lettuce|cabbage|cucumber|spinach|okra|broccoli|cauliflower|eggplant|zucchini/.test(nameLower)) {
      return `${nameLower} fresh vegetable produce`;
    }
    if (/fruit|mango|pineapple|banana|orange|apple|grape|watermelon|pawpaw|avocado|strawberry|blueberry|lemon|lime|coconut|date/.test(nameLower)) {
      return `${nameLower} fresh fruit produce`;
    }
    if (/jollof|fried|prepared|party|pizza|burger|shawarma|sushi|sandwich/.test(nameLower)) {
      return `${nameLower} food dish`;
    }
    if (/oil|fat/.test(nameLower)) {
      return `${nameLower} bottle cooking`;
    }
    if (/meat|beef|pork|chicken/.test(nameLower)) {
      return `${nameLower} meat cuts fresh`;
    }
    if (/milk|cheese|yogurt|cream|butter/.test(nameLower)) {
      return `${nameLower} dairy product`;
    }
    if (/spice|pepper|curry|turmeric|ginger|garlic|cinnamon|nutmeg/.test(nameLower)) {
      return `${nameLower} spice seasoning`;
    }
    if (/soup|egusi|ogbono|afang|nsala|banga/.test(nameLower)) {
      return `${nameLower} food bowl`;
    }
    if (/snack|chip|biscuit|chocolate|cake|candy/.test(nameLower)) {
      return `${nameLower} snack package`;
    }
    if (/frozen|ice/.test(nameLower)) {
      return `${nameLower} frozen food package`;
    }
    if (/egg/.test(nameLower)) {
      return `${nameLower} food product`;
    }
    if (/honey/.test(nameLower)) {
      return `${nameLower} jar product`;
    }
    if (/bread|pasta|noodle/.test(nameLower)) {
      return `${nameLower} food product`;
    }
    return `${nameLower} food product`;
  }

  // Tools fallback
  if (cat === 'tools') {
    if (/cutlass|hoe|rake|fork|shovel|axe|scythe|mattock|pickaxe|trowel|shears|sprayer|machete/.test(nameLower)) {
      return `${nameLower} tool`;
    }
    if (/tractor|harvester|bulldozer|excavator|plough|planter|machine|mill|grinder|generator|pump|chainsaw/.test(nameLower)) {
      return `${nameLower} machine equipment`;
    }
    if (/drone|gps|sensor|tester|greenhouse|fence|incubator|scale|storage/.test(nameLower)) {
      return `${nameLower} equipment device`;
    }
    return `${nameLower} tool equipment`;
  }

  // Animals fallback
  if (cat === 'animals') {
    if (/dog|puppy|pup|canine/.test(nameLower)) {
      return `${nameLower} dog breed pet`;
    }
    if (/cat|kitten|feline/.test(nameLower)) {
      return `${nameLower} cat breed pet`;
    }
    if (/fish|koi|goldfish|tilapia|catfish|aquarium|guppy|betta|angelfish|molly|tetra|cichlid|discus/.test(nameLower)) {
      return `${nameLower} aquarium fish`;
    }
    if (/chicken|hen|rooster|cockerel|broiler|layer|turkey|duck|goose|guinea|quail|pigeon|parrot|peacock|ostrich|poultry|fowl/.test(nameLower)) {
      return `${nameLower} bird poultry`;
    }
    if (/goat|cow|cattle|sheep|pig|horse|donkey|camel|rabbit|grasscutter|snail|livestock|buck|kid|ewe|ram|bull|heifer|foal/.test(nameLower)) {
      return `${nameLower} animal livestock`;
    }
    return `${nameLower} animal pet`;
  }

  // Generic fallback — just the product name
  return `${nameLower} product`;
}

async function fetchFromPexels(query: string): Promise<string | null> {
  try {
    const apiKey = import.meta.env.VITE_PEXELS_API_KEY;
    if (!apiKey) return null;

    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=square&locale=en-US`,
      { headers: { Authorization: apiKey } }
    );
    if (!response.ok) return null;
    const data = await response.json();
    if (data.photos?.length > 0) return data.photos[0].src.medium;
    return null;
  } catch {
    return null;
  }
}

async function fetchFromPixabay(query: string, mainCategory?: string): Promise<string | null> {
  try {
    const apiKey = import.meta.env.VITE_PIXABAY_API_KEY;
    if (!apiKey) return null;

    let url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&per_page=3&safesearch=true&min_width=400&min_height=400`;
    const cat = mainCategory ? pixabayCategory(mainCategory) : undefined;
    if (cat) url += `&category=${cat}`;

    const response = await fetch(url);
    if (!response.ok) return null;
    const data = await response.json();
    if (data.hits?.length > 0) return data.hits[0].webformatURL;
    return null;
  } catch {
    return null;
  }
}

async function fetchFromUnsplash(query: string): Promise<string | null> {
  try {
    const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;
    if (!apiKey) return null;

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=square&content_filter=high`,
      { headers: { Authorization: `Client-ID ${apiKey}` } }
    );
    if (!response.ok) return null;
    const data = await response.json();
    if (data.results?.length > 0) return data.results[0].urls.regular;
    return null;
  } catch {
    return null;
  }
}

export async function getRealProductImageUrl(
  productId: string,
  productName: string,
  category: string
): Promise<string> {
  const cacheKey = `${productId}-${productName}-${category}`;
  if (imageCache.has(cacheKey)) return imageCache.get(cacheKey)!;

  const searchQuery = buildSearchQuery(productName, category);

  try {
    let imageUrl = await fetchFromPexels(searchQuery);
    if (imageUrl) { imageCache.set(cacheKey, imageUrl); return imageUrl; }

    imageUrl = await fetchFromPixabay(searchQuery, category);
    if (imageUrl) { imageCache.set(cacheKey, imageUrl); return imageUrl; }

    imageUrl = await fetchFromUnsplash(searchQuery);
    if (imageUrl) { imageCache.set(cacheKey, imageUrl); return imageUrl; }

    imageCache.set(cacheKey, STATIC_PLACEHOLDER);
    return STATIC_PLACEHOLDER;
  } catch {
    imageCache.set(cacheKey, STATIC_PLACEHOLDER);
    return STATIC_PLACEHOLDER;
  }
}

export function clearImageCache(): void {
  imageCache.clear();
}
