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
    const { query, sort, minPrice, maxPrice, categoryId, location } = filters;
    const sortValue = sort === 'relevance' ? 1 : sort === 'price-asc' ? 2 : 3;
    
    const params: Record<string, string> = {
      sort: sortValue.toString(),
    };

    if (query) params.query = query;
    if (minPrice) params.minPrice = minPrice.toString();
    if (maxPrice) params.maxPrice = maxPrice.toString();
    if (categoryId) params.categoryId = categoryId.toString();
    console.log("Location is here")
    console.log(location)
    if (location) {
      params.latitude = location.latitude.toString();
      params.longitude = location.longitude.toString();
    }

    const searchParams = new URLSearchParams(params);
    
    const { data } = await api.get(`/product/search?${searchParams}`);
    
    return {
      products: data.products || [],
      totalCount: data.totalCount || 0,
      storeCounts: data.storeCounts || {},
    };
  } catch (error) {
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
    console.error('Image Detection API Error:', error);
    return {
      products: [],
      totalCount: 0,
      storeCounts: {},
    };
  }
};