const CDN = (id: string) => `https://images.unsplash.com/photo-${id}?w=400&q=80`;
const CDN_LARGE = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&q=80`;

const PICSUM = (seed: string) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/400/300`;
const PICSUM_LARGE = (seed: string) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/800/600`;

const FALLBACK = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80';

const ID: Record<string, string> = {
  // ═══════════════ FOOD ═══════════════
  'rice': '1586201375761-83865001e31c',
  'long-grain-rice': '1586201375761-83865001e31c',
  'basmati-rice': '1536304929831-ee1ca9d44906',
  'brown-rice': '1595854341625-f33ee10dbf94',
  'jasmine-rice': '1595854341625-f33ee10dbf94',
  'wild-rice': '1540189549336-e6e99c3679fe',
  'jollof-rice': '1586201375761-83865001e31c',
  'fried-rice': '1586201375761-83865001e31c',
  'coconut-rice': '1586201375761-83865001e31c',

  'beans': '1557804506-669a67965ba0',
  'black-eyed-beans': '1557804506-669a67965ba0',
  'kidney-beans': '1584308666744-24d5c474f2ae',
  'navy-beans': '1490645935967-10de6ba17061',
  'chickpeas': '1540189549336-e6e99c3679fe',
  'lentils': '1467003909585-2f8a72700288',
  'brown-beans': '1557804506-669a67965ba0',
  'green-beans': '1557804506-669a67965ba0',

  'yam': '1598170845058-32b9d6a5da37',
  'pounded-yam': '1598170845058-32b9d6a5da37',
  'white-yam': '1598170845058-32b9d6a5da37',
  'yellow-yam': '1598170845058-32b9d6a5da37',
  'water-yam': '1598170845058-32b9d6a5da37',

  'cassava': '1506803682981-6e718a9dd3ee',
  'cassava-flour': '1490818387583-1babb5f335e2',
  'cassava-leaves': '1506803682981-6e718a9dd3ee',
  'cassava-chips': '1490818387583-1babb5f335e2',

  'garri': '1574323347407-f5e1ad6d020b',

  'maize': '1514326640560-7d063ef2aed5',
  'corn': '1551754655-cd27e38d2076',
  'maize-flour': '1514326640560-7d063ef2aed5',
  'sweet-corn': '1551754655-cd27e38d2076',
  'popcorn': '1586201375761-83865001e31c',

  'wheat': '1586201375761-83865001e31c',
  'wheat-bran': '1586201375761-83865001e31c',

  'millet': '1514326640560-7d063ef2aed5',
  'millet-flour': '1514326640560-7d063ef2aed5',
  'finger-millet': '1514326640560-7d063ef2aed5',

  'sorghum': '1514326640560-7d063ef2aed5',
  'sorghum-flour': '1514326640560-7d063ef2aed5',

  'tomatoes': '1592924357228-91a4daadcfea',
  'carrots': '1540420773420-3366772f4999',
  'bell-peppers': '1556801712-76c8eb07bbc9',
  'spinach': '1540420773420-3366772f4999',
  'onions': '1556801712-76c8eb07bbc9',
  'cabbage': '1598031410390-1a3a1b5a5b5c',
  'lettuce': '1540420773420-3366772f4999',
  'cucumber': '1592924357228-91a4daadcfea',
  'zucchini': '1592924357228-91a4daadcfea',
  'broccoli': '1598031410390-1a3a1b5a5b5c',
  'cauliflower': '1598031410390-1a3a1b5a5b5c',
  'eggplant': '1592924357228-91a4daadcfea',
  'okra': '1592924357228-91a4daadcfea',
  'bitter-leaf': '1540420773420-3366772f4999',
  'ugu': '1540420773420-3366772f4999',
  'waterleaf': '1540420773420-3366772f4999',

  'mangoes': '1601493700631-2b16ec4b4716',
  'pineapples': '1550258987-190a2d41a8ba',
  'bananas': '1550258987-190a2d41a8ba',
  'oranges': '1601493700631-2b16ec4b4716',
  'apples': '1550258987-190a2d41a8ba',
  'grapes': '1601493700631-2b16ec4b4716',
  'watermelon': '1550258987-190a2d41a8ba',
  'pawpaw': '1601493700631-2b16ec4b4716',
  'avocado': '1601493700631-2b16ec4b4716',
  'strawberries': '1550258987-190a2d41a8ba',
  'blueberries': '1601493700631-2b16ec4b4716',
  'lemons': '1601493700631-2b16ec4b4716',
  'lime': '1601493700631-2b16ec4b4716',
  'coconut': '1601493700631-2b16ec4b4716',
  'dates': '1601493700631-2b16ec4b4716',

  'palm-oil': '1600585154340-be6161a56a0c',

  'groundnut': '1557804506-669a67965ba0',
  'groundnut-oil': '1600585154340-be6161a56a0c',

  'red-pepper': '1556801712-76c8eb07bbc9',
  'scotch-bonnet': '1556801712-76c8eb07bbc9',
  'dried-pepper': '1556801712-76c8eb07bbc9',
  'cayenne': '1556801712-76c8eb07bbc9',
  'black-pepper': '1556801712-76c8eb07bbc9',

  'plantain': '1598170845058-32b9d6a5da37',
  'plantain-flour': '1598170845058-32b9d6a5da37',
  'plantain-chips': '1598170845058-32b9d6a5da37',

  'potato': '1586201375761-83865001e31c',
  'sweet-potato': '1586201375761-83865001e31c',
  'potato-chips': '1586201375761-83865001e31c',
  'mashed-potato': '1586201375761-83865001e31c',

  'cocoa': '1600585154340-be6161a56a0c',
  'cocoa-powder': '1600585154340-be6161a56a0c',
  'cocoa-butter': '1600585154340-be6161a56a0c',

  'coffee': '1536304929831-ee1ca9d44906',
  'coffee-beans': '1536304929831-ee1ca9d44906',
  'instant-coffee': '1536304929831-ee1ca9d44906',

  'bread': '1586201375761-83865001e31c',
  'wheat-bread': '1586201375761-83865001e31c',
  'baguette': '1586201375761-83865001e31c',
  'croissant': '1586201375761-83865001e31c',

  'spaghetti': '1586201375761-83865001e31c',
  'macaroni': '1586201375761-83865001e31c',
  'penne': '1586201375761-83865001e31c',
  'lasagna': '1586201375761-83865001e31c',
  'noodles': '1586201375761-83865001e31c',

  'pizza': '1586201375761-83865001e31c',
  'burger': '1586201375761-83865001e31c',
  'shawarma': '1586201375761-83865001e31c',
  'sushi': '1586201375761-83865001e31c',
  'caesar-salad': '1540420773420-3366772f4999',

  'chicken': '1548550023-2bdb3c5beed7',
  'goat-meat': '1589923188900-85dae523342b',
  'beef': '1570042225831-d98fa7577f1e',
  'turkey': '1548550023-2bdb3c5beed7',
  'tilapia': '1578575437130-527eed3abbec',
  'catfish': '1505253758473-96b7015fcd40',
  'salmon': '1578575437130-527eed3abbec',
  'prawns': '1578575437130-527eed3abbec',
  'snails': '1578575437130-527eed3abbec',
  'beef-liver': '1570042225831-d98fa7577f1e',
  'shrimp': '1578575437130-527eed3abbec',

  'egusi-soup': '1586201375761-83865001e31c',
  'ogbono-soup': '1586201375761-83865001e31c',
  'afang-soup': '1540420773420-3366772f4999',
  'nsala-soup': '1586201375761-83865001e31c',
  'banga-soup': '1586201375761-83865001e31c',
  'okro-soup': '1592924357228-91a4daadcfea',
  'vegetable-soup': '1540420773420-3366772f4999',

  'milk': '1628088062854-d1870b4553da',
  'yogurt': '1628088062854-d1870b4553da',
  'cheese': '1628088062854-d1870b4553da',
  'butter': '1628088062854-d1870b4553da',
  'ice-cream': '1628088062854-d1870b4553da',

  'honey': '1587049352846-4a222e784d38',
  'honeycomb': '1587049352846-4a222e784d38',
  'manuka-honey': '1587049352846-4a222e784d38',

  'spices': '1586201375761-83865001e31c',
  'curry': '1586201375761-83865001e31c',
  'thyme': '1540420773420-3366772f4999',
  'ginger': '1586201375761-83865001e31c',
  'garlic': '1586201375761-83865001e31c',
  'seasoning': '1586201375761-83865001e31c',
  'turmeric': '1586201375761-83865001e31c',
  'cinnamon': '1586201375761-83865001e31c',
  'nutmeg': '1586201375761-83865001e31c',

  'cake': '1586201375761-83865001e31c',
  'doughnuts': '1586201375761-83865001e31c',
  'meat-pie': '1586201375761-83865001e31c',
  'samosa': '1586201375761-83865001e31c',
  'chin-chin': '1586201375761-83865001e31c',

  'frozen-vegetables': '1592924357228-91a4daadcfea',
  'frozen-chicken': '1548550023-2bdb3c5beed7',
  'frozen-fish': '1578575437130-527eed3abbec',
  'frozen-pizza': '1586201375761-83865001e31c',

  'organic-vegetables': '1540420773420-3366772f4999',
  'organic-fruits': '1601493700631-2b16ec4b4716',
  'organic-eggs': '1548550023-2bdb3c5beed7',

  // ═══════════════ TOOLS ═══════════════
  'cutlass': '1597848212624-a19eb35e2651',
  'hoe': '1597848212624-a19eb35e2651',
  'garden-fork': '1597848212624-a19eb35e2651',
  'rake': '1597848212624-a19eb35e2651',
  'axe': '1597848212624-a19eb35e2651',
  'shovel': '1597848212624-a19eb35e2651',
  'wheelbarrow': '1597848212624-a19eb35e2651',
  'watering-can': '1597848212624-a19eb35e2651',
  'sprayer': '1597848212624-a19eb35e2651',
  'pruning-shears': '1597848212624-a19eb35e2651',
  'pickaxe': '1597848212624-a19eb35e2651',
  'scythe': '1597848212624-a19eb35e2651',
  'trowel': '1597848212624-a19eb35e2651',
  'gloves': '1597848212624-a19eb35e2651',

  'tractor': '1597848212624-a19eb35e2651',
  'bulldozer': '1597848212624-a19eb35e2651',
  'harvester': '1597848212624-a19eb35e2651',
  'plough': '1597848212624-a19eb35e2651',
  'seed-planter': '1597848212624-a19eb35e2651',
  'irrigation': '1597848212624-a19eb35e2651',
  'excavator': '1597848212624-a19eb35e2651',
  'chainsaw': '1597848212624-a19eb35e2651',
  'grinding-machine': '1597848212624-a19eb35e2651',
  'rice-mill': '1597848212624-a19eb35e2651',
  'palm-oil-machine': '1597848212624-a19eb35e2651',
  'cassava-machine': '1597848212624-a19eb35e2651',
  'packaging-machine': '1597848212624-a19eb35e2651',

  'greenhouse': '1597848212624-a19eb35e2651',
  'drone': '1597848212624-a19eb35e2651',
  'gps': '1597848212624-a19eb35e2651',
  'soil-tester': '1597848212624-a19eb35e2651',
  'electric-fence': '1597848212624-a19eb35e2651',
  'incubator': '1597848212624-a19eb35e2651',
  'water-pump': '1597848212624-a19eb35e2651',
  'pellet-machine': '1597848212624-a19eb35e2651',
  'drip-irrigation': '1597848212624-a19eb35e2651',
  'cold-storage': '1597848212624-a19eb35e2651',
  'weighing-scale': '1597848212624-a19eb35e2651',

  // ═══════════════ ANIMALS ═══════════════
  // Dogs
  'german-shepherd-puppy': '1552053831-71594a27632d',
  'rottweiler-puppy': '1552053831-71594a27632d',
  'pitbull-puppy': '1552053831-71594a27632d',
  'husky-puppy': '1552053831-71594a27632d',
  'bulldog-puppy': '1552053831-71594a27632d',
  'chihuahua-puppy': '1552053831-71594a27632d',
  'labrador-puppy': '1552053831-71594a27632d',
  'golden-retriever-puppy': '1552053831-71594a27632d',
  'caucasian-shepherd': '1552053831-71594a27632d',
  'boerboel-puppy': '1552053831-71594a27632d',
  'poodle-puppy': '1552053831-71594a27632d',
  'doberman-puppy': '1552053831-71594a27632d',
  'american-eskimo': '1552053831-71594a27632d',
  'japanese-spitz': '1552053831-71594a27632d',
  'alsatian-puppy': '1552053831-71594a27632d',
  'belgian-malinois': '1552053831-71594a27632d',
  'great-dane-puppy': '1552053831-71594a27632d',
  'pomeranian-puppy': '1552053831-71594a27632d',
  'cocker-spaniel': '1552053831-71594a27632d',
  'dalmatian-puppy': '1552053831-71594a27632d',
  'boxer-puppy': '1552053831-71594a27632d',
  'maltese-puppy': '1552053831-71594a27632d',
  'shih-tzu': '1552053831-71594a27632d',
  'bullmastiff-puppy': '1552053831-71594a27632d',
  'bichon-frise': '1552053831-71594a27632d',

  // Cats
  'persian-cat': '1552053831-71594a27632d',
  'siamese-cat': '1552053831-71594a27632d',
  'maine-coon': '1552053831-71594a27632d',
  'bengal-cat': '1552053831-71594a27632d',
  'british-shorthair': '1552053831-71594a27632d',
  'sphynx-cat': '1552053831-71594a27632d',
  'ragdoll-cat': '1552053831-71594a27632d',
  'scottish-fold': '1552053831-71594a27632d',
  'abyssinian-cat': '1552053831-71594a27632d',

  // Fish
  'koi-fish': '1578575437130-527eed3abbec',
  'goldfish': '1578575437130-527eed3abbec',
  'tropical-fish': '1578575437130-527eed3abbec',
  'arowana': '1578575437130-527eed3abbec',
  'guppy': '1578575437130-527eed3abbec',
  'molly-fish': '1578575437130-527eed3abbec',
  'angelfish': '1578575437130-527eed3abbec',
  'discus-fish': '1578575437130-527eed3abbec',
  'cichlid': '1578575437130-527eed3abbec',
  'betta-fish': '1578575437130-527eed3abbec',

  // Birds / Fowl
  'broiler-chicks': '1548550023-2bdb3c5beed7',
  'laying-hens': '1548550023-2bdb3c5beed7',
  'turkey-poults': '1548550023-2bdb3c5beed7',
  'duck': '1548550023-2bdb3c5beed7',
  'goose': '1548550023-2bdb3c5beed7',
  'pigeon': '1548550023-2bdb3c5beed7',
  'african-grey-parrot': '1548550023-2bdb3c5beed7',
  'peacock': '1548550023-2bdb3c5beed7',
  'quail': '1548550023-2bdb3c5beed7',
  'guinea-fowl': '1548550023-2bdb3c5beed7',
  'ostrich': '1548550023-2bdb3c5beed7',
  'lovebirds': '1548550023-2bdb3c5beed7',
  'canary': '1548550023-2bdb3c5beed7',
  'cockatiel': '1548550023-2bdb3c5beed7',
  'macaw': '1548550023-2bdb3c5beed7',

  // Livestock
  'cow': '1570042225831-d98fa7577f1e',
  'calf': '1570042225831-d98fa7577f1e',
  'dairy-cow': '1570042225831-d98fa7577f1e',
  'goat': '1589923188900-85dae523342b',
  'dwarf-goat': '1589923188900-85dae523342b',
  'ram': '1589923188900-85dae523342b',
  'sheep': '1589923188900-85dae523342b',
  'pig': '1589923188900-85dae523342b',
  'horse': '1570042225831-d98fa7577f1e',
  'donkey': '1570042225831-d98fa7577f1e',
  'camel': '1570042225831-d98fa7577f1e',
  'rabbit': '1552053831-71594a27632d',
  'white-rabbit': '1552053831-71594a27632d',
  'grasscutter': '1589923188900-85dae523342b',
  'snail-farming': '1589923188900-85dae523342b',
};

export function getProductImage(keyword: string): string {
  const clean = keyword.toLowerCase().trim().replace(/\s+/g, '-');
  const id = ID[clean];
  if (id) return CDN(id);
  return PICSUM(clean);
}

export function getProductImageLarge(keyword: string): string {
  const clean = keyword.toLowerCase().trim().replace(/\s+/g, '-');
  const id = ID[clean];
  if (id) return CDN_LARGE(id);
  return PICSUM_LARGE(clean);
}

export function getFallbackImage(): string {
  return FALLBACK;
}
