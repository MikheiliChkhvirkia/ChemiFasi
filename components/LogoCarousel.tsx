'use client';

import { useEffect, useRef, useState } from 'react';
import { StoreSetting } from '@/lib/types';

interface LogoCarouselProps {
  stores: Record<string, StoreSetting>;
}

export function LogoCarousel({ stores }: LogoCarouselProps) {
  const storeArray = Object.entries(stores);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const logoWidth = 180;
  const positionRef = useRef(-logoWidth);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    let animationFrameId: number;
    const animate = () => {
      if (!isPaused) {
        positionRef.current -= 0.1;
        scrollEl.style.transform = `translateX(${positionRef.current}px)`;

        if (Math.abs(positionRef.current) >= scrollEl.scrollWidth / 3) {
          positionRef.current = -logoWidth;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
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
      const parsed = new URL(url); // 💥 will throw if invalid
      console.log("🔗 Opening valid link:", parsed.href);
      window.open(parsed.href, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error("❌ Invalid URL passed:", url, err);
      alert('Invalid URL. Please check the link value.');
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
                  />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
