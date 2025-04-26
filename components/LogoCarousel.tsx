'use client';

import { useEffect, useRef, useState, memo } from 'react';
import { StoreSetting } from '@/lib/types';

interface LogoCarouselProps {
  stores: Record<string, StoreSetting>;
}

export const LogoCarousel = memo(function LogoCarousel({ stores }: LogoCarouselProps) {
  const storeArray = Object.entries(stores);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const logoWidth = 180;
  const positionRef = useRef(-logoWidth);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const animate = () => {
      if (!isPaused) {
        positionRef.current -= 0.1;
        if (scrollEl) {
          scrollEl.style.transform = `translateX(${positionRef.current}px)`;

          if (Math.abs(positionRef.current) >= scrollEl.scrollWidth / 3) {
            positionRef.current = -logoWidth;
          }
        }
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused]);

  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!scrollRef.current) return;
      positionRef.current += e.deltaY * -0.5;
      scrollRef.current.style.transform = `translateX(${positionRef.current}px)`;
    };

    containerEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => containerEl.removeEventListener('wheel', handleWheel);
  }, []);

  const handleClick = (url: string) => {
    try {
      const parsed = new URL(url);
      window.open(parsed.href, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error("Invalid URL:", url, err);
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden py-4 bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-6 will-change-transform select-none"
          style={{
            width: 'fit-content',
            transform: `translateX(-${logoWidth}px)`,
          }}
        >
          {[...Array(3)].flatMap(() =>
            storeArray.map(([id, store]) => (
              <div
                key={`${id}-${store.link}`}
                className="min-w-[150px] sm:min-w-[180px] h-28 sm:h-32"
              >
                <button
                  onClick={() => handleClick(store.link)}
                  className="w-full h-full p-3 sm:p-4 flex items-center justify-center rounded-xl bg-white shadow transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 hover:scale-105 cursor-pointer"
                >
                  <img
                    src={store.imageUrl}
                    alt={store.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                  />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
});