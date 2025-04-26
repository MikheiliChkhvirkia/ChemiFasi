import axios from 'axios';
import { SearchFilters, SearchResponse, SiteSettings, Banner } from './types';

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

export const getBanners = async (): Promise<Banner[]> => {
  const { data } = await api.get('/sitesettings/get-banners');
  // Filter banners by position 1
  return data.filter((banner: Banner) => banner.position === 1);
};

export const searchProducts = async (filters: SearchFilters): Promise<SearchResponse> => {
  try {
    const { query, sort, minPrice, maxPrice, categoryId } = filters;
    console.log('[API] searchProducts called with filters:', filters);
    
    const sortValue = sort === 'relevance' ? 1 
      : sort === 'price-asc' ? 2 
      : sort === 'price-desc' ? 3 
      : sort === 'discount' ? 4 
      : 1;
    
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
    console.log('[API] Making request to:', url);
    
    const { data } = await api.get(url);
    console.log('[API] Response received:', data);
    
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

// Commented out image search functionality
// export const detectImage = async (imageUrl: string): Promise<SearchResponse> => {
//   try {
//     const params = new URLSearchParams({ imageUrl });
//     console.log('[API] Image detection request with URL:', imageUrl);
//     
//     const { data } = await api.get(`/product/detect?${params}`);
//     console.log('[API] Image detection response:', data);
//     
//     return {
//       products: data.products || [],
//       totalCount: data.totalCount || 0,
//       storeCounts: data.storeCounts || {},
//     };
//   } catch (error) {
//     console.error('[API] Image Detection API Error:', error);
//     return {
//       products: [],
//       totalCount: 0,
//       storeCounts: {},
//     };
//   }
// };