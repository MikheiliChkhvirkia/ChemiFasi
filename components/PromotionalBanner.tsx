'use client';

import { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Search, Tag, ShoppingBag, Percent } from 'lucide-react';
import { CategorizedStores, CategoryInfo } from '@/lib/types';

interface PromotionalBannerProps {
  categorizedStores: CategorizedStores;
  categories: Record<string, CategoryInfo>;
  onSearch: (query: string) => void;
  onCategorySelect: (categoryId: string) => void;
}

const FEATURED_DEALS = [
  {
    id: '1',
    title: 'დღის შეთავაზებები',
    description: 'მიიღეთ 30%-მდე ფასდაკლება',
    imageUrl: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&auto=format&fit=crop&q=60',
    icon: Percent,
  },
  {
    id: '2',
    title: 'მეორადი ნივთები',
    description: 'საუკეთესო ფასები',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=60',
    icon: ShoppingBag,
  },
];

export function PromotionalBanner({ categorizedStores, categories = {}, onSearch, onCategorySelect }: PromotionalBannerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current || isScrolling) return;
    setIsScrolling(true);
    const nextIndex = direction === 'left'
      ? (currentIndex - 1 + FEATURED_DEALS.length) % FEATURED_DEALS.length
      : (currentIndex + 1) % FEATURED_DEALS.length;

    scrollRef.current.scrollTo({
      left: nextIndex * 400,
      behavior: 'smooth',
    });

    setCurrentIndex(nextIndex);
    setTimeout(() => setIsScrolling(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isScrolling) scroll('right');
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isScrolling]);

  const categoryEntries = Object.entries(categories);
  const gridColsClass = categoryEntries.length <= 3 
    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3' 
    : categoryEntries.length <= 4
    ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-4'
    : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6';

  return (
    <div className="space-y-8">
      {/* Featured Deals Carousel */}
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div
          ref={scrollRef}
          className="w-full overflow-x-auto scrollbar-hide scroll-smooth"
        >
          <div className="flex w-max">
            {FEATURED_DEALS.map((deal) => (
              <Card
                key={deal.id}
                className="flex-none w-[400px] overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg mx-2 bg-black text-white"
              >
                <div className="relative aspect-[2/1]">
                  <img
                    src={deal.imageUrl}
                    alt={deal.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <deal.icon className="h-12 w-12 mx-auto mb-2" />
                      <h3 className="text-xl font-bold mb-1">{deal.title}</h3>
                      <p className="text-sm opacity-90">{deal.description}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {FEATURED_DEALS.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === index ? 'bg-black w-4' : 'bg-gray-300'
              }`}
              onClick={() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollTo({
                    left: index * 400,
                    behavior: 'smooth',
                  });
                  setCurrentIndex(index);
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Category Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-bold mb-4">კატეგორიები</h2>
        <div className={`grid ${gridColsClass} gap-4 ${categoryEntries.length <= 3 ? 'justify-center max-w-4xl mx-auto' : ''}`}>
          {categoryEntries.map(([categoryId, category]) => {
            const stores = categorizedStores[categoryId] || {};
            const storeCount = Object.keys(stores).length;

            return (
              <Card
                key={categoryId}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 group"
                onClick={() => onCategorySelect(categoryId)}
              >
                <div className="relative aspect-square bg-black text-white p-6 flex flex-col items-center justify-center text-center">
                  <div className="h-45 w-45 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={category.imageUrl}
                      alt={category.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-sm font-medium">{category.title}</h3>
                  <p className="text-xs mt-2 opacity-70">{storeCount} მაღაზია</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}