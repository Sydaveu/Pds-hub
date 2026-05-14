// Image Service for fetching real product images from external APIs

const imageCache = new Map<string, string>();

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80';

export function getFallbackImage(): string {
  return FALLBACK_IMAGE;
}

function buildSearchQuery(productName: string, category: string): string {
  const nameLower = productName.toLowerCase();
  const categoryLower = category.toLowerCase();

  const terms = [nameLower];

  if (categoryLower.includes('food') || ['rice', 'beans', 'yam', 'cassava', 'maize', 'wheat', 'millet', 'sorghum', 'vegetables', 'fruits', 'palm oil', 'groundnut', 'pepper', 'plantain', 'potato', 'cocoa', 'coffee', 'dairy', 'honey', 'spices', 'snacks'].some(term => nameLower.includes(term))) {
    terms.push('agriculture', 'product', 'farm', 'market');
  }

  if (categoryLower.includes('tools') || ['cutlass', 'hoe', 'tractor', 'shovel', 'wheelbarrow', 'axe', 'harvester', 'plough', 'irrigation', 'chainsaw', 'drone', 'greenhouse'].some(term => nameLower.includes(term))) {
    terms.push('farm', 'equipment', 'agriculture', 'tool');
  }

  if (categoryLower.includes('animals') || ['dog', 'cat', 'goat', 'cow', 'sheep', 'pig', 'horse', 'donkey', 'camel', 'chicken', 'duck', 'turkey', 'fish', 'rabbit', 'parrot', 'peacock', 'ostrich'].some(term => nameLower.includes(term))) {
    terms.push('animal', 'livestock', 'farm', 'breed');
  }

  return terms.slice(0, 3).join(' ');
}

async function fetchFromPexels(query: string): Promise<string | null> {
  try {
    const apiKey = import.meta.env.VITE_PEXELS_API_KEY;
    if (!apiKey) return null;

    const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=square`, {
      headers: { Authorization: apiKey }
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (data.photos?.length > 0) return data.photos[0].src.medium;

    return null;
  } catch {
    return null;
  }
}

async function fetchFromPixabay(query: string): Promise<string | null> {
  try {
    const apiKey = import.meta.env.VITE_PIXABAY_API_KEY;
    if (!apiKey) return null;

    const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&per_page=1&safesearch=true`);
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

    const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=square&content_filter=high`, {
      headers: { Authorization: `Client-ID ${apiKey}` }
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (data.results?.length > 0) return data.results[0].urls.regular;

    return null;
  } catch {
    return null;
  }
}

function getPermanentFallbackImage(productId: string, productName: string): string {
  const cleanName = productName.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-');
  const seed = `${productId}-${cleanName}`;
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/400/400`;
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

    imageUrl = await fetchFromPixabay(searchQuery);
    if (imageUrl) { imageCache.set(cacheKey, imageUrl); return imageUrl; }

    imageUrl = await fetchFromUnsplash(searchQuery);
    if (imageUrl) { imageCache.set(cacheKey, imageUrl); return imageUrl; }

    const fallbackUrl = getPermanentFallbackImage(productId, productName);
    imageCache.set(cacheKey, fallbackUrl);
    return fallbackUrl;
  } catch {
    const fallbackUrl = getPermanentFallbackImage(productId, productName);
    imageCache.set(cacheKey, fallbackUrl);
    return fallbackUrl;
  }
}

export function clearImageCache(): void {
  imageCache.clear();
}
