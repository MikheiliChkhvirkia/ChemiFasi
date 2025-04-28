'use client';

import { memo } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Product, StoreSetting } from '@/lib/types';
import { Loader2 } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  storeSettings: Record<string, StoreSetting>;
  isGridView: boolean;
  isLoading?: boolean;
  searchQuery?: string;
}

export const ProductGrid = memo(function ProductGrid({ 
  products, 
  storeSettings, 
  isGridView, 
  isLoading,
  searchQuery = ''
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-black" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">შეიყვანეთ საძიებო სიტყვა</p>
      </div>
    );
  }

  return (
    <div 
      className={
        isGridView 
          ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          : "flex flex-col gap-4"
      }
    >
      {products.map((product) => (
        <ProductCard
          key={product.productKey}
          product={product}
          storeSettings={storeSettings}
          isListView={!isGridView}
          searchQuery={searchQuery}
        />
      ))}
    </div>
  );
});