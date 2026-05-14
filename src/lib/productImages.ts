const PLACEHOLDER_SVG = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="#1a1a2e"/><text x="200" y="140" text-anchor="middle" fill="rgba(168,85,247,0.4)" font-size="48">🌾</text><text x="200" y="190" text-anchor="middle" fill="rgba(168,85,247,0.25)" font-size="14" font-family="sans-serif">Product Image</text></svg>'
);

const PLACEHOLDER_LG = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="#1a1a2e"/><text x="400" y="280" text-anchor="middle" fill="rgba(168,85,247,0.4)" font-size="72">🌾</text><text x="400" y="360" text-anchor="middle" fill="rgba(168,85,247,0.25)" font-size="18" font-family="sans-serif">Product Image</text></svg>'
);

const FALLBACK = PLACEHOLDER_SVG;

export function getProductImage(productId: string, keyword: string): string {
  return PLACEHOLDER_SVG;
}

export function getProductImageLarge(productId: string, keyword: string): string {
  return PLACEHOLDER_LG;
}

export function getProductImageByKeyword(keyword: string): string {
  return PLACEHOLDER_SVG;
}

export function getProductImageLargeByKeyword(keyword: string): string {
  return PLACEHOLDER_LG;
}

export function getFallbackImage(): string {
  return FALLBACK;
}
