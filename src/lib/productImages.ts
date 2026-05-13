const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80';

export function getProductImage(keyword: string): string {
  const clean = keyword.toLowerCase().trim().replace(/\s+/g, '-');
  return `https://source.unsplash.com/featured/?${encodeURIComponent(clean)}&w=400&q=80`;
}

export function getProductImageLarge(keyword: string): string {
  const clean = keyword.toLowerCase().trim().replace(/\s+/g, '-');
  return `https://source.unsplash.com/featured/?${encodeURIComponent(clean)}&w=800&q=80`;
}

export function getFallbackImage(): string {
  return FALLBACK_IMAGE;
}
