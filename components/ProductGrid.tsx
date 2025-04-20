'use client';

import { ProductCard } from '@/components/ProductCard';
import { Product, StoreSetting } from '@/lib/types';

interface ProductGridProps {
  products: Product[];
  storeSettings: Record<string, StoreSetting>;
  isGridView: boolean;
}

export function ProductGrid({ products, storeSettings, isGridView }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">პროდუქტები ვერ მოიძებნა</p>
      </div>
    );
  }

  return (
    <div className={
      isGridView 
        ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        : "flex flex-col gap-4"
    }>
      {products.map((product) => (
        <ProductCard
          key={product.productKey}
          product={product}
          storeSettings={storeSettings}
          isListView={!isGridView}
        />
      ))}
    </div>
  );
}