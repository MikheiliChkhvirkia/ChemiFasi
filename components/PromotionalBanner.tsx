'use client';

import { useRef, useEffect, useState } from 'react';
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

export function PromotionalBanner({
  categorizedStores,
  categories = {},
  onSearch,
  onCategorySelect,
}: PromotionalBannerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bannerRefs = useRef<HTMLDivElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [categoriesWithDimensions, setCategoriesWithDimensions] = useState<CategoryWithDimensions[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: allBanners = [] } = useQuery({
    queryKey: ['banners'],
    queryFn: getBanners,
  });

  const banners = allBanners
    .filter((banner) => !!banner.mobileImageUrl)
    .filter((banner, index, self) => self.findIndex(b => b.mobileImageUrl === banner.mobileImageUrl) === index)
    .slice(0, 13);

  const scroll = (direction: 'left' | 'right') => {
    if (!banners.length || isScrolling) return;

    const nextIndex =
      direction === 'left'
        ? (currentIndex - 1 + banners.length) % banners.length
        : (currentIndex + 1) % banners.length;

    const next = bannerRefs.current[nextIndex];

    if (next) {
      setIsScrolling(true);
      next.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      setCurrentIndex(nextIndex);
      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  useEffect(() => {
    if (!banners.length) return;
    const interval = setInterval(() => {
      if (!isScrolling) scroll('right');
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isScrolling, banners.length]);

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

  const handleBannerClick = (banner: Banner) => {
    if (banner.route?.startsWith('http')) {
      window.open(banner.route, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-12 py-8">
      {banners.length > 0 && (
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                scroll('left');
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                scroll('right');
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div ref={scrollRef} className="flex overflow-x-auto space-x-4 snap-x snap-mandatory scroll-smooth">
            {banners.map((banner, index) => (
              <div
                key={`${banner.title}-${index}`}
                ref={(el) => {
                  if (el) bannerRefs.current[index] = el;
                }}
                className="flex-shrink-0 snap-start cursor-pointer"
                onClick={() => handleBannerClick(banner)}
              >
                <img
                  src={banner.mobileImageUrl}
                  alt={banner.title}
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    img.style.height = `${img.naturalHeight}px`;
                    img.style.width = `${img.naturalWidth}px`;
                  }}
                  className="rounded-xl object-contain shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
      )}

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
