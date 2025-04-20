'use client';

import { Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LogoProps {
  isScrolled: boolean;
  onReset?: () => void;
}

export function Logo({ isScrolled, onReset }: LogoProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onReset) {
      onReset();
    }
    router.refresh();
  };

  return (
    <Link 
      href="/"
      onClick={handleClick}
      className="flex items-center gap-2 text-white hover:opacity-90 transition-all duration-300"
    >
      <Search className="h-5 w-5" />
      <span className="font-bold text-lg tracking-tight">ჩემი ფასი</span>
    </Link>
  );
}