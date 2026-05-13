import { allProducts, type Product } from './productData';
import { farmAssets, type FarmAsset } from '../data/farmAssets';

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

export interface SearchResult {
  product: Product;
  score: number;
  matchType: 'prefix' | 'substring' | 'fuzzy' | 'tag';
}

export function searchProducts(query: string, maxResults = 8): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: SearchResult[] = [];
  const seen = new Set<string>();

  for (const product of allProducts) {
    if (seen.has(product.id)) continue;
    const nameLower = product.name.toLowerCase();
    const catLower = product.category.toLowerCase();
    const subLower = product.subcategory.toLowerCase();
    const searchable = [nameLower, catLower, subLower, ...product.searchTags.map(t => t.toLowerCase())];

    let bestScore = Infinity;
    let matchType: SearchResult['matchType'] = 'fuzzy';

    for (const text of searchable) {
      if (text === q || text.startsWith(q + ' ') || text === q + 's' || text === q + 'es') {
        bestScore = 0;
        matchType = 'prefix';
        break;
      }
      if (text.startsWith(q)) {
        if (bestScore > 1) { bestScore = 1; matchType = 'prefix'; }
      }
      if (text.includes(q)) {
        if (bestScore > 2) { bestScore = 2; matchType = 'substring'; }
      }
      if (q.length >= 2) {
        const qWords = q.split(' ');
        let foundAll = true, totalDist = 0;
        for (const qw of qWords) {
          let minDist = Infinity;
          const tWords = text.split(' ');
          for (const tw of tWords) {
            const dist = levenshtein(qw, tw);
            if (dist < minDist) minDist = dist;
          }
          if (minDist > 2) { foundAll = false; break; }
          totalDist += minDist;
        }
        if (foundAll && totalDist < bestScore) {
          bestScore = totalDist;
          matchType = 'fuzzy';
        }
      }
    }

    if (bestScore < 5) {
      seen.add(product.id);
      results.push({ product, score: bestScore, matchType });
    }
  }

  return results
    .sort((a, b) => a.score - b.score || a.product.name.localeCompare(b.product.name))
    .slice(0, maxResults);
}

export function getAutocompleteSuggestions(query: string, maxResults = 6): { text: string; category: string; mainCategory: string }[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const seen = new Set<string>();
  const results: { text: string; category: string; mainCategory: string }[] = [];

  for (const product of allProducts) {
    const checks: { text: string; category: string; mainCategory: string }[] = [
      { text: product.name, category: product.category, mainCategory: product.mainCategory },
      { text: product.category, category: product.category, mainCategory: product.mainCategory },
    ];
    for (const c of checks) {
      if (seen.has(c.text)) continue;
      const lower = c.text.toLowerCase();
      if (lower.startsWith(q) || lower.includes(q)) {
        seen.add(c.text);
        results.push(c);
        if (results.length >= maxResults) return results;
      }
    }
  }

  return results.slice(0, maxResults);
}

export interface FarmAssetSearchResult {
  asset: FarmAsset;
  score: number;
}

export function searchFarmAssets(query: string, maxResults = 4): FarmAssetSearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const results: FarmAssetSearchResult[] = [];
  const seen = new Set<string>();
  for (const asset of farmAssets) {
    if (seen.has(asset.id)) continue;
    const searchable = [
      asset.name.toLowerCase(),
      asset.category.toLowerCase(),
      asset.era.toLowerCase(),
      asset.description.toLowerCase(),
      ...asset.keywords.map(k => k.toLowerCase()),
    ];
    let bestScore = Infinity;
    for (const text of searchable) {
      if (text === q || text.startsWith(q)) { bestScore = 1; break; }
      if (text.includes(q)) { if (bestScore > 2) bestScore = 2; }
    }
    if (bestScore < 5) {
      seen.add(asset.id);
      results.push({ asset, score: bestScore });
      if (results.length >= maxResults) break;
    }
  }
  return results.sort((a, b) => a.score - b.score);
}

export function getFarmAssetAutocompleteSuggestions(query: string, maxResults = 3): { text: string; era: string; category: string }[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const seen = new Set<string>();
  const results: { text: string; era: string; category: string }[] = [];
  for (const asset of farmAssets) {
    if (seen.has(asset.name)) continue;
    if (asset.name.toLowerCase().includes(q) || asset.keywords.some(k => k.includes(q))) {
      seen.add(asset.name);
      results.push({ text: asset.name, era: asset.era, category: asset.category });
      if (results.length >= maxResults) break;
    }
  }
  return results;
}
