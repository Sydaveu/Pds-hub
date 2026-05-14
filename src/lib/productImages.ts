// Use Picsum.photos for all images - provides real photographs that are:
// 1. Permanent: same seed + size = same image forever
// 2. Unique: different seeds = different images
// 3. Real: actual photographs, not illustrations or AI-generated
// 4. Free: no API keys required, no rate limits for reasonable usage
const PICSUM_BASE = (seed: string) => `https://picsum.photos/seed/${encodeURIComponent(seed)}`;

const FALLBACK_SEED = 'fallback'; // Permanent fallback image

export function getProductImage(productId: string, keyword: string): string {
  const clean = keyword.toLowerCase().trim().replace(/\s+/g, '-');
  // Create unique seed combining product ID and keyword
  // This ensures:
  // 1. Same product/keyword = same image (permanent)
  // 2. Different products = different images (unique)
  // 3. Same keyword in different products = different images (no cross-contamination)
  const seed = `${productId}-${clean}`;
  return `${PICSUM_BASE(seed)}/400/300`;
}

export function getProductImageLarge(productId: string, keyword: string): string {
  const clean = keyword.toLowerCase().trim().replace(/\s+/g, '-');
  const seed = `${productId}-${clean}`;
  return `${PICSUM_BASE(seed)}/800/600`;
}

// Overload for backward compatibility - used in search, thumbs, fallbacks where we don't have product ID
export function getProductImageByKeyword(keyword: string): string {
  const clean = keyword.toLowerCase().trim().replace(/\s+/g, '-');
  // Use hash of keyword to ensure consistency, but add namespace to avoid collisions
  const seed = `keyword-${clean}`;
  return `${PICSUM_BASE(seed)}/400/300`;
}

export function getProductImageLargeByKeyword(keyword: string): string {
  const clean = keyword.toLowerCase().trim().replace(/\s+/g, '-');
  const seed = `keyword-${clean}`;
  return `${PICSUM_BASE(seed)}/800/600`;
}

export function getFallbackImage(): string {
  return `${PICSUM_BASE(FALLBACK_SEED)}/400/300`;
}