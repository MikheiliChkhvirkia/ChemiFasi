import axios from 'axios';
import { SearchFilters, SearchResponse, SiteSettings, Banner, ProductInteraction } from './types';

const baseURL = process.env.NODE_ENV === 'development' 
  ? 'https://localhost:7172/api/v1'
  : 'https://chemifasi.runasp.net/api/v1';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getSiteSettings = async (): Promise<SiteSettings> => {
  try {
    const { data } = await api.get('/sitesettings/get');
    return data;
  } catch (error) {
    console.error('[API] Site Settings Error:', error);
    return {
      storeCount: 0,
      storeSetting: {},
      categorizedStores: {},
      categories: {}
    };
  }
};

export const getBanners = async (): Promise<Banner[]> => {
  try {
    const { data } = await api.get('/sitesettings/get-banners');
    return data.filter((banner: Banner) => banner.position === 1);
  } catch (error) {
    console.error('[API] Banners Error:', error);
    return [];
  }
};

export const searchProducts = async (filters: SearchFilters): Promise<SearchResponse> => {
  try {
    const { query, sort, minPrice, maxPrice, categoryId } = filters;
    
    let sortValue = 1; // default relevance
    if (sort === 'price-asc') sortValue = 2;
    else if (sort === 'price-desc') sortValue = 3;
    else if (sort === 'discount') sortValue = 4;
    
    const params = new URLSearchParams();
    params.append('sort', sortValue.toString());

    if (query) {
      params.append('query', query);
    }

    if (typeof minPrice === 'number') {
      params.append('minPrice', minPrice.toString());
    }

    if (typeof maxPrice === 'number') {
      params.append('maxPrice', maxPrice.toString());
    }

    if (categoryId) {
      params.append('categoryId', categoryId);
    }

    const url = `/product/search?${params}`;
    
    const { data } = await api.get(url);
    
    return {
      products: data.products || [],
      totalCount: data.totalCount || 0,
      storeCounts: data.storeCounts || {},
    };
  } catch (error) {
    console.error('[API] Search API Error:', error);
    return {
      products: [],
      totalCount: 0,
      storeCounts: {},
    };
  }
};

export const detectImage = async (imageUrl: string): Promise<SearchResponse> => {
  try {
    const params = new URLSearchParams({ imageUrl });
    
    const { data } = await api.get(`/product/detect?${params}`);
    
    return {
      products: data.products || [],
      totalCount: data.totalCount || 0,
      storeCounts: data.storeCounts || {},
    };
  } catch (error) {
    console.error('[API] Image Detection API Error:', error);
    return {
      products: [],
      totalCount: 0,
      storeCounts: {},
    };
  }
};

export const trackProductInteraction = async (interaction: ProductInteraction): Promise<void> => {
  try {
    await api.post('/product/interact', interaction);
  } catch (error) {
    console.error('[API] Product Interaction Error:', error);
  }
};