'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { StoreSetting, CategorizedStores, CategoryInfo } from '@/lib/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MapPin } from 'lucide-react';

interface StoreFilterBarProps {
  categorizedStores: CategorizedStores;
  categories: Record<string, CategoryInfo>;
  storeCounts: Record<string, number>;
  selectedStores: number[];
  selectedCategory: string | null;
  onStoreToggle: (storeId: number) => void;
  onCategoryToggle: (categoryId: string) => void;
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

export function StoreFilterBar({
  categorizedStores,
  categories,
  storeCounts,
  selectedStores,
  selectedCategory,
  onStoreToggle,
  onCategoryToggle,
}: StoreFilterBarProps) {
  const getVisibleStores = () => {
    if (selectedCategory) {
      return Object.entries(categorizedStores[selectedCategory] || {})
        .map(([id, store]) => ({
          id: Number(id),
          ...store,
          count: storeCounts[id] || 0
        }))
        .filter(store => store.count > 0);
    }

    const allStores = new Map<number, { store: StoreSetting; count: number }>();
    Object.values(categorizedStores).forEach(stores => {
      Object.entries(stores).forEach(([id, store]) => {
        const count = storeCounts[id] || 0;
        if (count > 0) {
          allStores.set(Number(id), { store, count });
        }
      });
    });

    return Array.from(allStores.entries())
      .map(([id, { store, count }]) => ({
        id,
        ...store,
        count
      }))
      .sort((a, b) => b.count - a.count);
  };

  const visibleStores = getVisibleStores();

  return (
    <div className="bg-white space-y-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-2">
              <TooltipProvider>
                {Object.entries(categories).map(([categoryId, category]) => {
                  const isSelected = selectedCategory === categoryId;
                  const categoryStores = categorizedStores[categoryId] || {};
                  const storeCount = Object.keys(categoryStores).length;

                  return (
                    <Tooltip key={`category-${categoryId}`}>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          className={`flex items-center gap-3 shrink-0 group relative h-14 px-5 ${
                            isSelected ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-black/5'
                          }`}
                          onClick={() => onCategoryToggle(categoryId)}
                        >
                          <div className="h-8 w-8 relative bg-white rounded-full flex items-center justify-center overflow-hidden">
                            <img
                              src={category.imageUrl}
                              alt={category.title}
                              className="w-[28px] h-[28px] object-contain"
                            />
                          </div>
                          <div className="flex flex-col items-start">
                            <span className="text-sm font-medium whitespace-nowrap">
                              {category.title}
                            </span>
                            <span className="text-xs opacity-70">
                              {storeCount} მაღაზია
                            </span>
                          </div>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{category.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </TooltipProvider>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {visibleStores.length > 0 && (
          <div className="border-t pt-4">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-2">
                <TooltipProvider>
                  {visibleStores.map(store => {
                    const isSelected = selectedStores.includes(store.id);

                    return (
                      <Tooltip key={`store-${store.id}`}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            className={`flex items-center gap-3 shrink-0 group relative h-14 px-5 ${
                              isSelected ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-black/5'
                            }`}
                            onClick={() => onStoreToggle(store.id)}
                          >
                            <div className="h-8 w-8 relative bg-white rounded-full flex items-center justify-center overflow-hidden">
                              {store.imageUrl && (
                                <img
                                  src={store.imageUrl}
                                  alt={store.title}
                                  className="w-[28px] h-[28px] object-contain"
                                />
                              )}
                              {store.requiresLocation && (
                                <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-0.5">
                                  <MapPin className="h-3 w-3 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col items-start">
                              <div className="flex items-center gap-1">
                                <span className="text-sm font-medium">
                                  {store.title}
                                </span>
                              </div>
                              <span className="text-xs opacity-70">
                                {formatNumber(store.count)} პროდუქტი
                                {store.requiresLocation && ' • საჭიროებს მდებარეობას'}
                              </span>
                            </div>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {store.title}
                            {store.requiresLocation && ' - საჭიროებს მდებარეობას მანძილის დასათვლელად'}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </TooltipProvider>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}