'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SearchBar } from '@/components/SearchBar';
import { ProductGrid } from '@/components/ProductGrid';
import { StoreFilterBar } from '@/components/StoreFilterBar';
import { PromotionalBanner } from '@/components/PromotionalBanner';
import { LogoCarousel } from '@/components/LogoCarousel';
import { Logo } from '@/components/Logo';
import { searchProducts, getSiteSettings, detectImage } from '@/lib/api';
import { SortType, Product, SearchResponse } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SORT_OPTIONS, MIN_SEARCH_LENGTH, DEBOUNCE_DELAY } from '@/lib/constants';
import { Github, Linkedin, Youtube, ChevronLeft, ChevronRight, MoreHorizontal, ChevronUp, Loader2, Share2, LayoutGrid, List } from 'lucide-react';
import { debounce } from '@/lib/utils';
import Link from 'next/link';

const ITEMS_PER_PAGE = 40;
const VISIBLE_PAGES = 5;
const SCROLL_THRESHOLD = 100;
const SEARCH_DEBOUNCE_DELAY = 500;

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStores, setSelectedStores] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortType, setSortType] = useState<SortType>('relevance');
  const [imageSearchResults, setImageSearchResults] = useState<SearchResponse | null>(null);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [debouncedMinPrice, setDebouncedMinPrice] = useState<string>('');
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const [isImageSearching, setIsImageSearching] = useState(false);
  const [inputQuery, setInputQuery] = useState('');

  const debouncedSetMinPrice = useCallback(
    debounce((value: string) => setDebouncedMinPrice(value), DEBOUNCE_DELAY),
    []
  );

  const debouncedSetMaxPrice = useCallback(
    debounce((value: string) => setDebouncedMaxPrice(value), DEBOUNCE_DELAY),
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < SCROLL_THRESHOLD) {
        setShowHeader(true);
        setIsScrolled(false);
        setShowScrollTop(false);
        return;
      }

      setShowHeader(currentScrollY < lastScrollY || currentScrollY < SCROLL_THRESHOLD);
      setIsScrolled(true);
      setShowScrollTop(true);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToTop();
  };

  const handleReset = () => {
    setSearchQuery('');
    setInputQuery('');
    setSelectedStores([]);
    setSelectedCategory(null);
    setSortType('relevance');
    setImageSearchResults(null);
    setMinPrice('');
    setMaxPrice('');
    setDebouncedMinPrice('');
    setDebouncedMaxPrice('');
    setCurrentPage(1);
    scrollToTop();
  };

  const { data: siteSettings, isLoading: isLoadingSettings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: getSiteSettings,
  });

  const { data: searchResults, isLoading: isSearching } = useQuery({
    queryKey: [
      'products',
      searchQuery,
      sortType,
      debouncedMinPrice,
      debouncedMaxPrice,
      selectedCategory
    ],
    queryFn: () => searchProducts({
      query: searchQuery,
      sort: sortType,
      minPrice: debouncedMinPrice ? Number(debouncedMinPrice) : undefined,
      maxPrice: debouncedMaxPrice ? Number(debouncedMaxPrice) : undefined,
      categoryId: selectedCategory || undefined,
    }),
    enabled: (searchQuery.length >= MIN_SEARCH_LENGTH || selectedCategory !== null),
  });

  const handleSearch = (query: string) => {
    if (query.length >= MIN_SEARCH_LENGTH || query === '') {
      setSearchQuery(query);
      setImageSearchResults(null);
      setCurrentPage(1);
      scrollToTop();
    }
  };

  const handleInputChange = (query: string) => {
    setInputQuery(query);
  };

  const handleImageSearch = async (imageUrl: string) => {
    if (!imageUrl) return;
    
    try {
      setIsImageSearching(true);
      const results = await detectImage(imageUrl);
      setImageSearchResults(results);
      setSearchQuery('');
      setCurrentPage(1);
    } catch (error) {
      console.error('Image search failed:', error);
    } finally {
      setIsImageSearching(false);
    }
  };

  const handleStoreToggle = (storeId: number) => {
    setSelectedStores(prev =>
      prev.includes(storeId)
        ? prev.filter(id => id !== storeId)
        : [...prev, storeId]
    );
    setCurrentPage(1);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(prev => prev === categoryId ? null : categoryId);
    setSelectedStores([]);
    setCurrentPage(1);
    scrollToTop();
  };

  const handlePriceChange = (value: string, type: 'min' | 'max') => {
    const numValue = value === '' ? '' : Math.max(0, Number(value));
    const stringValue = String(numValue);
    
    if (type === 'min') {
      setMinPrice(stringValue);
      debouncedSetMinPrice(stringValue);
      if (maxPrice && numValue !== '' && Number(numValue) > Number(maxPrice)) {
        setMaxPrice(stringValue);
        debouncedSetMaxPrice(stringValue);
      }
    } else {
      setMaxPrice(stringValue);
      debouncedSetMaxPrice(stringValue);
      if (minPrice && numValue !== '' && Number(numValue) < Number(minPrice)) {
        setMinPrice(stringValue);
        debouncedSetMinPrice(stringValue);
      }
    }
    setCurrentPage(1);
  };

  const currentResults = imageSearchResults || searchResults;
  
  const filteredProducts = useMemo(() => {
    return currentResults?.products?.filter((product: Product) => {
      const price = product.salePrice || product.price;
      const matchesMinPrice = !debouncedMinPrice || price >= Number(debouncedMinPrice);
      const matchesMaxPrice = !debouncedMaxPrice || price <= Number(debouncedMaxPrice);
      const matchesStores = selectedStores.length === 0 || selectedStores.includes(product.source);
      
      return matchesMinPrice && matchesMaxPrice && matchesStores;
    }) || [];
  }, [currentResults?.products, debouncedMinPrice, debouncedMaxPrice, selectedStores]);

  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= VISIBLE_PAGES) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <header className={`sticky top-0 left-0 right-0 bg-white border-b z-50 transition-transform duration-300 ${
        !showHeader && isScrolled ? '-translate-y-full' : 'translate-y-0'
      }`}>
        
        <div className="border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="h-24 flex items-center">
              <SearchBar 
                onSearch={handleSearch}
                onInputChange={handleInputChange}
                inputValue={inputQuery}
                onImageSearch={handleImageSearch}
                isLoading={isSearching || isImageSearching}
                selectedCategory={selectedCategory ? siteSettings?.categories[selectedCategory] : null}
              />
            </div>
          </div>
        </div>

        {currentResults && (
          <div className="bg-gray-50 border-b">
            <div className="max-w-7xl mx-auto px-4">
              <div className="py-3 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="flex items-center gap-2 bg-white rounded-md border p-1">
                    <Button
                      variant={isGridView ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setIsGridView(true)}
                      className={`h-7 px-2 ${isGridView ? 'bg-black text-white' : ''}`}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={!isGridView ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setIsGridView(false)}
                      className={`h-7 px-2 ${!isGridView ? 'bg-black text-white' : ''}`}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                  <Select
                    value={sortType}
                    onValueChange={(value) => setSortType(value as SortType)}
                  >
                    <SelectTrigger className="w-[180px] h-8 bg-white">
                      <SelectValue placeholder="დალაგება" />
                    </SelectTrigger>
                    <SelectContent>
                      {SORT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Input
                      type="number"
                      placeholder="მინ. ფასი"
                      value={minPrice}
                      onChange={(e) => handlePriceChange(e.target.value, 'min')}
                      className="w-full sm:w-24 h-8 bg-white"
                      min="0"
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder="მაქს. ფასი"
                      value={maxPrice}
                      onChange={(e) => handlePriceChange(e.target.value, 'max')}
                      className="w-full sm:w-24 h-8 bg-white"
                      min="0"
                    />
                  </div>
                </div>
              </div>
              <div className="py-2">
                <StoreFilterBar
                  categorizedStores={siteSettings?.categorizedStores || {}}
                  categories={siteSettings?.categories || {}}
                  storeCounts={currentResults.storeCounts}
                  selectedStores={selectedStores}
                  selectedCategory={selectedCategory}
                  onStoreToggle={handleStoreToggle}
                  onCategoryToggle={handleCategorySelect}
                />
              </div>
            </div>
          </div>
        )}
      </header>

      {!searchQuery && !imageSearchResults && !selectedCategory && (
        <div className="py-8">
          <PromotionalBanner 
            categorizedStores={siteSettings?.categorizedStores || {}}
            categories={siteSettings?.categories || {}}
            onSearch={handleSearch}
            onCategorySelect={handleCategorySelect}
          />
        </div>
      )}

      <div className="flex-1 py-6">
        {currentResults && (
          <div className="max-w-7xl mx-auto px-4">
            <ProductGrid
              products={paginatedProducts}
              storeSettings={siteSettings?.storeSetting || {}}
              isGridView={isGridView}
              isLoading={isSearching || isImageSearching}
              searchQuery={searchQuery}
            />

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="h-8 w-8 border-black hover:bg-black hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {getVisiblePages().map((page, index) => (
                  page === '...' ? (
                    <div key={`ellipsis-${index}`} className="px-2">
                      <MoreHorizontal className="h-4 w-4 text-gray-400" />
                    </div>
                  ) : (
                    <Button
                      key={`page-${page}`}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => handlePageChange(page as number)}
                      className={`h-8 w-8 p-0 border-black ${
                        currentPage === page 
                          ? 'bg-black text-white hover:bg-black/90' 
                          : 'hover:bg-black hover:text-white'
                      }`}
                    >
                      {page}
                    </Button>
                  )
                ))}

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 border-black hover:bg-black hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {showScrollTop && (
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 h-10 w-10 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 bg-black text-white hover:bg-black/90"
          onClick={scrollToTop}
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      )}

      {siteSettings?.storeSetting && (
        <div className="border-t">
          <LogoCarousel stores={siteSettings.storeSetting} />
        </div>
      )}
    </main>
  );
}