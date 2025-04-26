export interface Product {
  name: string;
  price: number;
  salePrice: number | null;
  url: string;
  imageUrl: string | null;
  source: number;
  productKey: string;
  relevanceScore?: number;
}

export interface StoreSetting {
  title: string;
  color: string;
  imageUrl: string;
  link: string;
}

export interface StoreSettings {
  [key: string]: StoreSetting;
}

export interface CategoryInfo {
  title: string;
  color: string;
  imageUrl: string;
}

export interface CategorizedStores {
  [categoryId: string]: {
    [storeId: string]: StoreSetting;
  };
}

export interface SearchResponse {
  products: Product[];
  totalCount: number;
  storeCounts: Record<string, number>;
}

export interface SiteSettings {
  storeCount: number;
  storeSetting: StoreSettings;
  categorizedStores: CategorizedStores;
  categories: Record<string, CategoryInfo>;
}

export interface Banner {
  orderNo: number;
  position: number;
  title: string;
  route: string;
  webImageUrl: string;
  mobileImageUrl: string;
}

export type SortType = 'relevance' | 'price-asc' | 'price-desc' | 'discount';

export interface SearchFilters {
  query: string;
  sort: SortType;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: string;
}