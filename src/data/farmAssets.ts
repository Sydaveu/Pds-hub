export interface FarmAsset {
  id: string;
  name: string;
  category: 'food' | 'animal' | 'tool' | 'utility';
  era: 'native' | 'modern';
  description: string;
  alt: string;
  localPath: string;
  unsplashId: string;
  keywords: string[];
}

const CDN = (id: string) => `https://images.unsplash.com/photo-${id}?w=400&q=80`;
const LOCAL = (era: string, file: string) => `/assets/${era}/${file}`;

export const farmAssets: FarmAsset[] = [
  // ═══════════════════ NATIVE ERA ═══════════════════
  // -- NATIVE FOODS --
  {
    id: 'nf-01', name: 'Fresh Yam Tubers', category: 'food', era: 'native',
    description: 'Traditional yam harvest, a staple root crop in West Africa',
    alt: 'yam', unsplashId: '1598170845058-32b9d6a5da37',
    localPath: LOCAL('native', 'yam.jpg'),
    keywords: ['yam', 'native yam', 'traditional yam', 'root crop', 'west african yam'],
  },
  {
    id: 'nf-02', name: 'Cassava Root Harvest', category: 'food', era: 'native',
    description: 'Freshly harvested cassava roots, essential for garri and fufu',
    alt: 'cassava', unsplashId: '1506803682981-6e718a9dd3ee',
    localPath: LOCAL('native', 'cassava.jpg'),
    keywords: ['cassava', 'manioc', 'native cassava', 'traditional harvest'],
  },
  {
    id: 'nf-03', name: 'Traditional Garri Processing', category: 'food', era: 'native',
    description: 'Golden garri granules from fermented cassava, a West African staple',
    alt: 'garri', unsplashId: '1574323347407-f5e1ad6d020b',
    localPath: LOCAL('native', 'garri.jpg'),
    keywords: ['garri', 'eba', 'cassava flakes', 'native garri'],
  },
  {
    id: 'nf-04', name: 'Green Plantain', category: 'food', era: 'native',
    description: 'Fresh green plantain for boiling, frying, and traditional dishes',
    alt: 'plantain', unsplashId: '1598170845058-32b9d6a5da37',
    localPath: LOCAL('native', 'plantain.jpg'),
    keywords: ['plantain', 'green plantain', 'native plantain', 'cooking banana'],
  },
  {
    id: 'nf-05', name: 'Groundnut Harvest', category: 'food', era: 'native',
    description: 'Freshly harvested groundnuts drying in the sun',
    alt: 'groundnut', unsplashId: '1557804506-669a67965ba0',
    localPath: LOCAL('native', 'groundnut.jpg'),
    keywords: ['groundnut', 'peanut', 'native groundnut', 'traditional harvest'],
  },
  {
    id: 'nf-06', name: 'Red Palm Oil', category: 'food', era: 'native',
    description: 'Traditional red palm oil from fresh palm fruit',
    alt: 'palm-oil', unsplashId: '1600585154340-be6161a56a0c',
    localPath: LOCAL('native', 'palm-oil.jpg'),
    keywords: ['palm oil', 'red palm oil', 'native palm oil', 'traditional oil'],
  },
  {
    id: 'nf-07', name: 'Fresh Maize Cobs', category: 'food', era: 'native',
    description: 'Fresh yellow maize cobs from traditional farms',
    alt: 'maize', unsplashId: '1514326640560-7d063ef2aed5',
    localPath: LOCAL('native', 'maize.jpg'),
    keywords: ['maize', 'corn', 'native maize', 'traditional corn'],
  },
  {
    id: 'nf-08', name: 'Millet Grains', category: 'food', era: 'native',
    description: 'Traditional millet grains, drought-resistant staple',
    alt: 'millet', unsplashId: '1514326640560-7d063ef2aed5',
    localPath: LOCAL('native', 'millet.jpg'),
    keywords: ['millet', 'native millet', 'traditional grain', 'drought crop'],
  },
  {
    id: 'nf-09', name: 'Natural Honey Harvest', category: 'food', era: 'native',
    description: 'Pure natural honey harvested using traditional methods',
    alt: 'honey', unsplashId: '1587049352846-4a222e784d38',
    localPath: LOCAL('native', 'honey.jpg'),
    keywords: ['honey', 'natural honey', 'native honey', 'traditional beekeeping'],
  },
  {
    id: 'nf-10', name: 'Melon Seeds (Egusi)', category: 'food', era: 'native',
    description: 'Dried melon seeds used for traditional egusi soup',
    alt: 'egusi', unsplashId: '1586201375761-83865001e31c',
    localPath: LOCAL('native', 'egusi.jpg'),
    keywords: ['egusi', 'melon seeds', 'native seeds', 'soup ingredient'],
  },
  {
    id: 'nf-11', name: 'Fresh Okra', category: 'food', era: 'native',
    description: 'Fresh green okra from traditional farms, essential for soups',
    alt: 'okra', unsplashId: '1592924357228-91a4daadcfea',
    localPath: LOCAL('native', 'okra.jpg'),
    keywords: ['okra', 'fresh okra', 'native vegetable', 'traditional soup'],
  },
  {
    id: 'nf-12', name: 'Bitter Leaf', category: 'food', era: 'native',
    description: 'Fresh bitter leaf greens for traditional African soups',
    alt: 'bitter-leaf', unsplashId: '1540420773420-3366772f4999',
    localPath: LOCAL('native', 'bitter-leaf.jpg'),
    keywords: ['bitter leaf', 'native greens', 'traditional vegetable', 'soup leaf'],
  },

  // -- NATIVE ANIMALS --
  {
    id: 'na-01', name: 'Local Goat', category: 'animal', era: 'native',
    description: 'Traditional West African dwarf goat, hardy and disease resistant',
    alt: 'goat', unsplashId: '1589923188900-85dae523342b',
    localPath: LOCAL('native', 'goat.jpg'),
    keywords: ['goat', 'native goat', 'local goat', 'west african goat', 'dwarf goat'],
  },
  {
    id: 'na-02', name: 'Native Sheep', category: 'animal', era: 'native',
    description: 'Traditional sheep reared for meat and wool in local farms',
    alt: 'sheep', unsplashId: '1589923188900-85dae523342b',
    localPath: LOCAL('native', 'sheep.jpg'),
    keywords: ['sheep', 'native sheep', 'local sheep', 'traditional livestock'],
  },
  {
    id: 'na-03', name: 'Free-Range Chicken', category: 'animal', era: 'native',
    description: 'Traditional free-range chickens raised on natural feed',
    alt: 'chicken', unsplashId: '1548550023-2bdb3c5beed7',
    localPath: LOCAL('native', 'chicken.jpg'),
    keywords: ['chicken', 'native chicken', 'free range', 'local fowl'],
  },
  {
    id: 'na-04', name: 'Local Cow', category: 'animal', era: 'native',
    description: 'White Fulani cattle, traditional breed for milk and meat',
    alt: 'cow', unsplashId: '1570042225831-d98fa7577f1e',
    localPath: LOCAL('native', 'cow.jpg'),
    keywords: ['cow', 'native cow', 'fulani cattle', 'local cattle'],
  },
  {
    id: 'na-05', name: 'Local Pig', category: 'animal', era: 'native',
    description: 'Native breed pig reared in traditional farming systems',
    alt: 'pig', unsplashId: '1589923188900-85dae523342b',
    localPath: LOCAL('native', 'pig.jpg'),
    keywords: ['pig', 'native pig', 'local pig', 'traditional pig farming'],
  },
  {
    id: 'na-06', name: 'Farm Rabbit', category: 'animal', era: 'native',
    description: 'Rabbits reared for meat in traditional backyard systems',
    alt: 'rabbit', unsplashId: '1552053831-71594a27632d',
    localPath: LOCAL('native', 'rabbit.jpg'),
    keywords: ['rabbit', 'native rabbit', 'backyard rabbit', 'rabbit farming'],
  },
  {
    id: 'na-07', name: 'Grasscutter (Cane Rat)', category: 'animal', era: 'native',
    description: 'Grasscutter farming, a prized bush meat species in West Africa',
    alt: 'grasscutter', unsplashId: '1589923188900-85dae523342b',
    localPath: LOCAL('native', 'grasscutter.jpg'),
    keywords: ['grasscutter', 'cane rat', 'bush meat', 'native rodent farming'],
  },
  {
    id: 'na-08', name: 'Giant Land Snails', category: 'animal', era: 'native',
    description: 'African giant land snails for snail farming and meat',
    alt: 'snail', unsplashId: '1578575437130-527eed3abbec',
    localPath: LOCAL('native', 'snail.jpg'),
    keywords: ['snail', 'giant snail', 'land snail', 'snail farming', 'native snail'],
  },

  // -- NATIVE TOOLS --
  {
    id: 'nt-01', name: 'Traditional Hoe', category: 'tool', era: 'native',
    description: 'Hand-forged iron hoe for tilling and weeding',
    alt: 'hoe', unsplashId: '1597848212624-a19eb35e2651',
    localPath: LOCAL('native', 'hoe.jpg'),
    keywords: ['hoe', 'traditional hoe', 'hand hoe', 'farming hoe', 'native tool'],
  },
  {
    id: 'nt-02', name: 'Machete / Cutlass', category: 'tool', era: 'native',
    description: 'Sharp steel cutlass for clearing brush and harvesting',
    alt: 'cutlass', unsplashId: '1597848212624-a19eb35e2651',
    localPath: LOCAL('native', 'cutlass.jpg'),
    keywords: ['cutlass', 'machete', 'brush clearing', 'harvesting tool', 'native tool'],
  },
  {
    id: 'nt-03', name: 'Woodcutting Axe', category: 'tool', era: 'native',
    description: 'Heavy axe for felling trees and splitting firewood',
    alt: 'axe', unsplashId: '1597848212624-a19eb35e2651',
    localPath: LOCAL('native', 'axe.jpg'),
    keywords: ['axe', 'woodcutting axe', 'tree felling', 'native tool'],
  },
  {
    id: 'nt-04', name: 'Digging Shovel', category: 'tool', era: 'native',
    description: 'Sturdy shovel for digging planting holes and trenches',
    alt: 'shovel', unsplashId: '1597848212624-a19eb35e2651',
    localPath: LOCAL('native', 'shovel.jpg'),
    keywords: ['shovel', 'digging shovel', 'planting tool', 'native tool'],
  },
  {
    id: 'nt-05', name: 'Farm Rake', category: 'tool', era: 'native',
    description: 'Wooden rake for gathering leaves and leveling soil',
    alt: 'rake', unsplashId: '1597848212624-a19eb35e2651',
    localPath: LOCAL('native', 'rake.jpg'),
    keywords: ['rake', 'farm rake', 'leaf gathering', 'soil leveling', 'native tool'],
  },
  {
    id: 'nt-06', name: 'Harvesting Sickle', category: 'tool', era: 'native',
    description: 'Curved sickle for harvesting grains and cutting grass',
    alt: 'scythe', unsplashId: '1597848212624-a19eb35e2651',
    localPath: LOCAL('native', 'sickle.jpg'),
    keywords: ['sickle', 'scythe', 'harvesting knife', 'grain harvest', 'native tool'],
  },

  // -- NATIVE UTILITIES --
  {
    id: 'nu-01', name: 'Woven Basket', category: 'utility', era: 'native',
    description: 'Hand-woven traditional basket for harvesting and storage',
    alt: 'basket', unsplashId: '1597848212624-a19eb35e2651',
    localPath: LOCAL('native', 'basket.jpg'),
    keywords: ['basket', 'woven basket', 'traditional basket', 'storage basket'],
  },
  {
    id: 'nu-02', name: 'Clay Cooking Pot', category: 'utility', era: 'native',
    description: 'Traditional clay pot for slow-cooking soups and stews',
    alt: 'clay-pot', unsplashId: '1586201375761-83865001e31c',
    localPath: LOCAL('native', 'clay-pot.jpg'),
    keywords: ['clay pot', 'traditional pot', 'earthenware', 'cooking pot'],
  },
  {
    id: 'nu-03', name: 'Calabash Bowl', category: 'utility', era: 'native',
    description: 'Dried calabash gourd used as traditional bowl and utensil',
    alt: 'calabash', unsplashId: '1586201375761-83865001e31c',
    localPath: LOCAL('native', 'calabash.jpg'),
    keywords: ['calabash', 'gourd bowl', 'traditional utensil', 'native utility'],
  },
  {
    id: 'nu-04', name: 'Mortar & Pestle', category: 'utility', era: 'native',
    description: 'Wooden mortar and pestle for pounding grains and spices',
    alt: 'mortar', unsplashId: '1597848212624-a19eb35e2651',
    localPath: LOCAL('native', 'mortar.jpg'),
    keywords: ['mortar', 'pestle', 'pounding tool', 'grain processing', 'traditional tool'],
  },

  // ═══════════════════ MODERN ERA ═══════════════════
  // -- MODERN FOODS --
  {
    id: 'mf-01', name: 'Premium Rice Packaging', category: 'food', era: 'modern',
    description: 'Modern packaged rice with branding and quality certification',
    alt: 'rice', unsplashId: '1586201375761-83865001e31c',
    localPath: LOCAL('modern', 'rice-packaging.jpg'),
    keywords: ['rice', 'packaged rice', 'modern rice', 'premium rice', 'branded rice'],
  },
  {
    id: 'mf-02', name: 'Canned Sweet Corn', category: 'food', era: 'modern',
    description: 'Processed sweet corn in cans for long-term storage',
    alt: 'sweet-corn', unsplashId: '1551754655-cd27e38d2076',
    localPath: LOCAL('modern', 'canned-corn.jpg'),
    keywords: ['canned corn', 'sweet corn', 'processed food', 'modern food'],
  },
  {
    id: 'mf-03', name: 'Pasta & Spaghetti', category: 'food', era: 'modern',
    description: 'Modern durum wheat pasta and spaghetti products',
    alt: 'spaghetti', unsplashId: '1586201375761-83865001e31c',
    localPath: LOCAL('modern', 'pasta.jpg'),
    keywords: ['pasta', 'spaghetti', 'modern food', 'processed grain', 'italian pasta'],
  },
  {
    id: 'mf-04', name: 'Spice Pack Assortment', category: 'food', era: 'modern',
    description: 'Modern packaged spice blends for convenient cooking',
    alt: 'spices', unsplashId: '1586201375761-83865001e31c',
    localPath: LOCAL('modern', 'spices.jpg'),
    keywords: ['spices', 'spice pack', 'modern seasoning', 'blended spices'],
  },
  {
    id: 'mf-05', name: 'Frozen Mixed Vegetables', category: 'food', era: 'modern',
    description: 'Individually quick-frozen vegetable mix for year-round availability',
    alt: 'frozen-vegetables', unsplashId: '1592924357228-91a4daadcfea',
    localPath: LOCAL('modern', 'frozen-vegetables.jpg'),
    keywords: ['frozen vegetables', 'frozen food', 'modern food', 'quick freeze'],
  },
  {
    id: 'mf-06', name: 'Dairy Yogurt', category: 'food', era: 'modern',
    description: 'Modern cultured yogurt with probiotic cultures',
    alt: 'yogurt', unsplashId: '1628088062854-d1870b4553da',
    localPath: LOCAL('modern', 'yogurt.jpg'),
    keywords: ['yogurt', 'dairy', 'modern dairy', 'probiotic', 'cultured milk'],
  },

  // -- MODERN ANIMALS --
  {
    id: 'ma-01', name: 'Poultry Farm Broilers', category: 'animal', era: 'modern',
    description: 'Modern broiler chicken production in climate-controlled houses',
    alt: 'broiler-chicks', unsplashId: '1548550023-2bdb3c5beed7',
    localPath: LOCAL('modern', 'broiler-farm.jpg'),
    keywords: ['broiler', 'poultry farm', 'modern chicken', 'commercial poultry'],
  },
  {
    id: 'ma-02', name: 'Fish Farm Tilapia', category: 'animal', era: 'modern',
    description: 'Modern tilapia farming in controlled pond systems',
    alt: 'tilapia', unsplashId: '1578575437130-527eed3abbec',
    localPath: LOCAL('modern', 'fish-farm.jpg'),
    keywords: ['tilapia', 'fish farm', 'aquaculture', 'modern fish farming'],
  },
  {
    id: 'ma-03', name: 'Dairy Cattle Farm', category: 'animal', era: 'modern',
    description: 'Modern dairy farm with automated milking systems',
    alt: 'dairy-cow', unsplashId: '1570042225831-d98fa7577f1e',
    localPath: LOCAL('modern', 'dairy-farm.jpg'),
    keywords: ['dairy cow', 'dairy farm', 'modern dairy', 'milk production'],
  },
  {
    id: 'ma-04', name: 'Modern Piggery', category: 'animal', era: 'modern',
    description: 'Commercial piggery with controlled feeding and housing',
    alt: 'pig', unsplashId: '1589923188900-85dae523342b',
    localPath: LOCAL('modern', 'piggery.jpg'),
    keywords: ['pig', 'piggery', 'modern pig farming', 'commercial pig'],
  },
  {
    id: 'ma-05', name: 'Turkey Farm', category: 'animal', era: 'modern',
    description: 'Commercial turkey production for meat market',
    alt: 'turkey', unsplashId: '1548550023-2bdb3c5beed7',
    localPath: LOCAL('modern', 'turkey-farm.jpg'),
    keywords: ['turkey', 'turkey farm', 'modern poultry', 'commercial turkey'],
  },

  // -- MODERN TOOLS --
  {
    id: 'mt-01', name: 'Farm Tractor', category: 'tool', era: 'modern',
    description: 'Modern tractor with plough attachment for mechanized farming',
    alt: 'tractor', unsplashId: '1597848212624-a19eb35e2651',
    localPath: LOCAL('modern', 'tractor.jpg'),
    keywords: ['tractor', 'farm tractor', 'modern tractor', 'mechanized farming'],
  },
  {
    id: 'mt-02', name: 'Combine Harvester', category: 'tool', era: 'modern',
    description: 'Modern combine harvester for efficient grain harvesting',
    alt: 'harvester', unsplashId: '1597848212624-a19eb35e2651',
    localPath: LOCAL('modern', 'harvester.jpg'),
    keywords: ['harvester', 'combine harvester', 'modern harvester', 'grain harvest machine'],
  },
  {
    id: 'mt-03', name: 'Irrigation System', category: 'tool', era: 'modern',
    description: 'Modern sprinkler irrigation system for efficient water management',
    alt: 'irrigation', unsplashId: '1597848212624-a19eb35e2651',
    localPath: LOCAL('modern', 'irrigation.jpg'),
    keywords: ['irrigation', 'sprinkler', 'modern irrigation', 'water management'],
  },
  {
    id: 'mt-04', name: 'Greenhouse Structure', category: 'tool', era: 'modern',
    description: 'Modern greenhouse for controlled environment agriculture',
    alt: 'greenhouse', unsplashId: '1597848212624-a19eb35e2651',
    localPath: LOCAL('modern', 'greenhouse.jpg'),
    keywords: ['greenhouse', 'modern greenhouse', 'protected farming', 'controlled environment'],
  },
  {
    id: 'mt-05', name: 'Agriculture Drone', category: 'tool', era: 'modern',
    description: 'Modern drone for crop monitoring, spraying and mapping',
    alt: 'drone', unsplashId: '1597848212624-a19eb35e2651',
    localPath: LOCAL('modern', 'drone.jpg'),
    keywords: ['drone', 'agriculture drone', 'crop monitoring', 'precision farming'],
  },
  {
    id: 'mt-06', name: 'Industrial Chainsaw', category: 'tool', era: 'modern',
    description: 'Modern chainsaw for efficient tree felling and timber processing',
    alt: 'chainsaw', unsplashId: '1597848212624-a19eb35e2651',
    localPath: LOCAL('modern', 'chainsaw.jpg'),
    keywords: ['chainsaw', 'modern chainsaw', 'timber processing', 'tree cutting'],
  },

  // -- MODERN UTILITIES --
  {
    id: 'mu-01', name: 'Solar Panel System', category: 'utility', era: 'modern',
    description: 'Modern solar panel array for farm energy independence',
    alt: 'solar-panel', unsplashId: '1597848212624-a19eb35e2651',
    localPath: LOCAL('modern', 'solar-panel.jpg'),
    keywords: ['solar panel', 'solar energy', 'farm power', 'renewable energy'],
  },
  {
    id: 'mu-02', name: 'Cold Storage Room', category: 'utility', era: 'modern',
    description: 'Modern cold storage for preserving harvested produce',
    alt: 'cold-storage', unsplashId: '1597848212624-a19eb35e2651',
    localPath: LOCAL('modern', 'cold-storage.jpg'),
    keywords: ['cold storage', 'cold room', 'produce preservation', 'refrigeration'],
  },
  {
    id: 'mu-03', name: 'Water Pump', category: 'utility', era: 'modern',
    description: 'Modern submersible water pump for irrigation and borehole',
    alt: 'water-pump', unsplashId: '1597848212624-a19eb35e2651',
    localPath: LOCAL('modern', 'water-pump.jpg'),
    keywords: ['water pump', 'submersible pump', 'irrigation pump', 'borehole'],
  },
  {
    id: 'mu-04', name: 'Egg Incubator', category: 'utility', era: 'modern',
    description: 'Automatic egg incubator with digital temperature control',
    alt: 'incubator', unsplashId: '1597848212624-a19eb35e2651',
    localPath: LOCAL('modern', 'incubator.jpg'),
    keywords: ['incubator', 'egg incubator', 'hatching machine', 'poultry equipment'],
  },
  {
    id: 'mu-05', name: 'Packaging Machine', category: 'utility', era: 'modern',
    description: 'Automatic sealing and packaging machine for farm products',
    alt: 'packaging-machine', unsplashId: '1597848212624-a19eb35e2651',
    localPath: LOCAL('modern', 'packaging-machine.jpg'),
    keywords: ['packaging machine', 'sealer', 'farm packaging', 'food processing'],
  },
  {
    id: 'mu-06', name: 'Weighing Scale', category: 'utility', era: 'modern',
    description: 'Digital platform weighing scale for farm produce measurement',
    alt: 'weighing-scale', unsplashId: '1597848212624-a19eb35e2651',
    localPath: LOCAL('modern', 'weighing-scale.jpg'),
    keywords: ['weighing scale', 'digital scale', 'produce scale', 'farm measurement'],
  },
  {
    id: 'mu-07', name: 'Feed Pellet Machine', category: 'utility', era: 'modern',
    description: 'Animal feed pellet making machine for livestock nutrition',
    alt: 'pellet-machine', unsplashId: '1597848212624-a19eb35e2651',
    localPath: LOCAL('modern', 'pellet-machine.jpg'),
    keywords: ['pellet machine', 'feed machine', 'animal feed', 'feed processing'],
  },
];

export const assetCategories = [
  { id: 'all', label: 'All', icon: '📋' },
  { id: 'food', label: 'Foods', icon: '🌾' },
  { id: 'animal', label: 'Animals', icon: '🐾' },
  { id: 'tool', label: 'Farm Tools', icon: '🔧' },
  { id: 'utility', label: 'Utilities', icon: '⚡' },
] as const;

export function getAssetImageUrl(asset: FarmAsset): string {
  return `https://images.unsplash.com/photo-${asset.unsplashId}?w=400&q=80`;
}

export function getAssetImageLarge(asset: FarmAsset): string {
  return `https://images.unsplash.com/photo-${asset.unsplashId}?w=800&q=80`;
}

export function searchFarmAssets(query: string, maxResults = 8): FarmAsset[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const results: FarmAsset[] = [];
  const seen = new Set<string>();
  for (const asset of farmAssets) {
    if (seen.has(asset.id)) continue;
    const nameLower = asset.name.toLowerCase();
    const catLower = asset.category.toLowerCase();
    const eraLower = asset.era.toLowerCase();
    if (
      nameLower.includes(q) ||
      catLower.includes(q) ||
      eraLower.includes(q) ||
      asset.keywords.some(k => k.includes(q))
    ) {
      seen.add(asset.id);
      results.push(asset);
      if (results.length >= maxResults) break;
    }
  }
  return results;
}
