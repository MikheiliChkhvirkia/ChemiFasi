'use client';

import { Search } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

interface LogoProps {
  isScrolled: boolean;
  onReset?: () => void;
}

export function Logo({ isScrolled, onReset }: LogoProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (pathname === '/') {
      // If we're already on the home page, just reset the search
      if (onReset) {
        onReset();
      }
    } else {
      // If we're on another page, navigate to home
      router.push('/');
    }
  };

  return (
    <button 
      onClick={handleClick}
      className="flex items-center gap-2 text-white hover:opacity-90 transition-all duration-300"
    >
      <Search className="h-5 w-5" />
      <span className="font-bold text-lg tracking-tight">ჩემი ფასი</span>
    </button>
  );
}