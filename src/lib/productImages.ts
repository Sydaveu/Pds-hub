const IMAGE_MAP: Record<string, string> = {
  // Rice
  'rice': '1586201375761-83865001e31c',
  'long-grain-rice': '1586201375761-83865001e31c',
  'basmati-rice': '1536304929831-ee1ca9d44906',
  'brown-rice': '1595854341625-f33ee10dbf94',
  'jasmine-rice': '1595854341625-f33ee10dbf94',
  'wild-rice': '1540189549336-e6e99c3679fe',
  'rice-bag': '1586201375761-83865001e31c',

  // Beans & Legumes
  'beans': '1557804506-669a67965ba0',
  'black-eyed-beans': '1557804506-669a67965ba0',
  'kidney-beans': '1584308666744-24d5c474f2ae',
  'navy-beans': '1490645935967-10de6ba17061',
  'chickpeas': '1540189549336-e6e99c3679fe',
  'lentils': '1467003909585-2f8a72700288',

  // Maize / Corn
  'maize': '1514326640560-7d063ef2aed5',
  'corn': '1514326640560-7d063ef2aed5',
  'corn-cob': '1551754655-cd27e38d2076',
  'maize-flour': '1514326640560-7d063ef2aed5',

  // Vegetables
  'tomatoes': '1592924357228-91a4daadcfea',
  'tomato': '1592924357228-91a4daadcfea',
  'carrots': '1540420773420-3366772f4999',
  'carrot': '1540420773420-3366772f4999',
  'bell-peppers': '1556801712-76c8eb07bbc9',
  'peppers': '1556801712-76c8eb07bbc9',
  'spinach': '1540420773420-3366772f4999',
  'onions': '1556801712-76c8eb07bbc9',
  'vegetables': '1540420773420-3366772f4999',

  // Fruits
  'mangoes': '1601493700631-2b16ec4b4716',
  'mango': '1601493700631-2b16ec4b4716',
  'pineapples': '1550258987-190a2d41a8ba',
  'pineapple': '1550258987-190a2d41a8ba',
  'bananas': '1550258987-190a2d41a8ba',
  'oranges': '1601493700631-2b16ec4b4716',
  'fruits': '1601493700631-2b16ec4b4716',

  // Livestock
  'goat': '1589923188900-85dae523342b',
  'livestock': '1589923188900-85dae523342b',
  'cow': '1570042225831-d98fa7577f1e',
  'sheep': '1589923188900-85dae523342b',

  // Poultry
  'chicken': '1548550023-2bdb3c5beed7',
  'broiler': '1548550023-2bdb3c5beed7',
  'turkey': '1548550023-2bdb3c5beed7',
  'duck': '1548550023-2bdb3c5beed7',
  'poultry': '1548550023-2bdb3c5beed7',

  // Fishery
  'tilapia': '1578575437130-527eed3abbec',
  'fish': '1578575437130-527eed3abbec',
  'catfish': '1505253758473-96b7015fcd40',
  'prawns': '1578575437130-527eed3abbec',
  'fishery': '1578575437130-527eed3abbec',
  'seafood': '1578575437130-527eed3abbec',

  // Dairy
  'milk': '1628088062854-d1870b4553da',
  'dairy': '1628088062854-d1870b4553da',
  'yogurt': '1628088062854-d1870b4553da',
  'cheese': '1628088062854-d1870b4553da',

  // Honey
  'honey': '1587049352846-4a222e784d38',
  'honeycomb': '1587049352846-4a222e784d38',

  // Yam
  'yam': '1598170845058-32b9d6a5da37',
  'yam-tubers': '1598170845058-32b9d6a5da37',
  'pounded-yam': '1598170845058-32b9d6a5da37',

  // Cassava
  'cassava': '1506803682981-6e718a9dd3ee',
  'cassava-flour': '1490818387583-1babb5f335e2',
  'garri': '1574323347407-f5e1ad6d020b',

  // Farm Tools
  'farm-tools': '1597848212624-a19eb35e2651',
  'hoe': '1597848212624-a19eb35e2651',
  'cutlass': '1597848212624-a19eb35e2651',
  'watering-can': '1597848212624-a19eb35e2651',
  'tools': '1597848212624-a19eb35e2651',

  // Fertilizers
  'fertilizer': '1600585154340-be6161a56a0c',
  'npk-fertilizer': '1600585154340-be6161a56a0c',
  'urea': '1600585154340-be6161a56a0c',
  'compost': '1600585154340-be6161a56a0c',
  'fertilizers': '1600585154340-be6161a56a0c',

  // Seeds
  'seeds': '1416879595882-3373a0480b5b',
  'maize-seeds': '1416879595882-3373a0480b5b',
  'vegetable-seeds': '1416879595882-3373a0480b5b',
  'rice-seedlings': '1416879595882-3373a0480b5b',

  // Pets
  'puppy': '1552053831-71594a27632d',
  'golden-retriever': '1552053831-71594a27632d',
  'pet-bowl': '1552053831-71594a27632d',
  'pets': '1552053831-71594a27632d',

  // Crops / General
  'crops': '1586201375761-83865001e31c',
  'millet': '1514326640560-7d063ef2aed5',

  // Fallback
  'default': '1586201375761-83865001e31c',
};

const FALLBACK_ID = '1586201375761-83865001e31c';

export function getProductImage(keyword: string): string {
  const cleanKey = keyword.toLowerCase().trim().replace(/\s+/g, '-');
  const id = IMAGE_MAP[cleanKey] || IMAGE_MAP['default']!;
  return `https://images.unsplash.com/photo-${id}?w=400&q=80`;
}

export function getProductImageLarge(keyword: string): string {
  const cleanKey = keyword.toLowerCase().trim().replace(/\s+/g, '-');
  const id = IMAGE_MAP[cleanKey] || FALLBACK_ID;
  return `https://images.unsplash.com/photo-${id}?w=800&q=80`;
}
