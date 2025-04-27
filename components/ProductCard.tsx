'use client';

import { Card } from '@/components/ui/card';
import { formatPrice, addUtmParams } from '@/lib/utils';
import { Product, StoreSetting } from '@/lib/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { memo, useState } from 'react';

interface ProductCardProps {
  product: Product;
  storeSettings: Record<string, StoreSetting>;
  isListView?: boolean;
}

const StoreLogo = memo(({ imageUrl, title, className }: { imageUrl?: string; title?: string; className: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={`${className} transform-gpu`}>
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title || 'Store logo'}
              className="w-full h-full object-contain p-1 select-none"
              loading="eager"
              decoding="async"
              width="48"
              height="48"
            />
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{title || 'მაღაზია'}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
));

StoreLogo.displayName = 'StoreLogo';

export const ProductCard = memo(function ProductCard({ product, storeSettings, isListView = false }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const store = storeSettings[product.source];
  const relevancePercentage = product.relevanceScore 
    ? Math.round(product.relevanceScore * 100)
    : null;

  const salePercentage = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : null;

  const handleClick = () => {
    if (product.url) {
      const urlWithUtm = addUtmParams(product.url, store?.title || 'unknown');

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'outbound_click', {
          event_category: 'outbound',
          event_label: urlWithUtm,
          store_name: store?.title || 'Unknown Store',
          product_name: product.name,
          product_price: product.salePrice || product.price,
        });
      }
      
      window.open(urlWithUtm, '_blank', 'noopener,noreferrer');
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (isListView) {
    return (
      <Card
        className="group relative overflow-hidden transition-all hover:shadow-lg cursor-pointer"
        onClick={handleClick}
        style={{
          '--store-color': store?.color || '#000000'
        } as React.CSSProperties}
      >
        <div className="flex">
          <div className="w-48 h-48 relative bg-white flex-shrink-0">
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className={`absolute inset-0 w-full h-full object-contain p-2 transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading="eager"
                decoding="async"
                width="192"
                height="192"
                onLoad={handleImageLoad}
              />
            )}
            {salePercentage && (
              <div className="absolute left-2 top-2">
                <div className="bg-red-600 text-white text-sm font-bold px-2 py-1 rounded">
                  -{Math.abs(salePercentage)}%
                </div>
              </div>
            )}
          </div>
          
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                {relevancePercentage && (
                  <div className="text-sm text-gray-600 mb-2">
                    მსგავსება: {relevancePercentage}%
                  </div>
                )}
              </div>
              <div className="ml-4">
                <StoreLogo
                  imageUrl={store?.imageUrl}
                  title={store?.title}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden"
                />
              </div>
            </div>
            
            <div className="mt-4">
              {product.salePrice ? (
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-red-600">
                    {formatPrice(product.salePrice)}
                  </div>
                  <div className="text-lg text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </div>
                </div>
              ) : (
                <div className="text-2xl font-bold">
                  {formatPrice(product.price)}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className="group relative overflow-hidden transition-all hover:shadow-lg cursor-pointer"
      onClick={handleClick}
      style={{
        '--store-color': store?.color || '#000000'
      } as React.CSSProperties}
    >
      <div className="absolute right-2 top-2 z-10">
        <StoreLogo
          imageUrl={store?.imageUrl}
          title={store?.title}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden"
        />
      </div>

      {salePercentage && (
        <div className="absolute left-2 top-2 z-10">
          <div className="bg-red-600 text-white text-sm font-bold px-2 py-1 rounded">
            -{Math.abs(salePercentage)}%
          </div>
        </div>
      )}

      <div className="aspect-square relative bg-white">
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-contain p-2 transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="eager"
            decoding="async"
            width="400"
            height="400"
            onLoad={handleImageLoad}
          />
        )}
      </div>

      <div className="p-4">
        <h3 className="font-medium line-clamp-2 min-h-[48px]">{product.name}</h3>
        
        <div className="mt-2 space-y-1">
          {product.salePrice ? (
            <>
              <div className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </div>
              <div className="text-lg font-bold text-red-600">
                {formatPrice(product.salePrice)}
              </div>
            </>
          ) : (
            <div className="text-lg font-bold">
              {formatPrice(product.price)}
            </div>
          )}
          
          {relevancePercentage && (
            <div className="text-sm text-gray-600">
              მსგავსება: {relevancePercentage}%
            </div>
          )}
        </div>
      </div>
    </Card>
  );
});