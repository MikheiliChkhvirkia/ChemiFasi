'use client';

import { useEffect, useState } from 'react';
import { Banner } from '@/lib/types';

interface BannerGridProps {
  banners: Banner[];
}

export function BannerGrid({ banners }: BannerGridProps) {
  const handleBannerClick = (route: string) => {
    window.open(route, '_blank', 'noopener,noreferrer');
  };

  const gridBanners = banners
    .filter(b => b.position === 5 && b.orderNo > 0)
    .sort((a, b) => a.orderNo - b.orderNo);

  if (gridBanners.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {gridBanners.map((banner) => (
        <button
          key={banner.title}
          onClick={() => handleBannerClick(banner.route)}
          className="relative group overflow-hidden rounded-lg hover:shadow-xl transition-all duration-300 bg-white"
        >
          <div className="w-full">
            <img
              src={banner.mobileImageUrl}
              alt={banner.title}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </button>
      ))}
    </div>
  );
}