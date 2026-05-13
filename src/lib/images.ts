const BASE = 'https://images.unsplash.com/photo-';

export const PHOTO_IDS: Record<string, string[]> = {
  rice: [
    '1536304929831-ee1ca9d44906', '1586201375761-83865001e31c',
    '1595854341625-f33ee10dbf94', '1467003909585-2f8a72700288',
    '1574323347407-f5e1ad6d020b', '1540189549336-e6e99c3679fe',
  ],
  beans: [
    '1557804506-669a67965ba0', '1584308666744-24d5c474f2ae',
    '1490645935967-10de6ba17061', '1559847844-5315695dadae',
    '1467003909585-2f8a72700288', '1540189549336-e6e99c3679fe',
  ],
  maize: [
    '1514326640560-7d063ef2aed5', '1551754655-cd27e38d2076',
    '1542838132-92c53300491e', '1595854341625-f33ee10dbf94',
    '1559847844-5315695dadae',
  ],
  yam: [
    '1598170845058-32b9d6a5da37', '1506803682981-6e718a9dd3ee',
    '1540189549336-e6e99c3679fe', '1490645935967-10de6ba17061',
    '1467003909585-2f8a72700288',
  ],
  cassava: [
    '1506803682981-6e718a9dd3ee', '1490645935967-10de6ba17061',
    '1540189549336-e6e99c3679fe', '1467003909585-2f8a72700288',
    '1598170845058-32b9d6a5da37',
  ],
  vegetables: [
    '1540420773420-3366772f4999', '1592924357228-91a4daadcfea',
    '1556801712-76c8eb07bbc9', '1559847844-5315695dadae',
    '1490818387583-1babb5f335e2', '1506803682981-6e718a9dd3ee',
    '1574323347407-f5e1ad6d020b',
  ],
  fruits: [
    '1601493700631-2b16ec4b4716', '1550258987-190a2d41a8ba',
    '1490818387583-1babb5f335e2', '1595854341625-f33ee10dbf94',
    '1559847844-5315695dadae', '1506803682981-6e718a9dd3ee',
  ],
  livestock: [
    '1589923188900-85dae523342b', '1570042225831-d98fa7577f1e',
    '1559847844-5315695dadae', '1574323347407-f5e1ad6d020b',
    '1467003909585-2f8a72700288',
  ],
  poultry: [
    '1548550023-2bdb3c5beed7', '1559847844-5315695dadae',
    '1506803682981-6e718a9dd3ee', '1574323347407-f5e1ad6d020b',
    '1467003909585-2f8a72700288',
  ],
  fishery: [
    '1578575437130-527eed3abbec', '1505253758473-96b7015fcd40',
    '1559847844-5315695dadae', '1540189549336-e6e99c3679fe',
    '1490645935967-10de6ba17061',
  ],
  dairy: [
    '1628088062854-d1870b4553da', '1559847844-5315695dadae',
    '1506803682981-6e718a9dd3ee', '1467003909585-2f8a72700288',
  ],
  honey: [
    '1587049352846-4a222e784d38', '1559847844-5315695dadae',
    '1506803682981-6e718a9dd3ee', '1490645935967-10de6ba17061',
  ],
  seeds: [
    '1416879595882-3373a0480b5b', '1506803682981-6e718a9dd3ee',
    '1490818387583-1babb5f335e2', '1467003909585-2f8a72700288',
  ],
  tools: [
    '1597848212624-a19eb35e2651', '1559847844-5315695dadae',
    '1506803682981-6e718a9dd3ee', '1540189549336-e6e99c3679fe',
    '1490645935967-10de6ba17061',
  ],
  fertilizers: [
    '1506803682981-6e718a9dd3ee', '1490645935967-10de6ba17061',
    '1467003909585-2f8a72700288', '1540189549336-e6e99c3679fe',
  ],
  pets: [
    '1559847844-5315695dadae', '1589923188900-85dae523342b',
    '1506803682981-6e718a9dd3ee', '1574323347407-f5e1ad6d020b',
  ],
  oils: [
    '1490645935967-10de6ba17061', '1506803682981-6e718a9dd3ee',
    '1540189549336-e6e99c3679fe', '1467003909585-2f8a72700288',
  ],
  spices: [
    '1559847844-5315695dadae', '1490818387583-1babb5f335e2',
    '1506803682981-6e718a9dd3ee', '1574323347407-f5e1ad6d020b',
  ],
  general: [
    '1506803682981-6e718a9dd3ee', '1559847844-5315695dadae',
    '1490645935967-10de6ba17061', '1467003909585-2f8a72700288',
    '1540189549336-e6e99c3679fe', '1574323347407-f5e1ad6d020b',
    '1490818387583-1babb5f335e2',
  ],
};

function shuffle<T>(a: T[]): T[] {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getImages(category: string, count: number): string[] {
  const ids = PHOTO_IDS[category] || PHOTO_IDS.general;
  const shuffled = shuffle(ids);
  const result: string[] = [];
  const w = 400;
  for (let i = 0; i < count; i++) {
    const id = shuffled[i % shuffled.length];
    const q = 80 - (i % 3) * 5;
    result.push(`${BASE}${id}?w=${w}&q=${q}`);
  }
  return result;
}

export function getImageUrl(category: string, seed?: number): string {
  const ids = PHOTO_IDS[category] || PHOTO_IDS.general;
  const idx = (seed ?? 0) % ids.length;
  return `${BASE}${ids[idx]}?w=400&q=80`;
}

export function getGallery(category: string, count: number = 5): string[] {
  return getImages(category, count);
}

export function getCategoryImageUrl(category: string): string {
  return getImageUrl(category, 0);
}
