import axios from 'axios';
import { SearchFilters, SearchResponse, SiteSettings } from './types';

const baseURL = process.env.NODE_ENV === 'development' 
  ? 'https://localhost:7172/api/v1'
  : 'https://api.chemifasi.ge/api/v1';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getSiteSettings = async (): Promise<SiteSettings> => {
  const { data } = await api.get('/sitesettings/get');
  return data;
};

export const searchProducts = async (filters: SearchFilters): Promise<SearchResponse> => {
  try {
    const { query, sort, minPrice, maxPrice, categoryId } = filters;
    const sortValue = sort === 'relevance' ? 1 : sort === 'price-asc' ? 2 : 3;
    
    const params = new URLSearchParams({
      ...(query && { query }),
      sort: sortValue.toString(),
      ...(minPrice && { minPrice: minPrice.toString() }),
      ...(maxPrice && { maxPrice: maxPrice.toString() }),
      ...(categoryId && { categoryId: categoryId.toString() }),
    });

    console.log('Search API URL:', `${baseURL}/product/search?${params}`);
    
    const { data } = await api.get(`/product/search?${params}`);
    console.log('Search API Response:', data);
    
    return {
      products: data.products || [],
      totalCount: data.totalCount || 0,
      storeCounts: data.storeCounts || {},
    };
  } catch (error) {
    console.error('Search API Error:', error);
    // Return empty response on error
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
    console.log('Image Detection API URL:', `${baseURL}/product/detect?${params}`);
    
    const { data } = await api.get(`/product/detect?${params}`);
    console.log('Image Detection API Response:', data);
    
    return {
      products: data.products || [],
      totalCount: data.totalCount || 0,
      storeCounts: data.storeCounts || {},
    };
  } catch (error) {
    console.error('Image Detection API Error:', error);
    // Return empty response on error
    return {
      products: [],
      totalCount: 0,
      storeCounts: {},
    };
  }
};