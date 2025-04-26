'use client';

import { useRef, useEffect, useState, memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategorizedStores, CategoryInfo, Banner } from '@/lib/types';
import { getBanners } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';

interface PromotionalBannerProps {
  categorizedStores: CategorizedStores;
  categories: Record<string, CategoryInfo>;
  onSearch: (query: string) => void;
  onCategorySelect: (categoryId: string) => void;
}

interface CategoryWithDimensions {
  id: string;
  category: CategoryInfo;
  width: number;
  height: number;
  stores: Record<string, any>;
  gridArea?: string;
}

const BannerImage = memo(function BannerImage({ 
  banner, 
  isActive,
  onClick 
}: { 
  banner: Banner; 
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
      }`}
      onClick={onClick}
    >
      <img
        src={banner.mobileImageUrl}
        alt={banner.title}
        className="w-full h-full object-cover"
        loading={isActive ? 'eager' : 'lazy'}
        draggable="false"
        decoding="async"
      />
    </div>
  );
});

BannerImage.displayName = 'BannerImage';

export function PromotionalBanner({
  categorizedStores,
  categories = {},
  onSearch,
  onCategorySelect,
}: PromotionalBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [categoriesWithDimensions, setCategoriesWithDimensions] = useState<CategoryWithDimensions[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bannerHeight, setBannerHeight] = useState(0);
  const bannerContainerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const { data: allBanners = [] } = useQuery({
    queryKey: ['banners'],
    queryFn: getBanners,
  });

  // Filter banners to only include those with mobileImageUrl
  const banners = allBanners.filter(banner => banner.mobileImageUrl);

  useEffect(() => {
    const calculateBannerHeight = () => {
      if (bannerContainerRef.current) {
        const width = bannerContainerRef.current.offsetWidth;
        const height = (width * 9) / 21; // Maintain 21:9 aspect ratio
        setBannerHeight(height);
      }
    };

    calculateBannerHeight();
    const resizeObserver = new ResizeObserver(calculateBannerHeight);
    
    if (bannerContainerRef.current) {
      resizeObserver.observe(bannerContainerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const transition = (direction: 'next' | 'prev') => {
    if (isTransitioning || !banners.length) return;

    setIsTransitioning(true);
    const nextIndex = direction === 'next'
      ? (currentIndex + 1) % banners.length
      : (currentIndex - 1 + banners.length) % banners.length;

    setCurrentIndex(nextIndex);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const startAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      transition('next');
    }, 5000);
  };

  useEffect(() => {
    if (!banners.length) return;
    startAutoPlay();
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentIndex, banners.length]);

  const handleBannerClick = (banner: Banner) => {
    if (banner.route?.startsWith('http')) {
      window.open(banner.route, '_blank', 'noopener,noreferrer');
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const difference = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(difference) > minSwipeDistance) {
      transition(difference > 0 ? 'next' : 'prev');
    }

    startAutoPlay();
  };

  useEffect(() => {
    const loadImageDimensions = async () => {
      const categoryEntries = Object.entries(categories);
      const dimensionsPromises = categoryEntries.map(([id, category]) =>
        new Promise<CategoryWithDimensions>((resolve) => {
          const img = new Image();
          img.onload = () => {
            resolve({
              id,
              category,
              width: img.width,
              height: img.height,
              stores: categorizedStores[id] || {},
            });
          };
          img.onerror = () => {
            resolve({
              id,
              category,
              width: 1,
              height: 1,
              stores: categorizedStores[id] || {},
            });
          };
          img.src = category.imageUrl;
        })
      );

      const loadedCategories = await Promise.all(dimensionsPromises);
      const sortedCategories = loadedCategories.sort((a, b) => (b.width / b.height) - (a.width / a.height));
      sortedCategories.forEach((cat, index) => {
        const aspectRatio = cat.width / cat.height;
        if (aspectRatio > 1.5) {
          cat.gridArea = `span 1 / span 2`;
        } else if (aspectRatio < 0.75) {
          cat.gridArea = `span 2 / span 1`;
        } else if (index < 2) {
          cat.gridArea = `span 2 / span 2`;
        } else {
          cat.gridArea = `span 1 / span 1`;
        }
      });
      setCategoriesWithDimensions(sortedCategories);
      setIsLoading(false);
    };

    loadImageDimensions();
  }, [categories, categorizedStores]);

  return (
  <div className="space-y-12 py-8">
      <div className="relative max-w-7xl mx-auto px-4">
        <div
          ref={bannerContainerRef}
          className="relative overflow-hidden rounded-xl"
          style={{ height: bannerHeight }}
          onMouseEnter={() => {
            if (autoPlayRef.current) {
              clearInterval(autoPlayRef.current);
            }
          }}
          onMouseLeave={startAutoPlay}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {banners.map((banner, index) => (
            <BannerImage
              key={`${banner.title}-${index}`}
              banner={banner}
              isActive={currentIndex === index}
              onClick={() => handleBannerClick(banner)}
            />
          ))}

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm z-20 hover:bg-white/90"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              transition('prev');
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm z-20 hover:bg-white/90"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              transition('next');
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index ? 'bg-white w-4' : 'bg-white/50'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-bold mb-6">კატეგორიები</h2>
        {!isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]" style={{ gridAutoFlow: 'dense' }}>
            {categoriesWithDimensions.map((item) => {
              const storeCount = Object.keys(item.stores).length;
              return (
                <Card
                  key={item.id}
                  onClick={() => onCategorySelect(item.id)}
                  className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg group"
                  style={{ gridArea: item.gridArea }}
                >
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-30" />
                    <img
                      src={item.category.imageUrl}
                      alt={item.category.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                      <h3 className="text-lg md:text-xl font-bold text-center mb-1">{item.category.title}</h3>
                      <p className="text-sm opacity-90">{storeCount} მაღაზია</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}