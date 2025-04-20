'use client';

import { ProductCard } from '@/components/ProductCard';
import { Product, StoreSetting, CategorizedStores } from '@/lib/types';

interface ProductGridProps {
  products: Product[];
  storeSettings: CategorizedStores;
  isGridView: boolean;
}

export function ProductGrid({ products, storeSettings, isGridView }: ProductGridProps) {
  // Convert categorizedStores to flat store settings with title
  const flatStoreSettings = Object.values(storeSettings).reduce((acc, stores) => {
    Object.entries(stores).forEach(([storeId, store]) => {
      if (!acc[storeId]) {
        acc[storeId] = store;
      }
    });
    return acc;
  }, {} as Record<string, StoreSetting>);

  if (products.length === 0) {
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
          storeSettings={flatStoreSettings}
          isListView={!isGridView}
        />
      ))}
    </div>
  );
}